---
"@patternfly/elements": major
---

`<pf-v6-avatar>`: replaces `<pf-v5-avatar>` with PatternFly v6 design specs.

```html
<pf-v6-avatar src="./photo.jpg" alt="User name"></pf-v6-avatar>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-avatar>` to `<pf-v6-avatar>`
- CSS custom properties renamed from `--pf-v5-c-avatar--*` to `--pf-v6-c-avatar--*`
- Replaced `border` attribute with `bordered` boolean attribute
- `alt` attribute no longer defaults to "Avatar image" (defaults to empty string for decorative use)
- `size` attribute no longer defaults to `sm` (renders at default 2.25rem dimensions)
- Removed `dark` attribute
- Removed `load` event

**New features**

- `size` attribute with `sm`, `md`, `lg`, `xl` presets
- `bordered` boolean attribute
- `light-dark()` color scheme support for placeholder graphic
- v6 design tokens
