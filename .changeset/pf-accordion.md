---
"@patternfly/elements": major
---
✨ Added `<pf-accordion>` and removed `<pfe-accordion>`. Accordion now closely 
follows PatternFly design specs.

```html
<pf-accordion>
  <pf-accordion-header expanded>
    <h3>Getting Started</h3>
  </pf-accordion-header>
  <pf-accordion-panel>
    <p>Read our <a href="/get-started/">Getting started</a> page to learn how to install and use PatternFly Elements.</p>
  </pf-accordion-panel>
  <pf-accordion-header>
    <h3>HTML APIs</h3>
  </pf-accordion-header>
  <pf-accordion-panel>
    <p>For more information on how to use each PatternFly element, read the <a href="/components/">component docs</a>.</p>
  </pf-accordion-panel>
</pf-accordion>
```

### Breaking Changes

- ❌ Removed `pfe-accordion:change`, `pfe-accordion:expand`, and `pfe-accordion:collapse` event. Use `change`, `expand` and `collapse` instead
- ❌ Removed `color`, `disclosure`, `context` attributes
- ❌ Removed `history` attribute and router
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/accordion/
[PFv4]: https://patternfly.org/v4/
