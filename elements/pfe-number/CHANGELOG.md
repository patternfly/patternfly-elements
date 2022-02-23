# @patternfly/pfe-number

## 2.0.0-next.0
### Major Changes

- cc966f5b: ## 🔥 Migrate to Lit
  
  This release migrates `<pfe-number>` to LitElement.
  
  ### Breaking Changes
  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  
  
  See [docs](https://patternflyelements.org/components/number/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
