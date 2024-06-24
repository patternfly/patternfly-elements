# @patternfly/elements

## 3.0.2

### Patch Changes

- 9702278: `<pf-clipboard-copy>`: corrected size of copy button

## 3.0.1

### Patch Changes

- afac682: `<pf-select>`: fixed computed button label when the placeholder attribute is present
- 6aa674a: `<pf-spinner>`: improved screen-reader accessibility

## 3.0.0

### Major Changes

- 16d0dd7: `<pf-modal>`: remove deprecated `width` attribute. use `variant` instead
- b9bb7e3: `<pf-button>`: improves accessibility of elements that use `<pf-button>` by giving the custom element itself the `button` role
- de4cfa4: Remove `/elements/pf-icon/icons/**/*`. Use `@patternfly/icons` instead.
- de4cfa4: `<pf-accordion>`: use patternfly design tokens. removes `--accordion__bordered--Color`
- 50f462c: Update dependencies, including Lit version 3
- 67eb59c: `<pf-switch>`: Reimplemented label API improving accessibility.

  ```html
  <!-- BEFORE: -->
  <pf-switch id="checked" checked show-check-icon></pf-switch>
  <label for="checked" data-state="on">Message when on</label>
  <label for="checked" data-state="off">Message when off</label>
  <!-- AFTER: -->
  <pf-switch id="checked" checked show-check-icon></pf-switch>
  <label for="checked">
    <span data-state="on">Message when on</span>
    <span data-state="off" hidden>Message when off</span>
  </label>
  ```

### Minor Changes

- fa50164: `<pf-tabs>`: improved overflow handling, added dynamic tab creation support
- 22d7536: ✨ Added `<pf-back-to-top>`

  ```html
  <pf-back-to-top href="#top" scrollable-selector="main"
    >Back to Top</pf-back-to-top
  >
  ```

- 292d3e9: ✨ Added `<pf-background-image>`

  ```html
  <pf-background-image
    src="/path/to/image.jpg"
    src-2x="/path/to/image@2x.jpg"
    src-sm="/path/to/image-768.jpg"
    src-sm-2x="/path/to/image-768@2x.jpg"
    src-lg="/path/to/image-992.jpg"
  ></pf-background-image>
  ```

- 0d92145: ✨ Added `<pf-chip>`

  A **chip** is used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.

  ```html
  <pf-chip-group>
    <pf-chip>Chip 1</pf-chip>
    <pf-chip>Chip 2</pf-chip>
    <pf-chip>Chip 3</pf-chip>
    <pf-chip>Chip 4</pf-chip>
  </pf-chip-group>
  ```

- 0d92145: ✨ Added `<pf-dropdown>`

  A **dropdown** presents a menu of actions or links in a constrained space that
  will trigger a process or navigate to a new location.

  ```html
  <pf-dropdown>
    <pf-dropdown-item>item4</pf-dropdown-item>
    <hr />
    <pf-dropdown-group label="Group 1">
      <pf-dropdown-item>item1</pf-dropdown-item>
      <pf-dropdown-item>item2</pf-dropdown-item>
      <hr />
      <pf-dropdown-item>item3</pf-dropdown-item>
    </pf-dropdown-group>
    <pf-dropdown-group label="Group 2">
      <pf-dropdown-item>item1</pf-dropdown-item>
      <pf-dropdown-item>item2</pf-dropdown-item>
    </pf-dropdown-group>
  </pf-dropdown>
  ```

- 0d92145: ✨ Added `<pf-select>`

  A select list enables users to select one or more items from a list.

  ```html
  <label for="color">Pick a color</label>
  <pf-select id="color" placeholder="Blue">
    <pf-option>Blue</pf-option>
    <pf-option>Green</pf-option>
    <pf-option>Magenta</pf-option>
    <pf-option>Orange</pf-option>
    <pf-option>Purple</pf-option>
    <pf-option>Pink</pf-option>
    <pf-option>Red</pf-option>
    <pf-option>Yellow</pf-option>
  </pf-select>
  ```

- c71bbe5: ✨ Added `<pf-text-area>`

  ```html
  <form>
    <pf-text-area
      id="textarea"
      name="comments"
      placeholder="OpenShift enabled our team to..."
      resize="vertical"
      auto-resize
      required
    ></pf-text-area>
  </form>
  ```

