---
"@patternfly/elements": major
---

Removed `<pfe-clipboard>` and added `<pf-clipboard-copy>`.

### Breaking Changes

- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.
- `role="button"` and `tabindex=0` attributes must *no longer* be applied to 
  `<pf-clipboard-copy>`, make sure all instances on your page are updated
  ```diff
  - <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
  + <pf-clipboard-copy>Copy this</pf-clipboard-copy>
  ```

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/clipboard-copy/
[PFv4]: https://patternfly.org/v4/
