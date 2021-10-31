---
"@patternfly/pfe-readtime": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-readtime>` to LitElement.

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`


See [docs](https://patternflyelements.org/components/readtime/) for more info
