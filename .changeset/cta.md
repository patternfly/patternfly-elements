---
"@patternfly/pfe-cta": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-ctg>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `container` CSS part to `<pfe-cta>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-cta:select` event. Use `select`

See [docs](https://patternflyelements.org/components/cta/) for more info
