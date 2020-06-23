+++
title = "Write your CSS (or Sass)"
description = ""
weight = 6
draft = false
toc = true
menu = "develop"
tags = [ "develop" ]
+++

We want the `pfe-cool-element` to have a profile photo, a username, and a follow button. Right now, it only contains the HTML structure, but we can style our element by updating our Sass (or CSS) to make it look the way we want.

We'll be working in the `/src/pfe-cool-element.scss` file since we decided to use the Sass option in the PatternFly Element generator.

Your Sass file will initially import additional Sass from the pfe-sass node module, but we can ignore that for now. The second part has a `:host` selector that makes our element display as a block element.

```
@import "../../pfe-sass/pfe-sass";
:host {
  display: block;
}

:host([hidden]) {
  display: none;
}
```

Now we can update our styles, like so:

```
@import "../../pfe-sass/pfe-sass";
:host {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 128px;
  padding: 32px;
  font-family: Arial;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

:host([hidden]) {
  display: none;
}

#profile-pic {
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
  border: 2px solid #333;
  border-radius: 50%;
  background-color: #efefef;
}

button {
  margin-top: 16px;
}
```

After saving and viewing our demo page, our profile element looks much better.

![Demo Page CSS](/demo-page-css-step.png)

A couple of things to note:

1.  The `:host` selector sets the styles of the container element `<pfe-cool-element>`.
2.  The `button` styles are encapsulated within this element and will not bleed out, meaning that there's no chance these styles will affect other buttons on the page. Feeling confident that your element will always look the same when it's distributed is one of the main advantages of the shadow DOM. Check out the Styling section of [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/web-components/shadowdom#styling) to learn what else you can do when applying styles to the shadow DOM.

Now that our demo page is updated, let's take a look at what happened to the ES6 version of the element in the root of our element's directory.

```
import PFElement from '../pfelement/dist/pfelement.js';

class PfeCoolElement extends PFElement {
  get html() {
    return `<style>:host {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 128px;
  padding: 32px;
  font-family: Arial;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }

:host([hidden]) {
  display: none; }

#profile-pic {
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
  border: 2px solid #333;
  border-radius: 50%;
  background-color: #efefef; }

button {
  margin-top: 16px; }</style>
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

You'll notice `<style>` contains everything we just wrote in our Sass file. Sass variables will also compiled their values and get included in the changes above.

Now that our `pfe-cool-element` is more appealing, we'll add the follow button's interaction and fill in the profile photo. We can accomplish both of these tasks by updating the `/src/pfe-cool-element.js` file.

<a href="/theme/color-palette/">Learn more about applying theme colors here.</a>

[Move to Step 2: Develop (Javascript)](../step-2d)
