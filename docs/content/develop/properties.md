+++
title = "Define properties"
description = ""
weight = 45
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

Property definitions provide a standard, streamlined way to maintain state within your component, receive external input (via attributes), initialize values, trigger handler functions, and more.

## Introduction

To introduce the topic, consider a "Counter" component that counts how many times something has happened.  Such a component could define a counter like this.

```javascript
static get properties() {
  return {
    count: {
      type: Number,
      default: 0
    }
  };
}
```

Defining `count` in this way brightens your day in the following ways:

 - **A property**: The property's name is `count`, so `this.count` is created and initialized to the default value, the number `0`.  
 - **An attribute**: An attribute, `pfe-c-count` is also created, and will be kept in sync with `this.count`.  The `pfe-c-` prefix is explained [below](#prefix).

Below, all the options for property definitions are explained.

## Property / attribute binding

As mentioned in the introduction, defining a property also creates an attribute, and the two values will be kept in sync.  For properties with the String type, this is straightforward.  Attribute values are always strings, and so logic is needed to 

### Handling `null`

If a property is assigned to null, the associated attribute will be removed.

Example: `this.count = null` will result in `this.removeAttribute("pfe-c-count")`.

## Type

Three property types are supported: String, Number, and Boolean.

### String

```
name: {
  type: String
}
```

### Boolean

### Number

Example: `this.count = NaN` (or `Number.NaN`) will result in `pfe-c-count="NaN"`.

## Default

During the component's `connectedCallback`, values specified as defaults will be initialized in both properties and attributes.

Example: since `count` has a default of `0`, when the component is connected, it will have `this.count === 0` and `this.getAttribute("pfe-c-count") === "0"`.

## Observer

You may choose to provide an `observer` for any property, which is the string name of a (non-static) function which will be called whenever the property changes.  Here's an example wherein changes to the `count` will trigger the `handleCount` function.

```js
class PfeCount extends PFElement {

  /* some boilerplate omitted */

  static get properties() {
    return {
      count: {
        type: Number,
        observer: "handleCount"
      }
    }
  }

  handleCount(oldVal, newVal) {
    console.log(`count changed from ${oldVal} to ${newVal}`);
  }

}
```

Observer functions are called with arguments `(oldVal, newVal)`.  Like property values, both arguments will be cast to the appropriate type, ie String, Number, or Boolean.

Note, `observer` is driven by the `attributeChangedCallback` on the `PFElement` class, so if you choose to provide your own `attributeChangedCallback`, you _must_ call `super.attributeChangedCallback(attr, oldVal, newVal)` within it.  The best practice is to not provide an `attributeChangedCallback`.


## Alias
## Cascade
## Prefix
## Attr
## Title


[Move to Step 2: Develop (Develop a Structure)](../step-2a/)
