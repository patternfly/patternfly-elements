# PFElements Icon Element

## Usage

```html
<pfe-icon icon="rh-leaf"></pfe-icon>
```

## Slots

There are no slots, but if you wish to display some text when JS is disabled, you can put some text inside the pfe-icon tag.  For instance, when using a checkmark icon in a server status table, you may wish to display "success" if JS is disabled.

```html
<pfe-icon icon="rh-check-mark">success</pfe-icon>
```


## Attributes

| Name | Values | Description |
| --- | --- | --- |
| `icon` | `iconSet-iconName` | For example, `rh-leaf` loads a leaf icon from an icon set named "rh". |
| `size` | `sm` `md` `lg` `xl` `2x` `3x` `4x` | The default size is 1em, so icon size matches text size.  `2x`, etc, are multiples of font size.  `sm`, `md`, etc are fixed pixel-based sizes. |
| `color` | `base` `complement` `accent` `critical` `important` `moderate` `success` `info` `default` | The color variant to use.  This draws from your theming layer to color the icon.  This will set icon color and also background color (if `circled`). |
| `circled` | boolean attribute | Whether to draw a circular background behind the icon. |

## Icon sets

Icon sets are defined in detail in [this blog post][icon-sets].  The blog post should eventually be absorbed into the official documentation.

## Variables

There are several powerful variables available to hook into and override default styles.

- Color: the `color` attribute is available to pull icon color from your theming layer.  For more fine-grained control, `--pfe-icon--Color` is available to override the color of a specific icon or sets of icons.  [Examples][color-examples]
- Background color: the `color` attribute is available to pull background color from your theming layer.  For more fine-grained control, `--pfe-icon--BackgroundColor` is available to override the background color of a specific icon or sets of icons.

## Test

    npm test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Card (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[blog]: https://clayto.com/2019/07/web-component-icons/index.html
[icon-sets]: https://clayto.com/2019/07/web-component-icons/index.html#icon-sets
[color-examples]: https://clayto.com/2019/07/web-component-icons/index.html#setting-icon-colors
