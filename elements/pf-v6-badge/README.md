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

### Not implemented

| React prop | Notes |
| --- | --- |
| `screenReaderText` | Authors slot visually-hidden text alongside the badge content, e.g. `<pf-v6-badge>3 <span class="pf-v6-screen-reader">unread messages</span></pf-v6-badge>`. |

### Changed API

| React prop | Web component | Difference |
| --- | --- | --- |
| `isRead` | `state` attribute | Boolean replaced with `'read' \| 'unread'` enum. Omitting `state` gives neutral styling (no read/unread indication). |

