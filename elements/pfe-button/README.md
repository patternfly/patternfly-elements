# PatternFly Elements Button
     
`<pfe-button>` is a web component wrapper around a standard HTML `<button>` element.
`<pfe-button>` is heavily influenced by the findings in this post: [Custom
elements, shadow DOM and implicit form submission](https://www.hjorthhansen.dev/shadow-dom-and-forms/). You can expect `<pfe-button>` to work like a normal `HTMLButtonElement`.

Read more about Button in the [PatternFly Elements Button documentation](https://patternflyelements.org/components/button)

##  Installation

Load `<pfe-button>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-button?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-button
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-button';
```

## Usage

When using this component, you must provide a standard HTML Button Elements as
the only light DOM child of `pfe-button`.

```html
<pfe-button>
  <button>My Button</button>
</pfe-button>
```

### Accessibility
`<pfe-button>` addresses the issues associated with typical implementations of
web component buttons. When using a `<pfe-button>` in a `<form>` element, the
`<pfe-button>` will function as a standard button in a `<form>`. You can expect
the button to submit the form.

#### Disabled Attribute
Adding the `disabled` attribute to either the `<pfe-button>` wrapper or the
`<button>` element in the light DOM will disable the button.

```html
<pfe-button disabled>
  <button>Submit</button>
</pfe-button>
```

Or

```html
<pfe-button>
  <button disabled>Submit</button>
</pfe-button>
```

#### Type Attribute
Using the `type` attribute works in the same fashion as the `disabled`
attribute. You can add a `type` attribute to either the `<pfe-button>` wrapper
or the `<button>` element in the light DOM.

```html
<pfe-button type="button or reset or submit">
  <button>Submit</button>
</pfe-button>
```

Or

```html
<pfe-button>
  <button type="button or reset or submit">Submit</button>
</pfe-button>
```

