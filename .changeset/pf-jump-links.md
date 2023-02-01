---
"@patternfly/elements": major
---

Removed `<pfe-jump-links>` and added `<pf-jump-links>`.

Reimplemented `<pf-jump-links>` to align with [PatternFly
v4](https://patternfly.org/components/jump-links).

### Breaking Changes:

- Removed `pfe-jump-links-panel:active-navItem` and `pfe-jump-links-nav:stuck` events
- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/jump-links/
[PFv4]: https://patternfly.org/v4/
