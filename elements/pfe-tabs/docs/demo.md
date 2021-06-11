---
layout: layout-demo.html
title: Tabs history demo
package: pfe-tabs
---
<script type="module" src="/elements/{{ package }}/dist/{{ package }}.min.js"></script>
<main>

::: section header
# {{ title }}
:::

::: section
This tabs component has the `pfe-tab-history` attribute added to it which adds entries into the browser history for each tab open. Try changing the tab and then use the browser's back button. Also, try selecting a tab and then refresh the browser. The same tab you previously opened should be active.

<pfe-tabs id="my-tabs" pfe-tab-history>
  <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#">link</a> consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <a href="https://www.redhat.com">https://www.redhat.com</a>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab" id="tab3">Tab 3</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 3</h2>
    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </pfe-tab-panel>
</pfe-tabs>
:::

</main>