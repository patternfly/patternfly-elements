---
"@patternfly/pfe-tools": minor
---
**React**: adds `@patternfly/pfe-tools/react/generate-wrappers.js`

Use this to generate React component wrappers for Lit custom elements, 
based on their `custom-elements.json` manifest.

```js
import { generateReactWrappers } from '@patternfly/pfe-tools/react/generate-wrappers.js';

const inURL = new URL('../elements/custom-elements.json', import.meta.url);
const outURL = new URL('../elements/react/', import.meta.url);

await generateReactWrappers(inURL, outURL);
```
