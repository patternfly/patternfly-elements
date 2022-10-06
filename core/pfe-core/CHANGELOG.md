# @patternfly/pfe-core

## 2.0.0-next.9

### Minor Changes

- 166ecee1: Improves performance of floating DOM (tooltip) by lazily initializing

## 2.0.0-next.8

### Patch Changes

- bfad8b4b: Updates dependencies

## 2.0.0-next.7

### Minor Changes

- 7c9b85cc: Adds floating DOM controller into pfe-core for use with components that require popover content.

  For example, in `BaseTooltip` we use the controller in this manner:

  ```typescript
  import { FloatingDOMController } from "@patternfly/pfe-core/controllers/floating-dom-controller.js";

  export class BaseTooltip extends LitElement {
    #domController = new FloatingDOMController(this);
  }
  ```

## 2.0.0-next.6

### Patch Changes

- 34ecd410: `SlotController` now correctly initializes when given a single string slot name as config argument

## 2.0.0-next.5

### Patch Changes

- 55e843c8: - If `on` attribute is set in HTML, it overrides color context from providers

## 2.0.0-next.4

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

## 2.0.0-next.3

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error

## 2.0.0-next.2

### Patch Changes

- c84a4366: Explicitly adds each module to the export map

## 2.0.0-next.1

### Patch Changes

- 999cdfdd: Register context providers even if they upgrade after the consumers

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
        },
      };
    }
  }
  PFElement.create(PfeJazzHands);
  ```

  ### After

  ```ts
  @customElement("pfe-jazz-hands")
  @pfelement()
  export class PfeJazzHands extends LitElement {
    static readonly version = "{{version}}";

    @observed("_upgradeObserver")
    @property({ type: Boolean })
    cool = true;
  }
  ```

  See README and [the docs](https://patternflyelements.org/core/core/) for more info.
