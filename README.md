# Knowledge Canvas

<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px;">

{% assign pages = site.pages | where: "publish", true %}
{% assign level1s = pages | map: "level1" | uniq %}

{% for l1 in level1s %}
{% if l1 %}

{% assign pages_l1 = pages | where: "level1", l1 %}
{% assign l1_page = pages_l1 | where: "level2", nil | first %}

<div style="border:3px solid #444; padding:15px; border-radius:10px; background:#fafafa;">

  <!-- LEVEL 1 HEADER -->
  <h2>
    {% if l1_page %}
      {{ l1_page.url | relative_url }}{{ l1 }}</a>
    {% else %}
      {{ l1 }}
    {% endif %}
  </h2>

  <!-- LEVEL 1 LINKS -->
  <ul>
    {% for page in pages_l1 %}
      {% if page.level2 == nil %}
        <li>{{ page.url | relative_url }}{{ page.title }}</a></li>
      {% endif %}
    {% endfor %}
  </ul>

  {% assign level2s = pages_l1 | map: "level2" | uniq %}

  {% for l2 in level2s %}
  {% if l2 %}

  {% assign pages_l2 = pages_l1 | where: "level2", l2 %}
  {% assign l2_page = pages_l2 | where: "level3", nil | first %}

  <div style="border:2px solid #777; padding:10px; margin-top:10px; border-radius:8px; background:#fff;">

    <!-- LEVEL 2 HEADER -->
    <h3>
      {% if l2_page %}
        {{ l2_page.url | relative_url }}{{ l2 }}</a>
      {% else %}
        {{ l2 }}
      {% endif %}
    </h3>

    <!-- LEVEL 2 LINKS -->
    <ul>
      {% for page in pages_l2 %}
        {% if page.level3 == nil %}
          <li>{{ page.url | relative_url }}{{ page.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>

    {% assign level3s = pages_l2 | map: "level3" | uniq %}

    {% for l3 in level3s %}
    {% if l3 %}

    {% assign pages_l3 = pages_l2 | where: "level3", l3 %}
    {% assign l3_page = pages_l3 | where: "level4", nil | first %}

    <div style="border:1px dashed #999; padding:8px; margin-top:8px; border-radius:6px;">

      <!-- LEVEL 3 HEADER -->
      <h4>
        {% if l3_page %}
          {{ l3_page.url | relative_url }}{{ l3 }}</a>
        {% else %}
          {{ l3 }}
        {% endif %}
      </h4>

      <!-- LEVEL 3 LINKS -->
      <ul>
        {% for page in pages_l3 %}
          {% if page.level4 == nil %}
            <li>{{ page.url | relative_url }}{{ page.title }}</a></li>
          {% endif %}
        {% endfor %}
      </ul>

      {% assign level4s = pages_l3 | map: "level4" | uniq %}

      {% for l4 in level4s %}
      {% if l4 %}

      {% assign pages_l4 = pages_l3 | where: "level4", l4 %}

      <div style="padding:6px; margin-top:6px; border-radius:6px; background:#eef6ff;">

        <!-- LEVEL 4 HEADER -->
        <strong>{{ l4 }}</strong>

        <!-- LEVEL 4 LINKS -->
        <ul>
          {% for page in pages_l4 %}
            <li>{{ page.url | relative_url }}{{ page.title }}</a></li>
          {% endfor %}
        </ul>

      </div>

      {% endif %}
      {% endfor %}

    </div>

    {% endif %}
    {% endfor %}

  </div>

  {% endif %}
  {% endfor %}

</div>

{% endif %}
{% endfor %}

</div>
