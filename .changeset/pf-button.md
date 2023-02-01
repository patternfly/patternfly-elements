---
"@patternfly/elements": major
---

Removed `<pfe-button>` and added `<pf-button>`.

`<pf-button>` is a form-associated custom element, and may require the 
[element-internals polyfill][polyfill]

- Added `container` CSS part to `<pfe-button>`

### Breaking Changes:

- Removed `pfe-button:click` event - use `click` instead
- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/button/
[PFv4]: https://patternfly.org/v4/
[polyfill]: https://npm.im/element-internals-polyfill
