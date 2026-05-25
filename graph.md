---
layout: default
title: Knowledge Graph
---
<script src="https://unpkg.com/vis-network@9.1.2/standalone/umd/vis-network.min.js"></script>
<script src="/assets/js/graph.js" defer></script>
<script defer>
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

  initGraph(rawRecords);
</script>

<h1>Knowledge Graph</h1>

<div id="graph" style="height: 800px; border:1px solid #ccc;"></div>

{% include data.html %}

<!-- ✅ lock library version -->


<div id="tooltip" style="
  position:absolute;
  background:white;
  border:1px solid #ccc;
  padding:8px;
  border-radius:6px;
  display:none;
  pointer-events:auto;
  box-shadow:0 2px 6px rgba(0,0,0,0.2);
  z-index:1000
"></div>





