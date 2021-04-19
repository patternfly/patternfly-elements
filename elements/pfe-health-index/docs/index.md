---
layout: layout-basic.html
title: Health index
description: Shows a health grade
package: pfe-health-index
packages:
  - pfe-health-index
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Health index shows a health grade in either a default, mini, or large variation.

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <section>
    <h3>Default</h3>
    <div>
      <pfe-health-index health-index="A">A</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="B">B</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="C">C</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="D">D</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="E">E</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="F">F</pfe-health-index>
    </div>
  </section>

  <section>
    <h3>Mini</h3>
    <div>
      <pfe-health-index health-index="A" size="mini">A</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="B" size="mini">B</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="C" size="mini">C</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="D" size="mini">D</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="E" size="mini">E</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="F" size="mini">F</pfe-health-index>
    </div>
  </section>

  <section>
    <h3>Large</h3>
    <div>
      <pfe-health-index health-index="A" size="lg">A</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="B" size="lg">B</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="C" size="lg">C</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="D" size="lg">D</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="E" size="lg">E</pfe-health-index>
    </div>
    <div>
      <pfe-health-index health-index="F" size="lg">F</pfe-health-index>
    </div>
  </section>
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

### Default
<pfe-health-index health-index="A">A</pfe-health-index>
```html
<pfe-health-index health-index="A">A</pfe-health-index>
```

### Mini
<pfe-health-index health-index="A" size="mini">A</pfe-health-index>
```html
<pfe-health-index health-index="A" size="mini">A</pfe-health-index>
```

### Large
<pfe-health-index health-index="A" size="lg">A</pfe-health-index>
```html
<pfe-health-index health-index="A" size="lg">A</pfe-health-index>
```
:::

::: section
## Slots
None
:::

::: section
## Attributes
### health-index (observed)

Sets the value for the health index in the UI.

### size (observed)

Changes the size.

Possible values: `mini`, `lg`
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