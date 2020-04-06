+++
title = "Browser Support"
description = "PatternFly Elements supports all of the major browsers."
weight = 2
draft = false
bref = ""
toc = true
menu = "start"
tags = [ "start" ]
+++

PatternFly Elements are built on top of the [Custom Elements v1 spec](https://w3c.github.io/webcomponents/spec/custom/), but we can support all of the major browsers with web components polyfills, including IE 11.

| Chrome   | Firefox  | Safari   | Edge     | IE 11    |
|:---------|:---------|:---------|:---------|:---------|
| &#10003; | &#10003; | &#10003; | &#10003; | &#10003; |

## Written in ES6

To make sure we're future-proof, PatternFly Elements are written in ES6. As more browsers begin to support the use of ES6 modules and the ability to import dependencies, the ES6 versions of our PatternFly Elements can be used directly. Our goal is to eventually phase out the transpilation step in our build process, but until then, we'll provide both the ES6 and ES5 versions on npm.

## Backwards Compatible with Polyfills

To provide the widest range of support for PatternFly Elements, we provide an ES5 version of our PatternFly Elements that will work in all major browsers and even IE11 with some help from polyfills.

As a developer, you will need to make sure you include the necessary polyfills. We recommend using the [webcomponentsjs polyfill](https://github.com/WebComponents/webcomponentsjs) provided by [webcomponents.org](https://www.webcomponents.org/). There are two options when using this polyfill. You can either include the polyfill for the features that you know you want to support or you can use the webcomponents-loader.js file. The webcomponents-loader.js file will run feature detection on the client side and asynchronously load the polyfills needed to support web components.

### Polyfill Option 1 - Include the polyfills you need
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PatternFly Elements</title>

    <!-- uncomment the es5-adapter if you're using the compiled version -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
    <!-- webcomponents-bundle.js includes all of the polyfills -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/webcomponents-bundle.js"></script>
  </head>
  <body>

  </body>
</html>
```

For more options on which polyfill to include, refer to the [README on the webcomponentsjs repository](https://github.com/WebComponents/webcomponentsjs#how-to-use).

### Polyfill Option 2 - Load only the necessary polyfills

There's only a difference of the web component file that's being downloaded, but with the loader bringing in the necessary polyfills asynchronously, you'll need to wait for the `WebComponentsReady` event to fire before you safely continue.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PatternFly Elements</title>

    <!-- uncomment the es5-adapter if you're using the compiled version -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/webcomponents-loader.js"></script>
  </head>
  <body>
    <script>
      window.addEventListener('WebComponentsReady', function () {
        // Polyfills are loaded and it's safe to interact with the components
      });
    </script>
  </body>
</html>
```

For a more in-depth explanation, view the [example on GitHub](https://github.com/WebComponents/webcomponentsjs#webcomponents-loaderjs).

### custom-elements-es5-adapter.js

The two examples above also include the `custom-elements-es5-adapter.js` file before the web component polyfill. In the case that you need to support ES5, you need to include this polyfill. According to the spec, custom elements must be written as ES6 classes. However, in our build step we transpile our ES6 components to ES5 which makes it necessary for us to include the adapter to get our components to work.

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
```

For more documentation, check out the [custom-elements-es5-adapter.js section](https://github.com/WebComponents/webcomponentsjs#custom-elements-es5-adapterjs) on GitHub.
