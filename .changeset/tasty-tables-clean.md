---
"@patternfly/pfe-icon": major
---

Rewrites `<pfe-icon>`

Previously, icon names and icon sets were expressed as hyphenated pairs:

```html
<pfe-icon icon="rh-leaf"></pfe-icon>
```

Now, icon sets are specified with the `set` attribute:

```html
<pfe-icon set="rh" icon="leaf"></pfe-icon>
```

There are more changes, especially to icon loading and custom icon sets, so be sure to read
[the docs](https://patternflyelements.org/components/icon/).
