---
"@patternfly/pfe-core": minor
---
**Decorators**: Added `@listen`. Use it to attach element event listeners to
class methods.

```ts
@customElement('custom-input')
class CustomInput extends LitElement {
  @property({ type: Boolean }) dirty = false;
  @listen('keyup', { once: true })
  protected onKeyup() {
    this.dirty = true;
  }
}
```
