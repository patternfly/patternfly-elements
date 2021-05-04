---
layout: layout-basic.html
title: Framework integration
---

<script type="module" src="/elements/pfe-card/dist/pfe-card.min.js"></script>
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <pfe-card color="lightest" border>
    <h3 class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-react-app-fe079be262ed">Using
        PatternFly Elements in your React App</a>
    </h3>
    <p>To get web components to work with React it’s pretty easy and straightforward. If you’d like to follow
      along, go ahead and...</p>
    <pfe-cta slot="pfe-card--footer">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-react-app-fe079be262ed">Read
        on Medium</a>
    </pfe-cta>
  </pfe-card>
  <pfe-card color="lightest" border>
    <h3 class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-vue-app-340fc9a9d7e5">Using
        PatternFly Elements in your Vue App</a>
    </h3>
    <p>To get web components to work with Vue, it’s pretty easy and straightforward. If you’d like to follow
      along, go ahead and...</p>
    <pfe-cta slot="pfe-card--footer">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-vue-app-340fc9a9d7e5">Read
        on Medium</a>
    </pfe-cta>
  </pfe-card>
  <pfe-card color="lightest" border>
    <h3 class="push-bottom">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363">Using
        PatternFly Elements in your Angular App</a>
    </h3>
    <p>To get web components to work with Angular, there are a few steps that we need to take. If you’d like to
      follow along, go ahead and...</p>
    <pfe-cta slot="pfe-card--footer">
      <a href="https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363">Read
        on Medium</a>
    </pfe-cta>
  </pfe-card>
</div>
:::