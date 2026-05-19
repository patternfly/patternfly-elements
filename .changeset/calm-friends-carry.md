---
"@patternfly/elements": major
---

✨ Added `<pf-v6-progress>` replacing `<pf-v5-progress>`. Progress bar now follows
PatternFly v6 design specs.

```html
<pf-v6-progress value="33" description="Loading..."></pf-v6-progress>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-progress>` to `<pf-v6-progress>`
- ✨ Added `accessible-label` attribute for screen reader text via ElementInternals
- ✨ Added `accessible-labelledby` and `accessible-describedby` for cross-root ARIA references
- ✨ Added `value-text` attribute for custom aria-valuetext (finite step displays)
- ✨ Added `truncated `attribute for ellipsis overflow on description
- ✨ Added `hide-status-icon` attribute for tight layouts
- ✨ Added `helper-text` slot for supplementary text below the bar
- ✨ Added v6 design tokens and `light-dark()` support
- CSS custom properties renamed from `--pf-v5-c-progress--*` to `--pf-v6-c-progress--*`
