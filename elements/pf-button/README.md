# PatternFly Elements Button
     
`<pf-button>` is a web component wrapper around a standard HTML `<button>` element.
`<pf-button>` is heavily influenced by the findings in this post: [Custom
elements, shadow DOM and implicit form submission](https://www.hjorthhansen.dev/shadow-dom-and-forms/). You can expect `<pf-button>` to work like a normal `HTMLButtonElement`.

Read more about Button in the [PatternFly Elements Button documentation](https://patternflyelements.org/components/button)

##  Installation

Load `<pf-button>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-button/pf-button.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-button/pf-button.js';
```

## Usage

When using this component, you must provide a standard HTML Button Elements as
the only light DOM child of `pf-button`.

```html
<pf-button>My Button</pf-button>
```

### Accessibility
`<pf-button>` addresses the issues associated with typical implementations of
web component buttons. When using a `<pf-button>` in a `<form>` element, the
`<pf-button>` will function as a standard button in a `<form>`. You can expect
the button to submit the form.

#### Disabled Attribute
Adding the `disabled` attribute to either the `<pf-button>` wrapper or the
`<button>` element in the light DOM will disable the button.

```html
<pf-button disabled>Submit</pf-button>
```

#### Type Attribute
Using the `type` attribute works in the same fashion as the `disabled`
attribute. You can add a `type` attribute to the `<pf-button>` element.

```html
<pf-button type="button">Submit</pf-button>
<pf-button type="submit">Submit</pf-button>
<pf-button type="reset">Reset</pf-button>
```

