---
layout: layout-basic.njk
title: Button
description: Allows users to perform an action when triggered
package: pfe-button
packages:
  - pfe-button
tags:
  - component
---

<style>
.overview-buttons pfe-button {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>

{% renderOverview for=package, title=title %}
  <div class="overview-buttons">
    <pfe-button>
      <button>Primary</button>
    </pfe-button>
    <pfe-button variant="secondary">
      <button>Secondary</button>
    </pfe-button>
    <pfe-button variant="tertiary">
      <button>Tertiary</button>
    </pfe-button>
    <pfe-button variant="danger">
      <button>Danger</button>
    </pfe-button>
    <pfe-button variant="control">
      <button>Control</button>
    </pfe-button>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  When using this component, you must provide a standard HTML Button Element as the only light DOM child of `pfe-button`.

  <pfe-button>
    <button>My Button</button>
  </pfe-button>

  ```html
  <pfe-button>
    <button>My Button</button>
  </pfe-button>
  ```
{% endband %}

{% band header="Size", level=3 %}
  <pfe-button size="large">
    <button>Large Button</button>
  </pfe-button>
  <pfe-button size="medium">
    <button>Medium Button</button>
  </pfe-button>

  ```html
  <pfe-button size="large">
    <button>Large Button</button>
  </pfe-button>
  <pfe-button size="medium">
    <button>Medium Button</button>
  </pfe-button>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}
