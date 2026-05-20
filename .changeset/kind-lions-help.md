---
"@patternfly/elements": major
---

✨ Added `<pf-v6-helper-text>` replacing `<pf-v5-helper-text>`. Helper text now follows
PatternFly v6 design specs.

```html
<pf-v6-helper-text variant="error" has-icon>Password is too short</pf-v6-helper-text>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-helper-text>` to `<pf-v6-helper-text>`
- Update bare module import to point to v6: `import '@patternfly/elements/pf-v6-helper-text/pf-v6-helper-text.js'`
- ✨ Added `has-icon` boolean attribute for opt-in default variant icons
- ✨ Added `dynamic` boolean attribute for dynamic validation contexts
- ✨ Added `screen-reader-text` attribute for custom assistive announcements
- ✨ Added `icon` slot for custom icon markup (replaces `icon` and `icon-set` attributes)
- ✨ Added `icon` and `text` CSS parts
- ✨ Added `color-scheme` support via `light-dark()`
- ✨ Added v6 design tokens
- CSS custom properties renamed from `--pf-v5-c-helper-text--*` to `--pf-v6-c-helper-text--*`
- Removed `icon` attribute (use `has-icon` for default icons or `icon` slot for custom)
- Removed `icon-set` attribute
- Removed dependency on `<pf-v5-icon>` (uses inline SVG icons)