- 2c019ac: `<pf-text-input>`: adds `helper-text`, `error-text`, and `validate-on` attributes. Forwards `pattern` attribute

  ```html
  <pf-text-input
    id="validated"
    error-text="Enter a three digit integer"
    helper-text="How much wood could a woodchuck chuck?"
    validate-on="blur"
    pattern="\d{3}"
    required
  ></pf-text-input>
  <pf-button id="validate">Validate</pf-button>
  ```

- 45a1a27: `<pf-text-input>`: added `placeholder` attribute

### Patch Changes

- 1bdc31a: `<pf-accordion>`: remove animations which are not present in PatternFly specs
- 8e52f62: `<pf-dropdown>`: ensure that dropdown menu contents are accessible to keyboard
  and screen-reader users even when the dropdown or its toggle is disabled.
- 02d7e71: `<pf-text-area>`: auto-resize attribute now works as expected
- 3d7ce5a: `<pf-text-input>`: pressing `Enter` will request to submit the form
- bdb2b39: `<pf-tabs>`: improved screen-reader accessibility
- 8e52f62: `<pf-button>`: show slotted icon when it is present
- 0d92145: `<pf-popover>`: deprecate `closeButtonLabel` property / `close-label` attribute in favor of `accessibleCloseLabel` property / `accessible-close-label` attribute

  Before:

  ```html
  <pf-popover close-label="סגירה">...</pf-popover>
  ```

  After:

  ```html
  <pf-popover accessible-close-label="סגירה">...</pf-popover>
  ```

- a958d52: `<pf-chip-group>`: ensures that overflow and close buttons are keyboard accessible via arrow keys
- 5371c5b: `<pf-popover>`: prevent appearance of an unwanted scrollbar in some cases where
  popover is positioned at the far edge of the viewport
- Updated dependencies [ac0c376]
- Updated dependencies [d4e5411]
- Updated dependencies [1d89f73]
- Updated dependencies [3766961]
- Updated dependencies [c71bbe5]
- Updated dependencies [c71bbe5]
- Updated dependencies [0d92145]
- Updated dependencies [24d43bd]
- Updated dependencies [fa50164]
- Updated dependencies [de4cfa4]
- Updated dependencies [fa50164]
- Updated dependencies [e62244f]
- Updated dependencies [0d92145]
- Updated dependencies [24d43bd]
- Updated dependencies [fa50164]
- Updated dependencies [50f462c]
  - @patternfly/pfe-core@3.0.0

## 2.4.0

### Minor Changes

- cf5abb548: ✨ Added `<pf-banner>`

  ```html
  <pf-banner variant="info" icon="info" sticky>
    Important information.
  </pf-banner>
  ```

- 23bf9b278: ✨ Added `<pf-table>`

  ```html
  <pf-table>
    <pf-thead>
      <pf-tr>
        <pf-th>Repositories</pf-th>
        <pf-th>Branches</pf-th>
        <pf-th>Pull requests</pf-th>
        <pf-th>Workspaces</pf-th>
        <pf-th>Last commit</pf-th>
      </pf-tr>
    </pf-thead>
    <pf-tr>
      <pf-th>one</pf-th>
      <pf-td>two</pf-td>
      <pf-td>three</pf-td>
      <pf-td>four</pf-td>
      <pf-td>five</pf-td>
    </pf-tr>
    <pf-tr>
      <pf-th>one - 2</pf-th>
      <pf-td></pf-td>
      <pf-td></pf-td>
      <pf-td>four - 2</pf-td>
      <pf-td>five - 2</pf-td>
    </pf-tr>
    <pf-tr>
      <pf-th>one - 3</pf-th>
      <pf-td>two - 3</pf-td>
      <pf-td>three - 3</pf-td>
      <pf-td>four - 3</pf-td>
      <pf-td>five - 3</pf-td>
    </pf-tr>
  </pf-table>
  ```

  This is an initial release, that implements a subset of the features of upstream
  PatternFly's table component. APIs can be expected to change.

- c07281813: ✨ Added `<pf-text-input>`

  ```html
  <label>
    Text Input
    <pf-text-input></pf-text-input>
  </label>
  ```

