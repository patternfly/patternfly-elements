---
"@patternfly/elements": major
---

`<pf-v6-back-to-top>`: replaces `<pf-v5-back-to-top>` with PatternFly v6 design specs.

```html
<pf-v6-back-to-top href="#top">Back to top</pf-v6-back-to-top>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-back-to-top>` to `<pf-v6-back-to-top>`
- CSS custom properties renamed from `--pf-v5-c-back-to-top--*` to `--pf-v6-c-back-to-top--*`
- Removed `icon` and `icon-set` attributes (caret-up icon is now built-in SVG)
- Removed `scroll-distance` attribute (400px threshold, matches React)
- Renamed `label` attribute to `accessible-label`

**New features**

- `href` attribute renders as a link for progressive enhancement (works without JS)
- `accessible-label` attribute for screen reader text
- `delegatesFocus` for keyboard accessibility
- `prefers-reduced-motion` support (instant vs smooth scroll)
- v6 design tokens
