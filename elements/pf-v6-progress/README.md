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

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `title` | `description` attribute | Visible title text above the bar. Renamed to avoid shadowing the native HTML `title` attribute. |
| `isTitleTruncated` | `truncated` attribute | Boolean. Truncates `description` with CSS ellipsis. |
| `measureLocation` `"top"` | Default (no attribute) | React's `"top"` is the default; omitting `measure-location` produces the same layout. |
| `measureLocation` | `measure-location` attribute | Singleline layout derived automatically when no `description` is set. |
| `size` `"md"` | Default (no attribute) | React's `"md"` is the default size; omitting `size` produces the same result. |
| `helperText` | `helper-text` slot | Slot instead of prop. Slotted elements are automatically wired to `aria-describedby` via ElementInternals. |
| `aria-label` | `accessible-label` attribute | Screen reader name set via ElementInternals. Falls back to `description`, then `"Progress status"`. |
| `aria-labelledby` | Native `aria-labelledby` on host | Use the native attribute directly on the host element -- the host has `role="progressbar"` so standard ARIA attributes work. |
| `aria-describedby` | `helper-text` slot | Slot content is automatically associated via `ariaDescribedByElements`. For external descriptions, use native `aria-describedby` on the host. |
| `hideStatusIcon` | `hide-status-icon` attribute | Boolean. Hides the variant status icon while keeping variant coloring. |

### Added

| Web component API | Notes |
|---|---|
| `helper-text` slot | Rich content below the bar, auto-wired to `aria-describedby`. |
