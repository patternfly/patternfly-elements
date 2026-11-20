# pf-v6-checkbox

A **checkbox** is used to select a single item or multiple items, typically to
choose elements to perform an action or to reflect a binary setting.

## Usage

```html
<pf-v6-checkbox label="Checkbox"></pf-v6-checkbox>
```

### Checked

```html
<pf-v6-checkbox label="Checkbox" checked></pf-v6-checkbox>
```

### Required

```html
<pf-v6-checkbox label="Checkbox" required></pf-v6-checkbox>
```

### With an external label

The element is a form-associated custom element, so it works with a native
`<label for="id">`. Do not combine an external label with the `label` attribute.

```html
<pf-v6-checkbox id="choice" name="choice"></pf-v6-checkbox>
<label for="choice">Choice</label>
```

### Description and body

Use `slot="description"` for descriptive text and the default slot for custom
body content. Nested checkboxes placed in the default slot are controlled by
their parent.

```html
<pf-v6-checkbox label="Checkbox">
  <span slot="description">Description text</span>
  <span>Body content</span>
</pf-v6-checkbox>
```

### Indeterminate

`indeterminate` is a JavaScript-only property, matching the native
`<input type="checkbox">` API. While indeterminate, the element exposes
`aria-checked="mixed"`.

```html
<pf-v6-checkbox id="partial" label="Partially selected"></pf-v6-checkbox>
<script type="module">
  document.getElementById('partial').indeterminate = true;
</script>
```

### Reversed label

```html
<pf-v6-checkbox label="Checkbox" label-position="start"></pf-v6-checkbox>
```

### Form association

`<pf-v6-checkbox>` submits its `value` (default `"on"`) when checked, and is
omitted from the form data when unchecked. Form reset restores the initial
`checked` state.

```html
<form>
  <pf-v6-checkbox name="choice" value="yes" label="Choice"></pf-v6-checkbox>
</form>
```

## Divergences from React `Checkbox`

### Intentionally omitted

| React prop | Notes |
|---|---|
| `defaultChecked` | React-only uncontrolled pattern; the `checked` attribute is the initial state, and form reset restores it |
| `isLabelWrapped` | Not needed: clicking the shadow label always toggles the checkbox |
| `component` | Not applicable to a custom element |
| `ouiaId` / `ouiaSafe` | React testing props; not part of the web component API |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `label` | `label` attribute | Rendered as a shadow label. External `<label for>` is also supported |
| `id` | `id` attribute | Native attribute |
| `name` | `name` attribute | Native attribute |
| `value` | `value` property/attribute | Defaults to `"on"` |
| `isChecked` / `checked` | `checked` attribute/property | Dropped `is-` prefix per web component convention |
| `isDisabled` | `disabled` | Dropped `is-` prefix per web component convention |
| `isRequired` | `required` | Dropped `is-` prefix per web component convention |
| `isValid` | `invalid` | Inverted boolean: set `invalid` to show the invalid state |
| `isChecked={null}` | `indeterminate` property | JavaScript-only property, like native checkboxes |
| `description` | `slot="description"` | Slotted content instead of a prop |
| `body` | Default slot | Slotted content instead of a prop |
| `labelPosition` | `label-position` | `"start"` or `"end"` (default) |
| `aria-label` | `accessible-label` attribute or native `aria-label` | `accessible-label` follows the PFE convention |
| `onChange` | `input` and `change` events | Native-style events |

### Added

| Web component API | Notes |
|---|---|
| External `<label>` support | Works with `<label for="id">` and labels wrapping the element |
| Form association | Participates in native form submission, validation, reset, and disabled fieldsets |
| Form reset | Restores the initial `checked` state |
| Controlled checkboxes | Nested checkboxes are toggled by their parent, which reflects the aggregate state |
| Cross-root ARIA | Uses ARIA IDL element references (`ariaLabelledByElements`, `ariaDescribedByElements`) so the shadow label and description are exposed to assistive technology |
| CSS shadow parts | `input`, `label`, `required`, `description`, and `body` |

## Accessibility

The host element is the semantic checkbox: it has `role="checkbox"` and exposes
`aria-checked`, `aria-disabled`, `aria-required`, and `aria-invalid` through
`ElementInternals`. The shadow `<input type="checkbox">` is a visual affordance
only and is hidden from assistive technology.

- <kbd>Tab</kbd> and <kbd>Shift</kbd> + <kbd>Tab</kbd> move focus between the
  checkbox and other focusable elements.
- <kbd>Space</kbd> toggles the checkbox. <kbd>Enter</kbd> does not.
- Clicking the visible label toggles the checkbox, and the label has a pointer
  cursor to show that it can be clicked.
- A checkbox without a visible label must have an accessible name. Use
  `accessible-label`, `aria-label`, or `aria-labelledby`.
- The `description` slot is exposed as the checkbox's accessible description
  automatically.

`ShadowRoot.referenceTarget` is not needed for label association: the host
element is the labeled control, so a native `<label for="id">` is associated
through `ElementInternals.labels` without forwarding to the shadow input.
