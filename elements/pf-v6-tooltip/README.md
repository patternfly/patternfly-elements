# Tooltip

`<pf-v6-tooltip>` - in-app messaging used to identify elements with short,
clarifying text. Shows on hover or focus.

## Usage

```html
<pf-v6-tooltip content="Copy to clipboard">
  <button>Copy</button>
</pf-v6-tooltip>
```

Rich content via slot:

```html
<pf-v6-tooltip>
  <button>Info</button>
  <span slot="content">Tooltip with <strong>rich</strong> content</span>
</pf-v6-tooltip>
```

External trigger (element id — not an event type):

```html
<button id="my-btn">Hover me</button>
<pf-v6-tooltip trigger="my-btn" content="Hello"></pf-v6-tooltip>
```

> **Note:** `trigger` is an idref (or Element via the property). Values like
> `"click"` or `"manual"` are treated as element IDs, not open modes. The
> tooltip always opens on mouseenter + focusin; cancel `show`/`hide` to
> emulate other modes (see the click-trigger and manual-trigger demos).

## Divergences from React `Tooltip`

### Not implemented

| React prop              | Notes                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appendTo`              | Web component renders in its own shadow DOM; no portal needed                                                                                    |
| `aria`                  | No `labelledby` or `none` mode. A11y is provided via a `role="status"` live region; `ariaDescribedByElements` is set as progressive enhancement but doesn't work cross-root today. For icon-only buttons where the tooltip provides the accessible *name*, set `silent` and add `aria-label` to the trigger manually. |
| `aria-live`             | Not implemented                                                                                                                                  |
| `minWidth`              | No CSS custom property exposed                                                                                                                   |

### Changed API

| React prop                 | Web component                         | Difference                                                                                                                                        |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger` (event types)    | Cancelable `show`/`hide` events       | React's `trigger` prop sets open modes (`'mouseenter focus'`, `'click'`, `'manual'`). That prop has **no** string equivalent here — the WC always opens on mouseenter + focusin; cancel `show`/`hide` to emulate other modes. Do not pass `"click"` / `"manual"` to the WC `trigger` attribute. |
| `content` (required prop)  | `content` attribute or `content` slot | Attribute is optional when slot is used                                                 |
| `enableFlip`               | `no-flip`                             | Inverted boolean; flip enabled by default                                               |
| `flipBehavior`             | `flip-behavior`                       | Attribute accepts comma-separated list instead of array                                 |
| `isContentLeftAligned`     | `alignment`                           | Accepts `'start'` or `'end'` instead of boolean; uses logical properties for RTL support |
| `maxWidth`                 | `--pf-v6-c-tooltip--MaxWidth`         | CSS custom property instead of prop                                                     |
| `children` / `triggerRef`  | default slot or `trigger` attribute   | WC `trigger` means *which* element (ID string or Element ref), same role as React `triggerRef` — **not** React's event-type `trigger` prop |
| `onTooltipHidden`          | `hide` event                          | DOM event with `reason` (`mouseleave` / `focusout` / `escape`). Cancelable except Escape, which always dismisses. Also fires `show` (no React equivalent) |
| `animationDuration`        | CSS transitions                       | Override via stylesheet instead of prop                                                 |
| `distance`                 | Hardcoded 15px                        | Not configurable; React default also 15                                                 |
| `isVisible`                | `visible`                             | Boolean attribute; also controllable via `.show()` / `.hide()` methods                  |
| `zIndex`                   | `--pf-v6-c-tooltip--ZIndex`           | CSS custom property instead of prop; defaults to 10000                                  |
| `className`                | CSS custom properties                 | Standard web component styling mechanisms                                               |

### Added

| Web component API             | Notes                                                               |
| ----------------------------- | ------------------------------------------------------------------- |
| `show` event                  | Cancelable event before tooltip shows, with trigger `reason`        |
| `hide` event                  | Event before tooltip hides, with `reason`. Cancelable for mouseleave/focusout; Escape (`reason: 'escape'`) is never cancelable |
| `.show()` / `.hide()` methods | Programmatic visibility control                                     |
| `content` slot                | Rich HTML content, not available in React (which takes `ReactNode`) |

