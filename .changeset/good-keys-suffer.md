---
"@patternfly/pfe-core": minor
"@patternfly/pfe-elements": minor
---
**SSR**: added `ssr-hint-has-slotted` and `ssr-hint-has-slotted-default` attributes to elements that use slot controller.

When running SSR on elements with slots, add these attributes to ensure they render correctly.

```html
<pf-card ssr-hint-has-slotted-default
         ssr-hint-has-slotted="header,footer">
  <h2 slot="header">Header Content</h2>
  <p>Default content</p>
  <span slot="footer">Footer Content</span>
</pf-card>
```

