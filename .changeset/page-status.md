---
"@patternfly/pfe-page-status": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-page-status>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds the `container` CSS part to `<pfe-page-status>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`


See [docs](https://patternflyelements.org/components/page-status/) for more info
