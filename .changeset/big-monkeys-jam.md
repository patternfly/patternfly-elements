---
"@patternfly/pfe-tooltip": minor
---

Adds styles to slotted timestamps.

```html
<pfe-tooltip position="top">
  <pfe-timestamp
    date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"
  ></pfe-timestamp>
  <span slot="content"
    >Last updated on
    <pfe-timestamp
      date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"
      date-format="long"
      time-format="short"
      display-suffix="UTC"
      utc
    >
    </pfe-timestamp>
  </span>
</pfe-tooltip>
```
