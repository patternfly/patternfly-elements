---
layout: layout-docs.njk
tagline: Create your own PatternFly Element
title: Setup
order: 1
tags:
  - develop
---

{% band header="Prerequisites" %}
  In order to work on PatternFly elements, you'll need to have Git and NodeJS installed.
  We recommend installing [the Node Version Manager - nvm](https://github.com/nvm-sh/nvm) so that your development environment uses the expected node version.
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
  npm init @patternfly/element
  ```

  When creating your new components, you may find you are entering the same answers over and over again.
  To prevent this, you can pass a number of flags to the generator:

| Switch            | Description                                | Type                                                            |
| ----------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `--version`       | Show version number                        | boolean                                                         |
| `--directory`     | Output directory                           | string [default: "/users/bennyp/developer/patternfly-elements"] |
| `--silent`        | Do not log anything to stdout              | boolean [default: false]                                        |
| `-n`, `--tagName` | Custom element tag name. e.g. `pfe-button` | string                                                          |
| `-s`, `--scope`   | NPM package scope. e.g. `@patternfly`      | string                                                          |
| `--overwrite`     | Overwrite files without prompting          | boolean [default: false]                                        |
| `--help`          | Show help                                  | boolean                                                         |
{% endband %}

{% band header="Scaffolding Structure" %}
  The generator will scaffold out a new PatternFly Element under the `/elements` directory.

  In the newly created directory, you'll find:

  - A TypeScript file containing the element's class definition.
  - An SCSS file where you'll add your element's private styles.
  - A README file where you should briefly document your element
  - A file to write your unit tests
  - An HTML demo where you can show off your element and add examples for your development workflow

  You may also add noscript styles which load in situations where JavaScript is not available.  This file uses a standard naming convention of `pfe-foo--noscript`.
{% endband %}

<a id="compile-watch-and-preview"></a>

{% band header="Development Workflow" %}
  When you are ready to start work on your element, run the dev server:

  ```bash
  npm start
  ```

  This launches a "buildless" development server which serves a simple <abbr title="single page app">SPA</abbr> containing all the element demos.
  The server _does not require a build step_ to work, so avoid running `npm run build` unless you have to.
  Rather, the dev server compiles your source files (`.ts`, `.scss`, etc.) on-the-fly.

  Running that command launches the demo app in a new browser tab, and refreshes the page on save.

  From there you can navigate to the demo page of the element you're working on.
  For example, if you want to preview the `pfe-card` component, then navigate in the browser to `http://localhost:8000/demo/pfe-card/`.
{% endband %}

{% band header="Testing" %}
  From the project's root directory, run the test command `npm run test:watch` and
  [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) will execute your tests in the browser.

  ```bash
  npm run test:watch
  ```

  You can also run a tests on a single package using npm's `--workspace` switch:

  ```bash
  # Run a single test in watch mode.
  npm run test:watch -w @patternfly/pfe-select

  # Or multiple:
  npm run test:watch --files "./elements/pfe-{avatar,card,tabs}/test/*.spec.ts"
  ```

  The default `npm test` command executes each unit test three times, once using plain HTML, once in a React wrapper app, and once in a Vue 2 wrapper app.
  You can run tests in a specific wrapper using:

  ```bash
  # Run all tests using a React wrapper in watch mode.
  npm run test:react -- --watch

  # Run all tests using a Vue wrapper in watch mode.
  npm run test:vue -- --watch

  # Run all test using only the default wrapper
  npm run test -- --group default
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
  Now that we have understand how it all works, let's create a PatternFly Element together.

  <pfe-cta>
    <a href="/docs/develop/create">Create a PatternFly Element</a>
  </pfe-cta>
{% endband %}
