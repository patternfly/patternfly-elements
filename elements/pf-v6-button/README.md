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

## Divergences from React `Button`

### Not implemented

| React prop                                 | Notes                                                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `component`                                | Web components cannot change their host tag. Use `href` for anchors, or wrap the button in semantic HTML. |
| `className`                                | Not needed with shadow DOM.                                                                               |
| `ouiaId` / `ouiaSafe`                      | OUIA helpers are React-specific.                                                                          |
| `inoperableEvents`                         | Aria-disabled blocks `click` activation; custom event lists are not exposed.                              |
| `spinnerAriaLabelledBy`                    | Use `loading-label` or the spinner's `accessible-label`.                                                  |
| `isCircle` / `isDocked` / `isTextExpanded` | Beta React APIs; omitted until design stabilizes.                                                         |
| `innerRef`                                 | Use a normal element reference to the host.                                                               |

### Changed API

| React prop                                  | Web component            | Difference                                                                                       |
| ------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `isDisabled`                                | `disabled`               | Dropped `is-` prefix.                                                                            |
| `isAriaDisabled`                            | `disabled-focusable`     | Keeps the button focusable while blocking activation; sets `aria-disabled` via ElementInternals. |
| `isLoading`                                 | `loading`                | Dropped `is-` prefix.                                                                            |
| `isBlock`                                   | `block`                  | Dropped `is-` prefix.                                                                            |
| `isInline`                                  | `inline`                 | Dropped `is-` prefix.                                                                            |
| `isDanger`                                  | `danger`                 | Dropped `is-` prefix. Applies to `secondary` and `link` variants.                                |
| `isClicked`                                 | `clicked`                | Dropped `is-` prefix.                                                                            |
| `isFavorite` / `isFavorited`                | `favorite` / `favorited` | Dropped `is-` prefix.                                                                            |
| `isSettings`                                | `settings`               | Dropped `is-` prefix.                                                                            |
| `isHamburger` / `isExpanded`                | `hamburger` / `expanded` | Dropped `is-` prefix.                                                                            |
| `hasNoPadding`                              | `no-padding`             | Dash-case boolean attribute.                                                                     |
| `aria-label`                                | `accessible-label`       | Custom attribute; applied via ElementInternals.                                                  |
| `icon`                                      | `slot="icon"` or `icon` / `icon-set` | Prefer slotted icons. Optional shorthand renders `<pf-v5-icon>`.                          |
| `countOptions`                              | `slot="count"`           | Slot a `<pf-v6-badge>` instead of a options object.                                              |
| `spinnerAriaLabel` / `spinnerAriaValueText` | `loading-label`          | Reactive attribute/property for the spinner accessible name.                                     |
| `size="default"`                            | omit `size`              | Default size is the absence of the attribute.                                                    |
| `component="a"` + `href`                    | `href` / `target`        | Renders an inner anchor when `variant="link"` and `href` are set.                                |

### Added

| Web component API                             | Notes                                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| Form association (`formAssociated`)           | Host participates in forms like a native button; supports `type`, `name`, and `value`. |
| `href` / `target`                             | Progressive-enhancement link rendering for `variant="link"`.                           |
| `slot="icon"` / `slot="count"`                | Composition slots for icons and count badges.                                          |
| `icon` / `icon-set`                           | Optional shorthand that renders `<pf-v5-icon>` in the icon slot.                       |
| CSS parts `icon`, `text`, `count`, `progress` | Limited styling hooks for shadow internals.                                            |
