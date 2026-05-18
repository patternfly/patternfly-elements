# pf-v6-timestamp

A timestamp provides consistent formats for displaying date and time values.

## Usage

### Basic date and time

```html
<pf-v6-timestamp date="Mon Jan 2 15:04:05 EST 2006"
                 date-format="full"
                 time-format="long">
</pf-v6-timestamp>
```

### Relative time

```html
<pf-v6-timestamp date="Mon Jan 2 15:04:05 EST 2006" relative>
</pf-v6-timestamp>
```

### With tooltip (UTC display)

```html
<pf-v5-tooltip>
  <pf-v6-timestamp help-text></pf-v6-timestamp>
  <pf-v6-timestamp slot="content" utc></pf-v6-timestamp>
</pf-v5-tooltip>
```

## Divergences from React `Timestamp`

### Not implemented

| React prop | Notes |
|---|---|
| `tooltip` | Use composition with `<pf-v5-tooltip>` wrapping the timestamp instead. The web component pattern favors slot-based composition over configuration objects. |
| `shouldDisplayUTC` | Use the `utc` attribute instead, which is functionally equivalent. |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `is12Hour` | `hour-12` attribute | Renamed to dash-case per HTML convention. Supports `hour-12="false"` for explicit 24-hour. |
| `date` (Date object) | `date` attribute (string) | Accepts any string parseable by `new Date()` rather than a Date object, since HTML attributes are strings. |
| `customFormat` (prop) | `.customFormat` property | Set via JavaScript property only (not reflectable as attribute). |
| `tooltip.variant="default"` | `help-text` + composition | Dashed underline from `help-text` attr; tooltip via `<pf-v5-tooltip>` wrapping. |
| `children` | Default slot | Slotted content replaces computed display, matching web component conventions. |

### Added

| Web component API | Notes |
|---|---|
| `help-text` attribute | Boolean attribute that applies the dashed-underline "help text" styling from the v6 design system, indicating a tooltip is available. |
| Default slot | Slot for custom display content (e.g. relative time text). The `datetime` attribute on the inner `<time>` element is still set from the `date` attribute. |
| `utc` attribute | Displays time in UTC with "UTC" suffix. Equivalent to React's `shouldDisplayUTC`. |
| `.isoString` property | Read-only ISO 8601 string of the current date value. |
| `.time` property | Read-only formatted display string. |
