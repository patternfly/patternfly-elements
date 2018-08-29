# RHElement Element

This is the base element that all other RHElements should extend. It handles setting up a shadow root and applies Shady CSS if it is needed.

When extending RHElement, make sure you call `super` in the constructor with the string that your element will be registered with and the template element that is cloned into the shadow root. If you need to run code in the `connectedCallback`, be sure to call `super.connectedCallback()` first before adding any additional code to that method.

Here is an example of how RHElement should be extended
```
import RHElement from "../rhelement/rhelement.js";

class MyElement extends RHElement {
  static get tag() {
    return "my-element";
  }

  get styleUrl() {
    return "my-element.scss";
  }

  get templateUrl() {
    return "my-element.html";
  }

  constructor() {
    /*
     * the call to super should be first and should contain the tag
     * of the element you're creating. This will be the string that
     * RHElement will use to define your custom element in the
     * custom element definition.
     */
    super(MyElement.tag);
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

RHElement.create(MyElement);
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

 RHElement (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
