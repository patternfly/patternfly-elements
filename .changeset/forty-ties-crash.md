---
"@patternfly/elements": major
---

✨ Added `<pf-v6-badge>` replacing `<pf-v5-badge>`. Badge now follows
PatternFly v6 design specs.

```html
<pf-v6-badge state="unread">7</pf-v6-badge>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-badge>` to `<pf-v6-badge>`
- Removed `number` and `threshold` properties — badge is now a pure slot
  container; formatting is an app concern
- ✨ Added `disabled` attribute
- ✨ Added v6 design tokens and `color-scheme` support via `light-dark()`
- CSS custom properties renamed from `--pf-v5-c-badge--*` to `--pf-v6-c-badge--*`
