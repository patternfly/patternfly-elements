---
"@patternfly/pfe-core": minor
---

`ssrCallConnectedCallback`: exported from `ssr-shims.js`, replacing the deprecated `globalThis.litSsrCallConnectedCallback` global. Pass a predicate to limit which elements receive `connectedCallback` during SSR, or omit it to opt in all elements.

```typescript
import { ssrCallConnectedCallback } from '@patternfly/pfe-core/ssr-shims.js';

ssrCallConnectedCallback(el =>
  el.localName.startsWith('pf-') || el.localName.startsWith('rh-')
);
```
