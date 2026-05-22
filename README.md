# Knowledge Canvas

<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px;">

{% assign pages = site.pages | where: "publish", true %}

{% assign level1s = pages | map: "level1" | uniq %}

{% for l1 in level1s %}
  {% if l1 %}

  <div style="border:2px solid #ccc; padding:15px; border-radius:10px;">
    <h2>{{ l1 }}</h2>

    {% assign pages_l1 = pages | where: "level1", l1 %}
    {% assign level2s = pages_l1 | map: "level2" | uniq %}

    {% for l2 in level2s %}
      {% if l2 %}

      <div style="border:1px solid #aaa; padding:10px; margin-top:10px; border-radius:8px;">
        <h3>{{ l2 }}</h3>

        {% assign pages_l2 = pages_l1 | where: "level2", l2 %}
        {% assign level3s = pages_l2 | map: "level3" | uniq %}

        {% for l3 in level3s %}
          {% if l3 %}

          <div style="border:1px dashed #aaa; padding:8px; margin-top:8px; border-radius:6px;">
            <h4>{{ l3 }}</h4>

            {% assign pages_l3 = pages_l2 | where: "level3", l3 %}
            {% assign level4s = pages_l3 | map: "level4" | uniq %}

            {% for l4 in level4s %}
              {% if l4 %}

              <div style="padding:6px; margin-top:6px; background:#f5f5f5; border-radius:6px;">
                <strong>{{ l4 }}</strong>
                <ul>

                  {% for page in pages_l3 %}
                    {% if page.level4 == l4 %}
                      <li>
                        <a href="{{ page.url | relative_url }}">{{ page.title }}</a>
                      </li>
                    {% endif %}
                  {% endfor %}

                </ul>
              </div>

              {% endif %}
            {% endfor %}

            <!-- If no level4, show links directly -->
            {% if level4s == empty %}
              <ul>
                {% for page in pages_l3 %}
                  <li>
                    <a href="{{ page.url | relative_url }}">{{ page.title }}</a>
                  </li>
                {% endfor %}
              </ul>
            {% endif %}

          </div>

          {% endif %}
        {% endfor %}

        <!-- If no level3 -->
        {% if level3s == empty %}
          <ul>
            {% for page in pages_l2 %}
              <li>
                <a href="{{ page.url | relative_url }}">{{ page.title }}</a>
              </li>
            {% endfor %}
          </ul>
        {% endif %}

      </div>

      {% endif %}
    {% endfor %}

  </div>

  {% endif %}
{% endfor %}

</div>