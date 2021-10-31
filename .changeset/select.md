---
"@patternfly/pfe-select": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-select>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfeOptions` DOM Property. Use `options`
- Deprecates `pfe-select:change` event. Use `select`

See [docs](https://patternflyelements.org/components/select/) for more info
