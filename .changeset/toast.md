---
"@patternfly/pfe-toast": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-toast>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-toast:open` event. Use `open`
- Deprecates `pfe-toast:close` event. Use `close`

See [docs](https://patternflyelements.org/components/toast/) for more info
