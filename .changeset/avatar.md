---
"@patternfly/pfe-avatar": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-avatar>` to LitElement.

### NEW: CSS Shadow Parts
- Adds `canvas` and `img` CSS parts to `<pfe-avatar>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
- Deprecates `pfe-avatar:connected` event. Use `await pfeAvatar.updateComplete` instead
- Deprecates `pfe-avatar:options-shown`, `pfe-avatar:option-cleared`, `pfe-avatar:search-event`, and `pfe-avatar:option-selected` events.

See [docs](https://patternflyelements.org/components/avatar/) for more info
