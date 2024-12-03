# @patternfly/pfe-core

## 4.0.4

### Patch Changes

- 4a03ced: SSR: add shim for `ResizeObserver`

## 4.0.3

### Patch Changes

- 7c855a6: `TabsARIAController`: improve SSR compatibility

## 4.0.2

### Patch Changes

- 0ec7338: `OverflowController`: prevent browser from locking up in some scenarios

## 4.0.1

### Patch Changes

- 43b97bf: `InternalsController`: prevent Safari-detector from breaking SSR

## 4.0.0

### Major Changes

- c9bd577: `RovingTabindexController`, `ListboxController`: constructor options were changed.
  In particular, the `initItems(items: Item[])` and `setActiveItem(item: Item)` methods
  were removed and replaced with the `getItems: () => Item[]` constructor option, and
  the `atFocusedItemIndex` accessor.

  **Before**:

  ```ts
  #tabindex = new RovingTabindexController(this);

  firstUpdated() {
    this.#tabindex.initItems(this.items);
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('activeItem')) {
      this.#tabindex.setActiveItem(this.activeItem);
    }
  }
  ```

  **After**:

  ```ts
  #tabindex = RovingTabindexController.of(this, {
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

- c9bd577: Removed global `pfeLog` feature
- c9bd577: Removed `window.PfeConfig` global config object
- c9bd577: Removed global `auto-reveal` feature
- c9bd577: **Decorators**: Added `@observes`. Use it to add property change callback by
  decorating them with the name of the property to observe

  ```ts
  @customElement("custom-button")
  class CustomButton extends LitElement {
    #internals = this.attachInternals();

    @property({ type: Boolean }) disabled = false;

    @observes("disabled")
    protected disabledChanged() {
      this.#internals.ariaDisabled = this.disabled
        ? "true"
        : this.ariaDisabled ?? "false";
    }
  }
  ```

  Breaking change: This commit makes some changes to the internal APIs of the
  pre-existing `@observed` observer, most notably it changes the constructor
  signature of the `PropertyObserverController` and associated functions. Most
  users should not have to make any changes, but if you directly import and use
  those functions, check the commit log to see how to update your call sites.

- c9bd577: Removed global `trackPerformance` feature

### Minor Changes

- c9bd577: ✨ Added `ActiveDescendantController`

  This controller implements the [WAI-ARIA activedescendant pattern][pattern]
  for keyboard and screen-reader accessibility.

  ```ts
  #activedescendant = ActivedescendantController.of(this, {
    getItems: () => this.options,
    getItemsContainer: () => this.#listbox,
    getOrientation: () => "vertical",
    getActiveDescendantContainer: () => this.#input,
    getControlsElements: () => [this.#input, this.#button].filter((x) => !!x),
    setItemActive: (item, active) => void (item.active = active),
  });
  ```

  [pattern]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant

- c9bd577: ✨ Added `ComboboxController`

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
    isItem: (item) => item instanceof PfOption,
    setItemActive: (item, active) => (item.active = active),
    setItemSelected: (item, selected) => (item.selected = selected),
  });
  ```

  [pattern]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

- 6d9045e: `InternalsController`: added static `isSafari` boolean flag
- c9bd577: **Decorators**: Added `@listen`. Use it to attach element event listeners to
  class methods.

  ```ts
  @customElement("custom-input")
  class CustomInput extends LitElement {
    @property({ type: Boolean }) dirty = false;
    @listen("keyup", { once: true })
    protected onKeyup() {
      this.dirty = true;
    }
  }
  ```

### Patch Changes

- c9bd577: updated dependencies
- c9bd577: `InternalsController`: corrected the types for aria IDL list attributes
- c9bd577: Context: `makeContextRoot` no longer crashes SSR processes

## 3.0.0

### Major Changes

- 1d89f73: `RovingTabindexController`: deprecate the `initItems` method and add `getItems` and `getItemContainer` instead

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

