---
"@patternfly/pfe-autocomplete": major
---

## 🔥 Migrate to Lit

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
