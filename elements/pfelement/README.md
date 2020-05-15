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

## Tooling / functions

The base class has a set of tools available for use inside all web components extending it.

### Types

Define the type of your web component by extending the PfeTypes getter.  A component can be classified as container, content, or combo.  These are defined in more detail in the documentation.

```
  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }
```

### Theme

All components automatically observe and react to the attribute `pfe-theme` which can equal 1 of 3 possible contexts:

- `light`
- `dark`
- `saturated`

Theme context is automatically passed down from parent components to their children (often being defined by container elements and observed and acted upon by content components) **without** manual intervention by a developer.  This is done through the `on` attribute.  The `on` attribute should not be manually edited or added or manipulated by the JavaScript of a component.

Adding the `pfe-theme` attribute to any component will **break that inheritance** and manually invoke your preferred theme.  This is a way to **opt-out** of the contexts provided by parent elements.  Only add this attribute if you want to walk away from inherited theme.

### Random ID

Need to set a random ID on any part of your web component?  Use the randomId getter:

```
  this.newId = this.randomId;
```

### CSS Variables

You can query for or set the value of a CSS variable using the `cssVariable` function.  It has 3 possible inputs:

1) `name`: The name of the CSS variable you are querying for (you can omit the `--` at the beginning).
2) `value`: This input is _optional_.  By passing in a value to the function, you are opting to set the variable name you provided equal to the value you have passed in.
3) `element`: This defaults to the `this` context of the web component calling the function but you can pass in any element. This is useful if you want to attach a specific CSS Variable to a shadow element in your template for example.

Querying for a variable's value:
```
this.cssVariable("pfe-cta--Color");
```

Setting a value for a variable:
```
this.cssVariable("pfe-cta--Color", "#333");
```

Setting a value for a variable on a template element:
```
this.cssVariable("pfe-cta--Color", "#333", this.shadowRoot.querySelector(".pfe-cta--arrow"));
```

### Querying for a slot(s)

There are 2 functions, `has_slot` and `has_slots` which allow you to query for the existence of a slot in the light DOM. These are useful in the templates as a means of avoiding printing empty slots or wrappers.

- `has_slot`: Accepts the name of the slot you are querying for (does not work for default slots yet) and returns a NodeElement of that slot if it exists and null if it does not.

- `has_slots`: Accepts the name of the slot you are querying for (does not work for default slots yet) and returns a NodeList of all elements assigned to that slot, if they exist, and null if they do not.

### Context set and update

There are 2 functions for updating the theme context of a component.  The first, `context_set`, will update the theme of the component calling the function using the following logic:

1. Check that element for the value of the `--theme` variable, if it exists.
2. If it does not exist, the component then checks for a `pfe-theme` attribute.
3. Finally, if neither has a value, the optional feedback input value is used.

If a theme value is defined at any point of this flow, an `on` attribute will be attached and assigned that value.

The `context_update` function will use much the same logic except it updates the theme context for the component calling the function and triggers an update for all of it's pfelement children.

### Log

Prints a message to the console log in a standardized format when debugging is turned on: `[pfe-band]: This is my console message.`.  To invoke this inside an element, you can add `this.log("This is my console message");` to your JS file.

### Emit event

This allows you to dispatch an event in a standardized way.  The function accepts the name of the event and an object containing details about that event.  That object supports the following configuration:

| Event setting | Default value |
| --- | --- |
| bubbles | true |
| cancelable | true |
| composed | false | 
| detail | {} |


Elements should contain an events object which lists all the event names:

```
static get events() {
  return {
    change: `${this.tag}:change`
  };
}
```

And then reference that object in the following way to invoke those events:

```
this.emitEvent(
  PfeAccordion.events.change, {
    detail: {
      expanded: !this.expanded
    }
  }
);
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
