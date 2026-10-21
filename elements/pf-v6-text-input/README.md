# pf-v6-text-input

A **text input** gathers free-form text from a user. Use it for single-line
entries like names, emails, or search queries.

## Usage

```html
<label for="name">Name</label>
<pf-v6-text-input id="name" name="name"></pf-v6-text-input>
```

### With type and validation

```html
<pf-v6-text-input type="email"
                  accessible-label="Email address"
                  autocomplete="email"
                  required></pf-v6-text-input>
```

### With custom icon

```html
<pf-v6-text-input accessible-label="Search">
  <svg slot="icon" aria-hidden="true" viewBox="0 0 512 512">...</svg>
</pf-v6-text-input>
```

## Accessibility

### Label association

The element uses a two-tier fallback for accessible label association:

1. **FACE + `delegatesFocus`** (all browsers): The `<label for>` associates with the host element. Clicking the label focuses the input via `delegatesFocus`. The label text is copied to `aria-label` on the internal input.

2. **`accessible-label` attribute** (escape hatch): When no `<label>` element exists, set `accessible-label` to provide an accessible name directly.

Consumers always write standard HTML -- the element picks the best mechanism:

```html
<label for="email">Email</label>
<pf-v6-text-input id="email" name="email"></pf-v6-text-input>
```

### Error announcements

`validated="error"` shows error styling and sets `aria-invalid`, but does not
block form submission by itself. For a server error, also set `error-text`:

```html
<pf-v6-text-input name="username"
                  accessible-label="Username"
                  value="taken"
                  validated="error"
                  error-text="Name already taken"></pf-v6-text-input>
```

Together, these attributes make an enabled, editable field fail validation and
announce the message in an alert linked through `aria-describedby`. `error-text`
alone does not affect validity. Disabled and readonly fields, including those
in disabled fieldsets, skip validation and hide the alert, but retain the error
until they become editable again. Editing or autofilling a different value
clears both attributes; native constraints such as `required` and `pattern`
then apply.

Use `setCustomValidity()` for an independent error that overrides `error-text`.
`setCustomValidity('')` clears only that error; removing or emptying `error-text`
clears only the declarative error.

## Divergences from React `TextInput`

### Intentionally omitted

| React prop | Notes |
|---|---|
| `isExpanded` / `expandedProps` | Combobox patterns will be handled by a dedicated composite element. |
| `expandedProps.ariaControls` | See above. |
| `ouiaId` / `ouiaSafe` | OUIA testing hooks; not applicable to web components. |
| `className` | Shadow DOM encapsulation removes the need. |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `isStartTruncated` / `isLeftTruncated` | `truncated="start"` | Enum attribute for future extensibility. The full value is only visually truncated, so clicking leaves the caret near the clicked text. React replaces the input value for truncation, then restores it on focus, moving the caret to the end. |
| `isDisabled` | `disabled` | Dropped `is-` prefix per web component convention. |
| `isRequired` | `required` | Dropped `is-` prefix per web component convention. |
| `readOnlyVariant` | `readonly` + `plain` | Separate readonly state from plain styling; `readonly` is native HTML, `plain` is a boolean modifier. |
| `customIcon` (React node) | `icon` slot | Slotted content for composability. |
| `onChange` callback | `change` event | Standard DOM event, fired on blur or Enter; not cancelable, like native `<input>` `change`. |
| `validated="default"` | absence of `validated` | No-op state is represented by attribute absence. |
| `innerRef` + `.select()` | `select()` method | Exposed directly on the element instead of requiring a ref. |

### Added

| Web component API | Notes |
|---|---|
| Form-Associated Custom Element | Native form participation, submission, reset, and constraint validation via `ElementInternals`. Exposes standard methods: `checkValidity()`, `reportValidity()`, `setCustomValidity()`. |
| `error-text` | Declarative custom error message for `validated="error"`; both attributes clear when the user changes the value. |
