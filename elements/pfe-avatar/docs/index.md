---
layout: layout-basic.html
title: Avatar
description: For displaying a user's avatar image
package: pfe-avatar
packages:
  - pfe-avatar
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

Avatar is an element for displaying a user's avatar image. If the user in question has provided a custom avatar, provide it and it will be displayed. If they don't, a nice colored pattern will be generated based on their name. A specific name will always generate the same pattern, so users' avatars will stay static without the need for storing their generated image.

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-2-col">
  <div>
    <pfe-avatar pfe-name="Eleanore Stillwagon"></pfe-avatar>
  </div>
  <div>
    <pfe-avatar pfe-name="Libbie Koscinski" pfe-shape="rounded" pfe-pattern="squares"></pfe-avatar>
  </div>
  <div>
    <pfe-avatar pfe-name="Blanca Rohloff" pfe-pattern="triangles"></pfe-avatar>
  </div>
  <div>
    <pfe-avatar pfe-name="Edwardo Lindsey" pfe-src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></pfe-avatar>
  </div>
</div>
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
<pfe-avatar name="Eleanore Stillwagon"></pfe-avatar>
```
:::

::: section
## Slots
None
:::

::: section
## Attributes
### name (observed) (required)

The user's name, either given name and family name, or username. When displaying a pattern, the name will be used to seed the pattern generator.

### src (observed)

The URL to the user's custom avatar image. It will be displayed instead of a random pattern.

### pattern (observed)

The type of pattern to display. Currently supported values are `"squares"` and `"triangles"`.

### shape (observed)

The shape of the avatar itself. Supported values are `"square"` (default), `"rounded"`, and `"circle"`.
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