---
layout: layout-basic.html
title: Progress indicator
description: Indicates that the user is waiting on a process
package: pfe-progress-indicator
packages: 
  - pfe-progress-indicator
tags:
  - component
---

<style>
.overview-demo pfe-progress-indicator {
  margin-right: 8px;
}
</style>

::: section header
# {{ title }}
:::

::: section
## Overview

Progress indicator indicates that the user is waiting on a process: page load, HTTP request, image loading, etc.

<div class="overview-demo">
  <pfe-progress-indicator indeterminate size="sm">
    <h3>My fallback loading message</h3>
  </pfe-progress-indicator>
  <pfe-progress-indicator indeterminate size="md">
    <h3>My fallback loading message</h3>
  </pfe-progress-indicator>
  <pfe-progress-indicator indeterminate size="xl">
    <h3>My fallback loading message</h3>
  </pfe-progress-indicator>
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
<pfe-progress-indicator indeterminate>
  <h1>My fallback loading message</h1>
</pfe-progress-indicator>
```
:::

::: section
## Slots
### default slot
The provided element should contain a fallback loading message if JavaScript should fail for any reason. When the element is connected, the loading message is visually hidden, and replaced by an animated "spinner".

```html
<!--The web component that upgrades to a "loader"-->
<pfe-progress-indicator indeterminate>
  <!--your custom message for JS failure AND a11y technologies-->
  <h1>
    This text will be seen if JS fails, but will be hidden on upgrade.
    Screen readers will still see it as a part of the DOM.
  </h1>
</pfe-progress-indicator>
```
:::

::: section
## Attributes
### indeterminate

Uses the spinner style display. Currently this is on the only supported display.

### size

Values: 
- sm
- md
- xl
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