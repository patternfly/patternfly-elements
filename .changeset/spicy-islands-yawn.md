---
"@patternfly/pfe-tools": major
---
Removes `EleventyRenderPlugin` from custom-elements-manifest 11ty plugin config. Ensure you add it yourself.

Before:

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(CustomElementsManifestPlugin);
}
```

After:
```js
import { EleventyRenderPlugin } from '@11ty/eleventy'; // 3.0.0 only
export default function(eleventyConfig) {
  eleventyConfig.addPlugin(CustomElementsManifestPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
}
```
