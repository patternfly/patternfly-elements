---
"@patternfly/pfe-button": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-button>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds the `container` CSS part to `<pfe-button>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-button:click` event - use `click`
- Removes the internal shadow DOM button in favour of the slotted button
- Makes all styles on the slotted button `!important`. Use CSS Custom Properties to override

See [docs](https://patternflyelements.org/components/button/) for more info
