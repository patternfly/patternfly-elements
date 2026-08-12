---
"@patternfly/elements": major
---

`<pf-v6-text-input>`: replaces `<pf-v5-text-input>` with PatternFly v6 design specs.

```html
<label for="name">Name</label>
<pf-v6-text-input id="name" name="name"></pf-v6-text-input>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-text-input>` to `<pf-v6-text-input>`
- CSS custom properties renamed from `--pf-v5-c-form-control--*` to `--pf-v6-c-form-control--*`
- `left-truncated` attribute replaced by `truncated="start"` enum
- `icon` / `custom-icon-url` / `custom-icon-dimensions` attributes replaced by `icon` slot
- `validate-on` and `error-text` attributes removed

**New features**

- `referenceTarget` support for native cross-root label association
- `validated="error"` state with `aria-invalid` and `role="alert"` status message
- Constraint validation via `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- `maxlength`, `minlength`, and `inputmode` attributes
- `select()` method
- `icon` slot for custom icon content
- Cancelable `change` event
- v6 design tokens and `light-dark()` support
