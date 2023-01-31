---
layout: layout-basic.njk
title: Framework integration
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band %}
  <pf-card color-palette="lightest" border>
    <h3 slot="header" class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-react-app-fe079be262ed">Using
        PatternFly Elements in your React App</a>
    </h3>
    <p>To get web components to work with React it’s pretty easy and straightforward. If you’d like to follow
      along, go ahead and...</p>
    <a class="cta" slot="footer" href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-react-app-fe079be262ed">Read on Medium</a>
  </pf-card>
  <pf-card color-palette="lightest" border>
    <h3 slot="header" class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-vue-app-340fc9a9d7e5">Using
        PatternFly Elements in your Vue App</a>
    </h3>
    <p>To get web components to work with Vue, it’s pretty easy and straightforward. If you’d like to follow
      along, go ahead and...</p>
    <a class="cta" slot="footer" href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-vue-app-340fc9a9d7e5">Read on Medium</a>
  </pf-card>
  <pf-card color-palette="lightest" border>
    <h3 slot="header" class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363">Using
        PatternFly Elements in your Angular App</a>
    </h3>
    <p>To get web components to work with Angular, there are a few steps that we need to take. If you’d like to
      follow along, go ahead and...</p>
    <a class="cta" slot="footer" href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363">Read on Medium</a>
  </pf-card>
{% endband %}

<style>
  section.band {
    display: grid;
    gap: 1rem;
    grid-template-columns:repeat(12,[col-start] 1fr);
  }
</style>
