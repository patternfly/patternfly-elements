# PatternFly Elements | Icon Panel Element

## Usage

```html
<pfe-icon-panel icon="pfe-icon-server">
  <h3 slot="pfe-icon-panel--header">This is pfe-icon-panel</h3>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  <pfe-cta slot="pfe-icon-panel--footer">
    <a href="https://pfelements.github.io">Learn more about PFElements</a>
  </pfe-cta>
</pfe-icon-panel>
```

## Slots

### Header
The header of the icon panel.  Assign content to this region using `slot="pfe-icon-panel--header`.

### Default slot (body)
Any content that is not designated for the header or footer slot, will go to this slot.

### Footer
Use this slot for anything that you want in the footer of the icon panel.  Assign content to this region using `slot="pfe-icon-panel--footer`.

## Attributes

| Name | Values | Description |
| --- | --- | --- |
| `icon` | `iconSet-iconName` | For example, `rh-leaf` loads a leaf icon from an icon set named "rh". |
| `pfe-color` | `base` `lightest` `lighter` `darker` `darkest` `complement` `accent` `accent` `critical` `important` `moderate` `success` `info` `default` | The color variant to use.  This draws from your theming layer to color the icon.  This will set icon color or background color (if `pfe-circled` is true). |
| `pfe-circled` | boolean attribute | Whether to draw a circular background behind the icon.  If this is chosen, the icon will render as `lg` size; otherwise the icon renders at the `xl` size. |
| `pfe-stacked` | boolean attribute | Whether to stack the icon on top of the content. |

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
