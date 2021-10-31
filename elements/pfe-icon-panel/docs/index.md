---
layout: layout-basic.njk
title: Icon panel
description: Provides a way to present text with an accompanying icon
package: pfe-icon-panel
packages:
  - pfe-icon-panel
  - pfe-cta
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <pfe-icon-panel icon="rh-server-stack">
    <h3 slot="header">This is icon panel</h3>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    <pfe-cta slot="footer">
      <a href="https://pfelements.github.io">Learn more about PFElements</a>
    </pfe-cta>
  </pfe-icon-panel>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-icon-panel icon="pfe-icon-server">
    <h3 slot="header">This is pfe-icon-panel</h3>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    <pfe-cta slot="footer">
      <a href="https://pfelements.github.io">Learn more about PFElements</a>
    </pfe-cta>
  </pfe-icon-panel>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
