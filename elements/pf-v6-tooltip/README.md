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

External trigger:

```html
<button id="my-btn">Hover me</button>
<pf-v6-tooltip trigger="my-btn" content="Hello"></pf-v6-tooltip>
```

## Divergences from React `Tooltip`

### Not implemented

| React prop              | Notes                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appendTo`              | Web component renders in its own shadow DOM; no portal needed                                                                                    |
| `aria`                  | Always uses `aria-describedby` via `ariaDescribedByElements`. No `labelledby` or `none` option                                                   |
| `aria-live`             | Not implemented                                                                                                                                  |
| `minWidth`              | No CSS custom property exposed                                                                                                                   |

### Changed API

| React prop                 | Web component                         | Difference                                                                                                                                        |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger` (event types)    | Cancelable `show`/`hide` events       | React accepts `'mouseenter focus'`, `'click'`, `'manual'`. Web component always triggers on mouseenter + focusin; cancel events to emulate others |
| `content` (required prop)  | `content` attribute or `content` slot | Attribute is optional when slot is used                                                 |
| `enableFlip`               | `no-flip`                             | Inverted boolean; flip enabled by default                                               |
| `flipBehavior`             | `flip-behavior`                       | Attribute accepts comma-separated list instead of array                                 |
| `isContentLeftAligned`     | `alignment`                           | Accepts `'start'` or `'end'` instead of boolean; uses logical properties for RTL support |
| `maxWidth`                 | `--pf-v6-c-tooltip--MaxWidth`         | CSS custom property instead of prop                                                     |
| `children` / `triggerRef`  | default slot or `trigger` attribute   | Trigger is slotted child or ID string/Element reference                                 |
| `onTooltipHidden`          | `hide` event                          | Cancelable DOM event with `reason` field. Also fires `show` event (no React equivalent) |
| `animationDuration`        | CSS transitions                       | Override via stylesheet instead of prop                                                 |
| `distance`                 | Hardcoded 15px                        | Not configurable; React default also 15                                                 |
| `isVisible`                | `visible`                             | Boolean attribute; also controllable via `.show()` / `.hide()` methods                  |
| `zIndex`                   | `--pf-v6-c-tooltip--ZIndex`           | CSS custom property instead of prop; defaults to 10000                                  |
| `className`                | CSS custom properties / `::part()`    | Standard web component styling mechanisms                                               |

### Added

| Web component API             | Notes                                                               |
| ----------------------------- | ------------------------------------------------------------------- |
| `show` event                  | Cancelable event before tooltip shows, with trigger `reason`        |
| `hide` event                  | Cancelable event before tooltip hides, with trigger `reason`        |
| `.show()` / `.hide()` methods | Programmatic visibility control                                     |
| `content` slot                | Rich HTML content, not available in React (which takes `ReactNode`) |

