---
"@patternfly/elements": major
---

### Breaking Changes
- 🔥 Migrated elements to [`LitElement`][lit]: initial render made 
  [asynchronous][async].
  If your code assumes that shadow DOM is ready once the element is constructed,
  ensure you first `await element.updateComplete`
- Renamed all element prefixes from `pfe-` to `pf-`.
  ```html
  <!-- BEFORE: -->
  <pfe-button>Cancel</pfe-button>
  <!-- AFTER: -->
  <pf-button>Ok</pf-button>
  ```
- Removed `<pfe-collapse>`
- Removed `<pfe-autocomplete>`, pending rewrite to `<pf-search-input>` ([#2115][autocomplete]).

[lit]: https://lit.dev
[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
[autocomplete]: https://github.com/patternfly/patternfly-elements/issues/2115
