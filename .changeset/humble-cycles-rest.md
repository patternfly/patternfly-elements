---
"@patternfly/elements": major
---

✨ Added `<pf-v6-background-image>` replacing `<pf-v5-background-image>`. Background image now follows
PatternFly v6 design specs.

```html
<pf-v6-background-image src="/path/to/image.jpg"></pf-v6-background-image>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-background-image>` to `<pf-v6-background-image>`
- ✨ Added v6 design tokens and RTL support via :dir(rtl)
- ✨ Added `aria-hidden` for screen reader compliance
- CSS custom properties renamed from `--pf-v5-c-background-image--*` to `--pf-v6-c-background-image--*`
- Removed `src-2x`, `src-sm`, `src-sm-2x`, `src-lg` responsive source attributes (use CSS custom properties or media queries instead)
- Removed `filter` boolean attribute
- `src` no longer reflects to attribute
