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
<pf-v6-switch accessible-label="Wi-Fi" show-check-icon checked></pf-v6-switch>
```

### With external label

```html
<pf-v6-switch id="wifi"></pf-v6-switch>
<label for="wifi">Wi-Fi</label>
```

## Divergences from React `Switch`

### Intentionally omitted

| React prop | Notes |
|---|---|
| `defaultChecked` | React-only uncontrolled pattern; web components use the `checked` attribute directly |
| `labelOff` | Omitted per WAI-ARIA APG guidance. Switch labels must remain stable regardless of checked state. Dynamically changing labels confuse assistive technology users because the semantic context shifts alongside the state change -- the `switch` role already conveys on/off state. Teams using `labelOff` should redesign to use a single stable label describing the setting (e.g., "Notifications" rather than "Enabled"/"Disabled"). |

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
| `onChange` | `change` event | Standard DOM event; cancelable via `preventDefault()` to reject state change |

### Added

| Web component API | Notes |
|---|---|
| External `<label>` support | FACE element works with native `<label for="id">` or nesting in `<label>` |
| Form association | Submits `"on"` when checked, omitted when unchecked (matches native checkbox) |
| Form reset | Reverts to initial `checked` value on form reset |
| Cancelable `change` event | Call `preventDefault()` to reject the toggle and revert state |