- dcdbce66d: `<pf-tooltip>`: added `no-flip` and `flip-behaviour` attributes as in `<pf-popover>`
- dcdbce66d: `<pf-tooltip>` added the `trigger` attribute to specify a tooltip-invoking
  element outside of the tooltip's children.

  ```html
  <pf-button id="button">Button</pf-button>
  <pf-tooltip trigger="button" content="I'm a button!"></pf-tooltip>
  ```

- dcdbce66d: ✨ Added `<pf-progress>`

  ```html
  <pf-progress description="Default" value="33"></pf-progress>
  ```

- b9f86f8af: `<pf-tabs>`: add `isExpandEvent` static method, to help prevent name conflicts

  ```js
  import { PfTabs } from "@patternfly/elements/pf-tabs/pf-tabs.js";
  document.addEventListener("expand", function (event) {
    if (PfTabs.isExpandEvent(event)) {
      // a pf-tabs' tab has expanded
    }
  });
  ```

### Patch Changes

- 69021bbb4: Restores support for Safari 16.3 (by compiling element sources to ECMAScript 2020)
- dd2d5b713: `<pf-accordion>`: fixed focus event triggering incorrect tabindex
- da84c1019: `<pf-accordion>`: fixed issue with panels collapsing when a child checkbox was toggled.
- 343d5979f: `<pf-card>`: improved slotted content layout
- dcdbce66d: `<pf-tooltip>`: marks `BaseTooltip` and it's stylesheet as deprecated.
  The files will remain in place until the next major version.
- 1723146e6: `<pf-tabs>`: corrected the name of the `expand` event in the custom elements manifest

## 2.3.2

### Patch Changes

- 91850fbf8: fixed TypeScript typings for react wrappers

## 2.3.1

### Patch Changes

- 1924229ea: Generate TypeScript typings for React wrapper components

## 2.3.0

### Minor Changes

- c4170a595: PatternFly elements are now available wrapped in React components. While it was
  always possible to use PatternFly elements (or any other custom elements) in
  React apps, this release makes it easier to integrate them into React without
  the need for cumbersome workarounds to React's [poor HTML and DOM support][cee].

  Before:

  ```jsx
  import { useEffect, useState, useRef } from "react";
  import "@patternfly/elements/pf-switch/pf-switch.js";

  function App() {
    const [checked, setChecked] = useState(false);
    const switchRef = useRef(null);
    useEffect(() => {
      switchRef.current.checked = checked;
    }, [switchRef.current, checked]);
    useEffect(() => {
      switchRef.current.addEventListener("change", () =>
        setChecked(switchRef.current.checked)
      );
    }, [switchRef.current]);
    return (
      <>
        <pf-switch ref={switchRef}></pf-switch>
      </>
    );
  }
  ```

  After:

  ```jsx
  import { useState } from "react";
  import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";

  function App() {
    const [checked, setChecked] = useState(false);
    return (
      <>
        <Switch
          checked={checked}
          onChange={({ target }) => setChecked(target.checked)}
        />
      </>
    );
  }
  ```

  [cee]: https://custom-elements-everywhere.com/#react

### Patch Changes

- f4a7ae7d7: `<pf-accordion>`: update the `expandedIndex` DOM property on change
- Updated dependencies [7055add74]
- Updated dependencies [a81bcb133]
  - @patternfly/pfe-core@2.4.0

## 2.2.2

### Patch Changes

- 5f2e653c1: `<pf-tabs>`: prevent error when using tabs-panel with certain frameworks or imperative javascript code

## 2.2.1

### Patch Changes

- 78f3333c5: `<pf-tabs>`: fixed style regression on tab when a slotted icon is not present
- 2ba0b4360: `<pf-popover>`: prevent memory leak by removing event listeners event on popover close

## 2.2.0

### Minor Changes

- 12c59e9ac: `<pf-icon>`: allow `getIconUrl` to return a string, permitting users to import
  icons from 'bare module specifiers'.

### Patch Changes

- c5d95880c: `<pf-accordion>`: fixed keyboard navigation inside of nested accordions
- a2e88b511: `<pf-tabs>`: fix vertical alignment of slotted icons
- 12c59e9ac: `<pf-icon>`: use fontawesome 5 icons. **NOTE**: imports from
  `@patternfly/elements/pf-icon/icons/` are deprecated and will be removed in the
  next major version.
