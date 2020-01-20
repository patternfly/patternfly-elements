+++
title = "Develop a Structure"
description = ""
weight = 4
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

Run the watch process from the root of the repo by typing `npm run dev` then the name of your component, e.g.:

```
npm run dev pfe-cool-element
```

This will watch for changes in your component files and reload the local server appropriately. You can also watch multiple components by listing multiple component names.

Next you'll need to run another script that will run the local web server:

```
npm start
```

This will start a simple HTTP server that reloads the browser as you update your element.

![npm start command](/pfe-cool-element-start.png)

Navigate to `http://localhost:1234/elements/pfe-cool-element/demo/` to view your element.

You're off to a good start! You have a new custom element that extends the base PFElement class, uses shadow DOM, and has a built-in fallback for ShadyCSS in case shadow DOM isn't supported.

Let's take a look at the pfe-cool-element.js file in the `/src` directory to see what we have.

```
import PFElement from "../pfelement/dist/pfelement.js";

class PfeCoolElement extends PFElement {
  static get tag() {
    return "pfe-cool-element";
  }

  get templateUrl() {
    return "pfe-cool-element.html";
  }

  get styleUrl() {
    return "pfe-cool-element.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeCoolElement);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

First, notice how we're using ES6 module imports and that we import the PFElement base element.

```
import PFElement from '../pfelement/dist/pfelement.js';
```

Second, we define the string for the HTML tag that we want to use.

```
static get tag() {
  return "pfe-cool-element";
}
```

Third, we reference where the HTML for our template and Sass styles are located.

```
get templateUrl() {
  return "pfe-cool-element.html";
}

get styleUrl() {
  return "pfe-cool-element.scss";
}
```

The gulp merge task in gulpfile.js fills this section with the compiled and transpiled files when you edit a file in the `/src` directory.

Fourth, you'll see the constructor for the element.

```
constructor() {
  super(PfeCoolElement);
}
```

The PFElement base element creates a shadow root to handle the ShadyCSS work for browsers that don't support shadow DOM.

Finally, we register our element using the `create` method from the PFElement class. This method calls `window.customElements.define`.

```
PFElement.create(PfeCoolElement);
```

There are a couple of handy methods (commented out) which are not as frequently used but are there for your convenience. If you're not using the connectedCallback, observedAttributes, disconnectedCallback, or attributeChangedCallback methods, you can just delete them.

For questions on how Custom Elements work, or if you want to learn the basics of shadow DOM, check out Eric Bidelman's post: [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements).

Now that our dev server is running and we have our element's structure, let's make it actually do something.

[Move to Step 2: Develop (HTML)](../step-2b)
