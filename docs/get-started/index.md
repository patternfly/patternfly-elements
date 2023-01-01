---
layout: layout-basic.njk
title: Get started
---

<header class="band" use-grid>
  <h1>{{ title }}</h1>
</header>

{% band header="Quick start" %}
  If you'd like to start exploring PatternFly Elements right away, checkout our [Quick start demo page](/quick-start).
{% endband %}

{% band header="Install PatternFly Elements" %}
  Depending on the tool you use to manage dependencies (npm, yarn, etc.) use the command line to install the components
  you’d like as a dependency of your project like this:

  ```shell
  npm install --save @patternfly/pfe-card@next
  ```

  This will install not only the pfe-card, but also the core utilities and styles,
  and will save it to your package-lock.json.
{% endband %}

{% band header="Include PatternFly Elements JavaScript" %}
  There are a few options for including PatternFly Elements into your site or app.

  ### In HTML
  You may load the JavaScript via `<script type="module">`. List out all the components you may include on your page,
  and the browser will fetch the dependencies dynamically on load.
  [Learn more about JavaScript modules](https://hospodarets.com/native-ecmascript-modules-the-first-overview).

  In this example, we load the [card](/components/card/) modules from [`https://unpkg.com`](https://unpkg.com).

  ```html
  <script type="module" src="https://unpkg.com/@patternfly/pfe-card@next?module"></script>
  ```

  <a id="in-an-app"></a>
  ### In JavaScript modules
  Include the PatternFly Element web component and its dependencies within the app.
  When using a bundler such as [esbuild](https://esbuild.github.io/) or [rollup](https://rollupjs.org)
  with [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve), use
  [bare module specifiers](https://lit.dev/docs/tools/requirements/) to import the components.

  ```javascript
  import '@patternfly/pfe-card';
  ```
{% endband %}

{% band header="Add PatternFly Elements markup" %}
  Add a [card component](/components/card).
  ```html
  <pfe-card>
    <h3 slot="header">Card header</h3>
    <p>This is the pfe-card body.</p>
    <div slot="footer">
      <p>This is the footer</p>
    </div>
  </pfe-card>
  ```
  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-card class="pfe-l-grid__item pfe-m-4-col">
      <h3 slot="header">Card header</h3>
      <p>This is the pfe-card body.</p>
      <div slot="footer">
        <p>This is the footer</p>
      </div>
    </pfe-card>
  </div>
{% endband %}

{% band header="Add attributes" %}
  Attributes can be used to adjust a theme, a palette color, a priority, set default values, etc. Be sure to check out the "Attributes" section for each component to see which attributes are available.

  Change the color-palette value of a [card component](/components/card) to change its appearance using the [color-palette attribute](http://localhost:8080/components/card/#colorPalette).
  ```html
  <pfe-card color-palette="accent">
    <h3 slot="header">Card header</h3>
    <p>This is the pfe-card body.</p>
    <div slot="footer">
      <p>This is the footer</p>
    </div>
  </pfe-card>
  ```
  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-card color-palette="accent" class="pfe-l-grid__item pfe-m-4-col">
      <h3 slot="header">Card header</h3>
      <p>This is the pfe-card body.</p>
      <div slot="footer">
        <p>This is the footer</p>
      </div>
    </pfe-card>
  </div>
{% endband %}

{% band header="Use CSS variables to customize or theme your components" %}
  CSS variables are subject to the normal cascade, so consider where you want these overrides to propogate.

  ### Page-level CSS, theme variables
  Theme variables will impact all components on the page where this CSS is loaded.

  ```css
  // your-page.css
  :root {
    --pfe-theme--color--ui-accent: green;
    --pfe-theme--color--surface--darker: navy;
  }
  ```

  **Note**: overriding local variables (i.e., –pfe-card–foo) will not work at this level. Those overrides can only be done on the component via tag name, class, or ID.

  ### Page-level CSS, component variables
  ```css
  /* your-page.css */
  :root {
    --pf-c-card--BackgroundColor: green;
  }
  ```
{% endband %}

{% band header="Avoiding the flash of unstyled content (FOUC)" %}
  PatternFly Elements provides a stylesheet that causes the `body[unresolved]` attribute
  to avoid the flash of unstyled content (FOUC). Adding the unresolved attribute to the `body`
  tag will hide the entire page until all elements have upgraded or 0.1618 seconds have passed,
  whichever happens first. By including the `pfe--noscript.css` file (wrapped in a noscript tag),
  all content displays immediately on pages with JavaScript disabled.

  To customize the wait time, update the value of the `--pfe-reveal-delay` variable (default 2 second delay)
  and the `--pfe-reveal-duration` variable (how long the reveal animation takes, default 0.1618 seconds).

  To prevent the auto-reveal script from waiting for all Patternfly elements to update,
  add the `no-auto-reveal` attribute to the body element.

  In this example, we load PatternFly elements from [`https://jspm.dev`](https://jspm.dev).
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
        /* Optional: customize the delay until the body is revealed regardless */
        --pfe-reveal-delay: 1;
        /* Optional: customize the animation duration of the reveal */
        --pfe-reveal-duration: 0.2s;
      }

      pfe-card {
        opacity: 1;
        transition:
          opacity
          var(--pfe-reveal-duration)
          ease
          var(--pfe-reveal-delay);
      }

      pfe-card:not(:defined) {
        opacity: 0;
      }

    </style>
    <!-- Add noscript styles to immediately reveal content when JavaScript is disabled -->
    <noscript>
      pfe-card:not(:defined) {
        opacity: 1;
      }
    </noscript>
    <script type="module" src="https://jspm.dev/@patternfly/pfe-card@next"></script>
  </head>
  <!-- Add the unresolved attribute to the body tag -->
  <!-- The pfe-core library and pfe.min.css file automatically remove the unresolved attribute -->
  <body>
    <pfe-card>
      <h1 slot="header">No FOUC</h1>
      <p>Content will remain hidden until component definitions are loaded.</p>
    </pfe-card>
  </body>
  </html>
  ```
{% endband %}
