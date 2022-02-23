# @patternfly/pfe-badge

## 2.0.0-next.0
### Major Changes

- e4a76fb2: ## 🔥 Migrate to Lit
  
  This release migrates `<pfe-badge>` to LitElement.
  
  ### Breaking Changes
  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  
  See [docs](https://patternflyelements.org/components/badge/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
