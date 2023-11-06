---
"@patternfly/elements": patch
---

`<pf-popover>`: deprecate `closeButtonLabel` property / `close-label` attribute in favor of `accessibleCloseLabel` property / `accessible-close-label` attribute

Before:
```html
<pf-popover close-label="סגירה">...</pf-popover>
```

After:
```html
<pf-popover accessible-close-label="סגירה">...</pf-popover>
```
