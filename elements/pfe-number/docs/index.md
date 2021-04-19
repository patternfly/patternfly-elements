---
layout: layout-basic.html
title: Number
description: Display numbers in a consistent type and format
package: pfe-number
packages:
  - pfe-number
  - pfe-card
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Number helps display numbers in a consistent type and format.

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <pfe-card>
    <h3 slot="pfe-card--header">Ordinal numbers</h3>
    <pfe-number type="ordinal" number="1">1</pfe-number>,
    <pfe-number type="ordinal" number="2">2</pfe-number>,
    <pfe-number type="ordinal" number="3">3</pfe-number>,
    <pfe-number type="ordinal" number="4">4</pfe-number>
  </pfe-card>
  <pfe-card>
    <h3 slot="pfe-card--header">Bytes</h3>
    <pfe-number type="bytes" number="2017">2017</pfe-number>,
    <pfe-number type="bytes" number="4430292">4430292</pfe-number>
  </pfe-card>
  <pfe-card>
    <h3 slot="pfe-card--header">Abbreviations</h3>
    <pfe-number type="abbrev" number="12345">12345</pfe-number>,
    <pfe-number type="abbrev" number="1000000">1000000</pfe-number>
  </pfe-card>
  <pfe-card>
    <h3 slot="pfe-card--header">Percentages</h3>
    <pfe-number type="percent" number="0.5678">0.5678</pfe-number>,
    <pfe-number type="percent" number="1.2039">1.2039</pfe-number>
  </pfe-card>
  <pfe-card>
    <h3 slot="pfe-card--header">e</h3>
    <pfe-number type="e" number="2000000">2000000</pfe-number>
  </pfe-card>
  <pfe-card>
    <h3 slot="pfe-card--header">Thousands</h3>
    <pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>
  </pfe-card>
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

### Ordinal numbers
<pfe-number type="ordinal" number="1">1</pfe-number>,
<pfe-number type="ordinal" number="2">2</pfe-number>,
<pfe-number type="ordinal" number="3">3</pfe-number>,
<pfe-number type="ordinal" number="4">4</pfe-number>

```html
<pfe-number type="ordinal" number="1">1</pfe-number>
<pfe-number type="ordinal" number="2">2</pfe-number>
<pfe-number type="ordinal" number="3">3</pfe-number>
<pfe-number type="ordinal" number="4">4</pfe-number>
```

### Bytes
<pfe-number type="bytes" number="2017">2017</pfe-number>,
<pfe-number type="bytes" number="4430292">4430292</pfe-number>

```html
<pfe-number type="bytes" number="2017">2017</pfe-number>
<pfe-number type="bytes" number="4430292">4430292</pfe-number>
```

### Abbreviations
<pfe-number type="abbrev" number="12345">12345</pfe-number>,
<pfe-number type="abbrev" number="1000000">1000000</pfe-number>

```html
<pfe-number type="abbrev" number="12345">12345</pfe-number>
<pfe-number type="abbrev" number="1000000">1000000</pfe-number>
```

### Percentages
<pfe-number type="percent" number="0.5678">0.5678</pfe-number>,
<pfe-number type="percent" number="1.2039">1.2039</pfe-number>

```html
<pfe-number type="percent" number="0.5678">0.5678</pfe-number>
<pfe-number type="percent" number="1.2039">1.2039</pfe-number>
```

### e
<pfe-number type="e" number="2000000">2000000</pfe-number>

```html
<pfe-number type="e" number="2000000">2000000</pfe-number>
```

### Thousands
<pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>

```html
<pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>
```
:::

::: section
## Slots
None
:::

::: section
## Attributes
### number (observed)

Reflects the number that is in the light DOM.

### format (observed)

Reflects the format that is being used to display the number.

### type (observed)

The type of display you want to show.

The options for type are:
- `ordinal`: (1st, 2nd, 3rd, 4th)
- `bytes`: (2 KiB, 9.54 Mib, 93 Gib)
- `abbrev`: (1k, 1m, 1b)
- `percent`: (10%, 50%, 100%)
- `e`: (2.000e+6)
- `thousands`: (97 654 321.123)
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