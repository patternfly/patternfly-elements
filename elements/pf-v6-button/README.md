# Button

A button communicates and triggers user actions when clicked or selected.

## Usage

### Basic button

```html
<pf-v6-button>Primary</pf-v6-button>
<pf-v6-button variant="secondary">Secondary</pf-v6-button>
```

### Icon button

```html
<pf-v6-button variant="plain" accessible-label="Close">
  <svg slot="icon" …></svg>
</pf-v6-button>
```

### Form submit

```html
<form>
  <pf-v6-button type="submit">Save</pf-v6-button>
  <pf-v6-button type="reset" variant="secondary">Reset</pf-v6-button>
</form>
```

### Theming

Override the same `--pf-v6-c-button--*` tokens as PatternFly CSS / React. For variant colors, prefer the `m-{variant}` tokens (variants assign those onto the shared surface tokens):

```css
pf-v6-button {
  --pf-v6-c-button--BorderRadius: 0.25rem;
  --pf-v6-c-button--m-primary--BackgroundColor: navy;
  --pf-v6-c-button--m-primary--Color: white;
}
```

Style shadow internals with parts:

```css
pf-v6-button::part(button) { /* surface */ }
pf-v6-button::part(icon) { /* icon wrapper */ }
pf-v6-button::part(text) { /* label wrapper */ }
pf-v6-button::part(count) { /* count badge wrapper */ }
pf-v6-button::part(progress) { /* spinner wrapper */ }
```

## Divergences from React `Button`

### Not implemented

| React prop                                 | Notes                                                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `component`                                | Web components cannot change their host tag. Use `href` for anchors, or wrap the button in semantic HTML. |
| `className`                                | Not needed with shadow DOM; style the host or `::part(button)`.                                           |
| `ouiaId` / `ouiaSafe`                      | OUIA helpers are React-specific.                                                                          |
| `inoperableEvents`                         | Aria-disabled blocks `click` activation; custom event lists are not exposed.                              |
| `spinnerAriaLabelledBy`                    | Use `loading-label` or the spinner's `accessible-label`.                                                  |
| `isCircle` / `isDocked` / `isTextExpanded` | Beta React APIs; omitted until design stabilizes.                                                         |
| `innerRef`                                 | Use a normal element reference to the host.                                                               |
| `formaction` / `formenctype` / etc.        | Not reliably supported on FACE submitters; use form-level attributes or a native submit control.          |
| `SubmitEvent.submitter`                    | Engines may reject FACE hosts as `requestSubmit(submitter)`; form still submits and `name`/`value` participate via `setFormValue`. |

### Changed API

| React prop                                  | Web component            | Difference                                                                                       |
| ------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `isDisabled`                                | `disabled`               | Dropped `is-` prefix.                                                                            |
| `isAriaDisabled`                            | `disabled-focusable`     | Keeps the button focusable while blocking activation; sets `aria-disabled` via ElementInternals. |
| `isLoading`                                 | `loading`                | Tri-state preserved: omit / `null` (off), `loading` / `true` (spinner), `loading="false"` (reserved progress padding). |
| `isBlock`                                   | `block`                  | Dropped `is-` prefix.                                                                            |
| `isInline`                                  | `inline`                 | Dropped `is-` prefix.                                                                            |
| `isDanger`                                  | `danger`                 | Dropped `is-` prefix. Applies to `secondary` and `link` variants.                                |
| `isClicked`                                 | `clicked`                | Dropped `is-` prefix. (React renamed `isActive` → `isClicked`.)                                  |
| `isFavorite` / `isFavorited`                | `favorite` / `favorited` | Dropped `is-` prefix.                                                                            |
| `isSettings`                                | `settings`               | Dropped `is-` prefix.                                                                            |
| `isHamburger` / `isExpanded`                | `hamburger` / `expanded` | Dropped `is-` prefix.                                                                            |
| `hasNoPadding`                              | `no-padding`             | Dash-case boolean attribute.                                                                     |
| `aria-label`                                | `accessible-label`       | Custom attribute; applied via ElementInternals.                                                  |
| `icon`                                      | `slot="icon"` or `icon` / `icon-set` | Prefer slotted icons. Optional shorthand renders `<pf-v5-icon>`.                          |
| `iconPosition`                              | `icon-position`          | `start` / `end`; accepts deprecated `left` / `right` aliases.                                    |
| `countOptions`                              | `slot="count"`           | Slot a `<pf-v6-badge>` instead of an options object.                                             |
| `spinnerAriaLabel` / `spinnerAriaValueText` | `loading-label`          | Reactive attribute/property for the spinner accessible name.                                     |
| `size="default"`                            | omit `size`              | Default size is the absence of the attribute.                                                    |
| `component="a"` + `href`                    | `href` / `target`        | Renders an inner anchor when `variant="link"` and `href` are set.                                |
| `type` default                              | omit / unset             | Same as React: no form action until `type="submit"` or `type="reset"`.                           |

### Added

| Web component API                                      | Notes                                                                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Form association (`formAssociated`)                    | Host participates in forms like a native button; supports `type`, `name`, and `value`. |
| `href` / `target`                                      | Progressive-enhancement link rendering for `variant="link"`.                           |
| `slot="icon"` / `slot="count"`                         | Composition slots for icons and count badges.                                          |
| `icon` / `icon-set`                                    | Optional shorthand that renders `<pf-v5-icon>` in the icon slot.                       |
| CSS parts `button`, `icon`, `text`, `count`, `progress` | Styling hooks for shadow internals.                                                   |
| `--pf-v6-c-button--*` custom properties                | Same component tokens as PatternFly CSS / React styles.                                |
