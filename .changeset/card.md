---
"@patternfly/pfe-card": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-card>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `header`, `body`, and `footer` CSS parts to `<pfe-card>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle)
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-card--header` and `pfe-card--footer` slots. Use `header` and `footer` instead


See [docs](https://patternflyelements.org/components/card/) for more info