- 3766961: `@cascades`: deprecated `@cascades` decorator and `CascadeController`. Use context instead.

  **BEFORE**: The element in charge of the context cascades data down to
  specifically named children.

  ```ts
  import { LitElement } from "lit";
  import { property } from "lit/decorators/property.js";
  import { cascades } from "@patternfly/pfe-core/decorators/cascades.js";

  class MyMood extends LitElement {
    @cascades("my-eyes", "my-mouth")
    @property()
    mood: "happy" | "sad" | "mad" | "glad";
  }
  ```

  **AFTER**: children subscribe to updates from the context provider.

  ```ts
  import { LitElement } from "lit";
  import { property } from "lit/decorators/property.js";
  import { provide } from "@lit/context";
  import { createContextWithRoot } from "@patternfly/pfe-core/functions/context.js";

  export type Mood = "happy" | "sad" | "mad" | "glad";

  export const moodContext = createContextWithRoot<Mood>(Symbol("mood"));

  class MyMood extends LitElement {
    @provide({ context: moodContext })
    @property()
    mood: Mood;
  }
  ```

  ```ts
  import { LitElement } from "lit";
  import { property } from "lit/decorators/property.js";
  import { consume } from "@lit/context";
  import { moodContext, type Mood } from "./my-mood.js";

  class MyEyes extends LitElement {
    @consume({ context: moodContext, subscribe: true })
    @state()
    private mood: Mood;
  }
  ```

- 0d92145: `InternalsController`: made the constructor private. Use `InternalsController.of`

  BEFORE:

  ```js
  class PfJazzHands extends LitElement {
    #internals = new InternalsController(this);
  }
  ```

  AFTER:

  ```js
  class PfJazzHands extends LitElement {
    #internals = InternalsController.of(this);
  }
  ```

- de4cfa4: Remove `deprecatedCustomEvent`

### Minor Changes

