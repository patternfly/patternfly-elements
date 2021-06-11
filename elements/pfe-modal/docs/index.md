---
layout: layout-basic.html
title: Modal
description: Displays information or helps a user focus on a task
package: pfe-modal
packages:
  - pfe-modal
  - pfe-cta
  - pfe-button
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Modals display information in a window or help a user focus on a task without navigating them away from the page. A user can’t perform other actions until the modal is dismissed.

<pfe-modal>
  <pfe-button slot="pfe-modal--trigger">
    <button>Open modal</button>
  </pfe-button>
  <h2 slot="pfe-modal--header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

### With a trigger
The `pfe-modal--trigger` slot can be used with a trigger element, like a button, to provide a mechanism to open a modal without any additional JavaScript.
```html
<pfe-modal>
  <button slot="pfe-modal--trigger">Open modal</button>
  <h2 slot="pfe-modal--header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```

### Without a trigger
Using `pfe-modal` without utilizing the `pfe-modal--trigger` slot requires additional JavaScript to programmatically open a modal. Uses for this type of modal are meant for scenarios where a modal needs to be programmatically triggered: a user is being logged out, a user needs to accept terms before continuing, etc.

```html
<pfe-modal>
  <h2 slot="pfe-modal--header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```
:::

::: section
## Slots
### pfe-modal--trigger
The only part visible on page load, the trigger opens the modal window. The trigger can be a button, a cta or a link. While it is part of the modal web component, it does not contain any intrinsic styles.

### pfe-modal--header
The header is an optional slot that appears at the top of the modal window. It should be a header tag (h2-h6).

### default slot
The default slot can contain any type of content. When the header is not present this unnamed slot appear at the top of the modal window (to the left of the close button). Otherwise it will appear beneath the header.
:::

::: section
## Attributes
:::

::: section
## Methods
### open

Manually opens a modal. Return the modal that has been opened.
```javascript
document.querySelector("pfe-modal").open();
```

### close

Manually closes a modal. Returns the modal that has been closed.
```javascript
document.querySelector("pfe-modal").close();
```

### toggle

Manually toggles a modal. Returns the modal that has been toggled.
```javascript
document.querySelector("pfe-modal").toggle();
```
:::

::: section
## Events
### pfe-modal:open
Fires when a user clicks on the trigger or manually opens a modal.
```javascript
detail: {
  open: true
}
```

### pfe-modal:close
Fires when either a user clicks on either the close button or the overlay or manually closes a modal.
```javascript
detail: {
  open: false
}
```
:::

::: section
## Styling hooks
None
:::