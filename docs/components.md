---
layout: layout-basic.njk
title: All components
packages:
  - pfe-band
  - pfe-cta
---

<pfe-band class="header" use-grid>

# Components

</pfe-band>

<pfe-band class="header" size="small" color="lightest" use-grid>

## Overview
Components are interactive building blocks of our design system. Each component was created to meet a specific UI and accessibility need. Components should be used harmoniously together in the same space to create more intuitive user experiences.

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
            <pfe-cta priority="secondary" variant="wind"><a href="/demo/{{ component.data.package }}/">Demo</a></pfe-cta>
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
