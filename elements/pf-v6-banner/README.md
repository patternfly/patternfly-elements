# pf-v6-banner

A full-width banner for communicating short, non-dismissible messages.

## Usage

### Default banner

```html
<pf-v6-banner>Default banner</pf-v6-banner>
```

### Status banner with screen reader text

```html
<pf-v6-banner status="danger" screen-reader-text="Danger banner:">
  An error has occurred. Contact support for help.
</pf-v6-banner>
```

### Sticky color banner

```html
<pf-v6-banner color="blue" sticky>
  This banner sticks to the top of its container.
</pf-v6-banner>
```

## Divergences from React `Banner`

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `isSticky` | `sticky` attribute | Renamed; dropped `is` prefix |
| `color` + `status` mutual exclusion | Both accepted | React enforces via TypeScript union types (`color` and `status` cannot both be set). The web component accepts both; `status` takes visual precedence via CSS cascade. |

