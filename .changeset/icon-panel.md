---
"@patternfly/pfe-icon-panel": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-icon-panel>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `icon` and `content` CSS parts to `<pfe-icon-panel>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-icon-panel--header` slot. Use `header`
- Deprecates `pfe-icon-panel--footer` slot. Use `footer`


See [docs](https://patternflyelements.org/components/icon-panel/) for more info
