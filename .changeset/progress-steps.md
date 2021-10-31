---
"@patternfly/pfe-progress-steps": major
---

## 🔥 Migrate to Lit

This release migrates `<pfe-progress-steps>` to LitElement.

### NEW: CSS Shadow Parts!
- Adds the `progress-bar` CSS part to `<pfe-progress-steps>`
- Adds the `circle`, `content`, `title`, and `description` CSS parts to `<pfe-progress-steps-item>`

### Breaking Changes
- Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
  If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`


See [docs](https://patternflyelements.org/components/progress-steps/) for more info
