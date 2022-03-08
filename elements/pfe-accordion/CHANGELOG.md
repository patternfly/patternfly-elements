# @patternfly/pfe-accordion

## 2.0.0-next.1

### Patch Changes

- b6f89a8f: allow HTML literals to be optimized by aliasing static html tag
- Updated dependencies [999cdfdd]
  - @patternfly/pfe-core@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- eaa5361b: ## 🔥 Migrate to Lit

  This release migrates `<pfe-accordion>` to LitElement. It also fixes several keyboard accessibility bugs.

  ### NEW: CSS Shadow Parts

  - Adds `text`, `accents`, and `icon` CSS parts to `<pfe-accordion-header>`
  - Adds `container` CSS part to `<pfe-accordion-panel>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  - Deprecates `pfe-accordion:expand` and `pfe-accordion:collapse` events. Use `expand` and `collapse` instead

  See [docs](https://patternflyelements.org/components/autocomplete/) for more info

### Patch Changes

- Updated dependencies [15514b33]
- Updated dependencies [e8788c72]
- Updated dependencies [b7201f0f]
  - @patternfly/pfe-collapse@2.0.0-next.0
  - @patternfly/pfe-core@2.0.0-next.0
  - @patternfly/pfe-icon@2.0.0-next.0
