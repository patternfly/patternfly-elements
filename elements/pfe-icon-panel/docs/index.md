---
layout: layout-basic.html
title: Icon panel
description: Provides a way to present text with an accompanying icon
package: pfe-icon-panel
packages:
  - pfe-icon-panel
  - pfe-cta
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Icon panel provides a way to present text with an accompanying icon.

<pfe-icon-panel icon="rh-server-stack">
  <h3 slot="pfe-icon-panel--header">This is icon panel</h3>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  <pfe-cta slot="pfe-icon-panel--footer">
    <a href="https://pfelements.github.io">Learn more about PFElements</a>
  </pfe-cta>
</pfe-icon-panel>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

```html
<pfe-icon-panel icon="pfe-icon-server">
  <h3 slot="pfe-icon-panel--header">This is pfe-icon-panel</h3>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  <pfe-cta slot="pfe-icon-panel--footer">
    <a href="https://pfelements.github.io">Learn more about PFElements</a>
  </pfe-cta>
</pfe-icon-panel>
```
:::

::: section
## Slots
### Header
The header of the icon panel.  Assign content to this region using `slot="pfe-icon-panel--header`.

### Default slot (body)
Any content that is not designated for the header or footer slot, will go to this slot.

### Footer
Use this slot for anything that you want in the footer of the icon panel.  Assign content to this region using `slot="pfe-icon-panel--footer`.
:::

::: section
## Attributes

### icon
For example, `rh-leaf` loads a leaf icon from an icon set named "rh".

Values
- `iconSet-iconName`

### color
The color variant to use. This draws from your theming layer to color the icon. This will set icon color or background color (if circled is true).

Values
- base
- lightest
- lighter
- darker
- darkest
- complement
- accent
- critical
- important
- moderate 
- success
- info 
- default

### circled
Whether to draw a circular background behind the icon.
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
None
:::