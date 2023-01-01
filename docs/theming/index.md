---
layout: layout-basic.njk
title: Theming
---

<header class="band">
  <h1>{{ title }}</h1>
  <p class="tagline">Use our beautifully designed theme, or modify it to your needs.</p>
</header>

{% band header="Overview" %}
  Every PatternFly Element is built to automatically utilize the colors, fonts, spacing, and more defined in the [palette](/theming/palette), which you control! Generally speaking, the only thing you will need to do is re-define some of the CSS variables to match your brand and you’re done.

  For this purpose, we've created a palette of CSS custom properties for you to override with your preferences on typography, color, spacing and more. Many of the components have basic theming options such as `type` or `variant` which will utilize these colors in some way. But beyond that, you may also apply a `color` attribute if you choose to add further customizations to individual components.

  [Learn more about color theory](/theming/colors/#color-theory)
{% endband %}

{% band header="Context" %}
  In addition, each "content" component comes equipped to adjust its colors depending on where its placed on the page. For example, should you need to put a default call-to-action link (which is a blue) on a dark blue card, the color of the text will need to adapt. This happens via a behind-the-scenes custom property and attribute combo, which inform the component of the current context (on a saturated background) by giving the on attribute the value of saturated.

  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-card class="pfe-l-grid__item pfe-m-3-col pfe-m-6-col" color-palette="complement">
      <a class="cta" href="#">Default</a>
    </pfe-card>
  </div>

  ```html
  <pfe-card color-palette="complement">
    <a class="cta" href="#">Default</a>
  </pfe-card>
  ```
  [Learn more about color context](/theming/colors/#contextually-aware-content)
{% endband %}

{% band header="Typography classes" %}
  Coming soon.
{% endband %}
