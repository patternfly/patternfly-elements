---
layout: layout-basic.njk
title: Health index
description: Shows a health grade
package: pfe-health-index
packages:
  - pfe-health-index
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
    <section style="display: grid">
      <h3>Default</h3>
      <pfe-health-index health-index="A">A</pfe-health-index>
      <pfe-health-index health-index="B">B</pfe-health-index>
      <pfe-health-index health-index="C">C</pfe-health-index>
      <pfe-health-index health-index="D">D</pfe-health-index>
      <pfe-health-index health-index="E">E</pfe-health-index>
      <pfe-health-index health-index="F">F</pfe-health-index>
    </section>
    <section>
      <h3>Mini</h3>
      <pfe-health-index health-index="A" size="mini">A</pfe-health-index>
      <pfe-health-index health-index="B" size="mini">B</pfe-health-index>
      <pfe-health-index health-index="C" size="mini">C</pfe-health-index>
      <pfe-health-index health-index="D" size="mini">D</pfe-health-index>
      <pfe-health-index health-index="E" size="mini">E</pfe-health-index>
      <pfe-health-index health-index="F" size="mini">F</pfe-health-index>
    </section>
    <section>
      <h3>Large</h3>
      <pfe-health-index health-index="A" size="lg">A</pfe-health-index>
      <pfe-health-index health-index="B" size="lg">B</pfe-health-index>
      <pfe-health-index health-index="C" size="lg">C</pfe-health-index>
      <pfe-health-index health-index="D" size="lg">D</pfe-health-index>
      <pfe-health-index health-index="E" size="lg">E</pfe-health-index>
      <pfe-health-index health-index="F" size="lg">F</pfe-health-index>
    </section>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  <pfe-health-index health-index="A">A</pfe-health-index>
  ```html
  <pfe-health-index health-index="A">A</pfe-health-index>
  ```

  ### Mini
  <pfe-health-index health-index="A" size="mini">A</pfe-health-index>
  ```html
  <pfe-health-index health-index="A" size="mini">A</pfe-health-index>
  ```

  ### Large
  <pfe-health-index health-index="A" size="lg">A</pfe-health-index>
  ```html
  <pfe-health-index health-index="A" size="lg">A</pfe-health-index>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
