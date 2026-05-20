# `<pf-v6-helper-text>`

A helper text item displays contextual feedback or validation messages for
form fields, with status variants and optional icons. Supports light and
dark color schemes via `light-dark()` CSS fallbacks.

## Usage

```html
<!-- Simple helper text -->
<pf-v6-helper-text>This is default helper text</pf-v6-helper-text>

<!-- With variant and default icon -->
<pf-v6-helper-text variant="error" has-icon>Password is too short</pf-v6-helper-text>

<!-- Multiple items in a group with live region -->
<div aria-live="polite">
  <pf-v6-helper-text variant="success" has-icon dynamic>At least 14 characters</pf-v6-helper-text>
  <pf-v6-helper-text variant="error" has-icon dynamic>Must not contain "redhat"</pf-v6-helper-text>
</div>

<!-- Custom icon via slot -->
<pf-v6-helper-text variant="warning">
  <svg slot="icon" fill="currentColor" viewBox="0 0 32 32"><!-- SVG path --></svg>
  Custom icon helper text
</pf-v6-helper-text>
```

## Divergences from React `HelperText` / `HelperTextItem`

React splits this into two components: `HelperText` (container) and
`HelperTextItem` (individual item). Our web component is a single element
representing one item. For grouping, use standard HTML containers with
appropriate ARIA attributes.

### Not implemented

| React prop | Notes |
| --- | --- |
| `HelperText` `component` (`'div'` \| `'ul'`) | Use a standard HTML `<div>` or `<ul>` wrapper instead. |
| `HelperText` `isLiveRegion` | Apply `aria-live="polite"` directly on a wrapper element. |
| `HelperText` `aria-label` | Apply `aria-label` directly on the wrapper element. |
| `HelperTextItem` `component` (`'div'` \| `'li'`) | The custom element renders as its own tag; use `role="listitem"` if needed. |

### Changed API

| React prop | Web component | Difference |
| --- | --- | --- |
| `HelperTextItem` `variant` | `variant` attribute | Same values (`default`, `indeterminate`, `warning`, `success`, `error`). Identical behavior for styling. Icon display is controlled separately via `has-icon`. |
| `HelperTextItem` `icon` (ReactNode) | `icon` slot | React accepts a React node as a prop. Web component uses a named slot for custom icon markup. |
| `HelperTextItem` `screenReaderText` | `screen-reader-text` attribute | Same behavior: announces variant status to assistive tech. Defaults to "${variant} status" for non-default variants. Set to empty string to suppress. |

### Added

| Web component API | Notes |
| --- | --- |
| `has-icon` attribute | Opt-in to display the default variant icon. React shows icons automatically for non-default variants; we require explicit opt-in. Has no effect when `variant` is `"default"`. |
| `dynamic` attribute | Enables dynamic item styling (maps to React's `pf-m-dynamic` modifier class). Affects icon color precedence in dynamic validation contexts. |
| `icon` CSS part | Exposes the icon container for external styling. |
| `text` CSS part | Exposes the text container for external styling. |
| Dark mode support | Built-in `light-dark()` CSS fallbacks. React relies on global PF theme CSS variables for dark mode; our element works standalone. |
| `--pf-v6-c-helper-text__item-icon--Color` | Default icon color. |
| `--pf-v6-c-helper-text__item-text--Color` | Default text color. |
| `--pf-v6-c-helper-text--FontSize` | Font size (default: 0.75rem). |
| `--pf-v6-c-helper-text__item-icon--MarginInlineEnd` | Gap between icon and text (default: 0.25rem). |
