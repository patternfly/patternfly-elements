---
"@patternfly/pfe-tools": minor
---
**Test Helpers**: Added `allUpdates` test helper, which waits until an element 
completely finishes updating.

```js
const element = await fixture(html`<my-el></my-el>`);
await allUpdates(element);
```
