---
layout: layout-basic.njk
title: Band
description: Provides a set of slots in which to render banded content
package: pfe-band
packages:
  - pfe-band
  - pfe-card
  - pfe-cta
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <div class="faux-band">
    <pfe-band>
      <h2 slot="header" class="no-header-styles">Header Slot</h2>
      <p>This content is in the main slot. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>
      <pfe-card slot="aside" color="lightest">
        <h3 slot="header" class="no-header-styles">Aside slot</h3>
        <p>Content for a card that is in the aside slot.</p>
      </pfe-card>
      <div slot="footer">
        <p>This is the footer slot.</p>
        <pfe-cta>
          <a href="#">Learn more</a>
        </pfe-cta>
      </div>
    </pfe-band>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-band>
    <h2 slot="header">Header Slot</h2>
    <p>This content is in the main slot. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>
    <pfe-card slot="aside" color="lightest">
      <h3 slot="header">Aside slot</h3>
      <p>Content for a card that is in the aside slot.</p>
    </pfe-card>
    <div slot="footer">
      <p>This is the footer slot.</p>
      <pfe-cta>
        <a href="#">Learn more</a>
      </pfe-cta>
    </div>
  </pfe-band>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}
  ### Vertical and horizontal padding
  `--pfe-band--Padding--vertical` and `--pfe-band--Padding--horizontal` accept size values such as px, em, rem, etc.

  ### Background color
  Though using the `color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable.  If you update this value manually, you should also update the `--theme` context variable to invoke the right theme on it and it's child elements.  Supported themes include: `light`, `dark`, and `saturated`.

  ### Background position
  This is designed for use with the `img-src` attribute to allow you to align your background image.  Default value is `center center`.

  ### Border
  This allows the customization of a border around the entire container and is primarily designed to be used to add a top and/or bottom border line.  This variable accepts the entire border shorthand and is set to transparent by default.

  ### Layout
  The band has a rudimentary layout system designed to be used inside the slot regions for the header, body, footer, and aside.  It uses the CSS grid spec and creates a stacked layout by default.  By updating these values, you will be able to create simple grid layouts.  Please note that these do not include fallbacks for older browsers.

  Possible values include: `1fr 1fr`, `repeat(3, 1fr)`, `repeat(auto-fill, minmax(300px, 1fr))`
{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
