---
layout: layout-basic.njk
title: All components
permalink: /components/index.html
---
<header class="band">
  <hgroup>
    <h1>Components</h1>
    <h2>Overview</h2>
  </hgroup>
  <p>
    Components are interactive building blocks of our design system.
    Each component was created to meet a specific UI and accessibility need.
    Components should be used harmoniously together in the same space to create more intuitive user experiences.
  </p>
</header>

<section class="band">
  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col">
  {%- for element in elements -%}
  {%- if element.docsTemplatePath -%}
    <div class="component-preview">
      <div class="component-preview--container">
        {%- if env.ELEVENTY_ENV == "prod" -%}
        <a href="{{ ('/components/'+ element.slug +'/') | url }}" aria-label="{{ element.title }}">
          <div class="preview-image" style="background-image: url({{ ('/components/'+ element.slug +'/docs/preview.png') | url }});"></div>
        </a>
        {%- else -%}
        <div class="preview-image" style="background-image: url({{ ('/components/'+ element.slug +'/docs/preview.png') | url }});"></div>
        <div class="overlay">
          <a class="cta secondary wind" href="{{ ('/components/'+ element.slug +'/demo/') | url }}">Demo</a>
        </div>
        {%- endif -%}
      </div>
      <h3>
        <a href="{{ ('/components/'+ element.slug +'/') | url }}">{{ element.title }}</a>
      </h3>
      {% renderTemplate "njk,md", element=element %}{{ element.summary }}{% endrenderTemplate %}
      {%- if env.ELEVENTY_ENV != "prod" -%}
      <a class="cta" href="{{ ('/components/'+ element.slug +'/') | url }}">Component overview</a>
      {%- endif -%}
    </div>
  {%- endif -%}
  {%- endfor -%}
  </div>
</section>
