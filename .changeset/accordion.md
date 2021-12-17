---
"@patternfly/pfe-accordion": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-accordion>` to LitElement. It also fixes several keyboard accessibility bugs.

### NEW: CSS Shadow Parts
- Adds `text`, `accents`, and `icon` CSS parts to `<pfe-accordion-header>`
- Adds `container` CSS part to `<pfe-accordion-panel>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
- Deprecates `pfe-accordion:expand` and `pfe-accordion:collapse` events. Use `expand` and `collapse` instead

See [docs](https://patternflyelements.org/components/autocomplete/) for more info
