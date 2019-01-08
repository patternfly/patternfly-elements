# WIP 🐣: PFElements Icon Panel Element

## Usage

```html
<pfe-icon-panel icon="pfe-icon-server">
  <h3 slot="header">This is pfe-icon-panel</h3>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  <pfe-cta slot="footer">
    <a href="https://pfelements.github.io">Learn more about PFElements</a>
  </pfe-cta>
</pfe-icon-panel>
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

From the PFElements root directory, run:

    npm start

## Code style

Icon Panel (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
