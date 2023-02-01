---
"@patternfly/elements": major
---
✨ Added `<pf-badge>` and removed `<pfe-badge>`. Badge now closely follows 
PatternFly design specs.

```html
<pf-badge number="7">7</pf-badge>
<pf-badge threshold="10" number="7" state="unread">7</pf-badge>
```

### Breaking Changes
- 💱 Changed the value of `state` attribute to `read` or `unread`
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/badge/
[PFv4]: https://patternfly.org/v4/
