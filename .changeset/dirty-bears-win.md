---
"@patternfly/elements": major
---
`<pf-icon>`: removed the `getIconUrl` static method, and replaced it with the 
`resolve` static method

The steps for overriding icon loading behaviour have changed. Before, you had to 
return a string from the `getIconUrl` method, or the second argument to 
`addIconSet`. Now, both of those functions must return a Node, or any lit-html
renderable value, or a Promise thereof.

**Before**:

```js
PfIcon.addIconSet('local', (set, icon) =>
  new URL(`/assets/icons/${set}-${icon}.js`));

// or
PfIcon.getIconUrl = (set, icon) =>
  new URL(`/assets/icons/${set}-${icon}.js`))
```

**After**:
```js
PfIcon.addIconSet('local', (set, icon) =>
  import(`/assets/icons/${set}-${icon}.js`))
    .then(mod => mod.default);

// or
PfIcon.resolve = (set, icon) =>
  import(`/assets/icons/${set}-${icon}.js`))
    .then(mod => mod.default);
```

