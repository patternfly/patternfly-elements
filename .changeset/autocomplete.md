---
"@patternfly/pfe-autocomplete": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-autocomplete>` to LitElement.

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
- Deprecates `is-disabled` attribute and `isDisabled` property. Use `disabled` instead.
- Deprecates `pfe-autocomplete:options-shown`, `pfe-autocomplete:option-cleared`, `pfe-autocomplete:search-event`, and `pfe-autocomplete:option-selected` events.

See [docs](https://patternflyelements.org/components/autocomplete/) for more info
