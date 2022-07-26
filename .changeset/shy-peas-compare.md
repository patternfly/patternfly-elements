---
"@patternfly/pfe-core": minor
---

Adding popper controller into pfe-core for use with components that require popover content.

For example, in BaseTooltip we use the popper-controller in this manner:

```typescript
import { TooltipDOMController } from '@patternfly/pfe-core/controllers/popper-controller.js';

export abstract class BaseTooltip extends LitElement {
    #domController: TooltipDOMController = new TooltipDOMController(this);
}
```
