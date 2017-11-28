# Rhelement Element

This is the base element that all other Rhelements should extend. It handles setting up a shadow root and applies Shady CSS if it is needed.

When extending Rhelement, make sure you call `super` in the constructor with the string that your element will be registered with and the template element that is cloned into the shadow root. If you need to run code in the `connectedCallback`, be sure to call `super.connectedCallback()` first before adding any additional code to that method.

Here is an example of how Rhelement should be extended
```
import Rhelement from "../rhelement/rhelement.js";

const template = document.createElement("template");
template.innerHTML = `
  <style></style> // any styles if you need them
  <slot></slot> // any html can go in here
`;

class MyElement extends Rhelement {
  constructor() {
    /*
     * the call to super should be first and should contain two
     * parameters.
     *
     * the first parameter should be the string that you'll use
     * to define your custom element in the custom element definition
     *
     * the second parameter should be the template that you create
     */
    super("my-element", template);
  }

  /*
   * if you need to use the connectedCallback method, make sure you
   * call super.connectedCallback() first before doing the work that you
   * need to do
   */
  connectedCallback() {
    super.connectedCallback();

    // any other work that you need to do should go here
  }
}

window.customElements.define('my-element', MyElement);
```

## Dependencies

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

 Rhelement (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
