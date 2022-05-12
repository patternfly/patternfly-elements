---
"@patternfly/pfe-tools": minor
---

`singleFileBuild` now scans `node_modules` for installed
`@patternfly/pfe-*` packages (except `core`, `tools`, `sass`, and
`styles`) and generates an entrypoint file for them.

Users can alternatively pass `componentsEntryPointsContent`, which is
the string contents of a javascript module that exports the desired
components.

These changes make using `singleFileBuild` more useful and ergonomic for
daughter repositories (e.g. RHDS)

```js
const elements = await readdir(new URL("../elements", import.meta.url));

/**
 * @example
 * export * from '/path/to/redhat-ux/red-hat-design-system/elements/rh-alert/rh-alert.js';
 * export * from '/path/to/redhat-ux/red-hat-design-system/elements/rh-table/rh-table.js';
 */
const componentsEntryPointContents = elements.reduce(
  (acc, x) => `${acc}
export * from '${fileURLToPath(
    new URL(`../elements/${x}/${x}.js`, import.meta.url)
  )}';`,
  ""
);

await singleFileBuild({
  componentsEntryPointContents,
  outfile: "rhds.min.js"
});
```
