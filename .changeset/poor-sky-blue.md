---
"@patternfly/pfe-tools": minor
---

`renderGlobal`: third `connectedCallbackOptions` parameter limits which elements receive `connectedCallback` during SSR. Without it, all elements opt in exactly as before, and existing `LitElementRenderer.renderOptions` configuration keeps its order and precedence.

```typescript
import { renderGlobal } from '@patternfly/pfe-tools/ssr/global.js';

const html = await renderGlobal(
  '<my-el></my-el>',
  ['my-package/my-el.js'],
  { include: el => el.localName.startsWith('my-') },
);
```
