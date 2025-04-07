---
"@patternfly/pfe-core": major
---
Enable `connectedCallback()` and context protocol in SSR scenarios.

BREAKING CHANGE
This change affects any element which is expected to execute in node JS when
lit-ssr shims are present. By enabling the `connectedCallback()` to execute
server side. Elements must ensure that their connectedCallbacks do not try to
access the DOM.

Before:

```js
connectedCallback() {
  super.connectedCallback();
  this.items = [...this.querySelectorAll('my-item')];
}
```

After:
```js
connectedCallback() {
  super.connectedCallback();
  if (!isServer) {
    this.items = isServer ? [] : [...this.querySelectorAll('my-item')];
  }
}
```
