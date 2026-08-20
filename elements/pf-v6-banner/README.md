# pf-v6-banner

A full-width banner for communicating short, non-dismissible messages.

## Usage

### Default banner

```html
<pf-v6-banner>Default banner</pf-v6-banner>
```

### Status banner with screen reader text

```html
<pf-v6-banner status="danger">
  <span class="pf-v6-screen-reader">Danger alert:</span>
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
| `screenReaderText` | Slotted visually-hidden text | No dedicated attribute. Slot a `<span class="pf-v6-screen-reader">` inside the banner for screen reader context. Same underlying technique as React. |
| `color` + `status` mutual exclusion | Both accepted | React enforces via TypeScript union types (`color` and `status` cannot both be set). The web component accepts both; `status` takes visual precedence via CSS cascade. |

## Migrating from `pf-v5-banner`

| v5 API | v6 API | Notes |
|---|---|---|
| `variant` attribute (`default`, `info`, `warning`, `danger`, `success`) | `status` attribute (`success`, `warning`, `danger`, `info`, `custom`) | `variant` removed. Use `status` for semantic meaning or `color` for decorative colors. `default` variant maps to no attribute (gray). |
| `icon` attribute (shorthand) | Slot an icon in the default slot | `icon` attribute removed. Use `<pf-v5-icon>` (or `<pf-v6-icon>` when available) as slotted content. |
| `icon` slot (named) | Default slot | Icons are now part of the default slot content, not a separate named slot. |

