---
"@patternfly/elements": major
---

✨ Added `<pf-v6-timestamp>` replacing `<pf-v5-timestamp>`. Timestamp now follows
PatternFly v6 design specs.

```html
<pf-v6-timestamp date="Mon Jan 2 15:04:05 EST 2006"
                 date-format="full"
                 time-format="long">
</pf-v6-timestamp>
```

**Breaking Changes from v5**

- `<pf-v5-timestamp>` → `<pf-v6-timestamp>`
- `import '@patternfly/elements/pf-v5-timestamp/pf-v5-timestamp.js'` →
  `import '@patternfly/elements/pf-v6-timestamp/pf-v6-timestamp.js'`
- CSS custom properties `--_timestamp-*` → `--pf-v6-c-timestamp--*`

**New features**

- ✨ `help-text` boolean attribute for tooltip trigger styling with keyboard focus
- ✨ Default slot for custom display content
- ✨ v6 design tokens
