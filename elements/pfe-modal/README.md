# PFElements Modal Element

## Overview

`pfe-modal` is a self-contained modal window that is hidden on page load and (when activated) restricts the user from interacting with content in the main window.

## Usage

### With a trigger
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
```html
<pfe-modal>
  <h2 slot="pfe-modal--header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```
## Slots

### Trigger
The only part visible on page load, the trigger opens the modal window. The trigger can be a button, a cta or a link. While it is part of the modal web component, it does not contain any intrinsic styles.

### Header
The header is an optional slot that appears at the top of the modal window. It should be a header tag (h2-h6).

### Default slot
The default slot can contain any type of content. When the header is not present this unnamed slot appear at the top of the modal window (to the left of the close button). Otherwise it will appear beneath the header.

## API

### open

Manually opens a modal. Return the modal that has been opened.

```
document.querySelector("pfe-modal").open();
```

### close

Manually closes a modal. Returns the modal that has been closed.

```
document.querySelector("pfe-modal").close();
```

### toggle

Manually toggles a modal. Returns the modal that has been toggled.

```
document.querySelector("pfe-modal").toggle();
```

## Events

### pfe-modal:open
Fires when a user clicks on the trigger or manually opens a modal.

```
detail: {
  open: true
}
```

### pfe-modal:close
Fires when either a user clicks on either the close button or the overlay or manually closes a modal.

```
detail: {
  open: false
}
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Modal (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
