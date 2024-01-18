---
"@patternfly/pfe-tools": major
---
Dev server config no longer uses `nodeResolution`. Instead you must provide configuration for the import map plugin.

```js
import {
  pfeDevServerConfig,
  getPatternflyIconNodemodulesImports,
} from '@patternfly/pfe-tools/dev-server/config.js';

export default pfeDevServerConfig({
  importMapOptions: {
    providers: {
      'zero-md': 'nodemodules',
      '@patternfly/icons': 'nodemodules',
      '@patternfly/elements': 'nodemodules',
      '@patternfly/pfe-tools': 'nodemodules',
      '@patternfly/pfe-core': 'nodemodules',
    },
    inputMap: {
      imports: {
        ...await getPatternflyIconNodemodulesImports(import.meta.url),
      },
    },
  },
});
```
