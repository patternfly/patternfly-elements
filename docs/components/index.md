---
layout: layout-basic.html
title: All components
---

::: section header
# Components
:::

::: section
## Overview
Components are interactive building blocks of our design system. Each component was created to meet a specific UI and accessibility need. Components should be used harmoniously together in the same space to create more intuitive user experiences.
:::

::: section
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col">
  {%- for component in collections.component -%}
  <div>
    <div class="component-preview">
      <a href="{{ component.url }}" aria-label="{{ component.data.title }}">
        <div class="preview-image" style="background-image: url({{ component.url }}/preview.png);"></div>
      </a>
      <h3>
        <a href="{{ component.url }}">{{ component.data.title }}</a>
      </h3>
      <p>{{ component.data.description }}</p>
    </div>
  </div>
  {%- endfor -%}
</div>
:::