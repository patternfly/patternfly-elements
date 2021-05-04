---
layout: layout-basic.html
title: Collapse
description: Hide and show content
package: pfe-collapse
packages:
  - pfe-collapse
  - pfe-cta
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Collapse is used to hide and show content.

<pfe-collapse>
  <pfe-collapse-toggle>
    <pfe-cta priority="primary">
      <button>Toggle</button>
    </pfe-cta>
  </pfe-collapse-toggle>
  <pfe-collapse-panel>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </pfe-collapse-panel>
</pfe-collapse>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

`pfe-collapse` automatically wires up the toggle and panel so when the `pfe-collapse-toggle` is toggled, it will either open or close the `pfe-collapse-panel`.

```html
<pfe-collapse>
  <pfe-collapse-toggle>
    This is the toggle
  </pfe-collapse-toggle>
  <pfe-collapse-panel>
    This is the panel
  </pfe-collapse-panel>
</pfe-collapse>
```

### Collapse with a preset ID

```html
<pfe-collapse>
  <pfe-collapse-toggle aria-controls="panel1">
    <h3>Collapse Toggle with preset ID</h3>
  </pfe-collapse-toggle>
  <pfe-collapse-panel id="panel1">
    <p>Panel content</p>
  </pfe-collapse-panel>
</pfe-collapse>
```

### Standalone toggle and panel (not wrapped in a pfe-collapse)

The toggle needs an `aria-controls` attribute that links to the `id` of the
panel.

```html
<pfe-collapse-toggle aria-controls="panel">
  Toggle the Standalone Panel
</pfe-collapse-toggle>
<p>Other content:</p>
<pfe-collapse-panel id="panel">
  <p>Panel content</p>
</pfe-collapse-panel>
```

### Standalone panel

A standalone panel can be opened by any action or event that toggles the
`expanded` property on the panel.

```html
<button>Toggle Panel</button>

<pfe-collapse-panel id="standalone-panel">
  <p>Panel content</p>
</pfe-collapse-panel>

<script>
  var collapse = document.querySelector("#standalone-panel");

  document.querySelector("button").addEventListener("click", function() {
    collapse.expanded = !collapse.expanded;
  });
</script>
```
:::

::: section
## Slots

### Default slot in pfe-collapse

Place the `pfe-collapse-toggle` and `pfe-collapse-panel` elements here.

### Default slot in pfe-collapse-toggle

Add the toggle content here.

### Default slot in pfe-collapse-panel

Add the collapse panel content here.
:::

::: section
## Attributes
### animation (observed)

Can turn the animation of the panel expanding and collapsing either on or off.
Animation of the panel defaults to true. Adding `animation` to the
`pfe-collapse` tag will copy the `animation` attribute to the
`pfe-collapse-panel`.

```html
<pfe-collasible animation="false">
  ...
</pfe-collapse>
```

`animation` can also be added to a `pfe-collasible-panel`.

```html
<pfe-collasible-panel animation="false">
  ...
</pfe-collapse-panel>
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-collapse:change

Fired when `pfe-collasible` is either expanded or collapsed.

```javascript
detail: {
  expanded: Boolean,
  toggle: DOM Element,
  panel: DOM Element
}
```

### pfe-collapse-panel:animation-start

Fired when `pfe-collapse-panel` begins animating the expansion or collapse
of the panel.

```javascript
detail: {
  state: String ("opening", "closing"),
  panel: DOM Element
}
```

### pfe-collapse-panel:animation-end

Fired when `pfe-collapse-panel` ends animating the expansion or collapse
of the panel.

```javascript
detail: {
  expanded: Boolean,
  panel: DOM Element
}
```
:::

::: section
## Styling hooks
None
:::