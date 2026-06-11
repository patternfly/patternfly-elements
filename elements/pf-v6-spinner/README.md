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

### Changed API

| React prop | Web component | Difference |
|------------|---------------|------------|
| `diameter` | `--pf-v6-c-spinner--diameter` CSS custom property | React abstracts the CSS custom property behind a prop. In HTML, set it directly via `style`. |
| `aria-valuetext` | `value-text` attribute | Sets `aria-valuetext` on element internals. Defaults to `"Loading..."`. |
| `aria-label` | `accessible-label` attribute | Sets `aria-label` on element internals. |
| `isInline` | `inline` attribute | Boolean attribute. |
| `size` | `size` attribute | Adds `xs` preset from PatternFly CSS not exposed in React. |

### CSS custom properties

| Custom property | Description |
|-----------------|-------------|
| `--pf-v6-c-spinner--diameter` | Spinner diameter. |
| `--pf-v6-c-spinner--Color` | Spinner stroke color. |
| `--pf-v6-c-spinner--StrokeWidth` | Spinner stroke width. |
| `--pf-v6-c-spinner--AnimationDuration` | Animation cycle duration. |
