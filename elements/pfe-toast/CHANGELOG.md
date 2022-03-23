# @patternfly/pfe-toast

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- ff5adfb5: ## 🔥 Migrate to Lit

  This release migrates `<pfe-toast>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `container`, `content`, `close-button` CSS parts

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-toast:open` event. Use `open`
  - Deprecates `pfe-toast:close` event. Use `close`

  See [docs](https://patternflyelements.org/components/toast/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
