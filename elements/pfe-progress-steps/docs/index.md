---
layout: layout-basic.njk
title: Progress steps
description: Guides a user through a task with multiple sequential steps
package: pfe-progress-steps
packages:
  - pfe-progress-steps
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}
{% renderSlots for="pfe-progress-steps-item", level=3, header="Slots on `pfe-progress-steps-item`" %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}
{% renderAttributes for="pfe-progress-steps-item", level=3, header="Attributes on `pfe-progress-steps-item`" %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pfe-progress-steps-item", level=3, header="CSS Properties on `pfe-progress-steps-item`" %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
{% renderCssParts for="pfe-progress-steps-item", level=3, header="Parts on `pfe-progress-steps-item`" %}{% endrenderCssParts %}
