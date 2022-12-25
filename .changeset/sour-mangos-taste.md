---
"@patternfly/pfe-badge": major
---

Rewrote `<pfe-badge>` to more closely implement the PatternFly v4 spec. This includes component API changes, but HTML implementation remains the same.

```html
<pfe-badge number="7">7</pfe-badge>
```

```html
<pfe-badge threshold="10" number="7" state="unread">7</pfe-badge>
```

#### Updates
- Options for the `state` attribute have changed to `read` and `unread`.
- `pfe` Sass variables were replaced by `--pf-*` css variables.

