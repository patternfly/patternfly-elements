---
"@patternfly/pfe-core": minor
---
✨ Added `ComboboxController`

This controller implements the [WAI-ARIA combobox pattern][pattern] for both
select-only and inline autocomplete comboboxes.

```ts
#combobox = ComboboxController.of(this, {
  multi: this.multi,
  getItems: () => this.options,
  getFallbackLabel: () => this.accessibleLabel,
  getListboxElement: () => this._listbox ?? null,
  getToggleButton: () => this._toggleButton ?? null,
  getComboboxInput: () => this._toggleInput ?? null,
  isExpanded: () => this.expanded,
  requestShowListbox: () => void (this.expanded ||= true),
  requestHideListbox: () => void (this.expanded &&= false),
  setItemHidden: (item, hidden) => void (item.hidden = hidden),
  isItem: item => item instanceof PfOption,
  setItemActive: (item, active) => item.active = active,
  setItemSelected: (item, selected) => item.selected = selected,
});

```

[pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
