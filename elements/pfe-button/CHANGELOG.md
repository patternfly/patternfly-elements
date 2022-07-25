# @patternfly/pfe-button

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
