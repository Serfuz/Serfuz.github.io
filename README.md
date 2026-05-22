# Knowledge Canvas

<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px;">

  {% raw %}
  {% assign topics = site.pages | map: "topic" | uniq %}

  {% for topic in topics %}
    {% if topic %}

      <div style="border:1px solid #ccc; padding:15px; border-radius:8px;">
        <h2>{{ topic }}</h2>

        {% assign pages_in_topic = site.pages | where: "topic", topic %}

        {% assign subtopics = pages_in_topic | map: "subtopic" | uniq %}

        {% for sub in subtopics %}
          {% if sub %}

            <div style="margin-top:10px; padding:10px; border-radius:6px; background:#f5f5f5;">
              <strong>{{ sub }}</strong>
              <ul>

                {% for page in pages_in_topic %}
                  {% if page.subtopic == sub %}
                    <li>
                      {{ page.title }}
                    </li>
                  {% endif %}
                {% endfor %}

              </ul>
            </div>

          {% endif %}
        {% endfor %}

      </div>

    {% endif %}
  {% endfor %}
  {% endraw %}

</div>
