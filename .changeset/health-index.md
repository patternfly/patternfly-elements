---
"@patternfly/pfe-health-index": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-health-index>` to LitElement.

NEW: CSS Shadow Parts!

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`


See [docs](https://patternflyelements.org/components/health-index/) for more info
