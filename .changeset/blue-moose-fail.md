---
"@patternfly/pfe-tools": major
---
**Custom Elements Manifest**: Removed support for non-standard inline `{@default value}` JSDoc tags. Use standard syntax instead

**Before**:
```js
/**
 * @cssprop --foo {@default bar} Foo
 */
```

**After**:
```js
/**
 * @cssprop [--foo=bar] Foo
 */
```

