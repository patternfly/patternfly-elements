# @patternfly/pfe-icon-panel

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3
  - @patternfly/pfe-icon@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- c5cd66be: ## 🔥 Migrate to Lit

  This release migrates `<pfe-icon-panel>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `icon` and `content` CSS parts to `<pfe-icon-panel>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-icon-panel--header` slot. Use `header`
  - Deprecates `pfe-icon-panel--footer` slot. Use `footer`

  See [docs](https://patternflyelements.org/components/icon-panel/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
- Updated dependencies [b7201f0f]
  - @patternfly/pfe-core@2.0.0-next.0
  - @patternfly/pfe-icon@2.0.0-next.0
