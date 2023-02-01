---
"@patternfly/elements": major
---
✨ Added `<pf-timestamp>` and removed `<pfe-datetime>`. Timestamp now closely 
follows PatternFly design spec.

```html
<pf-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="long">
</pf-timestamp>
```

### Breaking Changes:

- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/timestamp/
[PFv4]: https://patternfly.org/v4/
[polyfill]: https://npm.im/element-internals-polyfill
