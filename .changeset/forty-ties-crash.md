---
"@patternfly/elements": major
---

`<pf-v6-badge>`: replaces `<pf-v5-badge>` with PatternFly v6 design specs.

```html
<pf-v6-badge state="unread">7</pf-v6-badge>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-badge>` to `<pf-v6-badge>`
- Removed `number` and `threshold` properties -- badge is now a pure slot container; formatting is an app concern
- CSS custom properties renamed from `--pf-v5-c-badge--*` to `--pf-v6-c-badge--*`

**New features**

- `disabled` attribute
- v6 design tokens and `light-dark()` color scheme support
