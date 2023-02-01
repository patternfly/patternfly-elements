---
"@patternfly/elements": major
---
✨ Added `<pf-button>` and removed `<pfe-button>`. Button now closely follows 
the PatternFly design specs.

```html
<pf-button disabled>Cancel</pf-button>
<pf-button>Submit</pf-button>
<pf-button type="reset">Reset</pf-button>
```

`<pf-button>` is a form-associated custom element, and may require the 
[element-internals polyfill][polyfill]

- ✨ Added `icon` CSS part
- ✨ Added `warning`, `link`, and `control` variants
- ✨ Added `icon` and `loading` attributes
- ✨ Added `plain`, `block`, `warning` and `loading` attributes

### Breaking Changes:

- ❌ Removed `danger` variant in favour of a new `danger` attribute.
- ❌ Removed `pfe-button:click` event - use `click` instead
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/button/
[PFv4]: https://patternfly.org/v4/
[polyfill]: https://npm.im/element-internals-polyfill
