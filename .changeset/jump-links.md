---
"@patternfly/pfe-jump-links": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-jump-links>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
- Deprecates `pfe-jump-links-panel:active-navItem` event. Use `change`
- Deprecates `pfe-jump-links-nav:stuck` event. Use `stuck`


See [docs](https://patternflyelements.org/components/jump-links/) for more info
