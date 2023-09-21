---
"@patternfly/pfe-core": minor
"@patternfly/elements": minor
---

Updated keyboard navigation to include first-character navigation for elements that use a roving tabindex for navigation (arrow keys instead of tabbing).

Added `<pf-chip-group>`

```html
  <pf-chip-group>
    <pf-chip>Chip 1</pf-chip>
    <pf-chip>Chip 2</pf-chip>
    <pf-chip>Chip 3</pf-chip>
    <pf-chip>Chip 4</pf-chip>
  </pf-chip-group>
```

Added `<pf-dropdown>`

```html
<pf-dropdown>
    <pf-dropdown-item>item4</pf-dropdown-item>
    <div role="separator"></div>
    <pf-dropdown-group label="Group 1">
        <pf-dropdown-item>item1</pf-dropdown-item>
        <pf-dropdown-item">item2</pf-dropdown-item>
        <div role="separator"></div>
        <pf-dropdown-item>item3</pf-dropdown-item>
    </pf-dropdown-group>
    <pf-dropdown-group label="Group 2">
        <pf-dropdown-item>item1</pf-dropdown-item>
        <pf-dropdown-item>item2</pf-dropdown-item>
    </pf-dropdown-group>
</pf-dropdown>
```

Added `<pf-select>`

```html
<pf-select>
  <pf-select-option>Blue</pf-select-option>
  <pf-select-option>Green</pf-select-option>
  <pf-select-option>Magenta</pf-select-option>
  <pf-select-option>Orange</pf-select-option>
  <pf-select-option>Purple</pf-select-option>
  <pf-select-option>Pink</pf-select-option>
  <pf-select-option>Red</pf-select-option>
  <pf-select-option>Yellow</pf-select-option>
</pf-select>
```
