---
layout: layout-basic.html
title: React
tags:
  - frameworkIntegration
---

::: section header
# {{ title }}
:::

::: section
## Using PatternFly Elements in your React app
To get web components to work with React it’s pretty easy and straightforward. If you’d like to follow along, go ahead and [create a new React CodeSandbox on codesandbox.io](https://codesandbox.io/s/new). The React sandbox uses [create-react-app](https://github.com/facebook/create-react-app) to scaffold an app and you can view your changes in real-time right in the web app. With CodeSandbox, you can also add any npm dependency with just a few button clicks. If you want to run this app locally, you can [clone the repository on GitHub](https://github.com/kylebuch8/patternfly-elements-with-react).

“Using PatternFly Elements in your React App” is broken down into four sections:
- Initial setup
- Adding PatternFly Elements
- Interacting with our web components API
- Adding icing on the cake

Each section will show you exactly what you need to do with code snippets and an accompanying CodeSandbox that you can edit or fork.
:::

::: section
## Initial setup

First, we need to add the web component polyfills so we can support IE11 and Edge. If we were building this app locally, we’d want to install the web components polyfills from npm using yarn.

```bash
yarn add @webcomponents/webcomponentsjs
```

But if you’re using CodeSandbox, you can just expand the dependencies menu in the Explorer region on the left side of the page, click “Add Dependency”, search for “@webcomponents/webcomponentsjs”, and click on the result of the search. After the dependency is installed, add these two lines at the top of the `index.js` file in the `/src/` directory.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
```
:::

::: section
## Adding PatternFly Elements

With the setup complete, let’s add a couple of PatternFly Elements web components to our application to make sure everything is hooked up properly. We’re going to add a card ([pfe-card](/components/card)) and a call-to-action button ([pfe-cta](/components/call-to-action)). Later, we’ll add an accordion ([pfe-accordion](/components/accordion)) and some CSS to help with our layout ([pfe-layouts](/layout)).

Once again, if we were building this app locally, we’d install our dependencies from npm using yarn.

```bash
yarn add @patternfly/pfe-card @patternfly/pfe-cta
```
But if you’re using CodeSandbox, just search for "@patternfly/pfe-card" and "@patternfly/pfe-cta".

In our `index.js` file in the `/src/` directory, let’s add the import statements for our components to the top of the file.

```js
import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import "@patternfly/pfe-card";
import "@patternfly/pfe-cta";
import "./styles.css";
```

Let’s add some simple markup in the `App` function in the `index.js` file to see that our pfe-card and pfe-cta are working.

<script src="https://gist.github.com/kylebuch8/d25dab18f68d69c60e709ce1370c659b.js"></script>

Below is the accompanying CodeSandbox to see that our initial setup is correct and that we’ve successfully added our web components to our app.
:::

::: section
<iframe src="https://codesandbox.io/embed/patternfly-elements-with-react-pfe-card-and-pfe-cta-w3zhw?autoresize=1&fontsize=14&hidenavigation=1&moduleview=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="PatternFly Elements with React (pfe-card and pfe-cta)" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
:::

::: section
Now that we have a card and a call-to-action, let’s add an accordion (pfe-accordion) to our app to spice things up a bit. If we were building this app locally, we’d install our dependencies from npm using yarn.

```bash
yarn add @patternfly/pfe-accordion
```

If you’re using CodeSandbox, just search for “@patternfly/pfe-accordion”.

After installing pfe-accordion, add the markup to the `App` function in the `index.js` file.

<script src="https://gist.github.com/kylebuch8/242309d336c78912edbaa9b521ff019c.js"></script>

And we have to import pfe-accordion in `index.js`.

```js
import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import "@patternfly/pfe-card";
import "@patternfly/pfe-cta";
import "@patternfly/pfe-accordion";
import "./styles.css";
```

Below is the accompanying CodeSandbox for adding pfe-accordion to our app.

<iframe src="https://codesandbox.io/embed/patternfly-elements-with-react-adding-pfe-accordion-3po3u?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="PatternFly Elements with React (adding pfe-accordion)" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
:::

::: section
## Interacting with our web components API

After adding our accordion, let’s say that we’d like to have the first panel of the accordion open up after the page loads. To work with the accordion, there are a few things that we need to hook up.

First, let’s import `useRef` and `useEffect`.

```js
import React, { useRef, useEffect } from "react";
```

Now let’s create a React Ref so we can work with the pfe-accordion DOM API. To learn more about Refs and the DOM in React, [check out their documentation](https://reactjs.org/docs/refs-and-the-dom.html). We’ll start by creating a new ref inside our `App` function.

```js
function App() {
  const accordion = useRef();
  useEffect(() => {
    accordion.current.toggle(0);
  });
  return (
  );
}
```

Next, let’s add all of our markup from the `App` function we had previously to our `return` method. We’ll also want to add a ref attribute to the opening tag of pfe-accordion and set it equal to `{accordion}`.

<script src="https://gist.github.com/kylebuch8/8720587ad84e70b2ccb33bce9aaedc7c.js"></script>

Finally, let’s call the `toggle` method on the pfe-accordion DOM API so we can open the first panel of the accordion when the page loads. So we need to update the `useEffect` callback.

```js
...
useEffect(() => {
  accordion.current.toggle(0);
});
...
```

Now, when the page loads, the accordion will have the first panel opened. Below is the accompanying CodeSandbox.

<iframe src="https://codesandbox.io/embed/patternfly-elements-with-react-pfe-accordion-api-5clsc?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="PatternFly Elements with React (pfe-accordion api)" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
:::

::: section
## Adding icing on the cake

Right now our app has a single card (pfe-card) with a call-to-action (pfe-cta) link inside it. Beneath that, we have an accordion (pfe-accordion) with the first panel opening after the page loads. Let’s make things look a bit nicer by adding in a few more cards and a grid for layout (pfe-layouts).

We’ll start by installing pfe-styles, which contains pfe-layouts, into our app. If we were building this app locally, we’d install our dependencies from npm using yarn.

```bash
yarn add @patternfly/pfe-styles
```

If you’re using CodeSandbox, search for “@patternfly/pfe-styles”.

Next, in `index.js`, let’s import the pfe-layouts stylesheet.

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "@patternfly/pfe-card";
import "@patternfly/pfe-accordion";
import "@patternfly/pfe-cta";
import "@patternfly/pfe-styles/dist/pfe-layouts.min.css";
import "./styles.css";
```

Finally, we’ll add the classes we need in our section of cards in the index.js file so we have three cards across on screens wider than or equal to 992px, two cards across on screens wider than or equal to 576px, and one card across on smaller screens.

```html
<div className="pfe-l-grid pfe-m-gutters pfe-m-all-12-col-on-xs pfe-m-all-6-col-on-sm pfe-m-all-4-col-on-lg">
   ... cards are in here
</div>
```

If all of the classes above look confusing and don’t make any sense, don’t worry about it. We’ll write a post that explains how to use pfe-layouts. If you’re still curious [check out pfe-layouts](https://patternflyelements.org/layout/) to getter a better understanding of the classes above.

The end result of adding pfe-layouts and a grid is in the CodeSandbox below.
:::

::: section
<iframe src="https://codesandbox.io/embed/patternfly-elements-with-react-ipu2u?fontsize=14&hidenavigation=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="PatternFly Elements with React" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
:::

::: section
I realize that may have been a lot. So let’s recap what we did.

1. Initial Setup: Added the web component polyfills
2. Adding PatternFly Elements (web components): Added the following web components as dependencies in our app: pfe-card, pfe-cta, and pfe-accordion
3. Adding PatternFly Elements (web components): Imported the web components into our `index.js` file
4. Adding PatternFly Elements (web components): Added the markup for our components in `index.js`
5. Interacting with our web components API: Created a reference to the accordion so we could open the first panel after the page loads
6. Adding icing on the cake: Added pfe-layouts to create a grid for our cards
:::

::: section
## Wrap up

So there you have it. We’ve added web components to our React app and gained the benefits of using portable, pre-made components that can also be used in other frameworks like Angular and Vue. If your app is written in Angular or Vue, check out our other two posts: “Using PatternFly Elements in your Angular App” and “Using PatternFly Elements in your Vue App.”
:::
