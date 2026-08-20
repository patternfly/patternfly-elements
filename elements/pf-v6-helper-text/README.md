# `<pf-v6-helper-text>`

A helper text item displays contextual feedback or validation messages for
form fields, with status variants and optional icons. Supports light and
dark color schemes via `light-dark()` CSS fallbacks.

## Usage

```html
<!-- Simple helper text -->
<pf-v6-helper-text>This is default helper text</pf-v6-helper-text>

<!-- Non-default variants auto-show their default icon -->
<pf-v6-helper-text variant="error">Password is too short</pf-v6-helper-text>

<!-- Multiple items in a list with live region -->
<ul aria-live="polite" style="list-style: none; padding: 0; display: grid; gap: var(--pf-t--global--spacer--xs, 0.25rem);">
  <li><pf-v6-helper-text variant="success" dynamic>At least 14 characters</pf-v6-helper-text></li>
  <li><pf-v6-helper-text variant="error" dynamic>Must not contain "redhat"</pf-v6-helper-text></li>
</ul>

<!-- Custom icon via slot overrides the default variant icon -->
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

### Changed

| React prop | Notes |
| --- | --- |
| `HelperText` `component` (`'div'` \| `'ul'`) | Use a standard HTML `<ul>` wrapper if necessary. |
| `HelperText` `isLiveRegion` | Apply `role="status"` directly on the element, or a `<ul>` wrapper, if in use. |
| `HelperText` `aria-label` | Apply `aria-label` directly on the wrapper element. |
| `HelperTextItem` `component` (`'div'` \| `'li'`) | The custom element renders as its own tag; use `role="listitem"` if needed. |

### Changed API

| React prop | Web component | Difference |
| --- | --- | --- |
| `HelperTextItem` `variant` | `variant` attribute | Same values (`default`, `indeterminate`, `warning`, `success`, `error`). Identical behavior for styling. Non-default variants auto-show their default icon, matching React. |
| `HelperTextItem` `icon` (ReactNode) | `icon` slot | React accepts a React node as a prop. Web component uses a named slot for custom icon markup. |
| `HelperTextItem` `screenReaderText` | `accessible-label` attribute | Appends status context for assistive technologies (e.g. "error status") that sighted users receive from the variant icon. Defaults to "${variant} status" for non-default variants. Set to empty string to suppress. |

### Added

| Web component API | Notes |
| --- | --- |
| `dynamic` attribute | Enables dynamic item styling (maps to React's `pf-m-dynamic` modifier class). Affects icon color precedence in dynamic validation contexts. |
| `icon` CSS part | Exposes the icon container for external styling. |
| `text` CSS part | Exposes the text container for external styling. |
| Dark mode support | Built-in `light-dark()` CSS fallbacks. React relies on global PF theme CSS variables for dark mode; our element works standalone. |
| `--pf-v6-c-helper-text__item-icon--Color` | Default icon color. |
| `--pf-v6-c-helper-text__item-text--Color` | Default text color. |
| `--pf-v6-c-helper-text--FontSize` | Font size (default: 0.75rem). |
| `--pf-v6-c-helper-text__item-icon--MarginInlineEnd` | Gap between icon and text (default: 0.25rem). |
