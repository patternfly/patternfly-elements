---
"@patternfly/elements": major
---

✨ Added `<pf-v6-banner>` replacing `<pf-v5-banner>`. Banner now follows
PatternFly v6 design specs.

```html
<pf-v6-banner status="info" screen-reader-text="Info banner">
  Info banner content
</pf-v6-banner>
```

** Breaking Changes from v5 **

- Renamed tag from `<pf-v5-banner>` to `<pf-v6-banner>`
- `variant` attribute split into separate color and status attributes
- CSS custom properties renamed from `--pf-v5-c-banner--*` to `--pf-v6-c-banner--*`
- ✨ Added `color` attribute for decorative colors (red, orangered, orange, yellow,
green, teal, blue, purple)
- ✨ Added `status `attribute for semantic statuses (success, warning, danger, info,
custom)
- ✨ Added `screen-reader-text` attribute for visually-hidden accessible text
- Removed `variant` attribute (use color or status instead)
- Removed `icon` attribute and icon slot (compose icons in default slot)
- Removed container and icon CSS parts
