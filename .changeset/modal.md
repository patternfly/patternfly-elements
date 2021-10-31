---
"@patternfly/pfe-modal": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-modal>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds `overlay`, `dialog`, `content`, and `close-button` CSS parts
-
### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-modal--trigger` slot. Use `trigger`
- Deprecates `pfe-modal--header` slot. Use `header`
- Deprecates `pfe-modal:open` event. Use `open`
- Deprecates `pfe-modal:close` event. Use `close`


See [docs](https://patternflyelements.org/components/modal/) for more info
