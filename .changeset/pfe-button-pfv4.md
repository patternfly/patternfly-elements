---
"@patternfly/pfe-button": major
---

Several changes align `<pfe-button>` to [PatternFly v4](https://patternfly.org/components/button).

NEW:
`warning`, `link`, and `control` variants added.  
`icon` and `loading` attributes added.  
`plain`, `block`, `warning` and `loading` attributes added.  
`icon` slot added.  

BREAKING CHANGES:
The `pfelement` attribute and `PFElement` class are **removed** from the `<pfe-button>` element by default.
The `danger` variant is **removed** in favour of a new `danger` variant.
_All_ the `--pfe-*` css variables are **removed** in favour of their `--pf-*` equivalents.

See the [docs](https://patternflyelements.org/components/button) for more info,
and the [demo](https://patternflyelements.org/components/button/demo) for usage examples.
