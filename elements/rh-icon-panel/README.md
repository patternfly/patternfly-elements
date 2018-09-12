# WIP 🐣: RHElements Icon Panel Element

## Usage

```html
<rh-icon-panel icon="rh-icon-server">
  <h3 slot="header">This is rh-icon-panel</h3>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  <rh-cta slot="footer">
    <a href="https://rhelements.github.io">Learn more about RHElements</a>
  </rh-cta>
</rh-icon-panel>
```

## Slots

### header
The header of the icon panel

### Default slot (body)
Any content that is not designated for the header or footer slot, will go to this slot.

### footer
Use this slot for anything that you want in the footer of the icon panel.

## Attributes

### icon (observed)

The name of the icon that you want to use. If the value of this attribute changes, the new icon will show up in the UI.

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Icon Panel (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