- 6adf530c4: `<pf-tabs>`: prevent error when using in certain javascript frameworks
- 881c8a505: `<pf-timestamp>`: improved performance by using browser-standard features to calculate relative time
- Updated dependencies [c5d95880c]
  - @patternfly/pfe-core@2.3.1

## 2.1.0

### Minor Changes

- 78c8e4416: ✨ Added `<pf-popover>`

  ```html
  <pf-popover
    heading="Popover heading"
    body="Popovers are triggered by click rather than hover."
    footer="Popover footer"
  >
    <pf-button>Toggle popover</pf-button>
  </pf-popover>
  ```

- 9266ee5de: `<pf-button>`: expose `button` part for styling the internal button element

### Patch Changes

- 5a6683bf9: `<pf-tabs>`: improved accessibility for elements extending `BaseTab` and
  `BaseTabPanel` by assigning random IDs when no exists.
- 32eecd6c1: `BaseTab`:
  - fixed Safari focus issue on keyboard navigation
  - fixed Safari focus issue on mouse click
- Updated dependencies [78c8e4416]
- Updated dependencies [37c23c398]
  - @patternfly/pfe-core@2.3.0

## 2.0.5

### Patch Changes

- 0895f5078: `<pf-accordion>`: prevented `expanded` accordion headers from stealing focus when the page loads.

## 2.0.4

### Patch Changes

- 83024fe5e: `<pf-tabs>`: improved keyboard navigation so it correctly activates the focused tab
- Updated dependencies [83024fe5e]
- Updated dependencies [83024fe5e]
  - @patternfly/pfe-core@2.2.0

## 2.0.3

### Patch Changes

- 9fd329e21: `<pf-panel>`: fixed raised and bordered variants

## 2.0.2

### Patch Changes

- af77424f8: `<pf-accordion>`: fixed issue where accent would not display full height if the
  `large` attribute was set on `<pf-accordion>` and `<pf-accordion-panel>` slotted
  content had padding or margins
- caabed634: `<pf-accordion-header>`: fixed duplicated/nested headings when slotted heading
  elements are used instead of the `header-text` attribute.
- caabed634: `<pf-accordion-header>`: fixed broken `header-tag` and `header-text` attributes
- ed747e98e: `<pf-switch>`: documented the `change` event

## 2.0.1

### Patch Changes

- 77ce9f78e: `<pf-clipboard-copy>`: prevent component's internal layout from wrapping lines
- 708824d46: `<pf-jump-links>`: improved accessibility for keyboard users
- 5905246fd: `<pf-clipboard-copy>`: fixed icon size and input-group CSS styles
- Updated dependencies [e45f5eb5a]
  - @patternfly/pfe-core@2.1.0

## 2.0.0

### Major Changes

