---
layout: layout-docs.njk
tagline: Create your own PatternFly Element
title: Setup
order: 10
tags:
  - develop
---

{% band header="Prerequisites" %}
  To get started with PatternFly elements, you will need to have the following installed: 
  
  - [Git](https://git-scm.com/) 
  - [NodeJS](https://nodejs.org/)
  - [Node Version Manager - nvm (recommended)](https://github.com/nvm-sh/nvm)

  We recommend installing the [Node Version Manager - nvm](https://github.com/nvm-sh/nvm) so that your development environment uses the expected node version set by the project `.nvmrc` file.

  If you are using Windows or Fish shell, follow the [special instructions to install a compatible version of nvm](https://github.com/nvm-sh/nvm#important-notes).

  Clone the [PatternFly Elements repo]({{ githubLink }}) and change directory to it.

  ```bash
  git clone {{ githubLink }}
  cd patternfly-elements
  ```

  Then switch to the required node version (you may have to install it)

  ```bash
  nvm use
  ```

  Once the git repository and node version are setup, you're ready to install the repository's dependencies:

  ```bash
  npm ci
  ```

  ### Working on Existing Components

  From here, if you want to modify an existing component, start the [development server](#development-workflow)
  Or if you'd like to generate a new element, read on...
{% endband %}

{% band header="Generating a PatternFly Element" %}
  The easiest way to build a new component from scratch is to use the generator.
  The generator will ask you a few questions that will help with the scaffolding.
  Make sure you are in the root directory of the PatternFly Elements repository.

  ```bash
  npm run new
  ```

  When creating your new components, you may find you are entering the same answers over and over again.
  To prevent this, you can pass a number of flags to the generator:

| Switch                | Description                                | Type                                                            |
| --------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `--directory`         | Output directory                           | string [default: "/path/to/patternfly-elements"] |
| `--silent`            | Do not log anything to stdout              | boolean [default: false]                                        |
| `-n`, `--tagName`     | Custom element tag name. e.g. `pf-button`  | string                                                          |
| `-p`, `--packageName` | NPM package scope. e.g. `@patternfly/elements`| string                                                   |
| `--overwrite`         | Overwrite files without prompting          | boolean [default: false]                                        |
| `--help`              | Show help                                  | boolean                                                         |

Example
```bash
npm run new -- --tagName pf-cool-element
```


{% endband %}

{% band header="Scaffolding Structure" %}
  The generator will scaffold out a new PatternFly Element under the `/elements` directory.

  In the newly created directory, you'll find:

  - A TypeScript file containing the element's class definition.
  - A CSS file where you'll add your element's private styles.
  - A README file where you should briefly document your element
  - A file to write your unit tests
  - An HTML demo where you can show off your element and add examples for your development workflow

  You may also add light DOM styles which can be loaded prior to [element defined](https://developer.mozilla.org/en-US/docs/Web/CSS/:defined) `pf-cool-element:not(:defined){...}`. An example use case would be to avoid above the fold layout shift.  

  The light DOM CSS file uses a standard naming convention of: 
  `{scope}-{component-name}--lightdom.css` 
  Example: `pf-cool-element--lightdom.css`.
{% endband %}

<a id="compile-watch-and-preview"></a>

{% band header="Development Workflow" %}
  When you are ready to start work on your element, run the dev server:

  ```bash
  npm start
  ```

  This launches a "buildless" development server which serves a simple <abbr title="single page app">SPA</abbr> containing all the element demos.
  The server _does not require a build step_ to work, so avoid running `npm run build` unless you have to.
  Rather, the dev server compiles your source files (`.ts`, `.css`, etc.) 
  on-the-fly.

  Running that command launches the demo app in a new browser tab, and refreshes the page on save.

  From there you can navigate to the demo page of the element you're working on.
  For example, if you want to preview the `pf-card` component, then navigate in the browser to `http://localhost:8000/demo/pf-card/`.
{% endband %}

{% band header="Testing" %}
  From the project's root directory, run the test command `npm run test` and
  [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) will execute your tests in a headless browser for each component.

  To run your tests in watch mode run:
  ```bash
  npm run test:watch
  ```

  You can also run a tests on a single package using the `--files` switch:

  ```bash
  # Run a single test in watch mode.
  npm run test:watch --files "./elements/pf-button/test/pf-button.spec.ts"

  # Or multiple:
  npm run test:watch --files "./elements/pf-{avatar,card,tabs}/test/*.spec.ts"
  ```

  You can also run tests with a specific framework wrapper using:

  ```bash
  # Run all tests using a React wrapper in watch mode.
  npm run test:react

  # Run all tests using a Vue wrapper in watch mode.
  npm run test:vue
  ```
  
{% endband %}

{% band header="Final build" %}
  Prepare your element for distribution by running the build script at the root of the project.

  ```bash
  npm run build
  ```

  In an ordinary development workflow, you shouldn't need to manually run the build script at all, but it can be useful to see what your final compiled assets will look like.
{% endband %}

{% band header="Publish" %}
  PatternFly Elements are published to npm under the [PatternFly organization](https://www.npmjs.com/org/patternfly).
{% endband %}

{% band header="Create a PatternFly Element" %}
  Now that we understand the basics, let's create a new PatternFly Element.

  <a class="cta" href="{{ '/docs/develop/create' | url }}">Create a PatternFly Element</a>
{% endband %}
