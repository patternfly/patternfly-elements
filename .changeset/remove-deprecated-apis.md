---
"@patternfly/pfe-core": major
"@patternfly/elements": major
---

Removed deprecated APIs:

- **`CascadeController`** and **`@cascades`** decorator are removed.
  Use [`@lit/context`](https://lit.dev/docs/data/context/) instead for
  sharing data between parent and child elements.
- **`SlotController.anonymous`** is removed. Use `SlotController.default` instead.
- **`pf-popover`**: the `close-label` attribute and `closeButtonLabel` property
  are removed. Use `accessible-close-label` instead.
