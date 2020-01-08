+++
title = "Polyfills"
description = "Add polyfills to support all of the major browsers."
weight = 4
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++

## Browser Support

Some browsers do not support ES6 modules, custom elements, shadow DOM, and
custom CSS variables yet. We'll need to add some polyfills to make everything
work in our supported browsers.

The easiest way to get everything working is to add the following polyfills to
the head of your document.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PatternFly Elements</title>

    <!-- polyfills -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/webcomponents-bundle.js"></script>
  </head>
  <body></body>
</html>
```

## What type of Javascript are you using?

- [ES5 or older](#ES5)
- [ES6](#ES6)

<a name="ES5"></a>

## Custom elements ES5 adapter

This polyfill is needed if your custom elements have been compiled from ES6 to ES5.
It's not necessary to include this polyfill for IE11 and it will throw a syntax
error in IE11 because the adapter was written in ES6. However, you can ignore
this error because it will not cause issues with your elements.


1.  Includes [UMD](https://github.com/umdjs/umd#regular-module) (universal module definition)  wrapper in the compiled version which checks for
	1.  [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) (Asynchronous Module Definition)
	2.  Global, window.
	3.  [Common.js](http://www.commonjs.org/)
	4.  [Require.js](https://requirejs.org/)
	    1. This handles all of the dependency management for you
		2.  Specifies how to load a module, dependencies, and load order
		3.  If require cannot be used, we could inline all the script tags. HTTP2 + server push would allow them to load all at once.
		4.  If you don't have HTTP2 + server push, it might take a little longer. If you have 3 cards on the page, would it load that script 3 times? No because cache.


2.  The card could show up on the page with pfe-card.js, which then declares a dependency on pfelement.js.
![pfe-card dependency](/pfe-card-dependency.png)


<a name="ES6"></a>
### ES6

Check out the ES6 pfelement and include it.

## Additional polyfills

Some components may require the addition of certain functions in order to use modern JavaScript in older browsers.  Until we can build in a way to automatically add these polyfills, please create a separate file called `polyfills--<component-name>.js` and import that file into your component using the following syntax.  Be sure to specify what functions are being defined inside the polyfills file in the comment section above the import statement.

```js
// Import polyfills: <list of function names>
import "polyfills--<component-name>.js";
```

In your polyfills file, please prefix each addition with the name of the polyfill and the URL from which it was copied.  Please use the following syntax so that we can easily report on/grep for these values:

```js
// @POLYFILL  Array.prototype.find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
```
