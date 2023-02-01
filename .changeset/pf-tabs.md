---
"@patternfly/elements": major
---
✨ Added `<pf-tabs>` and removed `<pfe-tabs>`. Tabs now closely follows 
PatternFly design spec.

```html
<pf-tabs>
  <pf-tab id="users" slot="tab">Users</pf-tab>
  <pf-tab-panel>Users</pf-tab-panel>
  <pf-tab slot="tab">Containers</pf-tab>
  <pf-tab-panel>Containers <a href="#">Focusable element</a></pf-tab-panel>
  <pf-tab slot="tab">Database</pf-tab>
  <pf-tab-panel>Database</pf-tab-panel>
</pf-tabs>
```

- ✨ Added `container`, `tabs-container`, `tabs` and `panels` CSS parts
- ✨ Added `button`, `icon` and `text` CSS parts to `<pf-tab>`
- ✨ Added `container` CSS part to `<pf-tab-panel>`

### Breaking Changes:

- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/timestamp/
[PFv4]: https://patternfly.org/v4/

