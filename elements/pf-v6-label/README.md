# `<pf-v6-label>`

A label is a compact element for categorization, status, or metadata display.
Labels provide a visual way to describe or tag items using keywords.

## Usage

```html
<pf-v6-label>Grey</pf-v6-label>
<pf-v6-label color="blue">Blue</pf-v6-label>
<pf-v6-label status="success">Success</pf-v6-label>
```

```html
<pf-v6-label variant="outline" color="green" removable>
  Removable outline
</pf-v6-label>
```

```html
<pf-v6-label href="https://example.com" color="blue">
  Link label
</pf-v6-label>
```

## Divergences from React `Label`

### Not implemented

| React prop | Notes |
|---|---|
| `isEditable` / `editableProps` | Complex inline editing pattern; deferred to a future release |
| `onEditComplete` / `onEditCancel` | Dependent on editable support |
| `render` | React-specific render prop for router integration; not applicable to web components |
| `tooltipPosition` | Tooltip integration for truncated labels; will integrate with `<pf-v6-tooltip>` in a future release |
| `closeBtn` / `closeBtnProps` | Custom close button node; the web component always renders a native `<button>` |
| `variant="add"` | Add button styling (used by LabelGroup); will be added with `<pf-v6-label-group>` |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `isCompact` | `compact` attribute | Dropped `is-` prefix per web component convention |
| `isDisabled` | `disabled` attribute | Dropped `is-` prefix per web component convention |
| `isClickable` | `clickable` attribute | Dropped `is-` prefix per web component convention |
| `isTruncated` | `truncated` attribute | Dropped `is-` prefix per web component convention |
| `onClose` | `removable` attribute + `close` event | In React, providing `onClose` shows the close button and handles the event. Set `removable` to show the button; listen for the `close` event (`LabelCloseEvent`) to handle it. `preventDefault()` stops removal. |
| `onClick` | native `click` event | Use standard `click` event listener on the element |
| `icon` (ReactNode) | `icon` slot | Slot a `<svg>` or icon element instead of passing a React node |
| `closeBtnAriaLabel` | `close-button-label` attribute | Renamed to match web component dash-case conventions |
| `textMaxWidth` | `text-max-width` attribute | Same functionality, dash-case attribute |
| `variant="overflow"` | `overflow` attribute | Separate boolean attribute instead of overloading `variant` |

### Added

| Web component API | Notes |
|---|---|
| `close` event | `LabelCloseEvent` — cancelable, bubbles. Prevents DOM removal when `preventDefault()` is called. |
