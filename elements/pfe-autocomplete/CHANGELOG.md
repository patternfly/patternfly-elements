# @patternfly/pfe-autocomplete

## 2.0.0-next.1

### Patch Changes

- Updated dependencies [8771887d]
  - @patternfly/pfe-sass@2.0.0-next.0

## 2.0.0-next.0

### Major Changes

- d81a26dc: ## 🔥 Migrate to Lit

  This release migrates `<pfe-autocomplete>` to LitElement.

  ### NEW: CSS Shadow Parts

  - Adds `container`, `icon`, `clear-button`, `search-button`, `droplist`, and `text-search-button` CSS parts to `<pfe-autocomplete>`
  - Adds `option`, `item-index-${n}`, and `listbox` CSS parts to `<pfe-search-droplist>` and [exports](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-exportparts) those parts on `<pfe-autocomplete>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  - Deprecates `is-disabled` attribute and `isDisabled` property. Use `disabled` instead.
  - Deprecates `aria-announce-template` attribute. Use `announce-template` instead.
  - Deprecates `pfe-autocomplete:options-shown`, `pfe-autocomplete:option-cleared`, `pfe-autocomplete:search-event`, and `pfe-autocomplete:option-selected` events.

  See [docs](https://patternflyelements.org/components/autocomplete/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
