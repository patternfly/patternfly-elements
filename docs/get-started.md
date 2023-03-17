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

  ### In JavaScript modules

  Include the PatternFly Element web component and its dependencies within the app.
  When using a bundler such as [esbuild](https://esbuild.github.io/) or [rollup](https://rollupjs.org)
  with [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve), use
  [bare module specifiers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_as_bare_names) to import the components.

  ```javascript
  import '@patternfly/elements/pf-card/pf-card.js';
  ```

  ### In HTML
  You may load the components in HTML using script tags via `<script type="importmap">` and `<script type="module">`. 
  
  List all the components you want to use on your page or app, and use [generator.jspm.io](https://generator.jspm.io/#U2VhYGAIzSvJLMlJTWEAACKwkqAOAA) to generate a JSON importmap for the component entry points.  [Learn more about importmaps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap). 
  
  **Note for older browser support:** ES Module Shims: Import maps polyfill for browsers without import maps support (all except Chrome 89+) 

  Then include the generated importmap in your HTML, and load the components you need with `<script type="module">`. [Learn more about JavaScript modules][modules].

  In this example, we load the [card](/components/card/) modules using an importmap from JSPM.

  ```html
  <!--
    JSPM Generator Import Map
    Edit URL: https://generator.jspm.io/#U2NgYGBkDM0rySzJSU1hcChILClJLcpLy6nUT81JzU3NKyl2MNIz0DPQL0jTTU4sSoHRelnFAN524ZI8AA
  -->
  <script type="importmap">
  {
    "imports": {
      "@patternfly/elements/pf-card/pf-card.js": "https://ga.jspm.io/npm:@patternfly/elements@2.0.0/pf-card/pf-card.js"
    },
    "scopes": {
      "https://ga.jspm.io/": {
        "@lit/reactive-element": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/reactive-element.js",
        "@lit/reactive-element/decorators/": "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/decorators/",
        "@patternfly/pfe-core/controllers/slot-controller.js": "https://ga.jspm.io/npm:@patternfly/pfe-core@2.0.0/controllers/slot-controller.js",
        "lit": "https://ga.jspm.io/npm:lit@2.6.1/index.js",
        "lit-element/lit-element.js": "https://ga.jspm.io/npm:lit-element@3.2.2/lit-element.js",
        "lit-html": "https://ga.jspm.io/npm:lit-html@2.6.1/lit-html.js",
        "lit-html/": "https://ga.jspm.io/npm:lit-html@2.6.1/",
        "lit/": "https://ga.jspm.io/npm:lit@2.6.1/",
        "tslib": "https://ga.jspm.io/npm:tslib@2.5.0/modules/index.js"
      }
    }
  }
  </script>
  
  <!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) -->
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.5.1/dist/es-module-shims.js" crossorigin="anonymous"></script>

  <script type="module">
    import "@patternfly/elements/pf-card/pf-card.js";
  </script>
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
  these overrides to propagate.

  ### Page-level CSS, theme variables
  Theme variables will impact all components on the page where this CSS is 
  loaded.

  ```css
  /* your-page.css */
  :root {
    --pf-c-card--BackgroundColor: var(--pf-global--active-color--200, #bee1f4);
  }
  ```
  <pf-card flat rounded style="--pf-c-card--BackgroundColor: var(--pf-global--active-color--200, #bee1f4);">
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
