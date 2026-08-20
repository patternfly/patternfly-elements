---
"@patternfly/pfe-core": patch
---

`InternalsController`: expose `form`, `validationMessage`, and `willValidate` getters. Previously returned `undefined` despite TypeScript accepting the access. Form-associated elements can read the associated form reference and validation state from the controller.
