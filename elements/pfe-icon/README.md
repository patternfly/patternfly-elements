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
| `size` | `sm` `md` `lg` `xl` `1x` `2x` `3x` `4x` | The default size is 1em, so icon size matches text size.  `2x`, etc, are multiples of font size.  `sm`, `md`, etc are fixed pixel-based sizes. |
| `color` | `base` `lightest` `lighter` `darker` `darkest` `complement` `accent` `accent` `critical` `important` `moderate` `success` `info` `default` | The color variant to use.  This draws from your theming layer to color the icon.  This will set icon color or background color (if `circled` is true). |
| `circled` | boolean attribute | Whether to draw a circular background behind the icon. |

## Icon sets

Icon sets are defined in detail in [this blog post][icon-sets].  The blog post should eventually be absorbed into the official documentation.

### Register a new icon set

To register a new icon set, choose a global namespace for that set and identify the path at which the SVGs for that set will be hosted.  Consider also the function needed to convert the icon name into the filename on that hosted location.  The `addIconSet` call accepts the namespace (as a string), the path to the SVGs (as a string), and a function for parsing the icon name into the filename.

```javascript
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

### Override the default icon sets

Out of the box, the default icon set (using the rh / web namespace) is hosted on [access.redhat.com](https://access.redhat.com). If you would like to override the `rh / web` namespace, you can add the following to a global variable named `PfeConfig`.

The config must be set _before_ the PfeIcon class is defined.

```javascript
window.PfeConfig = {
  IconSets: [
    {
      name: "web",
      path: "path/to/svg/directory", // Or https://hosted-icons.com/,
      resolveIconName: function(name, iconSetName, iconSetPath) { // Optional function to resolve icon paths.
        var regex = new RegExp("^" + iconSetName + "-(.*)");
        var match = regex.exec(name);
        return iconSetPath + match[1] + ".svg";
      }
    }
  ]
};
```

Now when `pfe-icon` is used, it will automatically reference the icon set defined in the config.

If you would like to opt out of any defaults so that you can dynamically add icon sets later using `PfeIcon.addIconSet()`, use the following:

```javascript
window.PfeConfig = {
  IconSets: []
};
```

### Updating an existing icon set

To updating an existing icon set, you use the same `addIconSet` function.  The first input which is the icon set namespace is required, as is the new path.  You can optionally pass in a new function for parsing the icon names into filenames.

```javascript
    PfeIcon.addIconSet("local", "https://hosted-icons.com/");
```

## Variables

There are several powerful ways to hook into and override default styles.

- Color: the `color` attribute is available to pull icon color from your theming layer.  For more fine-grained control, `--pfe-icon--color` is available to override the color of a specific icon or sets of icons and will be applied to the SVG.  [Examples][color-examples]
- Background color: the `color` attribute is available to pull background color from your theming layer.  For more fine-grained control, `--pfe-icon--BackgroundColor` is available to override the background color of a specific icon or sets of icons.  Be sure to set `--pfe-icon--context` to the appropriate context if you are setting the background-color or use the more fine-grained `--pfe-icon--color` to set a specific color on the SVG lines.

| Theme hook | Description | Default |
| -------------- | ----------- | ------- |
| `--pfe-icon--size` | The height and width of the icon | var(--pfe-theme--icon-size, 1em) |
| `--pfe-icon--spacing` | | var(--pfe-theme--container-spacer, 1rem) |
| `--pfe-icon--Padding` | Padding around the icon | 0 (when circled .5em) |
| `--pfe-icon--BackgroundColor` | Background color for when the icon is circled | transparent |
| `--pfe-icon--context` | Icon context when `--pfe-icon--BackgroundColor` is used | light |
| `--pfe-icon--BorderColor` | Border color when icon is circled | var(--pfe-icon--BackgroundColor, transparent) |
| `--pfe-icon--BorderWidth` | Thickness of the border when circled | var(--pfe-theme--ui--border-width, 1px) |
| `--pfe-icon--color` | Sets the color of the SVG lines | var(--pfe-icon--Color, var(--pfe-broadcasted--text, #3c3f42)) |
| *Deprecated* |
| `--pfe-icon--Color` | Deprecated | var(--pfe-broadcasted--text, #3c3f42) |

## Test

    npm test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

All PFElements use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[blog]: https://clayto.com/2019/07/web-component-icons/index.html
[icon-sets]: https://clayto.com/2019/07/web-component-icons/index.html#icon-sets
[color-examples]: https://clayto.com/2019/07/web-component-icons/index.html#setting-icon-colors
