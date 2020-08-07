# PatternFly Element | Textinput element
A web component text input with support for the following types
- text
- password
- email
- search
- tel
- url

## Usage
```html
<pfe-textinput>
  <input type="text" name="first-name">
</pfe-textinput>
```

You can add any of the [standard input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) on the `input` tag inside `pfe-textinput`.

```html
<pfe-textinput>
  <input type="text" name="first-name" placeholder="First Name" required>
</pfe-textinput>
```

### Accessibility
`pfe-textinput` differs from other web component versions of input elements in that 
it utilizes a light DOM input element to remain in the document flow so forms
continue to work the way you'd expect. With `pfe-textinput` we took the same approach that's used for creating a custom checkbox or radio button where a custom version of the checkbox or radio button is visually stacked on top of a traditional form control. This way we gain the benefits of encapsulated styles in the shadow DOM while not breaking the ways that input elements are traditionally used in forms.

## Slots
- `default`: It's required that you put an `input` element in the default slot for `pfe-textinput`. 

## Attributes
No custom attributes are used in `pfe-textinput`. However, uou can add any of the [standard input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) on the `input` tag inside `pfe-textinput`.

## Events
Listen for any of the standard input events that are available to `input` elements.

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

Textinput (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
