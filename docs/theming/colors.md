---
layout: layout-basic.njk
title: Colors
tags:
  - theming
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="Color theory" %}
  We've created a palette of abstract color swatches for you to plug in your brand colors. The abstract naming conventions allow you to evolve your colors over time, without trapping your color choices in the code, such as `<pfe-card pfe-color="red">`.

  #### Swatches, per use case (layout and UI)

  - **Base**
      - Choose your most neutral color to go here. Note that some container components (i.e. band and card) will automatically use this color.
  - **Lightest** / **Darker** / **Darkest**
      - Ideally these swatches should build a spectrum of shades from the base color, but you may add more hue if desired. The general intent is that these swatches will be applied to container components, to visually group related content.
  - **Accent**
      - This should be the brightest and boldest color in your palette.
  - **Complement**
      - Choose a softer, secondary color which can also be used to draw attention or convey state change.
{% endband %}

{% band header="UI Colors" %}
  User interface colors are meant to provide basic colors for other page elements besides links and body text. The color is used to convey:

   - **Feedback**: Error and success states
   - **Information**: Charts, graphs, and wayfinding elements
   - **Hierarchy**: Showing structured order through color and typography

  We've exposed 2 UI color variants for the UI elements in the design system to represent your brand:

   - Base
   - Accent

  These colors are used throughout PatternFly Elements. **Accent** is the color which should stand out the most. For example, if your brand colors are orange and gray, we recommend you set orange as the accent color.  In doing this, that orange will now appear on primary level call-to-action buttons and other elements that need to have more weight in the visual hierarchy of the page.

  If you are overriding these colors, you can do so by setting the CSS variables to have new values in the stylesheet of your page or app. You'll want to override the color itself, but also the corresponding hover variant and text color (that would be used if there was text on top of this color, like a button):

  ```css
  :root {
    --pfe-color--ui-base:               #030070;
    --pfe-color--ui-base--hover:        #010047;
    --pfe-color--ui-base--text:         #ffffff;
    --pfe-color--ui-base--text--hover:  #eeeeee;
  }
  ```
{% endband %}

{% band header="Surface Colors" %}
  It's also a good idea to choose some neutral colors for general UI backgrounds and borders—usually grays. Surface color encompass any "surface" that are typically part of container-type elements, like cards or bands. These colors should be harmonious with your corporate style guide (if you have one), but they may not necessarily be your company’s primary brand colors.

  We've exposed 7 color variants for this design system to represent your brand:

  - Lightest
  - Base
  - Darker
  - Darkest
  - Complement
  - Accent
{% endband %}


