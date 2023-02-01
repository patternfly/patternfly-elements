---
"@patternfly/elements": major
---
✨ Added `<pf-card>` and removed `<pfe-card>`. Card now closely follows the 
PatternFly design specs.

```html
<pf-card>
  <h2 slot="header">Card header</h2>
  <p>This is the pf-card body.</p>
  <a href="#" slot="footer">Footer link</a>
</pf-card>
```

- ✨ Added `header`, `body`, and `footer` CSS parts
- ✨ Added `rounded`, `full-height`, and `plain` attributes

### Breaking Changes

- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See 
  [PFv4][PFv4] docs.
- ❌ Removed `pfe-card--header` and `pfe-card--footer` slots. Use `header` and 
  `footer` instead
- ❌ Removed `imgSrc` and `border` attributes.
- 💱 Changed `size` attribute values
  ```html
    <!-- BEFORE -->
    <pfe-card size="small"></pfe-card>
    <!-- AFTER -->
    <pf-card size="compact"></pf-card>
    <pf-card size="large"></pf-card>
  ```

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/card/
[PFv4]: https://patternfly.org/v4/
