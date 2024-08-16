---
"@patternfly/pfe-core": major
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

Breaking change: This commit makes some changes to the internal APIs of the
pre-existing `@observed` observer, most notably it changes the constructor
signature of the `PropertyObserverController` and associated functions. Most
users should not have to make any changes, but if you directly import and use
those functions, check the commit log to see how to update your call sites.

