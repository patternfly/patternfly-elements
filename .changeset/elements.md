---
"@patternfly/elements": major
---

### Breaking Changes
- 🔥 Migrated elements to [`LitElement`][lit]: initial render made 
  [asynchronous][async].
  If your code assumes that shadow DOM is ready once the element is constructed,
  ensure you first `await element.updateComplete`
- Reimplemented elements in line with [PFv4][PFv4] design specs
- Combined all elements into a single package: `@patternfly/elements`
- Renamed all element prefixes from `pfe-` to `pf-`.
  ```html
  <!-- BEFORE: -->
  <pfe-button>Cancel</pfe-button>
  <!-- AFTER: -->
  <pf-button>Ok</pf-button>
  ```
- Removed `<pfe-collapse>`
- Removed `<pfe-page-status>`
- Removed `<pfe-autocomplete>`, pending rewrite to `<pf-search-input>` ([#2115][autocomplete]).
- Removed `<pfe-dropdown>`, pending rewrite to `<pf-dropdown>` ([#2049][dropdown]).
- Removed `<pfe-select>`, pending rewrite to `<pf-select>` ([#2145][select]).

[lit]: https://lit.dev
[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
[PFv4]: https://patternfly.org/v4/
[autocomplete]: https://github.com/patternfly/patternfly-elements/issues/2115
[dropdown]: https://github.com/patternfly/patternfly-elements/issues/2049
[select]: https://github.com/patternfly/patternfly-elements/issues/2145
