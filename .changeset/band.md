---
"@patternfly/pfe-band": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-band>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
- Deprecates `pfe-band--header` slot - use `header`.
- Deprecates `pfe-band--footer` slot - use `footer`.
- Deprecates `pfe-band--aside` slot - use `aside`.


See [docs](https://patternflyelements.org/components/band/) for more info
