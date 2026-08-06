---
"@patternfly/pfe-tools": minor
---

`renderGlobal`: third `connectedCallbackFilter` parameter limits which elements receive `connectedCallback` during SSR. Without it, all elements opt in.

```typescript
import { renderGlobal } from '@patternfly/pfe-tools/ssr/global.js';

const html = await renderGlobal(
  '<my-el></my-el>',
  ['my-package/my-el.js'],
  el => el.localName.startsWith('my-'),
);
```
