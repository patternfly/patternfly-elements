# PatternFly Element | Button Element
This component is a web component wrapper around a standard HTML Button Element.
`<pfe-button>` is heavily influenced by the findings in this post: [Custom
elements, shadow DOM and implicit form submission](https://www.hjorthhansen.dev/shadow-dom-and-forms/). You can expect `<pfe-button>` to work like a normal
HTML Button Element.

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

## Slots

None

## Attributes
`disabled` (observed): Disables the button

`variant`: Changes the style of the button. Possible values are
- primary (default)
- secondary
- tertiary
- danger
- control

## Events
### pfe-button:click
This event is fired when `<pfe-button>` is clicked and serves as a way to
capture click events if necessary.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Button (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