- ac0c376: `SlotController`: Add `isEmpty` method to check if a slot is empty. If no slot name is provided it will check the default slot. (#2603)
  `SlotController`: `hasSlotted` method now returns default slot if no slot name is provided. (#2603)
- d4e5411: **Context**: added `createContextWithRoot`. Use this when creating contexts that
  are shared with child elements.
- c71bbe5: `InternalsController`: added `computedLabelText` read-only property
- c71bbe5: `InternalsController`: reflect all methods and properties from `ElementInternals`
- fa50164: `Logger`: loosen the type of allowed controller hosts
- fa50164: `OverflowController`: recalculate overflow when the window size changes and when tabs are dynamically created.
- 0d92145: `RovingTabindexController`: keyboard navigation includes first-character navigation.
- fa50164: `TabsAriaController`: Added TabsAriaController, used to manage the accesibility tree for tabs and panels.

  ```ts
  #tabs = new TabsAriaController(this, {
    isTab: (x: Node): x is PfTab => x instanceof PfTab,
    isPanel: (x: Node): x is PfTabPanel => x instanceof PfTabPanel,
  });
  ```

  Please review the [Tabs 2.4 to 3.0 migration guide](https://patternflyelements.org/migration/3.0/tabs) for more
  information.

### Patch Changes

- 24d43bd: `Logger`: add `Logger.info` and `Logger.debug`
- e62244f: `InternalsController`: added missing `ariaDescription` defined by ARIAMixin
- 24d43bd: `SlotController`: move debug logs to `Logger.debug`
- 50f462c: Update dependencies, including Lit version 3

## 2.4.1

### Patch Changes

- 5b16b3b04: `SlotController`: ensure first render is correct when used in certain javascript frameworks

## 2.4.0

### Minor Changes

- a81bcb133: **Controllers**: Added timestamp controller

### Patch Changes

- 7055add74: `FloatingDOMController`: fixed an incorrect typescript import

## 2.3.1

### Patch Changes

- c5d95880c: **roving-tabindex-controller**: fixes arrow keydown event listeners

## 2.3.0

### Minor Changes

- 78c8e4416: Added `StringListConverter` for managing comma-separated list attributes.

### Patch Changes

- 37c23c398: `overflow-controller`:
  - improves display calculations for overflow scroll buttons
  - adds smooth scroll behavior

## 2.2.0

### Minor Changes

- 83024fe5e: `roving-tabindex-controller`: notify the host when the focused item changes.
- 83024fe5e: `roving-tabindex-controller`: allow component authors to specify the type of items.

## 2.1.0

### Minor Changes

- e45f5eb5a: `roving-tabindex-controller`: enabled controller to be used by aria-expanded elements

## 2.0.0

### Major Changes

- e8788c7214: Initial Release 🎉

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
        },
      };
    }
  }
  PFElement.create(PfeJazzHands);
  ```

  ### After

  ```ts
  @customElement("pf-jazz-hands")
  export class PfJazzHands extends LitElement {
    @observed("_upgradeObserver")
    @property({ type: Boolean })
    cool = true;
    _upgradeObserver() {
      console.log("cool");
    }
  }
  ```

  ### Controllers

  - ✨ Added `FloatingDOMController` for use with components that require popover
    content. For example, in `BaseTooltip` we use the controller in this manner:

    ```typescript
    import { FloatingDOMController } from "@patternfly/pfe-core/controllers/floating-dom-controller.js";

    export class BaseTooltip extends LitElement {
      #domController = new FloatingDOMController(this);
    }
    ```

  - ✨ Added `InternalsController`, providing preliminary facility for
    ElementInternals
  - ✨ Added `ScrollSpyController` which sets an attribute (`active` by default)
    on one of it's children when that child's `href` attribute is to a hash
    reference to an ID'd heading on the page.
  - ✨ Added `RovingTabindexController` which implements roving tabindex, as
    described in WAI-ARIA practices. Added `RovingTabindexController`.

  See README and [the docs][docs] for more info.

  [decorators]: https://www.typescriptlang.org/docs/handbook/decorators.html
  [controllers]: https://lit.dev/docs/composition/controllers/
  [docs]: https://patternflyelements.org/core/core/

### Minor Changes

- 530ef7155: ✨ Added `OverflowController`

  When added to a container and given a child array of elements,
  `OverflowController` checks to see if those elements exceed the bounds of the
  container.

- 2e1fb5705: `InternalsController`: added `labels` and `validity` getters; added `setFormValue`, `setValidity`, `checkValidity` and `reportValidity` methods

### Patch Changes

- 5d3315fd4: Prepared release candidate

## 2.0.0-rc.2

### Minor Changes

- 530ef7155: ✨ Added `OverflowController`

  When added to a container and given a child array of elements,
  `OverflowController` checks to see if those elements exceed the bounds of the
  container.

- 2e1fb5705: `InternalsController`: added `labels` and `validity` getters; added `setFormValue`, `setValidity`, `checkValidity` and `reportValidity` methods

## 2.0.0-rc.1

### Patch Changes

- 5d3315fd: Prepared release candidate

## 2.0.0-next.14

### Minor Changes

- 82da44c11: ✨ Added `ScrollSpyController`
  ✨ Added `RovingTabindexController`

  - `ScrollSpyController` sets an attribute (`active` by default) on one of it's
    children when that child's `href` attribute is to a hash reference to an IDd
    heading on the page.
  - `RovingTabindexController` implements roving tabindex, as described in WAI-ARIA practices.

## 2.0.0-next.13

### Major Changes

- b841afe40: `FloatingDOMController`: Removed `popperjs` dependency and replaced it with
  `floating-ui` dependency.

  - removed the `initialized` property
  - removed the `create` method
  - added `show(options)` method with `placement` and `offset` options.
  - added `arrow`, `flip`, `padding`, and `shift` options
  - added read-only `alignment`, `anchor`, `placement`, and `styles` properties.
  - made `open` property read-only.

  Now, `FloatingDOMController`s constructor requires certain options, at least `content`, which is an `HTMLElement` or a function returning an `HTMLElement`.

  Before:

  ```ts
  class MyElement extends LitElement {
    #floating = new FloatingDOMController(this);
  }
  ```

  After:

  ```ts
  class MyElement extends LitElement {
    #floating = new FloatingDOMController(this, {
      content: () => this.shadowRoot.getElementById('content');
    });
  }
  ```

### Minor Changes

- 0fe6c52db: Added options to `InternalsController`. Use them to initialize `ARIA`
  properties.

  ```ts
    role: 'listbox',
  });
  ```

- 0fe6c52db: `InternalsController`: hook into host's `formDisabledCallback`

## 2.0.0-next.12

### Minor Changes

- 6b6e2617: Add InternalsController, providing preliminary facility for ElementInternals

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
