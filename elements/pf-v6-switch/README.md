# pf-v6-switch

A **switch** toggles the state of a setting (between on and off). Switches and
checkboxes can often be used interchangeably, but the switch provides a more
explicit, visible representation on a setting.

## Usage

```html
<pf-v6-switch checked>Wi-Fi</pf-v6-switch>
```

### Without visible label

```html
<pf-v6-switch accessible-label="Wi-Fi" checked></pf-v6-switch>
```

### With check icon

```html
<pf-v6-switch checked show-check-icon>Notifications</pf-v6-switch>
```

## Divergences from React `Switch`

### Not implemented

| React prop | Notes |
|---|---|
| `defaultChecked` | React-only uncontrolled pattern; web components use the `checked` attribute directly |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `label` | Default slot | Visible label text is slotted, not a prop. Also supports external `<label for="id">` |
| `isDisabled` | `disabled` | Dropped `is-` prefix per web component convention |
| `isReversed` | `reversed` | Dropped `is-` prefix per web component convention |
| `isChecked` | `checked` | Dropped `is-` prefix per web component convention |
| `hasCheckIcon` | `show-check-icon` | Attribute name carried over from v5 for clarity |
| `aria-label` | `accessible-label` | Abstracted behind custom attribute per PFE convention |
| `aria-labelledby` | External `<label for="id">` | Use native label association instead |
| `onChange` | `change` event | Standard DOM event instead of React callback |

### Added

| Web component API | Notes |
|---|---|
| `data-state="on\|off"` on slotted children | Show different label text per state; children hidden/shown automatically |
| External `<label>` support | FACE element works with native `<label for="id">` or nesting in `<label>` |
| Form association | Submits `"on"` when checked, omitted when unchecked (matches native checkbox) |
