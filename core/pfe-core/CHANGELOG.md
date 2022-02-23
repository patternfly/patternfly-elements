# @patternfly/pfe-core

## 2.0.0-next.0
### Major Changes

- e8788c72: Initial Release 🎉
  
  `@patternfly/pfe-core` provides utilities for building PatternFly elements,
  like [TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) and
  [Lit reactive controllers](https://lit.dev/docs/composition/controllers/).
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
  @customElement('pfe-jazz-hands') @pfelement()
  export class PfeJazzHands extends LitElement {
    static readonly version = '{{version}}';
  
    @observed('_upgradeObserver')
    @property({ type: Boolean }) cool = true;
  }
  ```
  
  See README and [the docs](https://patternflyelements.org/core/core/) for more info.
