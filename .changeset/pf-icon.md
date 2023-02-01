---
"@patternfly/elements": major
---

Removed `<pfe-icon>` and added `<pf-icon>`.

Icon now ships with the entire free fontawesome collection as well as the 
patternfly icon set.

### Breaking Changes
- icon names are no longer prefixed by their set. use the `set` attribute 
  instead.
  ```html
  <!-- BEFORE -->
  <pfe-icon icon="patternfly-ansible"></pfe-icon>
  <!-- AFTER -->
  <pf-icon set="patternfly" icon="ansible"></pf-icon>
  ```

There are more changes than this, including breaking changes. Read the 
[docs][docs] for more info.

[docs]: https://patternflyelements.org/components/icon/
