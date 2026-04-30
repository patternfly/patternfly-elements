---
"@patternfly/elements": major
---

`<pf-popover>`: the `close-label` attribute and `closeButtonLabel` property are removed. Use `accessible-close-label` instead.

Before:
```html
<pf-popover close-label="close"></pf-popover>
```

After:
```html
<pf-v5-popover accessible-close-label="close"></pf-v5-popover>
```
