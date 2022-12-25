---
"@patternfly/pfe-button": major
---

Makes `<pfe-button>` a form-associated custom element

BREAKING CHANGE:
users should no longer slot a native `<button>` into the element

Before:

```html
<pfe-button><button>Submit</button></pfe-button>
```

After:

```html
<pfe-button>Submit</pfe-button>
```
