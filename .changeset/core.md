---
"@patternfly/pfe-core": major
---

Initial Release 🎉

`@patternfly/pfe-core` provides utilities for building PatternFly elements,
like [TypeScript decorators][decorators] and [Lit reactive controllers][controllers].
Core utilities replace the `PFElement` base class.

### Before

```js
export class PfeJazzHands extends PFElement {
  static get tag() {
    return "pfe-jazz-hands";
  }

  static get properties() {
    return {
      cool: {
        type: Boolean,
        observer: "_upgradeObserver",
      }
    }
  }
}
PFElement.create(PfeJazzHands);
```

### After

```ts
@customElement('pf-jazz-hands')
export class PfJazzHands extends LitElement {
  @observed('_upgradeObserver')
  @property({ type: Boolean }) cool = true;
  _upgradeObserver() {
    console.log('cool');
  }
}
```

See README and [the docs][docs] for more info.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html
[controllers]: https://lit.dev/docs/composition/controllers/
[docs]: https://patternflyelements.org/core/core/
