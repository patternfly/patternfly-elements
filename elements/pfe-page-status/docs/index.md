---
layout: layout-basic.njk
title: Page status
description: Creates a flag/banner on the right side of the page
package: pfe-page-status
packages:
  - pfe-page-status
  - pfe-cta
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <img src="page-status-demo.png" style="max-width: 100%" alt=""/>

  <pfe-cta>
    <a href="demo">View the demo</a>
  </pfe-cta>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-page-status status="critical">
    Previewing
  </pfe-page-status>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
