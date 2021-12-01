---
layout: layout-basic.njk
title: All components
packages:
  - pfe-band
  - pfe-cta
---

<pfe-band class="header" use-grid>
  <h1 slot="header">Components</h1>
</pfe-band>

<pfe-band class="header" size="small" color="lightest" use-grid>
  <h2 slot="header">Overview</h2>
  <p>
    Components are interactive building blocks of our design system.
    Each component was created to meet a specific UI and accessibility need.
    Components should be used harmoniously together in the same space to create more intuitive user experiences.
  </p>
</pfe-band>

<pfe-band class="header" size="small" color="lightest" use-grid>

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col">
  {%- for component in collections.component -%}
    <div class="component-preview">
      <div class="component-preview--container">
      {%- if meta.env == "prod" %}<a href="{{ component.url }}" aria-label="{{ component.data.title }}">{% endif %}
        <div class="preview-image" style="background-image: url({{ component.url }}/preview.png);"></div>
      {%- if meta.env == "prod" %}</a>{% endif -%}
        {%- if meta.env != "prod" -%}
          <div class="overlay">
            <pfe-cta priority="secondary" variant="wind"><a href="{{ component.url }}demo/">Demo</a></pfe-cta>
          </div>
        {%- endif %}
      </div>
      <h3>
        <a href="{{ component.url }}">{{ component.data.title }}</a>
      </h3>
      <p>{{ component.data.description }}</p>
      {%- if meta.env != "prod" -%}<pfe-cta><a href="{{ component.url }}">Component overview</a></pfe-cta>{% endif %}
    </div>
  {%- endfor -%}
</div>

</pfe-band>
