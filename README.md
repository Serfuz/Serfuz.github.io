# Knowledge Canvas V-Lines

<div style="position:relative; width:800px; height:400px;">

  <!-- Concurrency box -->
  <div style="position:absolute; left:50px; top:50px; border:1px solid #ccc; padding:10px; width:180px; border-radius:8px; background:#f9f9f9;">
    <h3>Concurrency</h3>
    <ul>
      <li>{{ Concurrency</a></li>}}
    </ul>
  </div>

  <!-- Locks box -->
  <div style="position:absolute; left:300px; top:150px; border:1px solid #ccc; padding:10px; width:220px; border-radius:8px; background:#f9f9f9;">
    <h3>Locks</h3>

    <!-- Unfair -->
    <div style="background:#ffe5e5; padding:8px; margin-bottom:8px; border-radius:6px;">
      <strong style="color:red;">Unfair</strong>
      <ul>
        <li>{{ Disable Interrupt</a></li>}}
      </ul>
    </div>

    <!-- Fair -->
    <div style="background:#e5ffe5; padding:8px; border-radius:6px;">
      <strong style="color:green;">Fair</strong>
      <ul>
        <li>(later)</li>
      </ul>
    </div>

  </div>

  <!-- SVG arrows layer -->
  <svg style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;">

    <!-- Arrow: Concurrency -> Locks -->
    <line x1="180" y1="100" x2="300" y2="180"
          stroke="black" stroke-width="2"
          marker-end="url(#arrow)" />

    <!-- Arrowhead definition -->
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10"
              refX="10" refY="3"
              orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="black" />
      </marker>
    </defs>

  </svg>

</div>
