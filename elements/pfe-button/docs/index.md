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

<pfe-button>
  <button>My Button</button>
</pfe-button>

```html
<pfe-button>
  <button>My Button</button>
</pfe-button>
```
:::

::: section

### Size

<pfe-button size="large">
  <button>Large Button</button>
</pfe-button>

```html
<pfe-button size="large">
  <button>Large Button</button>
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

`size`: Changes the size of the button.
- medium (default)
- large
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

| Theme hook | Default value | Region |
| --- | --- | --- |
| `--pfe-button--BackgroundColor` | var(--pfe-theme--color--ui-accent, #06c) | N/A |
| `--pfe-button--Color` | var(--pfe-theme--color--ui-base--text, #fff) | N/A |
| `--pfe-button--FontSize` | var(--pf-global--FontSize--md, 1rem) | N/A |
| `--pfe-button--FontWeight` | var(--pfe-theme--font-weight--normal, 400) | N/A |
| `--pfe-button--Padding` | calc(var(--pfe-theme--container-padding, 1rem) / 2) var(--pfe-theme--container-padding, 1rem) | N/A |
| `--pfe-button--BorderRadius` | var(--pfe-theme--surface--border-radius, 3px) | N/A |
| `--pfe-button--LineHeight` | var(--pfe-theme--line-height, 1.5) | N/A |
| `--pfe-button__after--Border` | var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent) | `after` |
| `--pfe-button--BackgroundColor--hover` | var(--pfe-theme--color--ui-accent--hover, #004080) | N/A |
| `--pfe-button__after--Border--hover` | var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor--hover, transparent) | `after` |
| `--pfe-button--FontWeight--large` | var(--pfe-theme--font-weight--semi-bold, 600) | N/A |
| `--pfe-button--Padding--large` | 12px 24px | N/A |
:::