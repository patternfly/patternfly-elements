---
layout: layout-basic.html
title: Progress stepper
description: 
package: pfe-progress-steps
packages:
  - pfe-progress-steps
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).

<pfe-progress-steps>
  <pfe-progress-steps-item state="active" current>
    <div slot="title">Current</div>
    <a slot="link" href="#">View current step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Next</div>
    <a slot="link" href="#">View next step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Last</div>
    <a slot="link" href="#">View last step</a>
  </pfe-progress-steps-item>
</pfe-progress-steps>
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
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
```
:::

::: section
## Attributes
Coming soon.
:::

::: section
## Methods
None
:::

::: section
## Styling hooks
None
:::