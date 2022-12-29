---
"@patternfly/pfe-core": minor
---

Removed popperjs dependency and replaced it with floating-ui dependency.

- removed the `initialized` property
- removed the `create` method
- added `show(options)` method with `placement` and `offset` options.
- added `arrow`, `flip`, `padding`, and `shift` options
- added read-only `alignment`, `anchor`, `placement`, and `styles` properties.
- made `open` property read-only.

Now, `FloatingDOMController`s constructor requires certain options, at least 
`content`, which is an `HTMLElement` or a function returning an `HTMLElement`. 

Before:

```ts
class MyElement extends LitElement {
  #floating = new FloatingDOMController(this);
}
```

After:

```ts
class MyElement extends LitElement {
  #floating = new FloatingDOMController(this, {
    content: () => this.shadowRoot.getElementById('content');
  });
}
```
