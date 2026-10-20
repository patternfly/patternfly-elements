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

When `validated="error"` or constraint validation fails, the element renders a visually-hidden status message linked via `aria-describedby` with `role="alert"`. Screen readers announce the `error-text` content when it appears.

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
| `isStartTruncated` / `isLeftTruncated` | `truncated="start"` | Enum attribute for future extensibility. |
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
