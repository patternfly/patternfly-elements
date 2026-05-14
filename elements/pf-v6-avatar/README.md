# Avatar

`<pf-v6-avatar>` displays a user's avatar image, or a placeholder graphic
when no image is provided.

## Usage

### Basic avatar with image

```html
<pf-v6-avatar src="/path/to/user-photo.jpg"
              alt="Alex Johnson"></pf-v6-avatar>
```

### Placeholder (no image)

```html
<pf-v6-avatar alt="Unknown user"></pf-v6-avatar>
```

### Bordered, large

```html
<pf-v6-avatar src="/path/to/user-photo.jpg"
              alt="Alex Johnson"
              size="lg"
              bordered></pf-v6-avatar>
```

## Divergences from React `Avatar`

### Changed API

| React prop   | Web component     | Difference                                                      |
| ------------ | ----------------- | --------------------------------------------------------------- |
| `isBordered` | `bordered`        | Boolean attribute without `is` prefix                           |
| `alt`        | `alt`             | Optional in web component (React requires it)                   |
| `src`        | `src`             | React defaults to empty string; web component renders a placeholder SVG when omitted |

### Not implemented

| React prop                   | Notes                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| Native `<img>` attributes   | React spreads all `HTMLImageElement` attributes; web component only exposes `src` and `alt` |

### Added

| Web component API                          | Notes                                           |
| ------------------------------------------ | ----------------------------------------------- |
| `load` event (`PfV6AvatarLoadEvent`)       | Fires when the avatar image loads successfully  |
| Placeholder SVG                            | Rendered automatically when `src` is not set    |
| `--pf-v6-c-avatar--Width`                 | Avatar width (default `2.25rem`)                |
| `--pf-v6-c-avatar--Height`                | Avatar height (default `2.25rem`)               |
| `--pf-v6-c-avatar--BorderRadius`          | Border radius (default pill)                    |
| `--pf-v6-c-avatar--BorderColor`           | Border color (default `transparent`)            |
| `--pf-v6-c-avatar--BorderWidth`           | Border width (default `0`)                      |
| `--pf-v6-c-avatar--m-bordered--BorderColor` | Border color when `bordered` is set           |
| `--pf-v6-c-avatar--m-bordered--BorderWidth` | Border width when `bordered` is set (default `1px`) |
| `--pf-v6-c-avatar--m-sm--Width`           | Width override for `size="sm"` (default `1.5rem`) |
| `--pf-v6-c-avatar--m-sm--Height`          | Height override for `size="sm"`                 |
| `--pf-v6-c-avatar--m-md--Width`           | Width override for `size="md"` (default `2.25rem`) |
| `--pf-v6-c-avatar--m-md--Height`          | Height override for `size="md"`                 |
| `--pf-v6-c-avatar--m-lg--Width`           | Width override for `size="lg"` (default `4.5rem`) |
| `--pf-v6-c-avatar--m-lg--Height`          | Height override for `size="lg"`                 |
| `--pf-v6-c-avatar--m-xl--Width`           | Width override for `size="xl"` (default `8rem`) |
| `--pf-v6-c-avatar--m-xl--Height`          | Height override for `size="xl"`                 |
