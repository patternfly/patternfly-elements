---
"@patternfly/elements": major
---

PatternFly Elements 2.0 is a major rewrite of the project.
It brings PFE in-line with PatternFly React in terms of design specs
and modernizes the codebase with [Lit][lit] and [TypeScript][ts]. It adds a 
versatile set of tools for managing and building elements, and focuses more on 
cutting-edge web technologies like [form-associated custom elements][FACE] and 
[CSS shadow parts][css-shadow].

### Breaking Changes
- 🔥 Migrated elements to [Lit][lit]: initial render made [asynchronous][async].
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
- Removed `@patternfly/pfe-styles` package
- Removed `@patternfly/pfe-sass` package
- Removed `<pfe-autocomplete>`, pending rewrite to `<pf-search-input>` ([#2115][autocomplete]).
- Removed `<pfe-collapse>`
- Removed `<pfe-dropdown>`, pending rewrite to `<pf-dropdown>` ([#2049][dropdown]).
- Removed `<pfe-health-index>`
- Removed `<pfe-icon-panel>`
- Removed `<pfe-markdown>`
- Removed `<pfe-page-status>`
- Removed `<pfe-select>`, pending rewrite to `<pf-select>` ([#2145][select]).

[lit]: https://lit.dev
[ts]: https://typescriptlang.org
[FACE]: https://bennypowers.dev/posts/form-associated-custom-elements/
[css-shadow]: https://w3c.github.io/csswg-drafts/css-shadow-parts/#part
[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
[PFv4]: https://patternfly.org/v4/
[autocomplete]: https://github.com/patternfly/patternfly-elements/issues/2115
[dropdown]: https://github.com/patternfly/patternfly-elements/issues/2049
[select]: https://github.com/patternfly/patternfly-elements/issues/2145
