---
"@patternfly/pfe-core": minor
---

`ssrCallConnectedCallback`: filter which elements receive `connectedCallback` during SSR.

Importing `ssr-shims.js`, or calling `ssrCallConnectedCallback()` with no options, keeps the previous behavior: every element opts in through the same `globalThis.litSsrCallConnectedCallback` flag earlier versions set, and this module adds nothing to `LitElementRenderer.renderOptions`. Existing `renderOptions` configuration (such as `disableSsr`) therefore keeps its order and precedence.

Call `ssrCallConnectedCallback` with `include` and/or `exclude` predicates to restrict the set. Filtering clears the legacy flag (Lit ORs it with `renderOptions`, so it would otherwise override the filter) and registers a single `renderOptions` entry. `exclude` takes precedence when an element matches both:

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
