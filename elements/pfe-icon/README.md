# PatternFly Elements | Icon Element

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
| `pfe-size` | `sm` `md` `lg` `xl` `1x` `2x` `3x` `4x` | The default size is 1em, so icon size matches text size.  `2x`, etc, are multiples of font size.  `sm`, `md`, etc are fixed pixel-based sizes. |
| `pfe-color` | `base` `lightest` `lighter` `darker` `darkest` `complement` `accent` `accent` `critical` `important` `moderate` `success` `info` `default` | The color variant to use.  This draws from your theming layer to color the icon.  This will set icon color or background color (if `pfe-circled` is true). |
| `pfe-circled` | boolean attribute | Whether to draw a circular background behind the icon. |

## Icon sets

Icon sets are defined in detail in [this blog post][icon-sets].  The blog post should eventually be absorbed into the official documentation.

### Register a new icon set

To register a new icon set, choose a global namespace for that set and identify the path at which the SVGs for that set will be hosted.  Consider also the function needed to convert the icon name into the filename on that hosted location.  The `addIconSet` call accepts the namespace (as a string), the path to the SVGs (as a string), and a function for parsing the icon name into the filename.

```
    PfeIcon.addIconSet(
    "local",
    "./",
    function(name, iconSetName, iconSetPath) {
        var regex = new RegExp("^" + iconSetName + "-(.*)");
        var match = regex.exec(name);
        return iconSetPath + match[1] + ".svg";
    }
    );
```

### Updating an existing icon set

To updating an existing icon set, you use the same `addIconSet` function.  The first input which is the icon set namespace is required, as is the new path.  You can optionally pass in a new function for parsing the icon names into filenames.

```
    PfeIcon.addIconSet("local", "https://hosted-icons.com/");
```

## Variables

There are several powerful variables available to hook into and override default styles.

- Color: the `color` attribute is available to pull icon color from your theming layer.  For more fine-grained control, `--pfe-icon--color` is available to override the color of a specific icon or sets of icons and will be applied to either the SVG lines or the background of the circle (if circled).  [Examples][color-examples]
- Background color: the `color` attribute is available to pull background color from your theming layer.  For more fine-grained control, `--pfe-icon--BackgroundColor` is available to override the background color of a specific icon or sets of icons.  Be sure to set `--pfe-icon--context` to the appropriate context if you are setting the background-color.

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
