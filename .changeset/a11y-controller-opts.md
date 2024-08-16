---
"@patternfly/pfe-core": major
---
`RovingTabindexController`, `ListboxController`: constructor options were changed. 
In particular, the `initItems(items: Item[])` and `setActiveItem(item: Item)` methods
were removed and replaced with the `getItems: () => Item[]` constructor option, and 
the `atFocusedItemIndex` accessor.

BEFORE:

```ts
#tabindex = new TabindexController(this);

firstUpdated() {
  this.#tabindex.initItems(this.items);
}

updated(changed: PropertyValues<this>) {
  if (changed.has('activeItem')) {
    this.#tabindex.setActiveItem(this.activeItem);
  }
}
```

AFTER:

```ts
#tabindex = new TabindexController(this, {
  getItems: () => this.items,
});

updated(changed: PropertyValues<this>) {
  if (changed.has('activeItem')) {
    this.#tabindex.atFocusedItemIndex = this.items.indexOf(this.activeItem);
  }
}
```


**For further migration guidance**, please see the [sources in `@patternfly/pfe-core`][sources],
especially:
- `ATFocusController.ts`,
- `RovingTabindexController.ts`, and
- `ListboxController.ts`.

[sources]: https://github.com/patternfly/patternfly-elements/tree/main/core/pfe-core/controllers/
