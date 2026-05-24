---
layout: default
title: Knowledge Graph
---

<h1>Knowledge Graph</h1>

<div id="graph" style="height: 800px; border:1px solid #ccc;"></div>

{% include data.html %}

<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>

<script>
  // =========================
  // Convert Liquid data → JS
  // =========================

  const rawRecords = [
    {% for rec in records %}
      ["{{ rec[0] }}","{{ rec[1] }}","{{ rec[2] }}","{{ rec[3] }}"],
    {% endfor %}
  ];

  // =========================
  // Build nodes + edges
  // =========================

  const nodesMap = new Map();
  const edges = [];

  rawRecords.forEach(path => {
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];

      if (!from || !to) continue;

      // add nodes
      if (!nodesMap.has(from)) {
        nodesMap.set(from, { id: from, label: from });
      }

      if (!nodesMap.has(to)) {
        nodesMap.set(to, { id: to, label: to });
      }

      // add edge
      edges.push({ from: from, to: to });
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
      size: 10,
      font: {
        size: 14
      }
    },
    edges: {
      color: "#999",
      width: 1
    },
    physics: {
      enabled: true,
      stabilization: false
    },
    interaction: {
      hover: true
    }
  };

  new vis.Network(container, data, options);
</script>