---
"@patternfly/pfe-tabs": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-tabs>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `tabs` and `panels` CSS parts to `<pfe-tabs>`
- Adds `container` CSS part to `<pfe-tab-panel>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`

See [docs](https://patternflyelements.org/components/tabs/) for more info
