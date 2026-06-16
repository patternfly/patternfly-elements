---
"@patternfly/elements": major
---

`<pf-v6-helper-text>`: replaces `<pf-v5-helper-text>` with PatternFly v6 design specs.

```html
<pf-v6-helper-text variant="error">Password is too short</pf-v6-helper-text>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-helper-text>` to `<pf-v6-helper-text>`
- CSS custom properties renamed from `--pf-v5-c-helper-text--*` to `--pf-v6-c-helper-text--*`
- Removed `icon` and `icon-set` attributes (use `icon` slot for custom icons)
- Removed dependency on `<pf-v5-icon>` (uses inline SVG icons for default variants)
- Non-default variants now auto-show their default icon

**New features**

- `icon` slot for custom icon markup
- `dynamic` attribute for dynamic validation contexts
- `accessible-label` attribute for screen reader status context (defaults to "${variant} status")
- `icon` and `text` CSS parts
- `light-dark()` color scheme support
- v6 design tokens
