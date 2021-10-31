---
"@patternfly/pfe-clipboard": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-clipboard>` to LitElement.

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `text` slot (use `label`) and `text--success` (use `success`) slots
- Deprecates `pfe-clipboard:connected` event (use `await el.updateComplete`)
- Deprecates `pfe-clipboard:copied` event (use `copied`)


See [docs](https://patternflyelements.org/components/clipboard/) for more info
