---
"@patternfly/elements": major
---

Removed `<pfe-card>` and added `<pf-card>`.

- Added `header`, `body`, and `footer` CSS parts

### Breaking Changes

- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.
- Removed `pfe-card--header` and `pfe-card--footer` slots. Use `header` and `footer` instead

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/card/
[PFv4]: https://patternfly.org/v4/
