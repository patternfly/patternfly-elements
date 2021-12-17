---
layout: layout-basic.njk
title: Progress indicator
description: Indicates that the user is waiting on a process
package: pfe-progress-indicator
packages:
  - pfe-progress-indicator
tags:
  - component
---

<style>
.overview-demo pfe-progress-indicator {
  margin-right: 8px;
}
</style>

{% renderOverview for=package, title=title %}
  <div class="overview-demo">
    <pfe-progress-indicator indeterminate size="sm">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
    <pfe-progress-indicator indeterminate size="md">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
    <pfe-progress-indicator indeterminate size="xl">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-progress-indicator indeterminate>
    <h1>My fallback loading message</h1>
  </pfe-progress-indicator>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
