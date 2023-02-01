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

### Controllers
- ✨ Added `FloatingDOMController` for use with components that require popover 
  content. For example, in `BaseTooltip` we use the controller in this manner:

  ```typescript
  import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

  export class BaseTooltip extends LitElement {
    #domController = new FloatingDOMController(this);
  }
  ```
- ✨ Added `InternalsController`, providing preliminary facility for 
  ElementInternals
- ✨ Added `ScrollSpyController` which sets an attribute (`active` by default) 
  on one of it's children when that child's `href` attribute is to a hash 
  reference to an ID'd heading on the page.
- ✨ Added `RovingTabindexController` which  implements roving tabindex, as 
  described in WAI-ARIA practices.  Added `RovingTabindexController`. 

See README and [the docs][docs] for more info.

[decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html
[controllers]: https://lit.dev/docs/composition/controllers/
[docs]: https://patternflyelements.org/core/core/
