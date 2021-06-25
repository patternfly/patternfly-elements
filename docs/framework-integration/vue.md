---
layout: layout-basic.html
title: Vue
tags:
  - frameworkIntegration
---

::: section header
# {{ title }}
:::

::: section
## Using PatternFly Elements in your Vue app

To get web components to work with Vue, it’s pretty easy and straightforward. If you’d like to follow along, go ahead and [create a new Vue CodeSandbox on codesandbox.io](https://codesandbox.io/s/vue). The Vue sandbox uses the [vue-cli](https://cli.vuejs.org/) to scaffold an app and you can view your changes in real-time right in the web app. With CodeSandbox, you can also add any npm dependency with just a few button clicks. If you want to run this app locally, you can [clone the repository on GitHub](https://github.com/kylebuch8/patternfly-elements-with-vue).

“Using PatternFly Elements in your Vue App” is broken down into four sections

- Initial setup
- Adding PatternFly Elements
- Interacting with our web components API
- Adding icing on the cake

Each section will show you exactly what you need to do with code snippets and an accompanying CodeSandbox that you can edit or fork.
:::

::: section
## Initial setup

First, we need to add the web component polyfills so we can support IE11 and Edge. If we were building this app locally, we’d want to install the web components polyfills from npm.

```bash
npm install --save @webcomponents/webcomponentsjs
```

But if you’re using CodeSandbox, you can just expand the dependencies menu in the Explorer region on the left side of the page, click “Add Dependency”, search for “@webcomponents/webcomponentsjs”, and click on the result of the search. After the dependency is installed, add these two lines at the top of the `main.js` file in the `/src/` directory.

```js
import Vue from "vue";
import App from "./App.vue";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-loader";
```
:::

::: section
## Adding PatternFly Elements

With the setup complete, let’s add a couple of PatternFly Elements web components to our application to make sure everything is hooked up properly. We’re going to add a card ([pfe-card](/components/card)) and a call-to-action button ([pfe-cta](/components/call-to-action)). Later, we’ll add an accordion ([pfe-accordion](/components/accordion)) and some CSS to help with our layout ([pfe-layouts](/layout)).

Once again, if we were building this app locally, we’d install our dependencies from npm.

```bash
npm install --save @patternfly/pfe-card @patternfly/pfe-cta
```

But if you’re using CodeSandbox, just search for “@patternfly/pfe-card” and “@patternfly/pfe-cta”.

In our `HelloWorld.vue` file in the `/src/components/` directory, let’s add the import statements for our components to the top of the `<script>` tag in the file.

```js
<script>
import "@patternfly/pfe-card";
import "@patternfly/pfe-cta";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
```

Let’s add some simple markup in the `template` section of the `HellowWorld.vue` file to see that our pfe-card and pfe-cta are working.

<script src="https://gist.github.com/kylebuch8/36cdf296c8ffc4de2c3e1491d71fddeb.js"></script>

Below is the accompanying CodeSandbox to see that our initial setup is correct and that we’ve successfully added our web components to our app.
:::
