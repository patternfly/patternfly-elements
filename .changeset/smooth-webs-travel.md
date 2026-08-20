---
"@patternfly/elements": major
---

`<pf-v6-banner>`: replaces `<pf-v5-banner>` with PatternFly v6 design specs.

```html
<pf-v6-banner status="info">
  <span class="pf-v6-screen-reader">Info alert:</span>
  Info banner content
</pf-v6-banner>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-banner>` to `<pf-v6-banner>`
- `variant` attribute split into separate `color` and `status` attributes
- CSS custom properties renamed from `--pf-v5-c-banner--*` to `--pf-v6-c-banner--*`
- Removed `icon` attribute and `icon` slot (compose icons in default slot)
- Removed `container` and `icon` CSS parts

**New features**

- `color` attribute for decorative colors (red, orangered, orange, yellow, green, teal, blue, purple)
- `status` attribute for semantic statuses (success, warning, danger, info, custom)
