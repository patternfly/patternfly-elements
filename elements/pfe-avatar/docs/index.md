---
layout: layout-basic.njk
title: Avatar
description: For displaying a user's avatar image
package: pfe-avatar
packages:
  - pfe-avatar
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <pfe-avatar name="Libbie Koscinski" shape="rounded" pattern="squares"></pfe-avatar>
{% endrenderOverview %}

{% band header="Usage" %}
  <div style="display: flex; gap: 1em;">
    <pfe-avatar name="Eleanore Stillwagon"></pfe-avatar>
    <pfe-avatar name="Libbie Koscinski" shape="rounded" pattern="squares"></pfe-avatar>
    <pfe-avatar name="Blanca Rohloff" pattern="triangles"></pfe-avatar>
    <pfe-avatar name="Edwardo Lindsey" src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></pfe-avatar>
  </div>

  ```html
  <pfe-avatar name="Eleanore Stillwagon"></pfe-avatar>
  <pfe-avatar name="Libbie Koscinski" shape="rounded" pattern="squares"></pfe-avatar>
  <pfe-avatar name="Blanca Rohloff" pattern="triangles"></pfe-avatar>
  <pfe-avatar name="Edwardo Lindsey" src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></pfe-avatar>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
