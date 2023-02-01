---
"@patternfly/elements": major
---

Removed `<pfe-progress-steps>` and added `<pf-progress-stepper>`.

### Breaking Changes
- Initial render was made [asynchronous][async].
  If your code assumes that shadow DOM is ready once the element is constructed,
  update it to `await element.updateComplete`
- Removed `color`, `disclosure`, `context` attributes
- Removed `history` attribute and router
- Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See 
  [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the 
[docs][docs] for more info.

```html
<!-- before -->
<pfe-progress-steps>
  <pfe-progress-steps-item state="active" current>
    <div slot="title">Current</div>
    <a slot="link" href="#">View current step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Next</div>
    <a slot="link" href="#">View next step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Last</div>
    <a slot="link" href="#">View last step</a>
  </pfe-progress-steps-item>
</pfe-progress-steps>

<!-- after -->
<pf-progress-stepper>
  <pf-progress-step variant="success">First Step</pf-progress-step>
  <pf-progress-step variant="info" current>Second Step</pf-progress-step>
  <pf-progress-step variant="pending">Third Step</pf-progress-step>
</pf-progress-stepper>
```

[docs]: https://patternflyelements.org/components/progress-stepper/
[async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle
[PFv4]: https://patternfly.org/v4/
