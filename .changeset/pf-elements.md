---
"@patternfly/elements": major
---

### Breaking Changes
- Initial render was made [asynchronous][async].
  If your code assumes that shadow DOM is ready once the element is constructed,
  update it to `await element.updateComplete`
- Renamed all element prefixes from `pfe-` to `pf-`.
  ```html
  <!-- BEFORE: -->
  <pfe-button>Cancel</pfe-button>

  <!-- AFTER: -->
  <pf-button>Ok</pf-button>
  ```

[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
