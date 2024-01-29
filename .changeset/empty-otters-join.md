---
"@patternfly/pfe-core": major
---

`RovingTabindexController`: deprecate the `initItems` method and add `getItems` and `getItemContainer` instead

BEFORE:
```ts
#tabindex = new RovingTabindexController(this);
constructor() {
  super();
  this.#tabindex.initItems(this.#items);
}
```

AFTER:
```ts
#tabindex = new RovingTabindexController(this, {
  getItems: () => this.#items,
});
```

