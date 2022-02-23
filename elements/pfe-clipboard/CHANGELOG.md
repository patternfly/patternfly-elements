# @patternfly/pfe-clipboard

## 2.0.0-next.0
### Major Changes

- cd3917e0: ## 🔥 Migrate to Lit
  
  This release migrates `<pfe-clipboard>` to LitElement.
  
  ### Breaking Changes
  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `text` slot (use `label`) and `text--success` (use `success`) slots
  - Deprecates `pfe-clipboard:connected` event (use `await el.updateComplete`)
  - Deprecates `pfe-clipboard:copied` event (use `copied`)
  
  
  See [docs](https://patternflyelements.org/components/clipboard/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
