---
"@patternfly/elements": major
---

✨ Added `<pf-v6-spinner>` replacing `<pf-v5-spinner>`. Spinner now follows
PatternFly v6 design specs.

```html
<pf-v6-spinner accessible-label="Loading data">Loading...</pf-v6-spinner>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-spinner>` to `<pf-v6-spinner>`
- ✨ Added `inline` attribute to inherit font size for inline display
- ✨ Added `accessible-label` attribute for screen reader text
- ✨ Added `xs` size preset
- ✨ Added ARIA `progressbar` role with `aria-label` and `aria-valuetext`
- CSS custom properties renamed from `--pf-v5-c-spinner--*` to `--pf-v6-c-spinner--*`
- Default size changed from `xl` to `unset` (defaults to xl dimensions via CSS)
- Removed `diameter` attribute (use `--pf-v6-c-spinner--diameter` CSS custom property
instead)
