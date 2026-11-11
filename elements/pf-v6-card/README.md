# pf-v6-card

A square or rectangular container that holds information about a single subject.
Cards may be selectable, actionable, or expandable, and may be composed with a
header, title, subtitle, actions, one or more bodies, and a footer.

> **TODO:** demos and examples use native `<button>` elements where
> `pf-v6-button` will be used once it ships (PR #3157). The selectable control
> is a native `<input type="checkbox">` / `<input type="radio">` because
> `pf-v6-checkbox` and `pf-v6-radio` are not yet available (PRs #2608, #2882);
> it should use those elements once they ship.

## Usage

### Basic card

```html
<pf-v6-card>
  <h2 slot="title">Title</h2>
  <pf-v6-card-body>Body</pf-v6-card-body>
  <span slot="footer">Footer</span>
</pf-v6-card>
```

### Header with actions and a subtitle

```html
<pf-v6-card>
  <img slot="header" src="/brand/logo/svg/pfe-icon-blue.svg" alt="PatternFly">
  <button slot="actions" type="button" aria-label="Actions">Actions</button>
  <h2 slot="title">Title</h2>
  <span slot="subtitle">Subtitle</span>
  <pf-v6-card-body>Body</pf-v6-card-body>
</pf-v6-card>
```

### Selectable card

```html
<pf-v6-card selectable accessible-label="First card">
  <h2 slot="header">First card</h2>
  <pf-v6-card-body>This card is selectable.</pf-v6-card-body>
</pf-v6-card>
```

Use `selection="single"` and a shared `name` to create a radio group. Wrap the
group in an element with `role="radiogroup"` and an accessible label:

```html
<div role="radiogroup" aria-label="Cards">
  <pf-v6-card selectable selection="single" name="cards" accessible-label="First card">
    <h2 slot="header">First card</h2>
    <pf-v6-card-body>Choose one.</pf-v6-card-body>
  </pf-v6-card>

  <pf-v6-card selectable selection="single" name="cards" accessible-label="Second card">
    <h2 slot="header">Second card</h2>
    <pf-v6-card-body>Choose one.</pf-v6-card-body>
  </pf-v6-card>
</div>
```

Radio groups implement roving tabindex: one card is a tab stop, and arrow keys,
Home, and End move the selection within the group.

### Actionable card

```html
<pf-v6-card clickable href="/details" accessible-label="View details">
  <h2 slot="header">View details</h2>
  <pf-v6-card-body>This card is a link.</pf-v6-card-body>
</pf-v6-card>
```

### Expandable card

```html
<pf-v6-card expandable accessible-label="Title">
  <h2 slot="header">Title</h2>
  <div slot="expandable-content">
    <pf-v6-card-body>Hidden until expanded.</pf-v6-card-body>
  </div>
</pf-v6-card>
```

### Multiple body sections

```html
<pf-v6-card>
  <h2 slot="title">Title</h2>
  <pf-v6-card-body>Body</pf-v6-card-body>
  <pf-v6-card-body no-fill>Secondary body</pf-v6-card-body>
</pf-v6-card>
```

## Accessibility notes

- **Accessible name.** Selectable, clickable, and expandable cards need a name
  for their control. The element derives it from `accessible-label`, the title
  slot, a heading in the header slot, or an image's `alt` text. Set
  `accessible-label` when none of those sources provides text.
- **Single selection.** Native radios cannot group across shadow roots, so wrap
  single-selection cards in `role="radiogroup"` with an accessible label.
- **Disabled cards.** `disabled` disables the card's own control only. Disable
  or remove slotted interactive content from the tab order yourself.
- **Actionable-only cards.** The full-card overlay covers slotted content for
  pointer users. Do not put other interactive content in an actionable-only
  card; use `clickable` + `selectable` when the card needs both.

## Divergences from React `Card`

### Not implemented

| React prop | Notes |
|---|---|
| `component` (on `Card`, `CardTitle`, `CardBody`, `CardFooter`) | The shadow DOM structure is fixed. To control document semantics, slot a heading element (`<h2>`–`<h6>`) into `title` or `header`. |
| `ouiaId`, `ouiaSafe` | No OUIA analytics attributes. |
| `innerRef` | No React ref forwarding; use `document.querySelector()` or a template ref. |
| `CardHeader.toggleButtonProps` | Arbitrary props are not spread onto the toggle. Use `accessible-label` to name the toggle. |
| `CardHeader.actions.className` | Style the elements slotted into `actions` directly. |
| `CardHeader.selectableActions.selectableActionProps` | Arbitrary props are not spread onto the control. |
| `CardHeader.selectableActions.selectableActionId` / `className` | The internal control's id and class are managed by the element. Use `accessible-label` for its name. |

### Changed API

| React prop | Web component | Difference |
|---|---|---|
| `isCompact` / `isLarge` | `size="compact"` / `size="large"` | Replaced by one exclusive enum. |
| `isFullHeight` | `full-height` attribute | Dropped `is` prefix |
| `isPlain` | `plain` attribute | Dropped `is` prefix |
| `isGlass` | `glass` attribute | Dropped `is` prefix |
| `isSelectable` | `selectable` attribute | Dropped `is` prefix |
| `isClickable` | `clickable` attribute | Dropped `is` prefix |
| `isSelected` | `selected` attribute | Dropped `is` prefix; reflected |
| `isClicked` | `clicked` attribute | Dropped `is` prefix; reflected |
| `isDisabled` | `disabled` attribute | Dropped `is` prefix; participates in form disabling |
| `isExpanded` | `expanded` attribute | Dropped `is` prefix; reflected |
| `CardHeader.onExpand` | `expand` / `collapse` events | Events bubble and are cancelable; the card updates `expanded` unless prevented |
| `CardHeader.selectableActions.variant` | `selection="single"` | `single` renders a radio; the default (`multiple`) renders a checkbox |
| `CardHeader.selectableActions.isHidden` | `hide-input` | Renamed; tiles use this |
| `CardHeader.selectableActions.selectableActionAriaLabel` | `accessible-label` | When omitted, the title or header text is used |
| `CardHeader.selectableActions.selectableActionAriaLabelledby` | `accessible-label` | Cross-root `aria-labelledby` is not supported; use `accessible-label` |
| `CardHeader.selectableActions.to` | `href` | Renders an anchor instead of a button |
| `CardHeader.selectableActions.isExternalLink` | `target="_blank"` | Set `target` on the card |
| `CardHeader.selectableActions.onChange` | `change` event | Bubbles; cancelable |
| `CardHeader.selectableActions.onClickAction` | `click` event | Listen for `click` on the card |
| `CardHeader.actions` | `actions` slot | Slot elements instead of an actions object |
| `CardHeader.actions.hasNoOffset` / `CardHeader.selectableActions.hasNoOffset` | `no-offset` | Moved to the card; applies to the whole actions area |
| `CardHeader.selectableActions.name` | `name` attribute / property | Moved to the card; also groups `selection="single"` radios |
| `CardHeader.isToggleRightAligned` | `toggle-right` | Renamed |
| `CardHeader.hasWrap` | `header-wrap` | Renamed |
| `CardTitle.subtitle` | `subtitle` slot | Slot text instead of a prop |
| `CardBody.isFilled` | `no-fill` | Inverted: bodies fill by default |
| `Card`, `CardHeader`, `CardTitle`, `CardBody`, `CardFooter`, `CardActions`, `CardHeaderMain`, `CardSubtitle`, `CardSelectableActions`, `CardExpandableContent` | `pf-v6-card` slots + `pf-v6-card-body` | Composition is expressed with slots; body sections are `pf-v6-card-body` elements |

### Added

| Web component API | Notes |
|---|---|
| `header` slot | Header images and inline titles |
| `title` / `subtitle` slots | Title row and supporting text |
| `actions` slot | Header actions |
| `expandable-content` slot | Content revealed when expanded |
| `expandable` attribute | Renders the expand/collapse toggle. React renders it when `CardHeader` receives `onExpand`; the web component owns `expanded` state. |
| `change` event | Fired before a user-driven selection change; cancelable. Not fired for programmatic changes. |
| `expand` / `collapse` events | Fired before the `expanded` state changes; cancelable |
| Form association | `pf-v6-card` is form-associated; a selected card submits `value` (default `on`) under `name` |
| `value` attribute | Form value when selected |
| `header` / `actions` / `footer` / `toggle` parts | Styling hooks for the shadow DOM containers |
| `pf-v6-card-body` element | Body section with `no-fill` support |

The card has no default box shadow, matching the current patternfly.org card
styles. A theme can opt in with `--pf-v6-c-card--BoxShadow`.

## Migrating from `pf-v5-card`

| v5 API | v6 API | Notes |
|---|---|---|
| `size="compact"` / `size="large"` | Same | Preserved |
| `flat` | Removed | v6 cards have a border by default; use `plain` to remove background and border |
| `rounded` | Removed | v6 cards are rounded by default |
| `plain` | `plain` | Same |
| `full-height` | `full-height` | Same |
| `header`, `title`, default, `footer` slots | Same | Preserved |
| `part="header"`, `part="body"`, `part="footer"` | `part="header"` and `part="footer"` | Header and footer parts are preserved. The v5 `body` part wrapped a `<div>`; in v6 the body is slotted content, so style slotted children directly or use `pf-v6-card-body`. |
| `<article>` wrapper in shadow DOM | Removed | The host is the card container, avoiding landmark pollution |
| `--pf-v5-c-card--*` custom properties | `--pf-v6-c-card--*` | Renamed to the v6 token set |
