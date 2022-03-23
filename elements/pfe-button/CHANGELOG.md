# @patternfly/pfe-button

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
