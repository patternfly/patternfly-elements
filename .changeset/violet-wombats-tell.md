---
"@patternfly/elements": major
---

`<pf-switch>`: Reimplemented label API improving accessibility.

```html
<!-- BEFORE: -->
<pf-switch id="checked" checked show-check-icon></pf-switch>
<label for="checked" data-state="on">Message when on</label>
<label for="checked" data-state="off">Message when off</label>
<!-- AFTER: -->
<pf-switch id="checked" checked show-check-icon></pf-switch>
<label for="checked">
  <span data-state="on">Message when on</span>
  <span data-state="off" hidden>Message when off</span>
</label>
