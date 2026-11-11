---
"@patternfly/elements": major
---

`<pf-v6-card>`: replaces `<pf-v5-card>` with PatternFly v6 design specs.

```html
<pf-v6-card selectable selection="single" name="cards" accessible-label="First card">
  <h2 slot="header">First card</h2>
  <span slot="subtitle">Subtitle</span>
  <pf-v6-card-body>This card is selectable.</pf-v6-card-body>
  <span slot="footer">Footer</span>
</pf-v6-card>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-card>` to `<pf-v6-card>`
- CSS custom properties renamed from `--pf-v5-c-card--*` to `--pf-v6-c-card--*`
- Removed `flat` and `rounded` attributes. v6 cards are rounded and bordered by default; use `plain` to remove the background and border.
- The shadow DOM no longer renders an `<article>` landmark. Cards are used in multiples, so the host is the card container to avoid landmark pollution.
- `size` remains `compact` / `large`.

**New features**

- `selectable`, `selection`, `selected`, `hide-input`, and `name` for checkbox and radio cards, with form association (`value` submits with the form)
- `clickable`, `href`, and `target` for full-card buttons and links
- `expandable` and `expanded` with a header toggle and cancelable `expand` / `collapse` events
- `variant="secondary"`, `glass`, and `header-wrap` modifiers
- `header`, `title`, `subtitle`, `actions`, and `expandable-content` slots
- `no-offset` and `toggle-right` header options
- `pf-v6-card-body` element for multiple body sections and `no-fill`
- `change` event for selectable cards; `header`, `actions`, `body`, `expandable-content`, `footer`, and `toggle` CSS parts
