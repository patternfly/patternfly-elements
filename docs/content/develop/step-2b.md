+++
title = "Write your HTML"
description = ""
weight = 5
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

Now that our element is set up and our dev server is running, let's take advantage of the slot and shadow root to make our element a bit more interesting.

We'll edit the `/src/pfe-cool-element.html` file to add some additional HTML. Let's turn `pfe-cool-element` into a profile element that has a profile photo, a username, and a button to follow the user.

Here's the updated HTML in `/src/pfe-cool-element.html`:

```
<div id="profile-pic"></div>
<slot></slot>
<div>
  <button>Follow</button>
</div>
```

We'll also need to update `/demo/index.html` so that the user's name is passed into the slot in `/src/pfe-cool-element.html`:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PatternFly Element | pfe-cool-element Demo</title>

    <noscript>
      <link href="../../pfelement/dist/pfelement--noscript.min.css" rel="stylesheet">
    </noscript>

    <link href="../../pfelement/dist/pfelement.min.css" rel="stylesheet">

    <!-- uncomment the es5-adapter if you're using the umd version -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/webcomponents-bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
    <script>require(['../pfe-cool-element.umd.js'])</script>
  </head>
  <body unresolved>
    <h1>&lt;pfe-cool-element&gt;</h1>
    <pfe-cool-element>
      Kyle Buchanan
    </pfe-cool-element>
  </body>
</html>
```

Slots take the HTML from the light DOM and moves it right into the shadow DOM. To learn more about shadow DOM and how to use slots, check out [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom).

Here's how it should look in the browser:

![demo page html step](/demo-page-html-step.png)

Remember that any changes we make in the `/src` directory are being watched while the `npm run live-demo` command runs. When you save changes, the `merge` and `compile` tasks run from the gulpfile to update the ES6 and ES5 versions of the component in the root of your element.

The ES6 version should now look like this:

```
import PFElement from '../pfelement/dist/pfelement.js';

class PfeCoolElement extends PFElement {
  get html() {
    return `<style>:host {
  display: block; }

:host([hidden]) {
  display: none; }</style>
<div id="profile-pic"></div>
<slot></slot>
<div>
  <button>Follow</button>
</div>`;
  }

  static get tag() {
    return "pfe-cool-element";
  }

  get templateUrl() {
    return "pfe-cool-element.html";
  }

  get styleUrl() {
    return "pfe-cool-element.scss";
  }

  constructor() {
    super(PfeCoolElement);
  }
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

The gulp task takes the HTML from `/src/pfe-cool-element.html` and merges it into the ES6 version of your component while the HTML for the element is included in the `get html()` method of our element. The same thing happens for the ES5 version, but we've minified this file. See for yourself, but it's not pretty.

Now that we've added the HTML, let's style our element by updating the Sass file.

[Move to Step 2: Develop (CSS or Sass)](../step-2c)
