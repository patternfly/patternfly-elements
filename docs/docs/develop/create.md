---
layout: layout-docs.njk
title: Create a PatternFly Element
order: 2
tags:
  - develop
---

{% band %}

  ## PatternFly Element generator

  Before you begin, make sure you've followed the 
  [Prerequisites](/docs/develop/setup#prerequisites) in 
  [Setup](/docs/develop/setup).

  Then use the PatternFly Element generator to start the scaffolding process. 
  
  From the root directory of the PatternFly Elements  repository, run the following 
  command:

  ```bash
  npm run new
  ```

  The generator will then prompt you for the following:

  * What is the element's tag name?
    * Your element's name should be lowercase and needs to contain at least 
      one hyphen. For rules on naming custom elements, refer to the W3C 
      [Custom Elements Working Draft](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).
    * As an example, we'll create `pf-cool-element`.  
    * PatternFly Elements should be prefixed with `pf-`. However, prefix your 
      elements with whatever fits your project if you are using the generator outside of this project.

  After answering, your new component will be created and bootstrapped in the repository.

  Once that's done, switch directories to the element you just created. We'll 
  `cd` into the `pf-cool-element` directory.

  ```bash
  cd elements/pf-cool-element
  ```

  Open your code editor to view the structure of the element.
  The element's source files are located directly in it's package root, in our 
  case:

  * `pf-cool-element.ts` - The element class declaration
  * `pf-cool-element.css` - The element's CSS style module

  These two files are the most important as they contain the actual element 
  definition. In addition, there are a number of config files. Do not edit these files 
  unless you know what you're doing.

  * `custom-elements-manifest.config.js` - Configuration for the 
      custom-elements-manifest analyzer.
  * `custom-elements.json` - A manifest of your package's JS exports and 
      custom elements.
  * `package.json` - NPM package configuration and scripts
  * `tsconfig.json` - TypeScript configuration for your monorepo.

  For now, your `custom-elements.json` file is empty. If you'd like to generate 
  content for it, run the `analyze` script in your element's workspace:

  ```bash
  npm run analyze
  ```

  This happens automatically when you build or publish your elements, so don't 
  worry about forgetting to run it.

  The `demo` directory contains an HTML partial that you can edit to provide an 
  interactive demo of your element.

  The `test` directory contains unit test files for your elemen.

  You'll also notice that the generator editted the root `tsconfig.json`, adding 
  a `path` to our new element.
  This is important so that TypeScript knows where each of our packages in the 
  monorepo are.

  <a class="cta" href="../structure">Next up: Structure</a>
{% endband %}
