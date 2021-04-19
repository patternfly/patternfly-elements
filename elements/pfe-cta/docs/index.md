---
layout: layout-basic.html
title: Call to action
description: Directs a user to other pages or displays extra content
package: pfe-cta
packages:
  - pfe-cta
tags:
  - component
---

<style>
  .cta-overview pfe-cta {
    margin-right: 16px;
    margin-bottom: 16px;
  }
</style>

::: section header
# {{ title }}
:::

::: section
## Overview

Call to action stands out from regular hypertext links, and is used for linking users to webpages. 

<div class="cta-overview">
  <pfe-cta>
    <a href="#">Default</a>
  </pfe-cta>
  <pfe-cta priority="primary">
    <a href="#">Primary</a>
  </pfe-cta>
  <pfe-cta priority="secondary">
    <a href="#">Secondary</a>
  </pfe-cta>
  <pfe-cta priority="secondary" variant="wind">
    <a href="#">Secondary with wind variant</a>
  </pfe-cta>
  <pfe-cta aria-disabled="true">
    <a href="#">Disabled</a>
  </pfe-cta>
</div>

Note: `pfe-cta` is not necessarily a button, though it may look like one visually.
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
<pfe-cta>
  <a href="https://github.com/">GitHub</a>
</pfe-cta>

<pfe-cta priority="primary">
  <a href="https://patternflyelements.org">Learn more about PatternFly Elements</a>
</pfe-cta>

<pfe-cta priority="secondary">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>

<pfe-cta priority="secondary" variant="wind">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>

<pfe-cta priority="primary" color="lightest">
  <a href="https://patternflyelements.org">Learn more about PatternFly Elements</a>
</pfe-cta>

<pfe-cta priority="secondary" color="complement">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>
```
:::

::: section
## Slots

### Default slot
We expect an anchor tag, `<a>` with an `href`, to be the first child inside `pfe-cta` element. Less preferred but allowed for specific use-cases include: `<button>` (note however that the `button` tag is not supported for the default CTA styles).
:::

::: section
## Attributes

### pfe-theme
Changes the context of the call-to-action to one of 3 possible themes:

- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--theme` variable.

### priority
Indicates the importance of this call-to-action in the context of the page. Will also influence how the call-to-action is styled.

### Variants

#### variant
Note: `priority="secondary"` has a `wind` variant (`variant="wind"`) that can be applied to change the style of the secondary call-to-action.

```html
<pfe-cta priority="secondary" variant="wind">
  <a href="#">Wind variant</a>
</pfe-cta>
```
:::

::: section
## Methods
None
:::

::: section
## Events

### pfe-cta:select

This event is fired when a link is clicked and serves as a way to capture click events if necessary.
:::

::: section
## Styling hooks

| Variable name                          | Default value                                                                                          | Region        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| `--pfe-cta--Padding`                   | .6rem 0                                                                                                |
| `--pfe-cta--BorderRadius`              | 0                                                                                                      |
| `--pfe-cta--BackgroundColor`           | transparent                                                                                            |
| `--pfe-cta--BackgroundColor--hover`    | transparent                                                                                            |
| `--pfe-cta--BackgroundColor--focus`    | transparent                                                                                            |
| `--pfe-cta--BorderColor`               | transparent                                                                                            |
| `--pfe-cta--BorderColor--hover`        | transparent                                                                                            |
| `--pfe-cta--BorderColor--focus`        | transparent                                                                                            |
| `--pfe-cta--Color`                     | var(--pfe-theme--color--link, #06c)                                                                    |
| `--pfe-cta--Color--hover`              | var(--pfe-theme--color--link--hover, #003366)                                                          |
| `--pfe-cta--Color--focus`              | var(--pfe-theme--color--link--focus, #003366)                                                          |
| `--pfe-cta--TextDecoration`            | none                                                                                                   |
| `--pfe-cta--TextDecoration--hover`     | none                                                                                                   |
| `--pfe-cta--TextDecoration--focus`     | none                                                                                                   |
| `--pfe-cta--LineHeight`                | var(--pfe-theme--line-height, 1.5);                                                                    |
| `--pfe-cta--FontFamily`                | var(--pfe-theme--font-family--heading, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif); |
| `--pfe-cta--FontWeight`                | var(--pfe-theme--font-weight--bold, 700);                                                              |
| `--pfe-cta__inner--BorderColor`        | transparent                                                                                            | inner border  |
| `--pfe-cta__inner--BorderColor--focus` | transparent                                                                                            | inner border  |
| `--pfe-cta__arrow--Display`            | inline                                                                                                 | arrow element |
| `--pfe-cta__arrow--Padding`            | 0 .125rem 0 .375rem                                                                                    | arrow element |
| `--pfe-cta__arrow--MarginLeft`         | calc(var(--pfe-theme--content-spacer, 24px) \* 0.25)                                                   | arrow element |


:::