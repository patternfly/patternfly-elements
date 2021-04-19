---
layout: layout-basic.html
title: Card
description: Gives a preview of information in a small layout
package: pfe-card
packages:
  - pfe-card
  - pfe-cta
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Cards are flexible surfaces used to group information in a small layout. They give small previews of information or provide secondary content in relation to the content it's near. Several cards can be used together to group related information.

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md">
  <pfe-card>
    <h3 slot="pfe-card--header">Default card</h3>
    <p>This is the default card</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
  <pfe-card color="lightest" border>
    <h3 slot="pfe-card--header">Lightest card</h3>
    <p>This is the lightest card with a border</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
  <pfe-card color="darker">
    <h3 slot="pfe-card--header">Darker card</h3>
    <p>This is the darker card</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
  <pfe-card color="darkest">
    <h3 slot="pfe-card--header">Darkest card</h3>
    <p>This is the darkest card</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
  <pfe-card color="complement">
    <h3 slot="pfe-card--header">Complement card</h3>
    <p>This is the complement card</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
  <pfe-card color="accent">
    <h3 slot="pfe-card--header">Accent card</h3>
    <p>This is the accent card</p>
    <div slot="pfe-card--footer">
      <pfe-cta>
        <a href="#">Link in the footer</a>
      </pfe-cta>
    </div>
  </pfe-card>
</div>
:::

::: section
## Installation
```shell
npm install @patternfly/pfe-card
```
:::

::: section
## Usage
```html
<pfe-card>
  <h2 slot="pfe-card--header">Card header</h2>
  <p>This is the pfe-card body.</p>
  <div slot="pfe-card--footer">
    <p>This is the footer</p>
  </div>
</pfe-card>
```
:::

::: section
## Slots
All slots are optional. If the slot is not defined, the content will be added to the `body` region of the card.

### Header
If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6). An icon, svg, or use of the icon component are also valid in this region.

### Default slot (body)
Any content that is not designated for the `header` or `footer` slot, will go to this slot.

### Footer
Use this slot for anything that you want to be stuck to the base of the card. This region is bottom-aligned.
:::

::: section
## Attributes
There are several attributes available for customizing the visual treatment of this container.
### color
Options include darkest, darker, accent, complement, lighter, lightest.  The card has a default value of `#dfdfdf`. Your theme will influence these colors so check there first if you are seeing inconsistencies.

| color | hex |
|-------|-----|
| lightest | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
| lighter | <span class="color-preview" style="--bg:#ececec"></span> #ececec |
| default | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf |
| darker | <span class="color-preview" style="--bg:#464646"></span> #464646 |
| darkest | <span class="color-preview" style="--bg:#131313"></span> #131313 |
| accent | <span class="color-preview" style="--bg:#ee0000"></span> #ee0000 |
| complement | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 |

### img-src
Optional background image applied to the entire card container.  Alignment of this image can be managed using the `--pfe-card--BackgroundPosition` variable which is set to `center center` by default.

### size
Optionally adjusts the padding on the container.  Accepts: `small`.

### overflow
Optionally allows an image or element to overflow the padding on the container. This property should be added to the direct child of the slotm such as on an image tag; should be added to the element that you want to overflow the container. Accepts: `top`, `right`, `bottom`, `left`.

### border
Optionally apply a border color and weight to the entire card container. The default color and weight is `#d2d2d2` and `1px`, respectively.
:::

::: section
## Methods
None
:::

::: section
## Events
None
:::

::: section
## Styling hooks
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
:::