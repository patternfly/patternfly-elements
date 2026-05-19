---
"@patternfly/elements": major
---

✨ Added `<pf-v6-back-to-top>` replacing `<pf-v5-back-to-top>`. Back to top now follows
PatternFly v6 design specs.

```html
<pf-v6-back-to-top href="#top">Back to top</pf-v6-back-to-top>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-back-to-top>` to `<pf-v6-back-to-top>`
- ✨ Added accessible-label attribute for screen reader text
- ✨ Added delegatesFocus for keyboard accessibility
- ✨ Added prefers-reduced-motion support (instant vs smooth scroll)
- ✨ Added v6 design tokens
- CSS custom properties renamed from --pf-v5-c-back-to-top--* to --pf-v6-c-back-to-top--*
- Removed icon and icon-set attributes (caret-up icon is now built-in SVG)
- Removed scroll-distance attribute (hardcoded to 400px threshold)
- Renamed label attribute to accessible-label
