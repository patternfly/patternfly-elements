---
"@patternfly/pfe-label": major
---

Changes to `<pfe-label>` to align it with [PatternFly v4](https://patternfly.org/components/label).

NEW:
Added `variant` attribute for `filled` and `outline` style variants
Added `compact` boolean attribute for compact style version

BREAKING CHANGES:
The `pfelement` attribute and `PFElement` class are **removed** from the `<pfe-label>` element by default.
The `outline` boolean attribute is **removed**
_All_ the `--pfe-*` css variables are **removed** in favour of their `--pf-*` equivalents.

See the [docs](https://patternflyelements.org/components/label) for more info,
and the [demo](https://patternflyelements.org/components/label/demo) for usage examples.