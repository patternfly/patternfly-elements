---
"@patternfly/pfe-core": minor
---
**Decorators**: Added `@observes`. Use it to add property change callback by 
decorating them with the name of the property to observe

```ts
@customElement('custom-button')
class CustomButton extends LitElement {
  #internals = this.attachInternals();

  @property({ type: Boolean }) disabled = false;

  @observes('disabled')
  protected disabledChanged() {
    this.#internals.ariaDisabled =
        this.disabled ? 'true'
      : this.ariaDisabled ?? 'false';
  }
}
```
