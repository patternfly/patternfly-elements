---
"@patternfly/pfe-spinner": minor
"@patternfly/pfe-button": patch
"@patternfly/pfe-tools": patch
---

BREAKING CHANGE:

Renames `<pfe-progress-indicator>` to `<pfe-spinner>` and changes it's HTML and
CSS APIs to more closely match PatternFly v4 design specs.

```html
<!-- BEFORE -->
<pfe-progress-indicator indeterminate>Loading...</pfe-progress-indicator>
<!-- AFTER -->
<pfe-spinner>Loading...</pfe-spinner>
```
