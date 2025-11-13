---
"@patternfly/elements": minor
---

Introduced `<pf-label-group>` with add-label functionality.

A label group displays multiple labels together, helping users visualize related categories, filters, or items.  
Each label can be removed individually, and the entire group can also be cleared at once.  
The element automatically handles overflow for long lists of labels and supports both horizontal and vertical layouts.

This release adds support for **adding new labels** dynamically through different modes:

- `none`: No add-label UI.
- `autoNoEdit`: Automatically adds a new label without user input.
- `fromList`: Shows a dropdown list of predefined labels to choose from.
- `customForm`: Opens a custom form for entering a new label's text, color, icon, and dismissable option.

Use this when you need to show multiple tags, filters, or categorized items that users can remove, add, or adjust dynamically.  
Avoid using it for single, standalone labels — consider using `<pf-label>` instead.

```html
<pf-label-group label="Filters" add-label-mode="fromList">
  <pf-label removable>Security</pf-label>
  <pf-label removable>Performance</pf-label>
  <pf-label removable>Networking</pf-label>
</pf-label-group>

