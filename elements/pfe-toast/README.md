# PFElements Toast Element

## Overview

`pfe-toast` is a self-contained alert that is hidden on page load and slides in/out of the view when programmatically opened/closed.

## Usage

```html
<pfe-toast>
    <p>You've been successfully toasted!</p>
</pfe-toast>
```

## Slots

### Default slot
The default slot can contain any type of content.

## Attributes

- `auto-dismiss`: This is an optional attribute string that you can provide to automatically dismiss the alert. The auto-dismiss delay value can be provided in seconds or in milliseconds. For example, `auto-dismiss="3s"` and `auto-dismiss="3000ms"` will dismiss the toast alert after three seconds. If no delay value is provided, it will default to eight seconds.
- `close-label`: This is an optional attribute string that you can provide that sets the aria-label on the close button in the shadow DOM. The aria-label attribute will default to "Close".

## Variables

- Max width: Allows you to specify the maximum width of the component. **Variable name:** `--pfe-toast--MaxWidth`.
- Min width: Allows you to specify the minimum width of the component. **Variable name:** `--pfe-toast--MinWidth`.
- Top: Allows you to customize the distance between the component and the top of its container. **Variable name:** `--pfe-toast--Top`.
- Right: Allows you to customize the distance between the component and the right of its container. **Variable name:** ` --pfe-toast--Right`.

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
