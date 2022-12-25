# @patternfly/pfe-tabs

## 2.0.0-next.8

### Patch Changes

- 59fb977a: - Added inset as a decorated property and exports InsetVariant type to improve downstream usage.

## 2.0.0-next.7

### Patch Changes

- 8455d234: Fix package.json exports to include BaseTab, BaseTabPanel, PfeTab, PfeTabPanel

## 2.0.0-next.6

### Patch Changes

- 2d47840a: Fixed `<pfe-tabs>` CSS imports and a typo that caused an issue with the child repository having incorrect styles

## 2.0.0-next.5

### Major Changes

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

### Patch Changes

- Updated dependencies [b6bb3818]
  - @patternfly/pfe-core@2.0.0-next.11

## 2.0.0-next.4

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.3

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.2

### Patch Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- 23b2ef3f: ## 🔥 Migrate to Lit

  This release migrates `<pfe-tabs>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `tabs` and `panels` CSS parts to `<pfe-tabs>`
  - Adds `container` CSS part to `<pfe-tab-panel>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`

  See [docs](https://patternflyelements.org/components/tabs/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
