---
"@patternfly/pfe-tools": minor
---

Use web-dev-server-plugin-lit-css.
By default, config will transform all .scss files using `dart-sass`.
Users may customize the options for lit-css:

```js
export default pfeDevServerConfig({
  litcssOptions: {
    include: ['**/elements/*/*.css']
  },
});
```

