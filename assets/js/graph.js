function initGraph(rawRecords) {

  // =========================
  // State
  // =========================
  let hoverTimeout = null;
  let hideTimeout = null;

  let mouseX = 0;
  let mouseY = 0;

  let isMouseDown = false;

  const tooltip = document.getElementById("tooltip");

  let currentNodeId = null;

  document.addEventListener("mousedown", () => {
    isMouseDown = true;
    tooltip.style.display = "none";
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  document.addEventListener("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  // =========================
  // Build nodes + edges
  // =========================

  const nodesMap = new Map();
  const edges = [];
  const edgeSet = new Set();

  const levelSizes = [30, 22, 16, 10];
  const levelFontSizes = [36, 32, 28, 24];
  const levelColors = [
    "#e74c3c",
    "#f39c12",
    "#27ae60",
    "#3498db"
  ];

  const LEVEL_COUNT = 4;

  rawRecords.forEach(path => {
    const url = path[4];

    for (let i = 0; i < LEVEL_COUNT - 1; i++) {
      const from = path[i];
      const to = path[i + 1];

      if (!from || !to) continue;

      // ---------- Nodes ----------

      if (!nodesMap.has(from)) {
        nodesMap.set(from, {
          id: from,
          label: from,
          url: url,
          size: levelSizes[i] || 10,
          color: levelColors[i] || "#ccc",
          font: {
            size: levelFontSizes[i] || 24
          }
        });
      }

      if (!nodesMap.has(to)) {
        nodesMap.set(to, {
          id: to,
          label: to,
          url: url,
          size: levelSizes[i + 1] || 10,
          color: levelColors[i + 1] || "#ccc",
          font: {
            size: levelFontSizes[i + 1] || 24
          }
        });
      }

      // ---------- Edges ----------
      const key = `${from}->${to}`;

      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ from: from, to: to });
      }
    }
  });

  const nodes = Array.from(nodesMap.values());

  // =========================
  // Render graph (FULL ORIGINAL OPTIONS)
  // =========================

  const container = document.getElementById("graph");

  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };

  const options = {
    nodes: {
      shape: "dot",   // ✅ ensures label under node like before
      scaling: {
        min: 10,
        max: 30
      },
      font: {
        size: 24
      }
    },
    edges: {
      color: "#aaa",
      width: 1.2
    },

    physics: {
      enabled: true,
      solver: "barnesHut",
      barnesHut: {
        gravitationalConstant: -5000,
        centralGravity: 0.2,
        springLength: 100,
        springConstant: 0.02
      },
      stabilization: {
        iterations: 200
      }
    },

    interaction: {
      hover: true
    }
  };

  const network = new vis.Network(container, data, options);

  // =========================
  // Click → Navigate
  // =========================

  network.on("click", function (params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const node = nodesMap.get(nodeId);

      if (node && node.url) {
        window.location.href = node.url;
      }
    }
  });

  // =========================
  // Hover → Popup
  // =========================


network.on("hoverNode", function(params) {
  if (isMouseDown) return;

  const nodeId = params.node;
  const node = nodesMap.get(nodeId);
  if (!node || !node.url) return;

  currentNodeId = nodeId;

  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  hoverTimeout = setTimeout(() => {
    const current = network.getNodeAt({ x: mouseX, y: mouseY });
    if (currentNodeId !== nodeId) return;

    tooltip.style.display = "block";

    tooltip.style.left = mouseX + 15 + "px";
    tooltip.style.top = mouseY + 15 + "px";

    tooltip.innerHTML = `
      <div style="width:500px;">
        <div style="font-weight:bold; margin-bottom:5px;">
          ${node.label}
        </div>
        <div style="height:350px; border-radius:6px; overflow:hidden;">
          <iframe 
            src="${node.url}" 
            style="width:100%; height:100%; border:none;"
          ></iframe>
        </div>
      </div>
    `;
    }, 500);
  });


  // =========================
  // Click outside → close popup
  // =========================

  document.addEventListener("click", (e) => {
    if (tooltip.contains(e.target)) return;
    tooltip.style.display = "none";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  if (window.rawRecords && typeof initGraph === "function") {
    initGraph(window.rawRecords);
  }
});
