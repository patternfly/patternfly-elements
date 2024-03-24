---
"@patternfly/pfe-core": major
---
`InternalsController`: made the constructor private. Use `InternalsController.of`

BEFORE:
```js
class PfJazzHands extends LitElement {
  #internals = new InternalsController(this);
}
```

AFTER:
```js
class PfJazzHands extends LitElement {
  #internals = InternalsController.of(this);
}
```
