+++
title = "Define your schema"
description = ""
weight = 90
draft = false
toc = true
menu = "develop"
tags = [ "develop" ]
+++

[What is a schema?](https://json-schema.org/understanding-json-schema/about.html)

A schema can teach a system like a CMS or API how to understand our web component.  By defining the supported slots, attributes, and events in our schema, we make our web components easy to plug into a number of systems.  We also create a system by which we can easily update the defaults and acceptable values for our component without having to make changes to JavaScript.

Let's dig into the schema for our pfe-cool-element component:

```
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Cool element",
  "description": "This element has a profile picture and a follow button.",
  "type": "object",
  "tag": "pfe-cool-element",
  "class": "PfeCoolElement",
  "category": "content",
  "properties": {
    "slots": {
      "title": "Slots",
      "description": "Definition of the supported slots",
      "type": "object",
      "properties": {
        "default": {
          "title": "Default",
          "type": "array",
          "namedSlot": false,
          "items": {
            "oneOf": [
              {
                "$ref": "raw"
              }
            ]
          }
        }
      }
    },
    "attributes": {
      "title": "Attributes",
      "type": "object",
      "properties": {
        "following": {
          "title": "Follow this user",
          "type": "boolean",
          "default": false,
          "prefixed": true,
          "observer": "_followToggle"
        },
        "photo-url": {
          "title": "Profile image",
          "type": "string",
          "observer": "_addImage"
        }
      }
    },
    "events": {
      "title": "Events",
      "description": "Definition of the supported events",
      "type": "object",
      "properties": {
        "follow": {
          "title": "Follow",
          "type": "string",
          "default": "pfe-cool-element:follow"
        }
      }
    }
  },
  "required": ["slots", "attributes", "events"],
  "additionalProperties": false
}
```

## General information

At the top of our schema is general information about our component: title, description, the tag name and class, and the category of component it falls under.  We also see the version of the schema draft we are using here.

```
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Cool element",
  "description": "This element has a profile picture and a follow button.",
  "type": "object",
  "tag": "pfe-cool-element",
  "class": "PfeCoolElement",
  "category": "content",
```

A schema is a JSON object with certain protected keys: `title`, `description`, `type`, and `required` are top among these.  For our web component, we specify the slots, attributes, and events as nested objects in the `properties` object of the overall component.

## Slots 

We list out our slots in the properties object of the schema.  Every slot is an array type and can contain either specific tags or a generic `raw` reference which means any HTML can be accepted here.  If the slot in question is a named slot such as `<slot name="pfe-cool-element--region">`, change the `"namedSlot"` boolean to true.

```
"slots": {
  "title": "Slots",
  "description": "Definition of the supported slots",
  "type": "object",
  "properties": {
    "default": {
      "title": "Default",
      "type": "array",
      "namedSlot": false,
      "items": {
        "oneOf": [
          {
            "$ref": "raw"
          }
        ]
      }
    }
  }
}
```

## Attributes

This component example supports two attributes: `following` and `photo-url`. Both attributes are prefixed with `` to protect their namespacing and prevent collisions with protected attributes in HTML.  Note the `-c` which means that this attribute is specific to a component and not a global attribute.  Global attributes will be prefixed with `pfe-g` and should be set by the PFElement base class.  To indicate this prefixing, set `"prefixed": true` on the object for that attribute.  Some attribute names will not be prefixed; in those cases, set the prefixed key to false.  Attributes are listed as properties and can use a variety of types.  Most will probably be of type `string` or `boolean` but `number` is also supported.

```
"attributes": {
  "title": "Attributes",
  "type": "object",
  "properties": {
    "following": {
      "title": "Follow",
      "type": "boolean",
      "default": false,
      "prefixed": true,
      "observer": "_followToggle"
    },
    "photo-url": {
      "title": "Profile image",
      "type": "string",
      "observer": "_addImage"
    }
  },
  "required": ["following]
}
```

Note the required array at the bottom of the attributes property object: `"required": ["following]`.  This will set the `following` attribute as required. This means that if the attribute is not manually added to the component tag in the source, i.e.  `<pfe-cool-element following>`, then this attribute will be automatically added with a default value (if provided in the schema) when the component upgrades.  

For attributes with a set of specifically supported answers, such as a set of colors, the attribute is still of type `string` since the result assigned to the attribute is a string, but we can provide an `enum` against which to validate the input.  Multiple values are comma separated.

```
"color": {
  "title": "Colors",
  "type": "string",
  "enum": ["complement", "accent"]
}
```

The `observer` property contains the name of the method that should be run when this attribute is updated.  If none is necessary, for attributes that only influence styles with no JS functionality for example, leave this property off.

## Events

The events object contains any custom events that this component will fire and for which external apps or libraries can listen.

```
"events": {
  "title": "Events",
  "description": "Definition of the supported events",
  "type": "object",
  "properties": {
    "follow": {
      "title": "Follow",
      "type": "string",
      "default": "pfe-cool-element:follow"
    }
  }
}
```

## JavaScript

Looking back to our component's JavaScript, we can now add the schema to our web component by adding:

```
get schemaUrl() {
  return "pfe-cool-element.json";
}
```

Adding the schema will allow the web component to read in these properties and enforce the schema settings automatically.  Inside PFElement, we can see `_mapSchemaToProperties` and `_mapSchemaToSlots` methods. These methods read in the schema and check the web component mark-up for valid or invalid inputs.  If an attribute is required but not provided, it will inject that attribute onto the component using the default value from the schema.

Additionally, it will validate the slots being used and add a `has_<slot-name>` attribute to the parent which can be used for styling purposes.

Let's look at our component with the schemaURL added:


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

  get schemaUrl() {
    return "pfe-cool-element.json";
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
      this.setAttribute("following", "");
    } else {
      this.removeAttribute("following");
    }
  }

  get following() {
    return this.hasAttribute("following");
  }

  static get observedAttributes() {
    return ["following", "photo-url"];
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

Now that our code works, we should create tests to ensure our element works as we iterate on it in the future.

[Move to Step 3: Test](../step-3)
