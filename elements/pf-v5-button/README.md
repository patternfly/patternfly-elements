# PatternFly Elements Button
     
`<pf-v5-button>` is a web component wrapper around a standard HTML `<button>` element.
`<pf-v5-button>` is heavily influenced by the findings in this post: [Custom
elements, shadow DOM and implicit form submission](https://www.hjorthhansen.dev/shadow-dom-and-forms/). You can expect `<pf-v5-button>` to work like a normal `HTMLButtonElement`.

Read more about Button in the [PatternFly Elements Button documentation](https://patternflyelements.org/components/button)

##  Installation

Load `<pf-v5-button>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-button/pf-v5-button.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-button/pf-v5-button.js';
```

## Usage

When using this component, you must provide a standard HTML Button Elements as
the only light DOM child of `pf-v5-button`.

```html
<pf-v5-button>My Button</pf-v5-button>
```

### Accessibility
`<pf-v5-button>` addresses the issues associated with typical implementations of
web component buttons. When using a `<pf-v5-button>` in a `<form>` element, the
`<pf-v5-button>` will function as a standard button in a `<form>`. You can expect
the button to submit the form.

#### Disabled Attribute
Adding the `disabled` attribute to either the `<pf-v5-button>` wrapper or the
`<button>` element in the light DOM will disable the button.

```html
<pf-v5-button disabled>Submit</pf-v5-button>
```

#### Type Attribute
Using the `type` attribute works in the same fashion as the `disabled`
attribute. You can add a `type` attribute to the `<pf-v5-button>` element.

```html
<pf-v5-button type="button">Submit</pf-v5-button>
<pf-v5-button type="submit">Submit</pf-v5-button>
<pf-v5-button type="reset">Reset</pf-v5-button>
```

