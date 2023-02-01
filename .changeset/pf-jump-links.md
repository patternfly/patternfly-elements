---
"@patternfly/elements": major
---
✨ Added `<pf-jump-links>` and removed `<pfe-jump-links>`. Jump Links now 
closely follows the PatternFly design spec.

```html
<pf-jump-links vertical
               expandable
               expanded
               label="Jump to section"
               scrollable-element="post-container">
  <pf-jump-links-item id="1" href="#heading-1">Heading 1</pf-jump-links-item>
  <pf-jump-links-item id="2" href="#heading-2">Heading 2</pf-jump-links-item>
  <pf-jump-links-item id="3" href="#heading-3">Heading 3</pf-jump-links-item>
  <pf-jump-links-item id="4" href="#heading-4">Heading 4</pf-jump-links-item>
  <pf-jump-links-item id="5" href="#heading-5">Heading 5</pf-jump-links-item>
</pf-jump-links>
```

### Breaking Changes:

- ❌ Removed `pfe-jump-links-panel:active-navItem` and `pfe-jump-links-nav:stuck` events
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/jump-links/
[PFv4]: https://patternfly.org/v4/
