---
layout: layout-basic.html
title: Toast
description: An alert hidden on page load and slides in/out of the view
package: pfe-toast
packages:
  - pfe-toast
  - pfe-button
tags:
  - component
--- 

<style>
  pfe-toast#overview-toast {
    z-index: 999;
  }
</style>

::: section header
# {{ title }}
:::

::: section
## Overview

Toast is a self-contained alert that is hidden on page load and slides in/out of the view when programmatically opened/closed.

<pfe-button>
  <button>Trigger toast</button>
</pfe-button>

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
<pfe-toast>
  <p>You've been successfully toasted!</p>
</pfe-toast>
```

```javascript
const toast = document.querySelector("pfe-toast");
toast.open(); // open pfe-toast
toast.close(); // close pfe-toast
toast.toggle(); // toggle pfe-toast
```
:::

::: section
## Slots
### default
The default slot can contain any type of content.
:::

::: section
## Attributes
### auto-dismiss
This is an optional attribute string that you can provide to automatically dismiss the alert. The auto-dismiss delay value can be provided in seconds or in milliseconds. For example, `auto-dismiss="3s"` and `auto-dismiss="3000ms"` will dismiss the toast alert after three seconds. If no delay value is provided, it will default to eight seconds.

### close-label
This is an optional attribute string that you can provide that sets the aria-label on the close button in the shadow DOM. The aria-label attribute will default to "Close".
:::

::: section
## Methods
### open

Manually opens a toast. Return the toast that has been opened.

```javascript
document.querySelector("pfe-toast").open();
```

### close

Manually closes a toast. Returns the toast that has been closed.

```javascript
document.querySelector("pfe-toast").close();
```

### toggle

Manually toggles a toast. Returns the toast that has been toggled.

```javascript
document.querySelector("pfe-toast").toggle();
```
:::

::: section
## Events
### pfe-toast:open
Fires when a toast is manually openned.

### pfe-toast:close
Fires when a toast is manually closed.

:::

::: section 
## Styling hooks
- Max width: Allows you to specify the maximum width of the component. **Variable name:** `--pfe-toast--MaxWidth`.
- Min width: Allows you to specify the minimum width of the component. **Variable name:** `--pfe-toast--MinWidth`.
- Top: Allows you to customize the distance between the component and the top of its container. **Variable name:** `--pfe-toast--Top`.
- Right: Allows you to customize the distance between the component and the right of its container. **Variable name:** ` --pfe-toast--Right`.
:::

<pfe-toast id="overview-toast">
  <h2>Do you feel toasted?</h2>
  <p>Biodiesel wolf franzen, jean shorts pabst lomo cloud bread gentrify cronut af migas vinyl four dollar toast scenester twee. Twee synth hammock hella activated charcoal keffiyeh, farm-to-table cray try-hard tofu fixie truffaut leggings actually. Tote bag poutine kale chips intelligentsia health goth, thundercats affogato tofu literally vegan umami slow-carb VHS chillwave.</p>
</pfe-toast>

<script>
  const button = document.querySelector("pfe-button button");
  const toast = document.querySelector("pfe-toast#overview-toast");
  button.addEventListener("click", () => {
    toast.toggle();
  });
</script>