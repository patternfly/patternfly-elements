---
"@patternfly/elements": minor
---

✨ Introduced `<pf-label-group>`.

A label group displays multiple labels together, helping users visualize related categories, filters, or items.  
Each label can be removed individually, and the entire group can also be cleared at once.  
The element automatically handles overflow for long lists of labels and supports both horizontal and vertical layouts.

Use this when you need to show multiple tags, filters, or categorized items that users can remove or adjust dynamically.  
Avoid using it for single, standalone labels — consider using `<pf-label>` instead.

```html
<pf-label-group label="Filters">
  <pf-label removable>Security</pf-label>
  <pf-label removable>Performance</pf-label>
  <pf-label removable>Networking</pf-label>
</pf-label-group>
