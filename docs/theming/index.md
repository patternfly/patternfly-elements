---
layout: layout-basic.html
title: Theming
---

<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>
<script type="module" src="/elements/pfe-card/dist/pfe-card.min.js"></script>

::: section header
# {{ title }}
<p class="tagline">Use our beautifully designed theme, or modify it to your needs.</p>
:::

::: section
## Overview
Every PatternFly Element is built to automatically utilize the colors, fonts, spacing, and more defined in the [palette](/theming/palette), which you control! Generally speaking, the only thing you will need to do is re-define some of the CSS variables to match your brand and you’re done.

For this purpose, we've created a palette of CSS custom properties for you to override with your preferences on typography, color, spacing and more. Many of the components have basic theming options such as `type` or `variant` which will utilize these colors in some way. But beyond that, you may also apply a `color` attribute if you choose to add further customizations to individual components. 

[Learn more about color theory](/theming/colors/#color-theory)


## Context

In addition, each "content" component comes equipped to adjust its colors depending on where its placed on the page. For example, should you need to put a default call-to-action link (which is a blue) on a dark blue card, the color of the text will need to adapt. This happens via a behind-the-scenes custom property and attribute combo, which inform the component of the current context (on a saturated background) by giving the on attribute the value of saturated.

<div class="pfe-l-grid pfe-m-gutters">
  <pfe-card class="pfe-l-grid__item pfe-m-3-col pfe-m-6-col" color="complement">
    <pfe-cta>
      <a href="#">Default</a>
    </pfe-cta>
  </pfe-card>
</div>

```html
<pfe-card color="complement">
  <pfe-cta>
    <a href="#">Default</a>
  </pfe-cta>
</pfe-card>
```
[Learn more about color context](/theming/colors/#contextually-aware-content)

## Combining attributes

Should you have custom theming needs for a particular use case, you may set individual CTAs to both a priority level to change the style and also apply a particular color from the palette. For example, you can pass a value of `complement` into the `color` attribute like this:

<pfe-cta priority="primary" color="complement">
  <a href="#">Primary</a>
</pfe-cta>

```html
<pfe-cta priority="primary" color="complement">
  <a href="#">Primary</a>
</pfe-cta>
```

Please note that if you are opting to override colors of components, they will not automatically respond to the theme context.


## Typography classes

Coming soon.

:::
