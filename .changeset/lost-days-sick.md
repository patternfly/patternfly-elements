---
"@patternfly/pfe-core": minor
---

`ssrCallConnectedCallback`: filter which elements receive `connectedCallback` during SSR.

Importing `ssr-shims.js` still opts in all elements (matching the previous `globalThis.litSsrCallConnectedCallback` behavior). Call `ssrCallConnectedCallback` with a predicate to restrict the set:

```typescript
import { ssrCallConnectedCallback } from '@patternfly/pfe-core/ssr-shims.js';

ssrCallConnectedCallback(el =>
  el.localName.startsWith('pf-') || el.localName.startsWith('rh-')
);
```
