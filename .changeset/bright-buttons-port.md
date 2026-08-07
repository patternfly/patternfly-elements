---
"@patternfly/elements": major
"@patternfly/pfe-core": patch
---

`<pf-v6-button>`: replaces `<pf-v5-button>` with PatternFly v6 design specs and React Button parity.

```html
<pf-v6-button variant="secondary">Secondary</pf-v6-button>
<pf-v6-button type="submit">Save</pf-v6-button>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-button>` to `<pf-v6-button>`
- CSS custom properties renamed from `--pf-v5-c-button--*` to `--pf-v6-c-button--*`
- Boolean flags drop the `is-` prefix (`disabled`, `loading`, `block`, `danger`, …)
- `label` renamed to `accessible-label`
- `plain` boolean replaced by `variant="plain"`
- `size="small"|"large"` replaced by `sm`/`lg`
- Default `type` no longer submits forms (matches React); set `type="submit"` explicitly

**New features**

- Form-associated custom element (`formAssociated`) with ElementInternals ARIA
- `loading` tri-state and `loading-label`
- Slots: `icon`, `count`; parts: `button`, `icon`, `text`, `count`, `progress`
- `icon-position` (`start`/`end`, with deprecated `left`/`right` aliases)
- `disabled-focusable`, `favorite`/`favorited`, `hamburger`/`expanded`, `settings`, `no-padding`
- Link rendering via `href`/`target` with `variant="link"`

Also fixes `RovingTabindexController` so index updates do not steal focus after Tab leaves a widget.
