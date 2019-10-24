# PFElement Element

This is the base element that all other PFElements should extend. It handles setting up a shadow root and applies Shady CSS if it is needed.

To create a new PFElement, use `npm run new` from the root of the PFElements repo. After answering a few questions, a new element will be generated for you by [generator-pfelement][generator].

Here is an example of a new element and how it extends the base PFElement.

```javascript
import PFElement from "../pfelement/dist/pfelement.js";

class MyElement extends PFElement {
  // The HTML tag name for this element.  This will be passed into `customElements.define()`.
  static get tag() {
    return "my-element";
  }

  // The path to the element's SCSS file.  It is compiled to CSS at build time.
  get styleUrl() {
    return "my-element.scss";
  }

  // The path to the element's template.  This used at build time.
  get templateUrl() {
    return "my-element.html";
  }

  constructor() {
    // The call to super is first and contains a reference to the class itself.
    // This allows the base class to see any of MyElement's static properties.
    super(MyElement);

    // any other work to do during the constructor goes here
  }

  // connectedCallback runs when the element is placed into the DOM.  Note that
  // in dynamic apps, this _can_ happen more than once, for instance if an
  // element is moved from one part of the DOM tree to another.
  connectedCallback() {
    // super's connectedCallback goes first
    super.connectedCallback();

    // any other work to do during connectedCallback goes here
  }
}

PFElement.create(MyElement);
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

PFElement (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
[generator]: https://github.com/PFElements/generator-pfelement
