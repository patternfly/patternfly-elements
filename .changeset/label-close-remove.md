---
"@patternfly/elements": major
---
`<pf-label>`: when clicking close button, `close` event is fired.
Now, if that event is not cancelled, the label will remove itself from the document.

To restore previous behaviour:

```js
import { LabelCloseEvent } from '@patternfly/elements/pf-label/pf-label.js';
label.addEventListener('close', function(event) {
  if (event instanceof LabelCloseEvent) {
    event.preventDefault();
    return false;
  }
});
```
