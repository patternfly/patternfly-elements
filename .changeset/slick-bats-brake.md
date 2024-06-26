---
"@patternfly/pfe-tools": minor
---
**TypeScript**: Add static version transformer. This adds a runtime-only
static `version` field to custom element classes.

```js
import '@patternfly/elements/pf-button/pf-button.js';
const PFE_VERSION =
  await customElements.whenDefined('pf-button')
    .then(PfButton => PfButton.version);
```
