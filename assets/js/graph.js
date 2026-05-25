// graph.js

function initGraph(rawRecords) {
  let hoverTimeout = null;
  let hideTimeout = null;

  let mouseX = 0;
  let mouseY = 0;

  let isMouseDown = false;

  document.addEventListener("mousedown", () => {
    isMouseDown = true;
    document.getElementById("tooltip").style.display = "none";
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  document.addEventListener("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  const tooltip = document.getElementById("tooltip");

  const nodesMap = new Map();
  const edges = [];
  const edgeSet = new Set();

  const levelSizes = [30, 22, 16, 10];
  const levelFontSizes = [36, 32, 28, 24];
  const levelColors = ["#e74c3c", "#f39c12", "#27ae60", "#3498db"];

  const LEVEL_COUNT = 4;

  rawRecords.forEach(path => {
    const url = path[4];

    for (let i = 0; i < LEVEL_COUNT - 1; i++) {
      const from = path[i];
      const to = path[i + 1];

      if (!from || !to) continue;

      if (!nodesMap.has(from)) {
        nodesMap.set(from, {
          id: from,
          label: from,
          url: url,
          size: levelSizes[i] || 10,
          color: levelColors[i] || "#ccc",
          font: { size: levelFontSizes[i] || 24 }
        });
      }

      if (!nodesMap.has(to)) {
        nodesMap.set(to, {
          id: to,
          label: to,
          url: url,
          size: levelSizes[i + 1] || 10,
          color: levelColors[i + 1] || "#ccc",
          font: { size: levelFontSizes[i + 1] || 24 }
        });
      }

      const key = `${from}->${to}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ from, to });
      }
    }
  });

  const nodes = Array.from(nodesMap.values());

  const container = document.getElementById("graph");

  const network = new vis.Network(container, {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  }, {
    interaction: { hover: true }
  });

  network.on("hoverNode", function(params) {
    if (isMouseDown) return;

    const node = nodesMap.get(params.node);
    if (!node || !node.url) return;

    if (hoverTimeout) clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(() => {
      tooltip.style.display = "block";
      tooltip.style.left = mouseX + 15 + "px";
      tooltip.style.top = mouseY + 15 + "px";

      tooltip.innerHTML = `
        <div style="width:500px;">
          <div style="font-weight:bold;">${node.label}</div>
          <div style="height:350px; overflow:hidden;">
            <iframe src="${node.url}" style="width:100%; height:100%; border:none;"></iframe>
          </div>
        </div>
      `;
    }, 300);
  });

  document.addEventListener("click", (e) => {
    if (tooltip.contains(e.target)) return;
    tooltip.style.display = "none";
  });
}