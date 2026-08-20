---
"@patternfly/pfe-core": minor
---

`ssrCallConnectedCallback`: filter which elements receive `connectedCallback` during SSR. Importing `ssr-shims.js` opts in all elements, matching the previous `globalThis.litSsrCallConnectedCallback` behavior. Pass a predicate to replace that default.

```typescript
import { ssrCallConnectedCallback } from '@patternfly/pfe-core/ssr-shims.js';

ssrCallConnectedCallback(el =>
  el.localName.startsWith('pf-') || el.localName.startsWith('rh-')
);
```
