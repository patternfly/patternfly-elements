---
layout: layout-basic.html
title: Primary detail
description: A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item.
package: pfe-primary-detail
tags:
  - component
---
<script type="module" src="/elements/{{ package }}/dist/{{ package }}.min.js"></script>
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
## Overview
A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item. This component is an implementation of one of the "Primary detail simple list in card" from [Patternfly React](https://www.patternfly.org/v4/demos/primary-detail).

<br><br><br><br>

<pfe-primary-detail>
  <h3 slot="details-nav">Section 1: Infrastructure and Management</h3>
  <div slot="details">
    <p>Content 1:</p>
    <ul>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Section 2: Cloud Computing</h3>
  <div slot="details">
    <ul>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Storage</h3>
  <ul slot="details">
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <h3 slot="details-nav">Runtimes</h3>
  <ul slot="details">
    <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
    <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
  </div>
<pfe-primary-detail>
:::

::: section
## Installation
```shell
npm install @patternfly/pfe-primary-detail
```
:::

::: section
## Usage

### Default
<pfe-primary-detail>
  <h2 slot="details-nav--header">
    <a href="#">Header</a>
  </h2>

  <h3 slot="details-nav">Section 1: Infrastructure and Management</h3>
  <div slot="details">
    <p>Content 1:</p>
    <ul>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Section 2: Cloud Computing</h3>
  <div slot="details">
    <ul>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Storage</h3>
  <ul slot="details">
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <h3 slot="details-nav">Runtimes</h3>
  <ul slot="details">
    <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
    <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
  </div>
<pfe-primary-detail>

```html
<pfe-primary-detail>
  <h2 slot="details-nav--header">
    <a href="#">Primary detail demo!</a>
  </h2>

  <h3 slot="details-nav">Section 1: Infrastructure and Management</h3>
  <div slot="details">
    <p>Content 1:</p>
    <ul>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Section 2: Cloud Computing</h3>
  <div slot="details">
    <ul>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Storage</h3>
  <ul slot="details">
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <h3 slot="details-nav">Runtimes</h3>
  <ul slot="details">
    <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
    <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
  </div>
<pfe-primary-detail>
```
:::

::: section
## Slots
For this component to work, there should be an equal number of `details-nav` and `details` slotted elements.

### details-nav
Should be added to each heading, it will build the nav that shows the related content.

### details
Should be added to the content, which should directly follow the heading it relates to.

### details-nav--header
In case content needs to be added at the top of the nav area. Will not be matched up with `details` content.

### details-nav--footer
In case contnet needs to be added at the bottom of the nav. Will not be matched up with `details` content.
:::

::: section
## Attributes

### consistent-height
Makes sure the primary details element doesn't change height when a different `details` item is shown.
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-primary-detail:shown-tab

Fires when a new tab is selected.

```javascript
detail: {
  tab: DOM Element,
  details: DOM Element
}
```

### pfe-primary-detail:hidden-tab

Fires when a selected tab is no longer the selected tab.

```javascript
detail: {
  tab: DOM Element,
  details: DOM Element
}
```
:::

::: section
## Styling hooks
| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-primary-details--Border` | `1px solid #d2d2d2` | N/A |
| `--pfe-primary-details--GridTemplateColumns` | `1fr 2fr` | N/A |
| `--pfe-primary-details__nav--Color` | `#151515!important` | nav |
| `--pfe-primary-details__nav--Color--active` | `#06c!important` | nav |
| `--pfe-primary-details__nav--Background--active` | `#f0f0f0!important` | nav |
| `--pfe-primary-details__details--Background` | `#fff` | details |
:::