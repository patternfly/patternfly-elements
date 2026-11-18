---
"@patternfly/elements": major
---

`<pf-v6-hint>`: replaces `<pf-v5-hint>` with PatternFly v6 hint styles.

```html
<pf-v6-hint>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management.
  <pf-v6-button slot="footer" variant="link" inline>Try it for 90 days</pf-v6-button>
</pf-v6-hint>
```

**Breaking changes from v5**

- Renamed tag from `<pf-v5-hint>` to `<pf-v6-hint>`
- Removed CSS parts. Theme with `--pf-v6-c-hint--*` custom properties
- CSS custom properties renamed from `--pf-v5-c-hint--*` to `--pf-v6-c-hint--*`

**New features**

- `no-actions-offset` removes the offset that aligns plain actions with the title
