---
"@patternfly/pfe-core": minor
---
✨ Added `ActiveDescendantController`

This controller implements the [WAI-ARIA activedescendant pattern][pattern]
for keyboard and screen-reader accessibility.

```ts
#activedescendant = ActivedescendantController.of(this, {
  getItems: () => this.options,
  getItemsContainer: () => this.#listbox,
  getOrientation: () => 'vertical',
  getActiveDescendantContainer: () => this.#input,
  getControlsElements: () => [this.#input, this.#button].filter(x => !!x),
  setItemActive: (item, active) => void (item.active = active),
});
```

[pattern]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant
