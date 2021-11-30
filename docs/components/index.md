---
layout: layout-basic.njk
title: All components
permalink: /components/index.html
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
  {%- for element in elements -%}
  {%- if element.docsPath -%}
    <div class="component-preview">
      <div class="component-preview--container">
        {%- if meta.env == "prod" -%}
        <a href="/components/{{ element.slug }}/" aria-label="{{ element.title }}">
          <div class="preview-image" style="background-image: url(/components/{{ element.slug }}/docs/preview.png);"></div>
        </a>
        {%- else -%}
        <div class="preview-image" style="background-image: url(/components/{{ element.slug }}/docs/preview.png);"></div>
        <div class="overlay">
          <pfe-cta priority="secondary" variant="wind"><a href="/components/{{ element.slug }}/demo/">Demo</a></pfe-cta>
        </div>
        {%- endif -%}
      </div>
      <h3>
        <a href="/components/{{ element.slug }}/">{{ element.title }}</a>
      </h3>
      {% renderTemplate "njk,md", element=element %}{{ element.summary }}{% endrenderTemplate %}
      {%- if meta.env != "prod" -%}
      <pfe-cta><a href="/components/{{ element.slug }}/">Component overview</a></pfe-cta>
      {%- endif -%}
    </div>
  {%- endif -%}
  {%- endfor -%}
</div>

</pfe-band>
