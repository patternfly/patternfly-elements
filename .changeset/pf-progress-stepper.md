---
"@patternfly/elements": major
---
✨ Added `<pf-progress-stepper>` and removed `<pfe-progress-steps>`. Progress 
stepper now closely follows PatternFly design spec.

```html
<pf-progress-stepper>
  <pf-progress-step variant="success">Completed</pf-progress-step>
  <pf-progress-step variant="warning">Issue</pf-progress-step>
  <pf-progress-step variant="danger">Failure</pf-progress-step>
  <pf-progress-step current variant="info">Running</pf-progress-step>
  <pf-progress-step>Last</pf-progress-step>
</pf-progress-stepper>
```

### Breaking Changes:
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/progress-stepper/
[PFv4]: https://patternfly.org/v4/
