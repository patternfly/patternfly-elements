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
All slots are optional. If the slot is not defined, the content will be added to the `body` region of the card.

### Header
If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6). An icon, svg, or use of the icon component are also valid in this region.

### Default slot (body)
Any content that is not designated for the `header` or `footer` slot, will go to this slot.

### Footer
Use this slot for anything that you want to be stuck to the base of the card. This region is bottom-aligned.

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

- **Background color**: Though using the `color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable. If you update this value manually, you should also update the `--context` variable to invoke the right context on it and it's child elements. Supported contexts include: `light`, `dark`, and `saturated`.
- **Background position**: This is designed for use with the `img-src` attribute to allow you to align your background image. Default value is `center center`.
- **Border**: This allows the customization of a border around the entire container. There is a variable for the entire border shorthand (transparent by default) or you can hook into the individual properties. There is also a separate `border-top` property which is available to add an emphasis border at the top of the card; typically that would consist of setting the variable as follows: `--pfe-card--BorderTop: 4px solid #ee00`.
- **Padding**: You can customize the padding around the outside of the card container by connecting to either the shortcut padding variable or just one or more of the individual padding regions. If you add a header slot to the card, note that the `padding-top` value will not be used, but rather, the `spacing--vertical` value; this is to maintain consistent padding around the text inside the card header.
- **Spacing**: Spacing controls the internal padding for the card. There is a `spacing--vertical` property which controls spacing between regions of the card (header, body, footer) and a `spacing--horizontal` which controls spacing between items in the footer region.

| Variable name | Fallback |
| --- | --- |
| **Display properties** |
| `--pfe-card--AlignSelf` | stretch |
| `--pfe-card--context` | `var(--pfe-theme--color--surface--base--context, light)` |
| **Padding/spacing properties** |
| `--pfe-card--PaddingTop` | `calc(--pfe-theme--container-spacer, 1rem) * 2` |
| `--pfe-card--PaddingRight` | `calc(--pfe-theme--container-spacer, 1rem) * 2)` |
| `--pfe-card--PaddingBottom` | `calc(--pfe-theme--container-spacer, 1rem) * 2)` |
| `--pfe-card--PaddingLeft` | `calc(--pfe-theme--container-spacer, 1rem) * 2)` |
| `--pfe-card--Padding` | Combination of the top, right, bottom, and left properties above |
| `--pfe-card--region--spacing` | `var(--pfe-theme--container-spacer, 1rem)` |
| `--pfe-card--spacing--vertical` | `var(--pfe-theme--content-spacer, 1.5rem)` |
| `--pfe-card--spacing--horizontal` | `calc(var(--pfe-theme--content-spacer, 1.5rem) / 2)` |
| **Border properties** |
| `--pfe-card--BorderRadius` | `var(--pfe-theme--surface--border-radius, 3px)` |
| `--pfe-card--BorderWidth` | 0 |
| `--pfe-card--BorderStyle` | solid |
| `--pfe-card--BorderColor` | var(--pfe-theme--color--surface--border, #d2d2d2) |
| `--pfe-card--Border` | `--pfe-card--BorderWidth`, `--pfe-card--BorderStyle`, `--pfe-card--BorderColor` |
| `--pfe-card--BorderTop` | `--pfe-card--Border` |
| **Background properties** |
| `--pfe-card--BackgroundColor` | `var(--pfe-theme--surface--base, #f0f0f0)` |
| `--pfe-card--BackgroundImage` | |
| `--pfe-card--BackgroundAttachment` | |
| `--pfe-card--BackgroundPosition` | center center |
| `--pfe-card--BackgroundRepeat` | |
| `--pfe-card--BackgroundSize` | |
| **General properties** |
| `--pfe-card--TextAlign` | left |
| **Overlay properties** |
| `--pfe-card__overlay--BackgroundColor` | `rgba(0, 0, 0, var(--pfe-theme--opacity, 0.09))` |
| **Header region properties** |
| `--pfe-card__header--Display` | `flex` |
| `--pfe-card__header--JustifyContent` | |
| `--pfe-card__header--BackgroundColor` | `rgba(0, 0, 0, var(--pfe-theme--opacity, 0.09))` |
| `--pfe-card__header--Color` | `var(--pfe-broadcasted--text, #3c3f42)` |
| **Body region properties** |
| `--pfe-card__body--FlexDirection` | column |
| `--pfe-card__body--FlexWrap` | nowrap |
| `--pfe-card__body--JustifyContent` | |
| `--pfe-card__body--AlignItems` | |
| **Footer region properties** |
| `--pfe-card__footer--AlignItems` | |
| `--pfe-card__footer--FlexDirection` | `row` |
| `--pfe-card__footer--FlexWrap` | `wrap` |
| `--pfe-card__footer--JustifyContent` | |
| `--pfe-card__footer--spacing--horizontal` | `var(--pfe-theme--content-spacer, 1.5rem)` |


### Usage notes

#### Header region
* The display property for the header region is very helpful in situations where you need to have the header content present in the DOM but want it visibly hidden from view. You can do that by setting that property to: `--pfe-card__header--Display: none`.
* If you set the `background-color` of the header region to a color that requires a different context than the rest of the card, please be sure you update the value of the `--pfe-card__header--Color` property to use a font color that works for that `background-color`. There is no `--context` variable for this region at this time.

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