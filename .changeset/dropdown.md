---
"@patternfly/pfe-dropdown": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-dropdown>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfeDropdownOptions` DOM property. Use `options`
- Deprecates `pfe-dropdown:change` event. Use `change`
- Makes `isOpen` private

See [docs](https://patternflyelements.org/components/dropdown/) for more info
