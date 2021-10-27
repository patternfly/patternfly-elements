---
layout: layout-basic.njk
title: Card
description: Gives a preview of information in a small layout
package: pfe-card
packages:
  - pfe-card
  - pfe-cta
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md">
    <pfe-card>
      <h3 slot="header">Default card</h3>
      <p>This is the default card</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
    <pfe-card color="lightest" border>
      <h3 slot="header">Lightest card</h3>
      <p>This is the lightest card with a border</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
    <pfe-card color="darker">
      <h3 slot="header">Darker card</h3>
      <p>This is the darker card</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
    <pfe-card color="darkest">
      <h3 slot="header">Darkest card</h3>
      <p>This is the darkest card</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
    <pfe-card color="complement">
      <h3 slot="header">Complement card</h3>
      <p>This is the complement card</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
    <pfe-card color="accent">
      <h3 slot="header">Accent card</h3>
      <p>This is the accent card</p>
      <div slot="footer">
        <pfe-cta>
          <a href="#">Link in the footer</a>
        </pfe-cta>
      </div>
    </pfe-card>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-card>
    <h2 slot="header">Card header</h2>
    <p>This is the pfe-card body.</p>
    <div slot="footer">
      <p>This is the footer</p>
    </div>
  </pfe-card>
  ```
{% endband %}

{% renderSlots for=package %}
  All slots are optional. If the slot is not defined, the content will be added to the `body` region of the card.
{% endrenderSlots %}

{% renderAttributes for=package %}
  There are several attributes available for customizing the visual treatment of this container.

  ### Child Attributes

  #### `overflow`
  Optionally allows an image or element to overflow the padding on the container. This property should be added to the direct child of the slotm such as on an image tag; should be added to the element that you want to overflow the container. Accepts: `top`, `right`, `bottom`, `left`.

  -----
{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}
  There are several powerful variables available to hook into and override default styles.

  ### Background color
  Though using the `color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable.  If you update this value manually, you should also update the `--theme` context variable to invoke the right theme on it and it's child elements.  Supported themes include: `light`, `dark`, and `saturated`.

  ### Background position
  This is designed for use with the `img-src` attribute to allow you to align your background image.  Default value is `center center`.

  **Variable name:** `--pfe-card--BackgroundPosition`.

  ### Border
  This allows the customization of a border around the entire container.  There is a variable for the entire border shorthand (transparent by default) or you can hook into the individual properties.
  **Variable name:** `--pfe-card--BorderRadius` and `--pfe-card--Border` or `--pfe-card--BorderWeight`, `--pfe-card--BorderStyle`, `--pfe-card--BorderColor`.

  ### Padding
  You can customize the padding around the outside of the card container by connecting to either the shortcut padding variable or just one or more of the individual padding regions.
  **Variable names:** `--pfe-card--Padding` or `--pfe-card--PaddingTop`, `--pfe-card--PaddingRight`, `--pfe-card--PaddingBottom`, `--pfe-card--PaddingLeft`.
{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
