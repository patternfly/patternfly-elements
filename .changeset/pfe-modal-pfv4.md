---
"@patternfly/pfe-modal": major
---

Align to PatternFly v4.

- deprecate the `width` attribute in favour of `variant`
- implement many `--pf-` css variables
- add `renderHeaderSlot`, `renderDescriptionSlot`, `renderContentSlot`, and `renderFooterSlot` optional override methods
- remove _all_ `--pfe-` css variables.
  If you were relying on any of the (previously undocumented) `--pfe` variables,
  please use their `--pf` equivalents.
  See the [docs](https://patternflyelements.org/components/modal) for more info
