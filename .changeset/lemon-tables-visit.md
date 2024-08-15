---
"@patternfly/pfe-tools": major
---
**Custom Elements Manifest**: added `custom-elements-manifest.js`, which exports the function `getAllManifests`

```js
import { getAllManifests } from '@patternfly/pfe-tools/custom-elements-manifest/custom-elements-manifest/.js';

for (const manifest of getAllManifests()) {
  const packageName = manifest.packageJson?.name ?? 'package';
  console.log(
    `Available Elements in ${packageName}`,
    ...manifest.getTagNames(),
  );
}
```
