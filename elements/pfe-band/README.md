# PatternFly Element | Band container

This container element provides a set of slots in which to render banded content.

## Slots

All slots other than `pfe-band--body` are optional.  If the slot is not defined, the container tag for it will not be rendered in the template.

- `pfe-band--header`: This slot renders at the top of the container and generally contains the title, headline, and/or subheadline content.  Other possible candidates include a set of social sharing links or tags that describe the content below. The template is automatically wrapping this slot in a `header` tag.  Recommend using h-level or p tags inside this slot.
- **Default slot**: This unnamed slot should contain the bulk of the content in this element. The template is automatically wrapping all content within an `article` tag.
- `pfe-band--footer`: This slot is typically used for calls-to-action or footnotes and is pushed to the bottom of the container.  Recommended tags include `pfe-cta`. The template is automatically wrapping this slot in a `footer` tag.
- `pfe-band--aside`: This slot is for content that should be rendered to the right or left of the default slot on desktop.  Asides often contain `pfe-card` or interest forms which provide users a little more information or context for the band. The template is automatically wrapping this slot in an `aside` tag.

### Example markup
```
<pfe-band>
    <h2 slot="pfe-band--header">Lighter band; no footer</h2>

    <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>

    <pfe-card slot="pfe-band--aside">
        <h3 slot="pfe-card--header">Aside: left body bottom</h3>
        <p>Ut wisi enim ad minim veniam.</p>
    </pfe-card>

    <pfe-cta slot="pfe-band--footer" priority="tertiary">
        <a href="#">Learn more</a>
    </pfe-cta>
</pfe-band>
```


## Attributes

<style>
    .color-preview {
        display: inline-block;
        width: 1em;
        height: 1em;
        vertical-align: middle;
        background-color: var(--bg, #fff);
        border: 1px solid #444;
    }
</style>

There are several attributes available for customizing the visual treatment of this container.

- `color`: Options include darkest, darker, accent, complement, lighter, lightest.  The band has a default value of `#dfdfdf`. Your context will influence these colors so check there first if you are seeing inconsistencies.

    | color | hex |
    |-------|-----|
    | base/default | <span class="color-preview" style="--bg:#f0f0f0"></span> #f0f0f0 |
    | darker | <span class="color-preview" style="--bg:#3c3f42"></span> #3c3f42 |
    | darkest | <span class="color-preview" style="--bg:#151515"></span> #151515 |
    | accent | <span class="color-preview" style="--bg:#004080"></span> #004080 |
    | complement | <span class="color-preview" style="--bg:#002952"></span> #002952 |
    | lighter | <span class="color-preview" style="--bg:#f0f0f0"></span> #f0f0f0 |
    | lightest | <span class="color-preview" style="--bg:#fff"></span> #ffffff |

- `img-src`: Optional background image applied to the entire band container.  Alignment of this image can be managed using the `--pfe-band--BackgroundPosition` variable which is set to `center center` by default.
- `size`: Optionally adjusts the padding on the container.  Accepts: `small`.
- `use-grid`: This turns on a default grid inside the header, body, footer, and aside regions. The grid can be customized using the following CSS variables:

    | Variable name | Default |
    |---|---|
    | `--pfe-band__header--layout` | 1fr |
    | `--pfe-band__header--gutter--vertical` | var(--pfe-theme--container-spacer, 16px) |
    | `--pfe-band__header--gutter--horizontal` | calc(var(--pfe-theme--container-spacer, 16px) * 3) |
    | `--pfe-band__body--layout` | 1fr |
    | `--pfe-band__body--gutter--vertical` | var(--pfe-theme--container-spacer, 16px) |
    | `--pfe-band__body--gutter--horizontal` | calc(var(--pfe-theme--container-spacer, 16px) * 3) |
    | `--pfe-band__footer--layout` | 1fr |
    | `--pfe-band__footer--gutter--vertical` | var(--pfe-theme--container-spacer, 16px) |
    | `--pfe-band__footer--gutter--horizontal` | calc(var(--pfe-theme--container-spacer, 16px) * 3) |
    | `--pfe-band__aside--layout` | 1fr |
    | `--pfe-band__aside--gutter--vertical` | var(--pfe-theme--container-spacer, 16px) |
    | `--pfe-band__aside--gutter--horizontal` | calc(var(--pfe-theme--container-spacer, 16px) * 3) |

### Aside settings
The aside settings have defaults and if no attribute is defined on the element's main tag, these attributes will be injected with their default values automatically.

- `aside-desktop`: This influences where the aside is rendered at the desktop view and are indicated relative to the body content. Options are `right` or `left`. **Right is the default.**
- `aside-mobile`: This influences the position of the aside in the mobile view as well as where in the DOM the aside markup is rendered. These names are relative to the body content. Options are `top` or `bottom`. **Bottom is the default.**
- `aside-height`: This influences the height of the aside region relative to the body content. Options are `full` or `body`. A `full` height starts at the top of the band and spans the header, body, and footer regions. A `body` height spans the body and footer regions only with the header region sitting above it in the rendered view. **Body is the default.**

## Variables
There are several powerful variables available to hook into and override default styles.

- **Vertical and horizontal padding**: `--pfe-band--Padding--vertical` and `--pfe-band--Padding--horizontal` accept size values such as px, em, rem, etc.
- **Background color**: Though using the `pfe-color` attribute is strongly recommended when setting the background color for the band, you can also use completely custom colors by updating the `--pfe-band--BackgroundColor` variable.  If you update this value manually, you should also update the `--context` context variable to invoke the right context on it and it's child elements.  Supported contexts include: `light`, `dark`, and `saturated`.
- **Background position**: This is designed for use with the `pfe-img-src` attribute to allow you to align your background image.  Default value is `center center`.
- **Border**: This allows the customization of a border around the entire container and is primarily designed to be used to add a top and/or bottom border line.  This variable accepts the entire border shorthand and is set to transparent by default.
- **Layout**: The band has a rudimentary layout system designed to be used inside the slot regions for the header, body, footer, and aside (see `use-grid` attribute details above). The regions themselves are also wrapped in a grid system that supports customization. All layouts appears "stacked" by default. Please note that the fallback for older browsers is a simple stacked layout (the aside position will be aligned using floats). Possible values include: `1fr 1fr`, `repeat(3, 1fr)`, `repeat(auto-fill, minmax(300px, 1fr))`. i.e., `--pfe-band--layout: repeat(auto-fill, minmax(300px, 1fr));`.

## Test

    npm run test

## Build

    npm run build

## Develop

From the PFElements root directory, run:

    npm dev pfe-band

## Code style

Band (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
