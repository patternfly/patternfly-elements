# @patternfly/pfe-dropdown

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- 6ab81c4a: ## 🔥 Migrate to Lit

  This release migrates `<pfe-dropdown>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `container`, `button`, and `menu` CSS parts to `<pfe-dropdown>`
  - Adds `container` CSS part to `<pfe-dropdown-item>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfeDropdownOptions` DOM property. Use `options`
  - Deprecates `pfe-dropdown:change` event. Use `change`
  - Makes `isOpen` private

  See [docs](https://patternflyelements.org/components/dropdown/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
