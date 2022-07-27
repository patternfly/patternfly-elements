---
"@patternfly/pfe-core": minor
---

Adds floating DOM controller into pfe-core for use with components that require popover content.

For example, in `BaseTooltip` we use the controller in this manner:

```typescript
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

export class BaseTooltip extends LitElement {
  #domController = new FloatingDOMController(this);
}
```
