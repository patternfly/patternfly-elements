---
"@patternfly/elements": minor
---

Added `<pf-label-group>`.

A **label group** is a collection of labels that can be grouped by category
and used to represent one or more values assigned to a single attribute.
When the number of labels exceeds the configured limit, additional labels
are hidden under an overflow indicator.

```html
<pf-label-group>
  <span slot="category">Filters</span>
  <pf-label removable>Security</pf-label>
  <pf-label removable>Performance</pf-label>
  <pf-label removable>Networking</pf-label>
</pf-label-group>
```
