# Progress

A progress bar gives the user a visual representation of their completion status of an ongoing process or task.

## Usage

```html
<pf-v6-progress value="33" description="Title"></pf-v6-progress>

<script type="module">
  import '@patternfly/elements/pf-v6-progress/pf-v6-progress.js';
</script>
```

With variant and measure location:

```html
<pf-v6-progress value="100"
                description="Upload complete"
                variant="success"
                measure-location="outside"></pf-v6-progress>
```

With helper text:

```html
<pf-v6-progress value="33" description="Uploading">
  <span slot="helper-text">Uploading 3 of 9 files</span>
</pf-v6-progress>
```

## Divergences from React `Progress`

### Not implemented

| React prop | Notes |
|---|---|
| `label` | Use `value-text` for custom measure text. Rich content (ReactNode) not supported. |
| `tooltipPosition` | Not implemented. |
| `aria-describedby` | Not supported. Use the `helper-text` slot for supplementary text. |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `title` | `description` attribute | Visible title text above the bar. Renamed to avoid shadowing the native HTML `title` attribute. |
| `isTitleTruncated` | `truncated` attribute | Boolean. Truncates `description` with CSS ellipsis and adds a native `title` tooltip. |
| `measureLocation` `"top"` | Default (no attribute) | React's `"top"` is the default; omitting `measure-location` produces the same layout. |
| `measureLocation` | `measure-location` attribute | Singleline layout is derived automatically when no `description` is set, matching React behavior. |
| `size` `"md"` | Default (no attribute) | React's `"md"` is the default size; omitting `size` produces the same result. |
| `helperText` | `helper-text` slot | Slot instead of prop, accepts rich content. |
| `aria-label` | `accessible-label` attribute | Screen reader name only, set via ElementInternals. Falls back to `description`, then `"Progress status"`. |
| `hideStatusIcon` | `hide-status-icon` attribute | Boolean. Hides the variant status icon while keeping variant coloring on the bar. |
| `aria-labelledby` | `accessible-labelledby` attribute | Accepts space-separated element ID(s). Resolves cross-root `aria-labelledby` via `ariaLabelledByElements` on ElementInternals. Takes precedence over `accessible-label` and `description`. |

### Added

| Web component API | Notes |
|---|---|
| `helper-text` slot | Accepts rich content below the progress bar. React uses a `helperText` prop (ReactNode). |
