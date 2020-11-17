# PFElements Card Element

## Usage

```html
<pfe-card>
  <h2 slot="pfe-card--header">Card header</h2>
  <p>This is the pfe-card body.</p>
  <pfe-cta slot="pfe-card--footer">
    <a href="#">Footer link</a>
  </pfe-cta>
</pfe-card>
```

## Slots
All slots are optional.  If the slot is not defined, the content will be added to the `body` region of the card.

### Header
If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6).  An icon, svg, or use of the icon component are also valid in this region.

### Default slot (body)
Any content that is not designated for the `header` or `footer` slot, will go to this slot.

### Footer
Use this slot for anything that you want to be stuck to the base of the card.  This region is bottom-aligned.

## Attributes

<style>
    .color-preview {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
        background-color: var(--bg, #ffffff);
        border: 1px solid #444444;
    }
</style>

There are several attributes available for customizing the visual treatment of this container.

- `color`: Options include darkest, darker, accent, complement, lighter, lightest.  The card has a default value of `#dfdfdf`. Your context will influence these colors so check there first if you are seeing inconsistencies.

    | color | hex |
    |-------|-----|
    | lightest | <span class="color-preview" style="--bg:#ffffff"></span> #ffffff |
    | lighter | <span class="color-preview" style="--bg:#ececec"></span> #ececec |
    | default | <span class="color-preview" style="--bg:#dfdfdf"></span> #dfdfdf |
    | darker | <span class="color-preview" style="--bg:#464646"></span> #464646 |
    | darkest | <span class="color-preview" style="--bg:#131313"></span> #131313 |
    | accent | <span class="color-preview" style="--bg:#ee0000"></span> #ee0000 |
    | complement | <span class="color-preview" style="--bg:#0477a4"></span> #0477a4 |

- `img-src`: Optional background image applied to the entire card container.  Alignment of this image can be managed using the `--pfe-card--BackgroundPosition` variable which is set to `center center` by default.
- `size`: Optionally adjusts the padding on the container.  Accepts: `small`.
- `overflow`: Optionally allows an image or element to overflow the padding on the container. This property should be added to the direct child of the slotm such as on an image tag; should be added to the element that you want to overflow the container. Accepts: `top`, `right`, `bottom`, `left`.
- `border`: Optionally apply a border color and weight to the entire card container. The default color and weight is `#d2d2d2` and `1px`, respectively.

## Variables
There are several powerful variables available to hook into and override default styles.

- **Background color**: Though using the `pfe-color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable.  If you update this value manually, you should also update the `--context` context variable to invoke the right context on it and it's child elements.  Supported contexts include: `light`, `dark`, and `saturated`.
- **Background position**: This is designed for use with the `pfe-img-src` attribute to allow you to align your background image.  Default value is `center center`. **Variable name:** `--pfe-card--BackgroundPosition`.
- **Border**: This allows the customization of a border around the entire container.  There is a variable for the entire border shorthand (transparent by default) or you can hook into the individual properties. **Variable name:** `--pfe-card--BorderRadius` and `--pfe-card--Border` or `--pfe-card--BorderWeight`, `--pfe-card--BorderStyle`, `--pfe-card--BorderColor`.
- **Padding**: You can customize the padding around the outside of the card container by connecting to either the shortcut padding variable or just one or more of the individual padding regions. **Variable names:** `--pfe-card--Padding` or `--pfe-card--PaddingTop`, `--pfe-card--PaddingRight`, `--pfe-card--PaddingBottom`, `--pfe-card--PaddingLeft`.

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Card (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
