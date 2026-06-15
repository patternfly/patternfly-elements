---
"@patternfly/elements": major
---

`<pf-v6-progress>`: replaces `<pf-v5-progress>` with PatternFly v6 design specs.

```html
<pf-v6-progress value="33" description="Loading..."></pf-v6-progress>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-progress>` to `<pf-v6-progress>`
- CSS custom properties renamed from `--pf-v5-c-progress--*` to `--pf-v6-c-progress--*`

**New features**

- `accessible-label` attribute for screen reader text via ElementInternals
- `value-text` attribute for custom `aria-valuetext` (finite step displays)
- `truncated` attribute for ellipsis overflow on description
- `hide-status-icon` attribute for tight layouts
- `helper-text` slot for supplementary text below the bar, auto-wired to `aria-describedby`
- v6 design tokens and `light-dark()` support
