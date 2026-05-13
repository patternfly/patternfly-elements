---
"@patternfly/elements": major
---

✨ Added `<pf-v6-avatar>` replacing `<pf-v5-avatar>`. Avatar now follows
PatternFly v6 design specs.

```html
<pf-v6-avatar src="./photo.jpg" alt="User name"></pf-v6-avatar>
```

**Breaking Changes from v5 **

- Renamed tag from `<pf-v5-avatar>` to `<pf-v6-avatar>`
- ✨ Added `size` attribute with `sm`, `md`, `lg`, `xl` presets
- ✨ Added `bordered` boolean attribute
- ✨ Added `color-scheme` support via `light-dark()` for placeholder graphic
- ✨ Added v6 design tokens
- CSS custom properties renamed from `--pf-v5-c-avatar--*` to `--pf-v6-c-avatar--*`
- Replaced `border` attribute with `bordered` boolean attribute
- `alt` attribute no longer defaults to "Avatar image" (defaults to empty string)
- `size` attribute no longer defaults to `sm` (defaults to `unset`, renders at default
dimensions)
- Removed `dark` attribute
