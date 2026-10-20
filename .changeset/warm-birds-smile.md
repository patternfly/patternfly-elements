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
- `validate-on` attribute removed; `error-text` now supplies the message for `validated="error"`, instead of replacing an existing validation message

**New features**

- `validated="error"` state with `aria-invalid` and constraint validation; messages announced through a `role="alert"` status message
- Declarative `error-text` message for the error state, with a fallback when none is provided
- Constraint validation via `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- `autocomplete` attribute forwarded to the inner input, with browser-autocompleted values restored to form state
- `maxlength`, `minlength`, and `inputmode` attributes
- `select()` method
- `icon` slot for custom icon content
- Bubbling, non-cancelable `change` event re-dispatched from the host
- Enter-to-submit ignores Enter while text is being composed
- v6 design tokens and `light-dark()` support
