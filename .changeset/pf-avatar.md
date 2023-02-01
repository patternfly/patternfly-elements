---
"@patternfly/elements": major
---
✨ Added `<pf-avatar>` and removed `<pfe-avatar>`. Avatar now closely follows 
PatternFly design specs.

- ✨ Added `border` and `alt` attributes

```html
<pf-avatar alt="shadowman" border="dark"></pf-avatar>
<pf-avatar alt="Michael Clayton"
           src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></pf-avatar>
```

### Breaking Changes
- ❌ Removed `name`, `pattern`, and `shape` attributes
- ❌ Removed `pfe-avatar:connected` event. Use `await pfeAvatar.updateComplete` instead
- ❌ Removed `pfe-avatar:options-shown`, `pfe-avatar:option-cleared`, `pfe-avatar:search-event`, and `pfe-avatar:option-selected` events.
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See ones. See ones. See ones. See ones. See ones. See ones. See ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the 
[docs][docs] for more info.

[docs]: https://patternflyelements.org/components/avatar/
[PFv4]: https://patternfly.org/v4/
