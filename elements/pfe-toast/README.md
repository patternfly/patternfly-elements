# PFElements Toast Element

## Overview

`pfe-toast` is a self-contained, non-focused alert that is hidden on page load and slides in/out of the view when programmatically opened/closed.

## Usage

```html
<pfe-toast>
    <p>You've been successfully toasted!</p>
</pfe-toast>
```

## Slots

### Default slot
The default slot can contain any type of content.

## API

### open

Manually opens a toast. Return the toast that has been opened.

```
document.querySelector("pfe-toast").open();
```

### close

Manually closes a toast. Returns the toast that has been closed.

```
document.querySelector("pfe-toast").close();
```

### toggle

Manually toggles a toast. Returns the toast that has been toggled.

```
document.querySelector("pfe-toast").toggle();
```

## Events

### pfe-toast:open
Fires when a toast is manually openned.


### pfe-toast:close
Fires when a toast is manually closed.

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Toast (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
