+++
title = "Setup"
description = "Create your own bulletproof web component."
weight = 2
draft = false
bref = ""
toc = true
menu = "develop"
tags = [ "develop" ]
+++

## Prerequisites

Clone the [PatternFly Elements repo](https://github.com/patternfly/patternfly-elements) and run the install command from the root of the repository.

```
npm install
```

## Generating a PatternFly Element

Using the [generator-rhelement](https://github.com/RHElements/generator-rhelement), which is installed as a dev dependency, the generator will ask you a few questions that will help with the scaffolding. Make sure you are in the root directory of the PatternFly Elements repository.

```
npm run new
```

## Scaffolding Structure

The generator will scaffold out a new PatternFly Element that will include an ES6 module version of your element as well as a version transpiled to ES5. These two files will live at the root of your new element. **DO NOT EDIT THESE TWO FILES**. These two files are the files that will be used when your element is distributed and they'll be overwritten during development and your build.

Instead, do your development in the `/src` directory of your element. In the `/src` directory you'll find a Javascript file that extends the PFElement class that takes care of setting up a shadow root and ShadyCSS. The HTML file is where you'll add the HTML that will be cloned into the shadow root. And the CSS or SCSS file (depending on if you're using Sass) is where you'll add your styles. During the development and build tasks, a Gulp task will merge these three files together into the root of your element and will update the ES6 and ES5 versions.

## Develop

To watch for changes and run a build when changes are detected, run this from the PatternFly Elements root directory.

```
npm run dev
```

You may find that you dislike watching all the elements at once.  It may start up too slowly, consume too many system resources, or your OS may run out of file descriptors from watching too many files.  If any of these are the case, you can shrink the set of elements being watched by using Lerna's [`--scope`](https://github.com/lerna/lerna/tree/master/core/filter-options#--scope-glob) flag.

For example, to watch only `pfe-icon` and its dependencies:

```
npm run dev pfe-icon
```

*Note that this will also automatically begin watching dependencies of `pfe-icon`, such as `pfelement`.*

You may also specify multiple elements.  For example, `pfe-card` and `pfe-cta` are often used together, so you may wish to watching them both.

```
npm run dev pfe-card pfe-cta
```

## Preview your changes

From the root of the PatternFly Elements repository, run the start command which will open a browser to the `/doc` directory.

```
npm start
```

From there you can change the URL to the demo page of the element you're working on. For example, if I ran `npm run dev` in the `/elements/pfe-card` directory, I'd navigate in the browser to `http://localhost:1234/elements/pfe-card/demo`.

## Test

From the directory of the element you're working on, run the test script in the package.json file and Web Component Tester will use Mocha and Chai to execute your tests in the browser.

```
npm test
```

## Build

Prepare your element for distribution by running the build script in the package.json file located at the root of the element you're working on. If you've been running `npm run dev`, the dev script runs the build script every time you save a file in the `/src` directory so running the build script might be redundant, but better safe than sorry.

```
npm run build
```

The build script will merge the files in the `/src` directory and update the ES6 and ES5 versions of your element in the root of the element. These two files are the files that your applications will either require or import for use.

## Publish

We've been publishing our PatternFly Elements to npm under the [PatternFly organization](https://www.npmjs.com/org/patternfly).

## Create a PatternFly Element

Now that we have everything set up, let's create a PatternFly Element together.

[Create a PatternFly Element](/docs/create-a-pfelement/step-1.html)
