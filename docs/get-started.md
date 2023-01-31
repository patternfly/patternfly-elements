---
layout: layout-basic.njk
title: Get started
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="Quick start" %}
  If you'd like to start exploring PatternFly Elements right away, checkout our 
  [Quick start demo page](/quick-start).
{% endband %}

{% band header="Install PatternFly Elements" %}
  Depending on the tool you use to manage dependencies (npm, yarn, etc.) use the 
  command line to install the components you’d like as a dependency of your 
  project like this:

  ```shell
  npm install --save @patternfly/elements
  ```

  This will install not only the pf-card, but also the core utilities and 
  styles,
  and will save it to your package.json.
{% endband %}

{% band header="Include PatternFly Elements JavaScript" %}
  There are a few options for including PatternFly Elements into your site or app.

  ### In HTML
  You may load the JavaScript via `<script type="module">`. List out all the 
  components you may include on your page, and the browser will fetch the 
  dependencies dynamically on load.
  [Learn more about JavaScript modules][modules].

  In this example, we load the [card](/components/card/) modules from 
  [JSPM](https://jspm.dev).

  ```html
  <script type="module" src="https://jspm.dev/@patternfly/elements/pf-card/pf-card.js"></script>
  ```

  <a id="in-an-app"></a>

  ### In JavaScript modules

  Include the PatternFly Element web component and its dependencies within the app.
  When using a bundler such as [esbuild](https://esbuild.github.io/) or [rollup](https://rollupjs.org)
  with [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve), use
  [bare module specifiers](https://lit.dev/docs/tools/requirements/) to import the components.

  ```javascript
  import '@patternfly/elements/pf-card/pf-card.js';
  ```
{% endband %}

{% band header="Add PatternFly Elements markup" %}
  Add a [card component](/components/card).

  ```html
  <pf-card>
    <h3 slot="header">Card header</h3>
    <p>This is the pf-card body.</p>
    <pf-button slot="footer">OK</pf-button>
  </pf-card>
  ```

  <pf-card>
    <h3 slot="header">Card header</h3>
    <p>This is the pf-card body.</p>
    <pf-button slot="footer">OK</pf-button>
  </pf-card>

{% endband %}

{% band header="Add attributes" %}
  Attributes can be used to adjust a theme, a palette color, a priority, set 
  default values, etc. Be sure to check out the "Attributes" section for each 
  component to see which attributes are available.

  ```html
  <pf-card rounded>
    <h3 slot="header">Card header</h3>
    <p>This is the pf-card body.</p>
    <pf-button slot="footer">OK</pf-button>
  </pf-card>
  ```

  <pf-card rounded>
    <h3 slot="header">Card header</h3>
    <p>This is the pf-card body.</p>
    <pf-button slot="footer">OK</pf-button>
  </pf-card>
{% endband %}

{% band header="Use CSS variables to customize or theme your components" %}
  CSS variables are subject to the normal cascade, so consider where you want 
  these overrides to propogate.

  ### Page-level CSS, theme variables
  Theme variables will impact all components on the page where this CSS is 
  loaded.

  ```css
  /* your-page.css */
  :root {
    --pf-c-card--BackgroundColor: cornflowerblue;
  }
  ```
  <pf-card flat rounded style="--pf-c-card--BackgroundColor: cornflowerblue;">
    <h3 slot="header">Card header</h3>
    <p>This is the pf-card body.</p>
    <pf-button slot="footer">OK</pf-button>
  </pf-card>
{% endband %}

{% band header="Avoiding the flash of unstyled content (FOUC)" %}
  To hide undefined elements until they've upgraded, use the `:defined` 
  pseudo-class. You can set elements which are `:not(:defined)` to be 
  transparent, and make them fully opaque in a `<noscript>` style.

  In this example, we load PatternFly elements from 
  [`https://jspm.dev`](https://jspm.dev).
  Replace the URLs with a CDN of your choice or locally-bundled files, depending on your needs.

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PatternFly Elements - Avoiding the FOUC</title>
    <style>
      :root {
        --reveal-delay: 1s;
        --reveal-duration: 0.2s;
      }

      pf-card {
        opacity: 1;
        transition: opacity var(--reveal-duration) ease var(--reveal-delay);
      }

      pf-card:not(:defined) {
        opacity: 0;
      }
    </style>

    <!-- Add noscript styles to immediately reveal content when JavaScript is disabled -->
    <noscript>
      <style>
        pf-card:not(:defined) {
          opacity: 1;
        }
      </style>
    </noscript>
    <script type="module" src="https://jspm.dev/@patternfly/elements/pf-card/pf-card.js"></script>
  </head>
  <body>
    <pf-card>
      <h1 slot="header">No FOUC</h1>
      <p>Content will remain hidden until component definitions are loaded.</p>
    </pf-card>
  </body>
  </html>
  ```
{% endband %}

[modules]: https://hospodarets.com/native-ecmascript-modules-the-first-overview
