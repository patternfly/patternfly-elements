---
"@patternfly/elements": major
---

`<pf-v6-spinner>`: replaces `<pf-v5-spinner>` with PatternFly v6 design specs.

```html
<pf-v6-spinner accessible-label="Loading data">Loading...</pf-v6-spinner>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-spinner>` to `<pf-v6-spinner>`
- CSS custom properties renamed from `--pf-v5-c-spinner--*` to `--pf-v6-c-spinner--*`
- Removed `diameter` attribute (use `--pf-v6-c-spinner--diameter` CSS custom property instead)

**New features**

- `inline` attribute to inherit font size for inline display
- `accessible-label` attribute for screen reader text
- `value-text` attribute for progress state description
- `xs` size preset
- ARIA `progressbar` role with `aria-label` and `aria-valuetext` via ElementInternals
- `prefers-reduced-motion` support
