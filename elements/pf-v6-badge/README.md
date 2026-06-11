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

### Added

| Web component API | Notes |
| --- | --- |
| `--pf-v6-c-badge--MinWidth` | Minimum width of the badge. |
| `--pf-v6-c-badge--PaddingInlineStart` | Inline start padding. |
| `--pf-v6-c-badge--PaddingInlineEnd` | Inline end padding. |
| `--pf-v6-c-badge--FontSize` | Font size of the badge text. |
| `--pf-v6-c-badge--FontWeight` | Font weight of the badge text. |
| `--pf-v6-c-badge--Color` | Text color of the badge. |
| `--pf-v6-c-badge--BackgroundColor` | Background color of the badge. |
| `--pf-v6-c-badge--BorderRadius` | Border radius of the badge. |
| `--pf-v6-c-badge--BorderWidth` | Border width of the badge. |
| `--pf-v6-c-badge--BorderColor` | Border color of the badge. |
