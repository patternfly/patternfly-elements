---
layout: layout-basic.njk
title: Vue
tags:
  - frameworkIntegration
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="Using PatternFly Elements in your Vue app" %}
  To get web components to work with Vue, it’s pretty easy and straightforward.
  If you’d like to follow along, go ahead and [create a new Vue CodeSandbox on codesandbox.io](https://codesandbox.io/s/vue).
  The Vue sandbox uses the [vue-cli](https://cli.vuejs.org/) to scaffold an app and you can view your changes in real-time right in the web app.
  With CodeSandbox, you can also add any npm dependency with just a few button clicks.
  If you want to run this app locally, you can [clone the repository on GitHub](https://github.com/kylebuch8/patternfly-elements-with-vue).

  “Using PatternFly Elements in your Vue App” is broken down into four sections

  - Initial setup
  - Adding PatternFly Elements
  - Interacting with our web components API
  - Adding icing on the cake

  Each section will show you exactly what you need to do with code snippets and an accompanying CodeSandbox that you can edit or fork.
{% endband %}

{% band header="Initial setup" %}
  Add these two lines at the top of the `main.js` file in the `/src/` directory.

  ```js
  import Vue from "vue";
  import App from "./App.vue";
  ```
{% endband %}

{% band header="Adding PatternFly Elements" %}
  With the setup complete, let’s add a couple of PatternFly Elements web components to our application to make sure everything is hooked up properly. We’re going to add a card ([pfe-card](/components/card)). Later, we’ll add an accordion ([pfe-accordion](/components/accordion)) and some CSS to help with our layout ([pfe-layouts](/layout)).

  Once again, if we were building this app locally, we’d install our dependencies from npm.

  ```bash
  npm install --save @patternfly/pfe-card@next
  ```

  But if you’re using CodeSandbox, just search for “@patternfly/pfe-card”

  In our `HelloWorld.vue` file in the `/src/components/` directory, let’s add the import statements for our components to the top of the `<script>` tag in the file.

  ```html
  <script>
    import "@patternfly/pfe-card";
    export default {
      name: "HelloWorld",
      props: {
        msg: String
      }
    };
  </script>
  ```

  Let’s add some simple markup in the `template` section of the `HellowWorld.vue` file to see that our pfe-card is working.

  ```html
  <template>
    <div>
      <h1>PatternFly Elements with Vue</h1>
      <pfe-card color-palette="lightest" border>
        <img
          alt="From https://picsum.photos/"
          overflow="left right top"
          src="https://picsum.photos/id/1019/300/200"
        >
        <p>
          This is the light pfe-card and
          <a href="#">a link</a>.
        </p>
        <p>
          Leverage agile frameworks to provide a robust synopsis for high
          level overviews. Iterative approaches to corporate strategy
          foster collaborative thinking to further the overall value
          proposition.
        </p>
        <p>
          Organically grow the holistic world view of disruptive
          innovation via workplace diversity and empowerment.
        </p>
        <a class="cta" slot="footer" href="#">Learn more</a>
      </pfe-card>
    </div>
  </template>
  ```

  Below is the accompanying CodeSandbox to see that our initial setup is correct and that we’ve successfully added our web components to our app.
{% endband %}
