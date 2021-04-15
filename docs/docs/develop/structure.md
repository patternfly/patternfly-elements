---
layout: layout-basic.html
title: Develop a structure
order: 3
tags:
  - develop
---
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
Run this command from the project root to start the build, watch, and server processes, see others in the project README.
```bash
npm run live-demo [component-name(s)]
```

The server will load on `http://localhost:8000` by default.

![npm run live-demo command](/images/develop/develop-structure.png)

Assuming the `live-demo` command started a server on port 8000, navigate to `http://localhost:8000/elements/pfe-cool-element/demo/` to view your element.

You're off to a good start! You have a new custom element that extends the base PFElement class, uses shadow DOM, and has a built-in fallback for ShadyCSS in case shadow DOM isn't supported.

Let's take a look at the pfe-cool-element.js file in the `/src` directory to see what we have.

```javascript
import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCoolElement extends PFElement {
  static get tag() {
    return "pfe-cool-element";
  }

  static get meta() {
    return {
      title: "Cool element",
      description: ""
    };
  }

  get templateUrl() {
    return "pfe-cool-element.html";
  }

  get styleUrl() {
    return "pfe-cool-element.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeCoolElement, { type: PfeCoolElement.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

First, notice how we're using ES6 module imports and that we import the PFElement base element.

```javascript
import PFElement from '../pfelement/dist/pfelement.js';
```

Second, we define the string for the HTML tag that we want to use.

```javascript
static get tag() {
  return "pfe-cool-element";
}
```

Third, we reference where the HTML for our template and Sass styles are located.

```javascript
get templateUrl() {
  return "pfe-cool-element.html";
}

get styleUrl() {
  return "pfe-cool-element.scss";
}
```

The gulp merge task in gulpfile.js fills this section with the compiled and transpiled files when you edit a file in the `/src` directory.

Fourth, you'll see the constructor for the element.

```javascript
constructor() {
  super(PfeCoolElement, { type: PfeCoolElement.PfeType });
}
```

The PFElement base element creates a shadow root to handle the ShadyCSS work for browsers that don't support shadow DOM.

Finally, we register our element using the `create` method from the PFElement class. This method calls `window.customElements.define`.

```javascript
PFElement.create(PfeCoolElement);
```

There are a couple of empty getters—events, properties, and slots—which are there for your convenience. We'll cover these three getters in more detail later.

> For questions on how Custom Elements work, or if you want to learn the basics of shadow DOM, check out Eric Bidelman's post: [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements).

Now that our dev server is running and we have our element's structure, let's make it actually do something.

<pfe-cta>
  <a href="../html">Next up: Write your HTML</a>
</pfe-cta>
:::