---
"@patternfly/elements": major
---

Removed `<pfe-accordion>` and added `<pf-accordion>`.

### Breaking Changes
- Initial render was made [asynchronous][async].
  If your code assumes that shadow DOM is ready once the element is constructed,
  update it to `await element.updateComplete`
- Removed `pfe-accordion:change`, `pfe-accordion:expand`, and 
  `pfe-accordion:collapse` event.
  Use `change`, `expand` and `collapse` instead
- Removed `color`, `disclosure`, `context` attributes
- Removed `history` attribute and router
- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See 
  [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the 
[docs][docs] for more info.

[docs]: https://patternflyelements.org/components/progress-stepper/
[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
[PFv4]: https://patternfly.org/v4/
