---
"@patternfly/pfe-core": minor
---

`ssrCallConnectedCallback`: filter which elements receive `connectedCallback` during SSR.

Importing `ssr-shims.js` still opts in all elements (matching the previous `globalThis.litSsrCallConnectedCallback` behavior). Call `ssrCallConnectedCallback` with `include` and/or `exclude` predicates to restrict the set. `exclude` takes precedence when an element matches both:

```typescript
import { ssrCallConnectedCallback } from '@patternfly/pfe-core/ssr-shims.js';

ssrCallConnectedCallback({
  include: el => el.localName.startsWith('pf-') || el.localName.startsWith('rh-'),
  exclude: el => el.localName === 'pf-icon',
});
```

To opt out entirely, exclude every element:

```typescript
ssrCallConnectedCallback({ exclude: () => true });
```
