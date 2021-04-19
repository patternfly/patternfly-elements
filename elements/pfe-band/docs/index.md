---
layout: layout-basic.html
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

::: section header
# {{ title }}
:::

::: section
## Overview

Band is a container component that provides a set of slots in which to render banded content.
:::

<div class="faux-band">
  <pfe-band>
    <h2 slot="pfe-band--header">Header Slot</h2>
    <p>This content is in the main slot. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>
    <pfe-card slot="pfe-band--aside" color="lightest">
      <h3 slot="pfe-card--header">Aside slot</h3>
      <p>Content for a card that is in the aside slot.</p>
    </pfe-card>
    <div slot="pfe-band--footer">
      <p>This is the footer slot.</p>
      <pfe-cta>
        <a href="#">Learn more</a>
      </pfe-cta>
    </div>
  </pfe-band>
</div>

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

```html
<pfe-band>
  <h2 slot="pfe-band--header">Header Slot</h2>
  <p>This content is in the main slot. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>
  <pfe-card slot="pfe-band--aside" color="lightest">
    <h3 slot="pfe-card--header">Aside slot</h3>
    <p>Content for a card that is in the aside slot.</p>
  </pfe-card>
  <div slot="pfe-band--footer">
    <p>This is the footer slot.</p>
    <pfe-cta>
      <a href="#">Learn more</a>
    </pfe-cta>
  </div>
</pfe-band>
```
:::

::: section
## Slots

All slots other than `pfe-band--body` are optional.  If the slot is not defined, the container tag for it will not be rendered in the template.

### pfe-band--header
This slot renders at the top of the container and generally contains the title, headline, and/or subheadline content.  Other possible candidates include a set of social sharing links or tags that describe the content below. The template is automatically wrapping this slot in a `header` tag.  Recommend using h-level or p tags inside this slot.

### Default slot
This unnamed slot should contain the bulk of the content in this element. The template is automatically wrapping all content within an `article` tag.

### pfe-band--footer
This slot is typically used for calls-to-action or footnotes and is pushed to the bottom of the container.  Recommended tags include `pfe-cta`.The template is automatically wrapping this slot in a `footer` tag.

### pfe-band--aside
This slot is for content that should be rendered to the right or left of the default slot on desktop.  Asides often contain `pfe-card` or interest forms which provide users a little more information or context for the band. The template is automatically wrapping this slot in an `aside` tag.
:::

::: section
## Attributes

### color
Options include darkest, darker, accent, complement, lighter, lightest.  The band has a default value of `#dfdfdf`. Your theme will influence these colors so check there first if you are seeing inconsistencies.

### img-src
Optional background image applied to the entire band container.  Alignment of this image can be managed using the `--pfe-band--BackgroundPosition` variable which is set to `center center` by default.

### size
Optionally adjusts the padding on the container.  Accepts: `small`.

## Aside settings
The aside settings have defaults and if no attribute is defined on the element's main tag, these attributes will be injected with their default values automatically.

### aside-desktop
This influences where the aside is rendered at the desktop view and are indicated relative to the body content. Options are `right` or `left`. **Right is the default.**

### aside-mobile
This influences the position of the aside in the mobile view as well as where in the DOM the aside markup is rendered. These names are relative to the body content. Options are `top` or `bottom`. **Bottom is the default.**

### aside-height
This influences the height of the aside region relative to the body content. Options are `full` or `body`. A `full` height starts at the top of the band and spans the header, body, and footer regions. A `body` height spans the body and footer regions only with the header region sitting above it in the rendered view. **Body is the default.**
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
  - `--pfe-band--layout`: Applied to `.pfe-band__container`
  - `--pfe-band_header--layout`: Applied to `.pfe-band__header`
  - `--pfe-band_body--layout`: Applied to `.pfe-band__body`
  - `--pfe-band_footer--layout`: Applied to `.pfe-band__footer`
  - `--pfe-band_aside--layout`: Applied to `.pfe-band__aside`
:::