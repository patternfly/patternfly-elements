---
layout: layout-basic.html
title: Button
description: Allows users to perform an action when triggered
package: pfe-button
packages:
  - pfe-button
tags:
  - component
---

<style>
.overview-buttons pfe-button {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>

::: section header
# Button
:::

::: section
## Overview 
Buttons allow users to perform an action when triggered. They feature a text label, a background or a border, and icons.

<div class="overview-buttons">
  <pfe-button>
    <button>Primary</button>
  </pfe-button>
  <pfe-button variant="secondary">
    <button>Secondary</button>
  </pfe-button>
  <pfe-button variant="tertiary">
    <button>Tertiary</button>
  </pfe-button>
  <pfe-button variant="danger">
    <button>Danger</button>
  </pfe-button>
  <pfe-button variant="control">
    <button>Control</button>
  </pfe-button>
</div>
:::

:::section
## Installation
```shell
npm install @patternfly/pfe-button
```
:::

::: section
## Usage
When using this component, you must provide a standard HTML Button Element as the only light DOM child of `pfe-button`.
```html
<pfe-button>
  <button>My Button</button>
</pfe-button>
```
:::

::: section
## Slots
None
:::

::: section
## Attributes
`disabled` (observed): Disables the button

`variant`: Changes the style of the button. Possible values are
- primary (default)
- secondary
- tertiary
- danger
- control
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-button:click
This event is fired when `<pfe-button>` is clicked and serves as a way to
capture click events if necessary.
:::

::: section
## Styling hooks
None
:::