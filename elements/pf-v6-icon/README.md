# Icon

`<pf-v6-icon>` - a container that allows for icons of varying dimensions to
seamlessly replace each other without shifting surrounding content. Supports
sizes, status colors, inline usage, and an in-progress state.

## Usage

```html
<pf-v6-icon icon="plus-circle"></pf-v6-icon>
```

Sized and colored:

```html
<pf-v6-icon icon="check-circle" size="xl" status="success"></pf-v6-icon>
```

Inline with text:

```html
<pf-v6-icon icon="info-circle" inline></pf-v6-icon>
```

Loading state swaps the icon for a spinner:

```html
<pf-v6-icon icon="check-circle" in-progress></pf-v6-icon>
```

Icons resolve by name from an icon set (`fas` by default) via
`@patternfly/icons`. Register your own sets with `PfV6Icon.addIconSet()` (see
the custom icon sets demo), and give fallback content in the default slot for
use when the icon fails to load.

To color the icon with the CSS `color` property instead of a status, set
`--pf-v6-c-icon__content--Color: initial` and set `color` on the element or an
ancestor.

## Divergences from React `Icon`

### Not implemented

| React prop                | Notes                                                                       |
| ------------------------- | --------------------------------------------------------------------------- |
| `progressIconSize`        | Size the default spinner with `--pf-v6-c-spinner--diameter`, or slot a custom progress icon sized directly |
| `defaultProgressArialabel`| The default spinner announces "Loading...". For a custom label, slot `<pf-v6-spinner slot="progress" accessible-label="...">` |

### Changed API

| React prop             | Web component                         | Difference                                                                    |
| ---------------------- | ------------------------------------- | ------------------------------------------------------------------------------ |
| `children` (icon node) | `icon` + `set` attributes             | Icons resolve by name from icon sets instead of accepting a React node. Override `PfV6Icon.resolve` or call `PfV6Icon.addIconSet()` for custom icons |
| `size`                 | `size`                                | Same sizes, but heading and body values are dash-case: `heading-sm`, `heading-2xl`, `body-default`, etc. instead of `headingSm`, `heading_2xl`, `bodyDefault` |
| `iconSize`             | `icon-size`                           | Dash-case attribute; same sizes as `size`                                      |
| `progressIcon`         | `progress` slot                       | Slot an element instead of passing a React node                                |
| `isInline`             | `inline`                              | Boolean attribute, no `is-` prefix                                             |
| `isInProgress`         | `in-progress`                         | Boolean attribute, no `is-` prefix                                             |
| `shouldMirrorRTL`      | `mirror-rtl`                          | Boolean attribute, no `is-` prefix                                             |
| `className`            | CSS custom properties                 | Standard web component styling mechanisms                                      |

### Added

| Web component API                        | Notes                                                                |
| ---------------------------------------- | -------------------------------------------------------------------- |
| `set` attribute                          | Icon set to resolve from (`fas`, `far`, `fab`, `patternfly`)         |
| `loading` attribute                      | `lazy` (default), `idle`, or `eager` icon fetching                   |
| `PfV6Icon.addIconSet()` / `.resolve`     | Register custom icon sets or replace the resolver function           |
| `load` event                             | Fired when an icon is loaded and rendered                            |
| `error` event (`IconResolveError`)       | Fired when an icon fails to load                                     |
| default slot                             | Fallback content while the icon is unavailable or fails to load      |
| `accessible-label` attribute             | Exposes the icon as a labelled image; without it the icon is decorative and hidden from assistive technology |
| `--pf-v6-c-icon__content--Color: initial`| Opt out of the default icon color to inherit the CSS `color`         |
| `fallback` CSS part                      | Styling hook for the fallback content container                      |
