---
"@patternfly/elements": major
---

Added `<pf-v6-timestamp>` replacing `<pf-v5-timestamp>`. Timestamp now follows
PatternFly v6 design specs.

```html
<pf-v6-timestamp date="Mon Jan 2 15:04:05 EST 2006"
                 date-format="full"
                 time-format="long">
</pf-v6-timestamp>
```

**Breaking Changes from v5**

- `<pf-v5-timestamp>` renamed to `<pf-v6-timestamp>`
- `utc` boolean attribute replaced with `time-zone` string attribute accepting
  any IANA timezone identifier (e.g. `time-zone="UTC"`,
  `time-zone="America/New_York"`)
- `hour-12` boolean attribute replaced with `hour-cycle` enum attribute
  accepting Intl values: `h11`, `h12`, `h23`, `h24`
- `help-text` attribute removed; tooltip styling is a composition pattern
  using `<pf-v5-tooltip>` wrapping
- `date` getter now returns ISO 8601 string instead of locale-formatted string
- `display-suffix` no longer auto-set to "UTC" when using UTC timezone; set
  `display-suffix="UTC"` explicitly if needed

**New features**

- `time-zone` attribute for any IANA timezone, not just UTC
- `hour-cycle` attribute for precise hour format control
- Default slot for custom display content
- v6 design tokens
