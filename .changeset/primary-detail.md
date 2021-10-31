---
"@patternfly/pfe-primary-detail": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-primary-detail>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `nav`, `details`, and `footer` CSS parts

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-primary-detail:shown-tab` event. Use `change`
- Deprecates `pfe-primary-detail:hidden-tab` event. Use `change`

See [docs](https://patternflyelements.org/components/primary-detail/) for more info
