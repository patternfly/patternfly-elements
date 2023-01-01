---
layout: layout-basic.njk
title: Layout
package: pfe-styles
---

<style>
  .example > div {
    background-color: #f5f5f5;
    padding: 8px;
  }

  .pfe-l-bullseye.example {
    border: 1px solid #eee;
    height: 200px;
  }
</style>

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="Overview" %}
  PatternFly Elements Layouts, like Bootstrap, is based on a 12 column grid with similar breakpoints available. We also provide some helper classes that help with positioning and text alignment.
{% endband %}

{% band header="Installation" %}
  ```shell
  npm install @patternfly/{{ package }}
  ```
{% endband %}

{% band header="Usage" %}
  To get started, include a link to `pfe-layouts` in the `head` of the document.

  ```html
  <link rel="stylesheet" type="text/css" href="/path/to/pfe-layouts.min.css">
  ```
{% endband %}

{% band header="Grid" %}
  If you want a simple 3 column grid with gutters, use the following:

  ```html
  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </div>
  ```

  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col example">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </div>
{% endband %}

{% band header="Bootstrap-style columns" %}
  This method allows you to have control over the width and offset of your columns.

  ```html
  <div class="pfe-l-grid pfe-m-gutters">
    <div class="pfe-l-grid__item">Default Item</div>
    <div class="pfe-l-grid__item pfe-m-2-col"><code>pfe-m-2-col</code></div>
    <div class="pfe-l-grid__item pfe-m-10-col"><code>pfe-m-10-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
  </div>
  ```

  <div class="pfe-l-grid pfe-m-gutters example">
    <div class="pfe-l-grid__item">Default Item</div>
    <div class="pfe-l-grid__item pfe-m-2-col"><code>pfe-m-2-col</code></div>
    <div class="pfe-l-grid__item pfe-m-10-col"><code>pfe-m-10-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md</code></div>
    <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
  </div>
{% endband %}

{% band header="Grid layout classes and modifiers" %}{% endband %}

{% band level=3, header="Parent grid element classes" %}
| Class                               | Description                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `pfe-l-grid`                        | Base grid class _required_                                                                    |
| `pfe-l-grid-fill-height`            | Allows children elements to fill their container's height completely; equivalent of flex-grow |
| `pfe-m-gutters`                     | Adds gutters based on `--pfe-theme--container-spacer`                                         |
| `pfe-m-all-*[1-12]*-col`            | Sets width of children in grid to _[1-12]_ columns                                            |
| `pfe-m-all-*[1-12]*-col-on-[xs-xl]` | Sets width of children to _[1-12]_ columns on specified breakpoint _[xs-xl]_                  |
{% endband %}

{% band level=3, header="Child grid element classes" %}
| Class                                   | Description                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| `pfe-l-grid__item`                      | Base grid item class _optional_                                                |
| `pfe-m-*[1-12]*-col`                    | Sets width of this child to _[1-12]_ columns                                   |
| `pfe-m-*[1-12]*-col-on-[xs-xl]`         | Sets width of this child to _[1-12]_ columns on specified breakpoint _[xs-xl]_ |
| `pfe-m-startat-*[1-12]*-col`            | Start/indent this child to column #_[1-12]_                                    |
| `pfe-m-startat-*[1-12]*-col-on-[xs-xl]` | Start/indent this child to column #_[1-12]_ on specified breakpoint _[xs-xl]_  |

Example:

```html
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="pfe-m-startat-9-col">4 cols, indented</div>
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
```

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col example">
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="pfe-m-startat-9-col">4 cols, indented</div>
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
{% endband %}

{% band header="Breakpoints" %}
  ```css
  // Small devices
  @media (min-width: 576px) { ... }

  // Medium devices
  @media (min-width: 768px) { ... }

  // Large devices
  @media (min-width: 992px) { ... }

  // Extra large devices
  @media (min-width: 1200px) { ... }
  ```
{% endband %}

{% band header="Bullseye" %}
Use a bullseye layout when there is a single child element, and that child is centered both vertically and horizontally in the parent.

| Class            | Description                                     |
| ---------------- | ----------------------------------------------- |
| `pfe-l-bullseye` | Centers child element vertically & horizontally |

Example:

```html
<div class="pfe-l-bullseye">
  <div>Perfectly centered child</div>
</div>
```

<div class="pfe-l-bullseye example">
  <div>Perfectly centered child</div>
</div>
{% endband %}

{% band header="Text alignment" %}
Text alignment helper classes can also be applied to any block-level element.
| Class                       | Description          |
| --------------------------- | -------------------- |
| `pfe-l--text-align--left`   | Align text to left   |
| `pfe-l--text-align--center` | Align text to center |
| `pfe-l--text-align--right`  | Align text to right  |
{% endband %}

{% band level=3, header="Left aligned text" %}
  ```html
  <div class="pfe-l--text-align--left">
    <div>Left aligned text</div>
  </div>
  ```

  <div class="pfe-l--text-align--left example">
    <div>Left aligned text</div>
  </div>
{% endband %}

{% band level=3, header="Centered aligned text" %}
  ```html
  <div class="pfe-l--text-align--center">
    <div>Center aligned text</div>
  </div>

  <div class="pfe-l--text-align--center example">
    <div>Center aligned text</div>
  </div>
  ```
{% endband %}

{% band level=3, header="Right aligned text" %}
  ```html
  <div class="pfe-l--text-align--right">
    <div>Right aligned text</div>
  </div>
  ```

  <div class="pfe-l--text-align--right example">
    <div>Right aligned text</div>
  </div>
{% endband %}
