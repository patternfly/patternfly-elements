---
layout: layout-basic.html
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

::: section header
# {{ title }}
:::

::: section
## Overview
PatternFly Elements Layouts, like Bootstrap, is based on a 12 column grid with similar breakpoints available. We also provide some helper classes that help with positioning and text alignment.
:::

::: section
## Installation
```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage
To get started, include a link to `pfe-layouts` in the `head` of the document.

```html
<link rel="stylesheet" type="text/css" href="/path/to/pfe-layouts.min.css">
```
:::

::: section
## Grid

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
<br>
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col example">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
:::

::: section
## Bootstrap-style columns
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
<br>
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
:::

::: section
## Grid layout classes and modifiers
### Parent grid element classes

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid` | Base grid class *required* |
| `pfe-l-grid-fill-height` | Allows children elements to fill their container's height completely; equivalent of flex-grow |
| `pfe-m-gutters` | Adds gutters based on `--pfe-theme--container-spacer` |
| `pfe-m-all-*[1-12]*-col` | Sets width of children in grid to *[1-12]* columns |
| `pfe-m-all-*[1-12]*-col-on-[xs-xl]` | Sets width of children to *[1-12]* columns on specified breakpoint *[xs-xl]* |

### Child grid element classes

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid__item` | Base grid item class *optional* |
| `pfe-m-*[1-12]*-col` | Sets width of this child to *[1-12]* columns |
| `pfe-m-*[1-12]*-col-on-[xs-xl]` | Sets width of this child to *[1-12]* columns on specified breakpoint *[xs-xl]* |
| `pfe-m-startat-*[1-12]*-col` | Start/indent this child to column #*[1-12]* |
| `pfe-m-startat-*[1-12]*-col-on-[xs-xl]` | Start/indent this child to column #*[1-12]* on specified breakpoint *[xs-xl]* |

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
<br>
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col example">
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="pfe-m-startat-9-col">4 cols, indented</div>
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
:::

::: section
## Breakpoints

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
:::

::: section
## Bullseye
Use a bullseye layout when there is a single child element, and that child is centered both vertically and horizontally in the parent.

| Class | Description |
| -------------- | ----------- |
| `pfe-l-bullseye` | Centers child element vertically &amp; horizontally |

Exampe:

```html
<div class="pfe-l-bullseye">
  <div>Perfectly centered child</div>
</div>
```
<br>
<div class="pfe-l-bullseye example">
  <div>Perfectly centered child</div>
</div>
:::

:::section
## Text alignment

Text alignment helper classes can also be applied to any block-level element.

| Class | Description |
| -------------- | ----------- |
| `pfe-l--text-align--left` | Align text to left |
| `pfe-l--text-align--center` | Align text to center |
| `pfe-l--text-align--right` | Align text to right |

### Left aligned text
```html
<div class="pfe-l--text-align--left">
  <div>Left aligned text</div>
</div>
```
<br>
<div class="pfe-l--text-align--left example">
  <div>Left aligned text</div>
</div>

### Centered aligned text
```html
<div class="pfe-l--text-align--center">
  <div>Center aligned text</div>
</div>
```
<br>
<div class="pfe-l--text-align--center example">
  <div>Center aligned text</div>
</div>

### Right aligned text
```html
<div class="pfe-l--text-align--right">
  <div>Right aligned text</div>
</div>
```
<br>
<div class="pfe-l--text-align--right example">
  <div>Right aligned text</div>
</div>
:::
