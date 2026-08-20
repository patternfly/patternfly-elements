---
"@patternfly/elements": major
---

✨ Added `<pf-v6-switch>` replacing `<pf-v5-switch>`. Switch now follows
PatternFly v6 design specs.

```html
<pf-v6-switch checked>Wi-Fi</pf-v6-switch>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-switch>` to `<pf-v6-switch>`
- Removed `data-state="on|off"` label toggling — labels are now static, matching React and WCAG APG switch pattern
- CSS custom properties renamed from `--pf-v5-c-switch--*` to `--pf-v6-c-switch--*`
- Fixed form association (FACE): submits `"on"` when checked, reverts on form reset
- ✨ Added cancelable `change` event: call `preventDefault()` to reject a toggle
- ✨ Added external `<label for="id">` support
- ✨ Added `reversed` attribute for reversed label/toggle layout