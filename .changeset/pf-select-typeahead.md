---
"@patternfly/elements": minor
---
✨ Added `<pf-select variant="typeahead">`

A typeahead select is an inline-autocomplete combobox.

```html
<label for="state">State</label>
<pf-select id="state"
           variant="typeahead"
           placeholder="Select a state">
  <pf-option value="Alabama"
             description="The heart of Dixie"></pf-option>
  <pf-option value="Florida"
             description="The sunshine state"
             disabled></pf-option>
  <pf-option value="New Jersey"></pf-option>
  <pf-option value="New York"></pf-option>
  <pf-option value="New Mexico"></pf-option>
  <pf-option value="North Carolina"></pf-option>
</pf-select>
```