- 2a3048cb6: PatternFly Elements 2.0 is a major rewrite of the project.
  It brings PFE in-line with PatternFly React in terms of design specs
  and modernizes the codebase with [Lit][lit] and [TypeScript][ts]. It adds a
  versatile set of tools for managing and building elements, and focuses more on
  cutting-edge web technologies like [form-associated custom elements][FACE] and
  [CSS shadow parts][css-shadow].

  ### Breaking Changes

  - 🔥 Migrated elements to [Lit][lit]: initial render made [asynchronous][async].
    If your code assumes that shadow DOM is ready once the element is constructed,
    ensure you first `await element.updateComplete`
  - ♻️ Reimplemented elements in line with [PFv4][PFv4] design specs
  - 🍱 Combined all elements into a single package: `@patternfly/elements`
  - 🥨 Renamed all element prefixes from `pfe-` to `pf-`.
    ```html
    <!-- BEFORE: -->
    <pfe-button>Cancel</pfe-button>
    <!-- AFTER: -->
    <pf-button>Ok</pf-button>
    ```
  - ❌ Removed `@patternfly/pfe-styles` package
  - ❌ Removed `@patternfly/pfe-sass` package
  - ❌ Removed `<pfe-autocomplete>`, pending rewrite to `<pf-search-input>` ([#2115][autocomplete]).
  - ❌ Removed `<pfe-collapse>`
  - ❌ Removed `<pfe-dropdown>`, pending rewrite to `<pf-dropdown>` ([#2049][dropdown]).
  - ❌ Removed `<pfe-health-index>`
  - ❌ Removed `<pfe-icon-panel>`
  - ❌ Removed `<pfe-markdown>`
  - ❌ Removed `<pfe-number>`
  - ❌ Removed `<pfe-page-status>`
  - ❌ Removed `<pfe-primary-detail>`
  - ❌ Removed `<pfe-select>`, pending rewrite to `<pf-select>` ([#2145][select]).
  - ❌ Removed `<pfe-toast>`

  [lit]: https://lit.dev
  [ts]: https://typescriptlang.org
  [FACE]: https://bennypowers.dev/posts/form-associated-custom-elements/
  [css-shadow]: https://w3c.github.io/csswg-drafts/css-shadow-parts/#part
  [async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
  [PFv4]: https://patternfly.org/v4/
  [autocomplete]: https://github.com/patternfly/patternfly-elements/issues/2115
  [dropdown]: https://github.com/patternfly/patternfly-elements/issues/2049
  [select]: https://github.com/patternfly/patternfly-elements/issues/2145

- 2e3504582: ✨ Added `<pf-accordion>` and removed `<pfe-accordion>`. Accordion now closely
  follows PatternFly design specs.

  ```html
  <pf-accordion>
    <pf-accordion-header expanded>
      <h3>Getting Started</h3>
    </pf-accordion-header>
    <pf-accordion-panel>
      <p>
        Read our <a href="/get-started/">Getting started</a> page to learn how
        to install and use PatternFly Elements.
      </p>
    </pf-accordion-panel>
    <pf-accordion-header>
      <h3>HTML APIs</h3>
    </pf-accordion-header>
    <pf-accordion-panel>
      <p>
        For more information on how to use each PatternFly element, read the
        <a href="/components/">component docs</a>.
      </p>
    </pf-accordion-panel>
  </pf-accordion>
  ```

  ### Breaking Changes

  - ❌ Removed `pfe-accordion:change`, `pfe-accordion:expand`, and `pfe-accordion:collapse` event. Use `change`, `expand` and `collapse` instead
  - ❌ Removed `color`, `disclosure`, `context` attributes
  - ❌ Removed `history` attribute and router
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/accordion/
  [PFv4]: https://patternfly.org/v4/

- 7fc74861b: ✨ Added `<pf-avatar>` and removed `<pfe-avatar>`. Avatar now closely follows
  PatternFly design specs.

  - ✨ Added `border` and `alt` attributes

  ```html
  <pf-avatar alt="shadowman" border="dark"></pf-avatar>
  <pf-avatar
    alt="Michael Clayton"
    src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"
  ></pf-avatar>
  ```

  ### Breaking Changes

  - ❌ Removed `name`, `pattern`, and `shape` attributes
  - ❌ Removed `pfe-avatar:connected` event. Use `await pfeAvatar.updateComplete` instead
  - ❌ Removed `pfe-avatar:options-shown`, `pfe-avatar:option-cleared`, `pfe-avatar:search-event`, and `pfe-avatar:option-selected` events.
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See ones. See ones. See ones. See ones. See ones. See ones. See ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the
  [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/avatar/
  [PFv4]: https://patternfly.org/v4/

- 401929054: ✨ Added `<pf-badge>` and removed `<pfe-badge>`. Badge now closely follows
  PatternFly design specs.

  ```html
  <pf-badge number="7">7</pf-badge>
  <pf-badge threshold="10" number="7" state="unread">7</pf-badge>
  ```

  ### Breaking Changes

  - 💱 Changed the value of `state` attribute to `read` or `unread`
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/badge/
  [PFv4]: https://patternfly.org/v4/

- fc37c570f: ✨ Added `<pf-button>` and removed `<pfe-button>`. Button now closely follows
  the PatternFly design specs.

  ```html
  <pf-button disabled>Cancel</pf-button>
  <pf-button>Submit</pf-button>
  <pf-button type="reset">Reset</pf-button>
  ```

  `<pf-button>` is a form-associated custom element, and may require the
  [element-internals polyfill][polyfill]

  - ✨ Added `icon` CSS part
  - ✨ Added `warning`, `link`, and `control` variants
  - ✨ Added `icon` and `loading` attributes
  - ✨ Added `plain`, `block`, `warning` and `loading` attributes

  ### Breaking Changes:

  - ❌ Removed `danger` variant in favour of a new `danger` attribute.
  - ❌ Removed `pfe-button:click` event - use `click` instead
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/button/
  [PFv4]: https://patternfly.org/v4/
  [polyfill]: https://npm.im/element-internals-polyfill

- 04954ab7a: ✨ Added `<pf-card>` and removed `<pfe-card>`. Card now closely follows the
  PatternFly design specs.

  ```html
  <pf-card>
    <h2 slot="header">Card header</h2>
    <p>This is the pf-card body.</p>
    <a href="#" slot="footer">Footer link</a>
  </pf-card>
  ```

  - ✨ Added `header`, `body`, and `footer` CSS parts
  - ✨ Added `rounded`, `full-height`, and `plain` attributes

  ### Breaking Changes

  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See
    [PFv4][PFv4] docs.
  - ❌ Removed `pfe-card--header` and `pfe-card--footer` slots. Use `header` and
    `footer` instead
  - ❌ Removed `imgSrc` and `border` attributes.
  - 💱 Changed `size` attribute values
    ```html
    <!-- BEFORE -->
    <pfe-card size="small"></pfe-card>
    <!-- AFTER -->
    <pf-card size="compact"></pf-card>
    <pf-card size="large"></pf-card>
    ```

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/card/
  [PFv4]: https://patternfly.org/v4/

- f7ae83f2a: ✨ Added `<pf-clipboard-copy>` and removed `<pfe-clipboard>`. Clipboard copy now
  closely follows the PatternFly design spec.

  ```html
  <pf-clipboard-copy>Content to copy</pf-clipboard-copy>
  ```

  ### Breaking Changes

  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See
    [PFv4][PFv4] docs.
  - `role="button"` and `tabindex=0` attributes must _no longer_ be applied to
    `<pf-clipboard-copy>`, make sure all instances on your page are updated
    ```diff
    - <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
    + <pf-clipboard-copy>Copy this</pf-clipboard-copy>
    ```

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/clipboard-copy/
  [PFv4]: https://patternfly.org/v4/

- e64908c5c: ✨ Added `<pf-code-block>` and removed `<pfe-codeblock>`. Code block now closely
  follows the PatternFly design spec.

  ```html
  <pf-code-block>
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo0oooo00ooo
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
  </pf-code-block>
  ```

  ### Breaking Changes

  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See
    [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/code-block/
  [PFv4]: https://patternfly.org/v4/

- 4cd609765: ✨ Added `<pf-icon>` and removed `<pf-icon>`. Icon now closely follows the
  PatternFly design spec.

  Icon now ships with the entire free Font Awesome collection as well as the
  patternfly icon set.

  ```html
  <pf-icon icon="award" aria-label="Awards"></pf-icon>
  ```

  ### Breaking Changes

  - 💱 icon names are no longer prefixed by their set. use the `set` attribute
    instead.
    ```html
    <!-- BEFORE -->
    <pfe-icon icon="patternfly-ansible"></pfe-icon>
    <!-- AFTER -->
    <pf-icon set="patternfly" icon="ansible"></pf-icon>
    ```

  There are more changes than this, including breaking changes. Read the
  [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/icon/

- 915d16357: ✨ Added `<pf-jump-links>` and removed `<pfe-jump-links>`. Jump Links now
  closely follows the PatternFly design spec.

  ```html
  <pf-jump-links
    vertical
    expandable
    expanded
    label="Jump to section"
    scrollable-element="post-container"
  >
    <pf-jump-links-item id="1" href="#heading-1">Heading 1</pf-jump-links-item>
    <pf-jump-links-item id="2" href="#heading-2">Heading 2</pf-jump-links-item>
    <pf-jump-links-item id="3" href="#heading-3">Heading 3</pf-jump-links-item>
    <pf-jump-links-item id="4" href="#heading-4">Heading 4</pf-jump-links-item>
    <pf-jump-links-item id="5" href="#heading-5">Heading 5</pf-jump-links-item>
  </pf-jump-links>
  ```

  ### Breaking Changes:

  - ❌ Removed `pfe-jump-links-panel:active-navItem` and `pfe-jump-links-nav:stuck` events
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/jump-links/
  [PFv4]: https://patternfly.org/v4/

- 3721d37a4: ✨ Added `<pf-modal>` and removed `<pfe-modal>`. Modal now closely follows the
  PatternFly design spec.

  ```html
  <pf-modal>
    <h2 slot="header">Modal with a header</h2>
    <p>Modals can contain arbitrary content</p>
    <a slot="footer" href="#bar">Learn more</a>
  </pf-modal>
  ```

  - ✨ Added `overlay`, `dialog`, `content`, `description`, `header`, `footer`,
    and `close-button` CSS parts
  - ✨ Added `position="top"` attribute
  - ✨ Added `description` slot

  ### HTMLDialogElement Interface

  `<pf-modal>` now implements the `HTMLDialogElement` interface. As such, a number
  of element APIs have changed:

  - 💱 Renamed the private `isOpen` property to `open` and make it public, and
    make it reflect to the `open` attribute
  - 💱 Renamed the `open()` method to `show()`
  - ✨ Added `showModal()` as an alias of `show()`
  - ✨ Added a `cancel` event, distinguishing between `close` and `cancel` events
  - ✨ Added a `returnValue` property, which can be set by passing a string to
    `close(returnValue)`

  ### Breaking Changes

  - ❌ Removed `pfe-modal:open` event. Use `open`
  - ❌ Removed `pfe-modal:close` event. Use `close`
  - ❌ Removed `width` attribute in favour of `variant`
  - Passing an event to `open()` and `toggle()` no longer assigns the trigger element. use `setTrigger(triggerElement)` instead, or set the `trigger` attribute to the id of a trigger element in the same root as the modal.
  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.
  - ❌ Removed the `trigger` slot. Use the `trigger` attribute instead, or the `setTrigger`, `toggle`, or `showModal` methods.
    ```diff
    - <pfe-modal>
    + <pf-modal trigger="trigger-modal">
    -   <pfe-button slot="trigger"><button>Open Modal</button></pfe-button>
        <p>Modals can have content</p>
    - </pfe-modal>
    + </pf-modal>
    + <p>Arbitrary content can intervene between modals and their triggers.</p>
    + <pf-button id="trigger-modal">Open Modal</pfe-button>
    ```

  There are more changes than this, including breaking changes. See [docs][docs]
  for more info

  [docs]: https://patternflyelements.org/components/modal/
  [PFv4]: https://patternfly.org/v4/

- d4a99f6c2: ✨ Added `<pf-panel>` and removed `<pfe-band>`.

  ```html
  <pf-panel>
    <h3 slot="header">Header content</h3>
    <p>Main content</p>
    <p slot="footer">Footer content</p>
  </pf-panel>
  ```

  This change is breaking. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/panel/

- 2e3504582: ✨ Added `<pf-progress-stepper>` and removed `<pfe-progress-steps>`. Progress
  stepper now closely follows PatternFly design spec.

  ```html
  <pf-progress-stepper>
    <pf-progress-step variant="success">Completed</pf-progress-step>
    <pf-progress-step variant="warning">Issue</pf-progress-step>
    <pf-progress-step variant="danger">Failure</pf-progress-step>
    <pf-progress-step current variant="info">Running</pf-progress-step>
    <pf-progress-step>Last</pf-progress-step>
  </pf-progress-stepper>
  ```

  ### Breaking Changes:

  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/progress-stepper/
  [PFv4]: https://patternfly.org/v4/

- d4a99f6c2: ✨ Added `<pf-spinner>` and removed `<pfe-progress-indicator>`. Spinner now
  closely follows PatternFly design spec.

  ```html
  <!-- BEFORE -->
  <pfe-progress-indicator indeterminate>Loading...</pfe-progress-indicator>
  <!-- AFTER -->
  <pfe-spinner>Loading...</pfe-spinner>
  ```

  See [docs](https://patternflyelements.org/components/spinner/) for more info

- 11ca3a065: ✨ Added `<pf-switch>`, a control that toggles the state of a setting between on
  and off.

  ```html
  <form>
    <pf-switch id="color-scheme-toggle"></pf-switch>
    <label for="color-scheme-toggle" data-state="on">Dark Mode</label>
    <label for="color-scheme-toggle" data-state="off" hidden>Light Mode</label>
  </form>
  ```

  Switches provide a more explicit, visible representation on a setting than checkboxes.

  `<pf-switch>` is a form-associated custom element, and may require the
  [element-internals polyfill][polyfill]

  Read the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/switch/
  [polyfill]: https://npm.im/element-internals-polyfill

- 2a3048cb6: ✨ Added `<pf-tabs>` and removed `<pfe-tabs>`. Tabs now closely follows
  PatternFly design spec.

  ```html
  <pf-tabs>
    <pf-tab id="users" slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers <a href="#">Focusable element</a></pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
  </pf-tabs>
  ```

  - ✨ Added `container`, `tabs-container`, `tabs` and `panels` CSS parts
  - ✨ Added `button`, `icon` and `text` CSS parts to `<pf-tab>`
  - ✨ Added `container` CSS part to `<pf-tab-panel>`

  ### Breaking Changes:

  - Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/timestamp/
  [PFv4]: https://patternfly.org/v4/

- d4a99f6c2: ✨ Added `<pf-tile>`.

  ```html
  <pf-tile selected stacked="lg">
    <h3 slot="title">Selected</h3>
    <pf-icon slot="icon" icon="plus"></pf-icon>
    <p>
      Selected tiles use colour, borders, & position to indicate their state
    </p>
  </pf-tile>
  ```

  Read more in the [docs](https://patternflyelements.org/components/tile).

- 719951cfd: ✨ Added `<pf-timestamp>` and removed `<pfe-datetime>`. Timestamp now closely
  follows PatternFly design spec.

  ```html
  <pf-timestamp date="Mon Jan 2 15:04:05 EST 2006" date-format="long">
  </pf-timestamp>
  ```

  ### Breaking Changes:

  - ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/timestamp/
  [PFv4]: https://patternfly.org/v4/
  [polyfill]: https://npm.im/element-internals-polyfill

### Minor Changes

- 3c5d906db: ✨ Added `<pf-label>`.

  ```html
  <p>Some Text <pf-label color="red">Your label text here</pf-label></p>
  ```

  `<pf-label>` is an inline-block element component that provides a distinct
  visual style for metadata in a UI. Commonly used as visual representations for
  tags, labels can include an optional icon and are available in a solid and
  outline style variant.

  See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/label/

- cd55e465b: ✨ Added `<pf-tooltip>`

  ```html
  <pf-tooltip content="Use the content attribute or slot">Tooltip</pf-tooltip>
  ```

### Patch Changes

- 1af2749db: `<pf-tabs>`: improved accessibility
  - added `manual` boolean attribute which enables [manual tab activation](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html) option.
- 67c3c351b: improved performance when loading individual elements
- 484fa68e6: Fixed `.` module export
- 20d0bf907: Added element entrypoints to package.json
- 5d3315fd4: Prepared release candidate
- 8a1ba2b65: `<pf-icon>`: add icons to package exports
- 530ef7155: `<pf-tabs>`: integrated overflow controller.
- Updated dependencies [530ef7155]
- Updated dependencies [e8788c7214]
- Updated dependencies [2e1fb5705]
- Updated dependencies [5d3315fd4]
  - @patternfly/pfe-core@2.0.0

## 2.0.0-rc.6

### Patch Changes

- 67c3c351b: improved performance when loading individual elements
- 530ef7155: `<pf-tabs>`: integrated overflow controller.
- Updated dependencies [530ef7155]
- Updated dependencies [2e1fb5705]
  - @patternfly/pfe-core@2.0.0-rc.2

## 2.0.0-rc.5

### Patch Changes

- 8a1ba2b65: `<pf-icon>`: add icons to package exports

## 2.0.0-rc.4

### Patch Changes

- 1af2749db: `<pf-tabs>`: improved accessibility
  - added `manual` boolean attribute which enables [manual tab activation](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html) option.

## 2.0.0-rc.3

### Patch Changes

- 484fa68e6: Fixed `.` module export

## 2.0.0-rc.2

### Patch Changes

- 20d0bf907: Added element entrypoints to package.json

## 2.0.0-rc.1

### Patch Changes

- 5d3315fd: Prepared release candidate
- Updated dependencies [5d3315fd]
  - @patternfly/pfe-core@2.0.0-rc.1
