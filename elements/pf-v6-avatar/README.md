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
| `alt`        | `alt`             | Optional (defaults to `""`, marking the image as decorative for screen readers). Set `alt` to a descriptive string when the avatar conveys meaning. |
| `src`        | `src`             | React defaults to empty string; web component renders a placeholder SVG when omitted |

### Added

| Web component API                          | Notes                                           |
| ------------------------------------------ | ----------------------------------------------- |
| `load` event (`PfV6AvatarLoadEvent`)       | Fires when the `src` image loads successfully (not emitted for the placeholder SVG) |
| Placeholder SVG                            | Rendered automatically when `src` is not set    |
