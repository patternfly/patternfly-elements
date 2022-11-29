# @patternfly/pfe-core

## 2.0.0-next.11

### Minor Changes

- b6bb3818: ### pfe-tabs: Rewrites `<pfe-tabs>` to align with Patternfly v4.

  With this change we are adding base class components `BaseTabs`, `BaseTab`, and `BaseTabPanel` which
  can be extended for uses in other components in child repositories such as RHDS. Also aligns the API
  and style closer to that of PatternFly v4.

  ```html
  <pfe-tabs>
    <pfe-tab slot="tab" id="users">Users</pfe-tab>
    <pfe-tab-panel>Users</pfe-tab-panel>
    <pfe-tab slot="tab">Containers</pfe-tab>
    <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
    <pfe-tab slot="tab">Database</pfe-tab>
    <pfe-tab-panel>
      <pfe-icon slot="icon" icon="rh-atom"></pfe-icon>
      <!-- <pfe-icon> or <svg> -->
      Database
    </pfe-tab-panel>
    <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
    <pfe-tab-panel>Disabled</pfe-tab-panel>
    <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
    <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
  </pfe-tabs>
  ```

  For now, does not implement:

  - sub tabs feature
  - nav element feature
  - separate content (trigger) feature
  - child tab-panel mounting features
  - dynamic closable tabs feature
  - loading a tab via external toggle

  These feature sets can be added retroactively.

  ### pfe-core: Adds `isElementInView.ts` function to pfe-core

  The `isElementInView` function is borrowed from the [Patternfly React core helper utilities](https://github.com/patternfly/patternfly-react/blob/main/packages/react-core/src/helpers/util.ts).

## 2.0.0-next.10

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`

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
