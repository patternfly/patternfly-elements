# WIP 🐣: RHElements Icon Element

## Usage

```html
<rh-icon icon="rh-icon-server"></rh-icon>
```

## Attributes

### icon (observed)

The name of the icon that you want to use. If the value of this attribute changes, the new icon will show up in the UI.

### data-size

Controls the size of the icon. The options for size are:
- `2x`
- `3x`
- `4x`
- `small`
- `medium`
- `large`

```html
<rh-icon icon="rh-icon-server" data-size="2x"></rh-icon>
```

### data-block

By default, `rh-icon` is set to `display: inline-block`. The `data-block` attribute sets this element to `display: block`.

```html
<rh-icon icon="rh-icon-server" data-block></rh-icon>
```

### data-bg

Sets the border radius of the element to a circle (`border-radius: 50%`).

```html
<rh-icon icon="rh-icon-server" data-bg></rh-icon>
```

Another option for `data-bg` is to set the attribute equal to `transparent`. This makes the background transparent.

```html
<rh-icon icon="rh-icon-server" data-bg="transparent"></rh-icon>
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Icon (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
