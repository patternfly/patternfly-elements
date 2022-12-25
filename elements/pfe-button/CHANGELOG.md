# @patternfly/pfe-button

## 2.0.0-next.8

### Major Changes

- 6b6e2617: Makes `<pfe-button>` a form-associated custom element

  BREAKING CHANGE:
  users should no longer slot a native `<button>` into the element

  Before:

  ```html
  <pfe-button><button>Submit</button></pfe-button>
  ```

  After:

  ```html
  <pfe-button>Submit</pfe-button>
  ```

### Patch Changes

- Updated dependencies [6b6e2617]
  - @patternfly/pfe-core@2.0.0-next.12

## 2.0.0-next.7

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [ddf052bd]
- Updated dependencies [07ad1d3d]
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-spinner@2.0.0-next.6
  - @patternfly/pfe-icon@2.0.0-next.5
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.6

### Patch Changes

- eeebb45d: Replace `<pfe-progress-indicator>` with `<pfe-spinner>`
- Updated dependencies [b7602c2c]
- Updated dependencies [166ecee1]
  - @patternfly/pfe-spinner@2.0.0-next.5
  - @patternfly/pfe-core@2.0.0-next.9

## 2.0.0-next.5

### Patch Changes

- bfad8b4b: Updates dependencies
- bfad8b4b: Add missing dependencies
- a423b010: fix typescript config and update dependencies
- Updated dependencies [bfad8b4b]
- Updated dependencies [a423b010]
  - @patternfly/pfe-core@2.0.0-next.8
  - @patternfly/pfe-icon@2.0.0-next.4
  - @patternfly/pfe-progress-indicator@2.0.0-next.4

## 2.0.0-next.4

### Major Changes

- a730678c: Several changes align `<pfe-button>` to [PatternFly v4](https://patternfly.org/components/button).

  NEW:
  `warning`, `link`, and `control` variants added.
  `icon` and `loading` attributes added.
  `plain`, `block`, `warning` and `loading` attributes added.
  `icon` slot added.

  BREAKING CHANGES:
  The `pfelement` attribute and `PFElement` class are **removed** from the `<pfe-button>` element by default.
  The `danger` variant is **removed** in favour of a new `danger` variant.
  _All_ the `--pfe-*` css variables are **removed** in favour of their `--pf-*` equivalents.

  See the [docs](https://patternflyelements.org/components/button) for more info,
  and the [demo](https://patternflyelements.org/components/button/demo) for usage examples.

### Patch Changes

- Updated dependencies [34ecd410]
  - @patternfly/pfe-core@2.0.0-next.6

## 2.0.0-next.3

### Patch Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.2

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.1

### Patch Changes

- a56aa80b: chore: update package.json

## 2.0.0-next.0

### Major Changes

- af331f33: ## 🔥 Migrate to Lit

  This release migrates `<pfe-button>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds the `container` CSS part to `<pfe-button>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-button:click` event - use `click`
  - Removes the internal shadow DOM button in favour of the slotted button
  - Makes all styles on the slotted button `!important`. Use CSS Custom Properties to override

  See [docs](https://patternflyelements.org/components/button/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
