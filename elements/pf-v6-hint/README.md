# pf-v6-hint

`<pf-v6-hint>` shares a reminder, explanation, or call to action on a page.

## Usage

### Message

```html
<pf-v6-hint>
  Welcome to the new documentation experience.
</pf-v6-hint>
```

### Title, actions, and footer

```html
<pf-v6-hint ssr-hint-has-slotted="title,actions,footer">
  <pf-v6-button slot="actions" variant="plain" accessible-label="Hint actions"></pf-v6-button>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  <pf-v6-button slot="footer" variant="link" inline>Try it for 90 days</pf-v6-button>
</pf-v6-hint>
```

### Button action without the plain-action offset

```html
<pf-v6-hint no-actions-offset ssr-hint-has-slotted="title,actions">
  <pf-v6-button slot="actions" variant="primary">Action</pf-v6-button>
  <span slot="title">Do more with Find it Fix it capabilities</span>
  Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
</pf-v6-hint>
```

`ssr-hint-has-slotted` lists named slots that have content, so a server render
does not hide those regions. Omit it for client-only pages.

## Divergences from React `Hint`

React splits the hint into `Hint`, `HintTitle`, `HintBody`, and `HintFooter`.
One element with slots covers the same content. A title attribute is not
offered: the global `title` attribute opens the browser's native tooltip.

### Changed API

| React prop | Web component | Difference |
| --- | --- | --- |
| `HintTitle` children | `title` slot | Slot on `<pf-v6-hint>`. Put plain text in an element, such as `<span slot="title">`. |
| `HintBody` children | default slot | The message is the default slot. |
| `HintFooter` children | `footer` slot | Footer actions are slotted. Space between items uses `--pf-v6-c-hint__footer--child--MarginInlineEnd` as a column gap. |
| `actions` | `actions` slot | Slot instead of a render prop. |
| `hasNoActionsOffset` | `no-actions-offset` | Boolean attribute. Present removes the plain-action offset. |
| `className` | CSS custom properties | Shadow DOM replaces extra classes. Theme with `--pf-v6-c-hint--*` properties. |

## Migrating from `pf-v5-hint`

| v5 API | v6 API | Notes |
| --- | --- | --- |
| `<pf-v5-hint>` | `<pf-v6-hint>` | Tag renamed. |
| `title`, default, `footer`, and `actions` slots | same slots | Slot names are unchanged. |
| CSS parts `container`, `actions`, `title`, `body`, `footer` | removed | Theme with the v6 CSS custom properties. |
| `--pf-v5-c-hint--*` | `--pf-v6-c-hint--*` | Names and values follow PatternFly v6. |
| — | `no-actions-offset` | New. Removes the offset on plain actions. |
