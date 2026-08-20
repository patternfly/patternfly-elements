---
"@patternfly/elements": major
---

Added `<pf-v6-tooltip>` replacing `<pf-v5-tooltip>`. Tooltip now follows
PatternFly v6 design specs.

```html
<pf-v6-tooltip content="Copy to clipboard">
  <button>Copy</button>
</pf-v6-tooltip>
```

**Breaking changes from v5:**

- Tag name changed from `pf-v5-tooltip` to `pf-v6-tooltip`
- `visible` attribute replaces programmatic-only visibility
- `entry-delay` and `exit-delay` attributes added (300ms default)
- `alignment` attribute replaces `isContentLeftAligned` (accepts `start`/`end`)
- `no-flip` inverted boolean replaces `enableFlip`
- `content` slot added for rich HTML content
- Cancelable `show`/`hide` events with `reason` property
- `silent` attribute for suppressing screen reader announcements
- CSS custom properties replace inline style props (`maxWidth`, etc.)

Users who need the react component's `trigger` prop are advised to use `<pf-v6-popover>` instead, or to use the cancellable `show`/`hide` events to prevent default behaviour.
