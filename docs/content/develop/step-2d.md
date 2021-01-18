+++
title = "Integrate your JavaScript"
description = ""
weight = 80
draft = false
toc = true
menu = "develop"
tags = [ "develop" ]
+++

In this step, we will:

1.  Add a click and keyup listener to the follow button
2.  Set a follow state on element
3.  Add a the profile photo
4.  Properly disconnect our element

First, we'll go ahead and listen for triggering events on the button. The best place to add a listener is in the constructor, according to the W3C Custom Elements draft section called ["2.2 Requirements for custom element constructors"](https://w3c.github.io/webcomponents/spec/custom/#custom-element-conformance):

> In general, the constructor is responsible for setting the initial state, default values, event listeners, and a shadow root.

Since our base PFElement that we extended already sets up a shadow root, all we'll need to do is set up an event listener.

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

  static get events() {
    return {
      select: `${this.tag}:follow`
    };
  }
  
  static get PfeType() {
    return PFElement.PfeTypes.content;
  }

  static set properties() {
    follow: {
      type: "Boolean",
      default: false,
      observer: "_followHandler"
    }
  }
  
  _followHandler(oldVal, newVal) {
    let bool = Boolean(newVal);
    this.button.textContent = bool ? "Unfollow" : "Follow";

    this.emitEvent(PfeCoolElement.events.select);
  }

  constructor() {
    super(PfeCoolElement, { type: PfeCoolElement.PfeType });

    this._clickHandler = this._clickHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);

    this.button = this.shadowRoot.querySelector("button");

    if (this.button) {
      this.button.addEventListener("click", this._clickHandler);
      this.button.addEventListener("keyup", this._keyupHandler);
    }
  }

  _clickHandler(event) {
    this.log("Button clicked!!!");
    this.follow = !this.follow;
  }

  // On enter press, trigger click event
  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        this.follow(event);
    }
  }
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

In the constructor, we ran `querySelector` on our `shadowRoot` to locate the button and added a click listener `this._clickHandler` to capture the event.  We also created a keyup listener to capture the Enter key press for keyboard users engaging with this component.  Both the `_clickHandler` and the `_keyupHandler` process the event using the `follow` method. Notice also that the `this` context is bound to our click and keypress handlers to continue using `this` to refer to our element inside these methods.

Please note the underscore before the handlers' method name. This is a convention you'll notice in other custom elements where the author is trying to signal that it's meant as a private method.  

When the button is pressed, a component-scoped event will be fired to alert analytics or other libraries to the event.  This provides a single point to attach to while the component handles the accessibility functionality for you.

After saving your files, the demo page will refresh and you'll notice the start of your button interactivity.

![demo page js click setup step](/demo-page-js-click-setup-step.png)

When we activate the follow button, you'll notice the `following` attribute set and unset as we toggle the button.

![demo page js attribute changed step](/demo-page-js-attribute-change-step.png)

## Observed Attributes

Let's add one more thing with the follow state. We should update the button's text to "Unfollow" when `this.following` is true and to "Follow" when `this.following` is false. Observing attributes is an easy way to tell a custom element to perform an action when an attribute changes. In this case, we keep an eye on the `following` attribute for changes, and when it does, we'll update the button's text.

To observe an attribute, add this code to the top of your class:

```
static get observedAttributes() {
  return ["following"];
}
```

`observedAttributes` returns an array of attributes you want observed. To react to a change, we'll need to set up the `attributeChangedCallback` method.

```
attributeChangedCallback(name, oldValue, newValue) {
  switch (name) {
    case "pfe-following":
      this.button.textContent = this.following ? "Unfollow" : "Follow";
      break;
  }
}
```

If the changed attribute is `pfe-following`, the button text will update based on our conditional. Pretty straightforward, right? Now our button completely reflects the state of `pfe-following` with everything wired up.

The UI will look like this when we activate the follow button:

![demo page js attribute changed step](/demo-page-js-follow-attribute-changed-step.png)

Next, we add a `pfe-photo-url` attribute to pass in a profile image. Once again, we'll use the `observedAttributes` and the `attributeChangedCallback` to handle the work. We can add a profile image with only a few updates!

Initially, we'll need to include a reference to `#profile-pic` in the constructor by setting `this.profilePic`.

