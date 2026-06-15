# Badge

A badge is used to annotate other information like a label or an object name.

## Usage

### Basic badge

```html
<pf-v6-badge>7</pf-v6-badge>
```

### Read and unread badges

```html
<pf-v6-badge state="read">24</pf-v6-badge>
<pf-v6-badge state="unread">7</pf-v6-badge>
```

### Disabled badge

```html
<pf-v6-badge state="read" disabled>10</pf-v6-badge>
```

## Divergences from React `Badge`

### Changed API

| React prop | Web component | Difference |
| --- | --- | --- |
| `isRead` | `state` attribute | Boolean replaced with `'read' \| 'unread'` enum. Omitting `state` gives neutral styling. |
| `isDisabled` | `disabled` | Dropped `is-` prefix per web component convention. |
| `screenReaderText` | Slotted visually-hidden text | No dedicated attribute. Slot a visually-hidden `<span>` inside the badge for screen reader context: `<pf-v6-badge>3 <span class="pf-v6-screen-reader">unread messages</span></pf-v6-badge>`. Same underlying technique as React -- `ariaLabel` cannot label a generic element. |

