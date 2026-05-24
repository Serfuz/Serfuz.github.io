---
layout: default
title: Knowledge Graph
---

<h1>Knowledge Graph</h1>

<div id="graph" style="height: 800px; border:1px solid #ccc;"></div>

{% include data.html %}

<!-- ✅ lock library version -->
<script src="https://unpkg.com/vis-network@9.1.2/standalone/umd/vis-network.min.js"></script>

<script>
  // =========================
  // Convert Liquid data → JS
  // =========================

  const rawRecords = [
    {% for rec in records %}
      [
        "{{ rec[0] | escape }}",
        "{{ rec[1] | escape }}",
        "{{ rec[2] | escape }}",
        "{{ rec[3] | escape }}",
        "{{ rec[4].url | relative_url }}"
      ],
    {% endfor %}
  ];

  // =========================
  // Build nodes + edges
  // =========================

  const nodesMap = new Map();
  const edges = [];
  const edgeSet = new Set(); // ✅ prevents duplicate edges
  const levelSizes = [30, 22, 16, 10];
  const levelFontSizes = [36, 32, 28, 24];
  const levelColors = [
    "#e74c3c", // L1 (red)
    "#f39c12", // L2 (orange)
    "#27ae60", // L3 (green)
    "#3498db"  // L4 (blue)
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
          },
        });
      }

      if (!nodesMap.has(to)) {
        nodesMap.set(to, {
          id: to,
          label: to,
          url: url,
          size: levelSizes[i+1] || 10,
          color: levelColors[i + 1] || "#ccc",
          font: {
            size: levelFontSizes[i+1] || 24
          },
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
  // Render graph
  // =========================

  const container = document.getElementById("graph");

  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };

  const options = {
    nodes: {
      shape: "dot",
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
        gravitationalConstant: -5000,  // stronger repulsion
        centralGravity: 0.2,           // pull toward center (lower = more spread)
        springLength: 100,             // edge length (bigger = more spacing)
        springConstant: 0.02           // stiffness
      },
      stabilization: {
        iterations: 200
      }
    },
    interaction: {
      hover: true
    }
  };

  // ✅ store network so we can attach events
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

  
  const tooltip = document.getElementById("tooltip");

  network.on("hoverNode", function(params) {
    const node = nodesMap.get(params.node);

    if (!node || !node.url) return;
    const { x, y } = params.event.pointer.DOM;

    tooltip.style.left = x + 10 + "px";
    tooltip.style.top = y + 10 + "px";

    tooltip.style.display = "block";

    
    tooltip.innerHTML = `
      <div style="width:450px;">
        <div style="
          font-weight:bold;
          margin-bottom:5px;
        ">
          ${node.label}
        </div>
        <div style="
          height:300px;
          border-radius:6px;
          overflow:hidden;
        ">
          <iframe 
            src="${node.url}" 
            style="width:100%; height:100%; border:none; pointer-events:none;"
          ></iframe>
        </div>
      </div>
    `;

  });

  network.on("blurNode", function() {
    tooltip.style.display = "none";
  });

  document.addEventListener("mousemove", function(e) {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

</script>


<div id="tooltip" style="
  position:absolute;
  background:white;
  border:1px solid #ccc;
  padding:8px;
  border-radius:6px;
  display:none;
  pointer-events:none;
  box-shadow:0 2px 6px rgba(0,0,0,0.2);
  z-index:1000
"></div>
