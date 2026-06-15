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

### Timezone display

```html
<pf-v6-timestamp time-zone="UTC" display-suffix="UTC"></pf-v6-timestamp>
<pf-v6-timestamp time-zone="America/New_York"></pf-v6-timestamp>
```

### Hour cycle

```html
<!-- Force 24-hour display -->
<pf-v6-timestamp hour-cycle="h23"></pf-v6-timestamp>
<!-- Force 12-hour display -->
<pf-v6-timestamp hour-cycle="h12"></pf-v6-timestamp>
```

### With tooltip (composition pattern)

Tooltip support uses composition with `<pf-v5-tooltip>` rather than built-in
configuration. Use an anchor element around the trigger for keyboard
accessibility.

```html
<pf-v5-tooltip>
  <a href="#">
    <pf-v6-timestamp></pf-v6-timestamp>
  </a>
  <pf-v6-timestamp slot="content" time-zone="UTC" display-suffix="UTC">
  </pf-v6-timestamp>
</pf-v5-tooltip>
```

## Divergences from React `Timestamp`

### Not implemented

| React prop | Notes |
|---|---|
| `tooltip` | Use composition with `<pf-v5-tooltip>` wrapping the timestamp instead. The web component pattern favors slot-based composition over configuration objects. See demos for examples. |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `is12Hour={true}` | `hour-cycle="h12"` | Uses the Intl.DateTimeFormat `hourCycle` enum (`h11`, `h12`, `h23`, `h24`) instead of a boolean. More expressive: `h23` and `h24` give two 24-hour variants, `h11` and `h12` give two 12-hour variants. Absence uses locale default (same as omitting `is12Hour` in React). |
| `is12Hour={false}` | `hour-cycle="h23"` | `h23` is the standard 24-hour format (0-23 range). |
| `shouldDisplayUTC` | `time-zone="UTC"` | Accepts any IANA timezone identifier, not just UTC. For the "UTC" suffix shown in React's default tooltip, add `display-suffix="UTC"`. |
| `date` (Date object) | `date` attribute (string) | Accepts any string parseable by `new Date()` rather than a Date object, since HTML attributes are strings. The `date` getter returns the ISO 8601 string for round-tripping. |
| `customFormat` (prop) | `.customFormat` property | Set via JavaScript property only (not reflectable as attribute). |
| `tooltip.variant="default"` | Composition with `<pf-v5-tooltip>` | Tooltip via wrapping; keyboard a11y via `<a>` element. |
| `children` | Default slot | Slotted content replaces computed display, matching web component conventions. |

### Added

| Web component API | Notes |
|---|---|
| `time-zone` attribute | Accepts any IANA timezone identifier (e.g. `UTC`, `America/New_York`, `Europe/London`). Strictly more powerful than React's boolean `shouldDisplayUTC`. |
| `hour-cycle` attribute | Accepts `h11`, `h12`, `h23`, `h24` per the Intl.DateTimeFormat spec. Strictly more expressive than React's boolean `is12Hour`. |
| Default slot | Slot for custom display content (e.g. relative time text). The `datetime` attribute on the inner `<time>` element is still set from the `date` attribute. |
