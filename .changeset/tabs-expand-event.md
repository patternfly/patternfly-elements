---
"@patternfly/elements": minor
---
`<pf-tabs>`: add `isExpandEvent` static method, to help prevent name conflicts

```js
import { PfTabs } from '@patternfly/elements/pf-tabs/pf-tabs.js';
document.addEventListener('expand', function(event) {
  if (PfTabs.isExpandEvent(event)) {
    // a pf-tabs' tab has expanded
  }
});
```
