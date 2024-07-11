---
"@patternfly/elements": major
---
`<pf-accordion>`: Removed `BaseAccordion*` classes, as well as static `isPanel`, `isHeader`, and `isAccordion` methods. Removed the optional `parentAccordion` parameter to `PfAccordion#expand(index)`. Renamed accordion event classes by adding the `Pf` prefix:

**Before**:

```js
import {
  AccordionHeaderChangeEvent
} from '@patternfly/elements/pf-accordion/pf-accordion.js';

addEventListener('change', function(event) {
  if (event instanceof AccordionHeaderChangeEvent) {
    // ...
  }
});
```

**After**:

```js
import {
  PfAccordionHeaderChangeEvent
} from '@patternfly/elements/pf-accordion/pf-accordion.js';

addEventListener('change', function(event) {
  if (event instanceof PfAccordionHeaderChangeEvent) {
    // ...
  }
});
```
