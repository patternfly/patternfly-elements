---
"@patternfly/pfe-collapse": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-collapse>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-collapse:change` event on pfe-collapse-toggle. Use `change`


See [docs](https://patternflyelements.org/components/collapse/) for more info
