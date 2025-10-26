# `<pf-helper-text>`

The **pf-helper-text** component provides contextual helper messages that indicate status, such as success, warning, error, or informational messages.  
It can include icons and supports custom content via slots.

---

##  Usage

Import the component before using it:

```js
import '@patternfly/elements/pf-helper-text/pf-helper-text.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

import '@patternfly/elements/pf-helper-text/pf-helper-text.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
```html
<pf-helper-text status="warning">
  This is a warning helper text
</pf-helper-text>

<pf-helper-text status="error" icon="exclamation-triangle" icon-set="fas">
  This is an error helper text with icon
</pf-helper-text>

<pf-helper-text status="success">
  <svg slot="icon" width="16" height="16" viewBox="0 0 16 16" fill="green" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10.8L3.2 8 2 9.2l4 4 8-8-1.2-1.2L6 10.8z"/>
  </svg>
  This is a success helper text with slotted icon
</pf-helper-text>


```
