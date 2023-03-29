---
"@patternfly/elements": patch
---

`accordion` - removed auto-focus on accordion header when the header contains the `expanded` attribute.  

**Example**
```
  <pf-accordion>
    <pf-accordion-header expanded>
      Header Item
    </pf-accordion-header>
  </pf-accordion>
```

Previously, if you set the expanded attribute to expand the header when the component loaded it would also focus the element on the page for the user.  This has been removed.
