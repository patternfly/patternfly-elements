## 1.0.0 ( TBD )

## 2.0.0-next.0

### Major Changes

- c8b9d35c: ## 🔥 Migrate to Lit

  This release migrates `<pfe-primary-detail>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `nav`, `details`, and `footer` CSS parts

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-primary-detail:shown-tab` event. Use `change`
  - Deprecates `pfe-primary-detail:hidden-tab` event. Use `change`

  See [docs](https://patternflyelements.org/components/primary-detail/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0

Tag: [1.0.0](https://github.com/patternfly/patternfly-elements/releases/tag/1.0.0)

- [code](url) Description
