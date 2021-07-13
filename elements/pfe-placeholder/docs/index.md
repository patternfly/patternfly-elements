---
layout: layout-basic.html
title: Placeholder
description: Placeholder element for PatternFly Elements
package: pfe-placeholder
packages:
  - pfe-placeholder
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
The component will render a gray placeholder for an image.  It will by default show the width and height inside the box:

<pfe-placeholder width="400" height="200"></pfe-placeholder>

```html
<pfe-placeholder width="400" height="200"></pfe-placeholder>
```


Alternatively, you can pass in any text you would like:

<pfe-placeholder width="400" height="200">placeholder</pfe-placeholder>

```html
<pfe-placeholder width="400" height="200">placeholder</pfe-placeholder>
```
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Methods
None
:::

::: section
## Slots

- `default`: Use this when you want to render custom text inside the image.
:::

::: section
## Attributes

- `width`: Set the width limitation of the placeholder.
- `height`: Set the height limitation of the placeholder.
:::

::: section
## Events
None
:::

::: section
## Styling hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-placeholder--BackgroundColor` | var(--pfe-theme--color--surface--lighter, #f0f0f0) | N/A |
:::
