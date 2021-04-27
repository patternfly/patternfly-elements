---
layout: layout-basic.html
title: Setup
order: 1
tags:
  - develop
---
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
<p class="tagline">Create your own PatternFly Element</p>
:::

::: section
## Prerequisites

Clone the [PatternFly Elements repo]({{ githubLink }}) and run the install command from the root of the repository.

```bash
npm install
```

## Generating a PatternFly Element

The easiest way to build a new component from scratch is to use the generator. The generator will ask you a few questions that will help with the scaffolding. Make sure you are in the root directory of the PatternFly Elements repository.

```basg
npm run new
```

When creating your new components, you may find you are entering the same answers over and over again.  To prevent this, you can add a `project.conf.json` file with some of your preferences stored.  Here is a template for that file:

```json
{
  "type": "pfelement",
  "useSass": true,
  "sassLibrary": {        
    "pkg": "@patternfly/pfe-sass",
    "path": "pfe-sass/pfe-sass"
  },
  "author": {
    "name": "johnsmith",
    "url": "https://www.github.com/johnsmith"
  }
}
```

## Scaffolding Structure

The generator will scaffold out a new PatternFly Element that will include an ES6 module version of your element as well as a version transpiled to ES5. These compiled assets will live in the `dist` directory for your new element. **DO NOT EDIT COMPILED ASSETS**. They are the files that will be used when your element is distributed and they'll be overwritten during development and your build.

Do your development work inside in the `src` directory of your element. In the `src` directory, you'll find:

- A Javascript file that extends the PFElement class that takes care of setting up a shadow root and ShadyCSS.
- An HTML file where you'll add the semantic markup that will be used as your template inside the shadow root.
- A CSS or SCSS file (depending on if you're using Sass) where you'll add your styles.
- A JSON schema used to define the attributes and slots available in this web component.

During the development and build tasks, a Gulp task will merge these three files together into the root of your element and will update the ES6 and ES5 versions.

There are a few additional supported files you can add inside your `src` directory:

- Fallback styles, typically targeted to Edge and/or IE11. This file uses a standard naming convention of `pfe-foo--lightdom`.
- No-script styles which load in situations where JavaScript is not available.  This file uses a standard naming convention of `pfe-foo--noscript`.

If you wish to include any compiled assets beyond those listed above, please add them to your package.json inside the `pfelement` object as an `assets` array:

```json
"pfelement": {
  "className": "PfeAccordion",
  "elementName": "pfe-accordion",
  "assets": [
    "pfe-accordion.js",
    "pfe-accordion-header.js",
    "pfe-accordion-panel.js"
  ]
}
```

This will add these additional files to the standard set that is being served to the `dist` directory for developers to use on their page.  Globbing syntax is supported but you only need to specify the name of the `src` asset that you want included, and do not need to specify the minified versions for example.

## Compile, watch, & preview

To watch for changes on component(s) and compile the code when changes are detected, run the command below from the PatternFly Elements root directory. This command will also launch the preview of the demo files and Storybook.

```basg
npm run live-demo [component-name(s)]
```

You may also specify multiple elements.  For example, `pfe-card` and `pfe-cta` are often used together, so you may wish to watching them both.

```bash
npm run live-demo pfe-card pfe-cta
```

This command will open the browser to a listing of all the demo files: `http://localhost:8000/examples/`.

From there you can navigate to the demo page of the element you're working on. For example, if you want to preview the `pfe-card` component, then navigate in the browser to `http://localhost:8000/elements/pfe-card/demo`.

This command will also open the browser to the storybook instance.  Read more about storybook below.

### Storybook editor

Storybook is an interactive tool that allows consumers of the components to see how content can flow inside the components, as well as how variants affect style and layout. The `pfe-foo.storybook.js` file within the `/demo` directory of a component defines what appears in the Storybook preview. [You can learn more about the structure of these here](https://storybook.js.org/docs/basics/writing-stories/).

```bash
npm run storybook
```

Storybook will launch at [http://localhost:9001](http://localhost:9001).

## Testing

From the project's root directory, run the test command `npm test` and Web Component Tester will use Mocha and Chai to execute your tests in the browser.

```bash
npm test [component-name(s)]
```

## Final build

Prepare your element for distribution by running the build script at the root of the project. 

```bash
npm run build [component-name(s)]
```

The build script will merge the files in the `/src` directory and update the ES6 and ES5 versions of your element in the root of the element. These two files are the files that your applications will either require or import for use.

If you've been running `npm run live-demo`, the script runs the build every time you save a file in the `/src` directory, so running the build script might be redundant, but better safe than sorry.

## Publish

We've been publishing our PatternFly Elements to npm under the [PatternFly organization](https://www.npmjs.com/org/patternfly).

## Create a PatternFly Element

Now that we have understand how it all works, let's create a PatternFly Element together.

<pfe-cta>
  <a href="/docs/develop/create">Create a PatternFly Element</a>
</pfe-cta>
:::