```
constructor() {
  super(PfeCoolElement, { type: PfeCoolElement.PfeType });

  this.following = false;

  this._clickHandler = this._clickHandler.bind(this);
  this._keyupHandler = this._keyupHandler.bind(this);

  this.button = this.shadowRoot.querySelector("button");

  if (this.button) {
    this.button.addEventListener("click", this._clickHandler);
    this.button.addEventListener("keyup", this._keyupHandler);
  }

  this.profilePic = this.shadowRoot.querySelector("#profile-pic");
}
```

Now, we'll add the `photo-url` attribute to our `observedAttributes`:

```
static get observedAttributes() {
  return ["pfe-following", "pfe-photo-url"];
}
```

Now we can update our `attributeChangedCallback` to set the image:

```
attributeChangedCallback(name, oldValue, newValue) {
  switch (name) {
    case "pfe-following":
      this.button.textContent = this.following ? "Unfollow" : "Follow";
      break;

    case "pfe-photo-url":
      this.profilePic.style.backgroundImage = `url(${newValue})`;
      break;
  }
}
```

Finally, we'll need to update our demo page (`/demo/index.html`) to include the `pfe-photo-url` attribute. Pass in an image URL to see that it's working.

```
<pfe-cool-element photo-url="https://avatars2.githubusercontent.com/u/330256?s=400&u=de56919e816dc9f821469c2f86174f29141a896e&v=4">
  Kyle Buchanan
</pfe-cool-element>
```

We can also modify `/src/pfe-cool-element.scss` to adjust the background-size property on `.pfe-cool-element__profile`.

The final result should look like this:

![demo page js profile pic step](/demo-page-js-profile-pic-step.png)

Great! You're almost there.

## Disconnected Callback

It's a good idea to clean up your event listeners after a web component is disconnected. The lifecycle callback that runs on web components is the `disconnectedCallback`, ideal for cleaning up our code. For this example, all we'll need to do is remove the listeners we added to the follow button.

```
disconnectedCallback() {
  if (this.button) {
    this.button.removeEventListener("click", this._clickHandler);
    this.button.removeEventListener("keyup", this._keyupHandler);
  }
}
```

## Wrap-up

That's all it takes, folks! To summarize, we built a web component that extends our base element, and added some HTML, custom styles, and interactivity to our component. What's cool is that we've only scratched the surface of what's possible with custom elements.

For your reference, here's the final Javascript code for `pfe-cool-element`:

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

  static get events() {
    return {
      select: `${this.tag}:follow`
    };
  }

  follow() {
    this.following = !this.following;

    this.emitEvent(PfeCoolElement.events.select);
  }

  set following(value) {
    const isFollowing = Boolean(value);

    if (isFollowing) {
      this.setAttribute("pfe-following", "");
    } else {
      this.removeAttribute("pfe-following");
    }
  }

  get following() {
    return this.hasAttribute("pfe-following");
  }

  static get observedAttributes() {
    return ["pfe-following", "pfe-photo-url"];
  }

  constructor() {
    super(PfeCoolElement, { type: PfeCoolElement.PfeType });

    this.following = false;

    this._clickHandler = this._clickHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._followToggle = this._followToggle.bind(this);
    this._addImage     = this._addImage.bind(this);

    this.button = this.shadowRoot.querySelector("button");

    if (this.button) {
      this.button.addEventListener("click", this._clickHandler);
      this.button.addEventListener("keyup", this._keyupHandler);
    }

    this.profilePic = this.shadowRoot.querySelector("#profile-pic");
  }

  _followToggle() {
    this.button.textContent = this.following ? "Unfollow" : "Follow";
  }

  _addImage(newImage) {
    this.profilePic.style.backgroundImage = `url(${newImage})`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "following":
        this._followToggle();
        break;

      case "photo-url":
        this._addImage(newValue);
        break;
    }
  }

  disconnectedCallback() {
    if (this.button) {
      this.button.removeEventListener("click", this._clickHandler);
      this.button.removeEventListener("keyup", this._keyupHandler);
    }
  }

  _clickHandler(event) {
    this.follow(event);
  }

  // On enter press, trigger follow event
  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        this.follow(event);
    }
  }
}

PFElement.create(PfeCoolElement);

export default PfeCoolElement;
```

Now that our code works, we should outline its properties and requirements in the schema.

[Move to Step 2e: Schema](../step-2e)
