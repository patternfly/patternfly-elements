# `<pf-v6-spinner>`

A spinner indicates that an action is in progress.

## Usage

```html
<pf-v6-spinner>Loading...</pf-v6-spinner>
```

### Size variations

```html
<pf-v6-spinner size="sm">Loading...</pf-v6-spinner>
<pf-v6-spinner size="md">Loading...</pf-v6-spinner>
<pf-v6-spinner size="lg">Loading...</pf-v6-spinner>
<pf-v6-spinner size="xl">Loading...</pf-v6-spinner>
```

### Custom size

```html
<pf-v6-spinner style="--pf-v6-c-spinner--diameter: 80px">Loading...</pf-v6-spinner>
```

## Divergences from React `Spinner`

### Not implemented

| React prop | Notes |
|------------|-------|
| `aria-labelledBy` | Use `accessible-label` attribute instead, or set `aria-labelledby` via ElementInternals from a framework wrapper. |

### Changed API

| React prop | Web component | Difference |
|------------|---------------|------------|
| `diameter` | `--pf-v6-c-spinner--diameter` CSS custom property | React abstracts the CSS custom property behind a prop. In HTML, set it directly via `style`. |
| `aria-valuetext` | `accessible-label` attribute | Sets both `aria-label` and `aria-valuetext` on the element internals. Defaults to `"Loading..."`. |
| `aria-label` | `accessible-label` attribute | Merged with `aria-valuetext` into a single `accessible-label` attribute. |

### Added

| Web component API | Notes |
|-------------------|-------|
| `size="xs"` | Extra-small size preset not available in React. |
| `inline` attribute | Boolean attribute equivalent to React's `isInline`. |
| `--pf-v6-c-spinner--Color` | CSS custom property to change the spinner stroke color. |
| `--pf-v6-c-spinner--StrokeWidth` | CSS custom property to change the spinner stroke width. |
| `--pf-v6-c-spinner--AnimationDuration` | CSS custom property to change the animation cycle duration. |
