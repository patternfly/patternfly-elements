---
layout: layout-basic.njk
title: Get started
---

<pfe-band class="header" use-grid>
  <h1 slot="header">{{ title }}</h1>
</pfe-band>

{% band header="Quick start" %}
  If you'd like to start exploring PatternFly Elements right away, checkout our [Quick start demo page](/quick-start).
{% endband %}

{% band header="Install PatternFly Elements" %}
  Depending on the tool you use to manage dependencies (npm, yarn, etc.) use the command line to install the components
  you’d like as a dependency of your project like this:

  ```shell
  npm install --save @patternfly/pfe-card
  npm install --save @patternfly/pfe-cta
  ```

  This will install not only the pfe-card and pfe-cta, but also the core utilities and styles,
  and will save it to your package-lock.json.
{% endband %}

{% band header="Include PatternFly Elements JavaScript" %}
  There are a few options for including PatternFly Elements into your site or app.

  ### In HTML
  You may load the JavaScript via `<script type="module">`. List out all the components you may include on your page,
  and the browser will fetch the dependencies dynamically on load.
  [Learn more about JavaScript modules](https://hospodarets.com/native-ecmascript-modules-the-first-overview).

  In this example, we load the [card](/components/card/) and [cta](/components/cta/) modules from [`https://unpkg.com`](https://unpkg.com).

  ```html
  <script type="module" src="https://unpkg.com/@patternfly/pfe-card?module"></script>
  <script type="module" src="https://unpkg.com/@patternfly/pfe-cta?module"></script>
  ```

  <a id="in-an-app"></a>
  ### In JavaScript modules
  Include the PatternFly Element web component and its dependencies within the app.
  When using a bundler such as [esbuild](https://esbuild.github.io/) or [rollup](https://rollupjs.org)
  with [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve), use
  [bare module specifiers](https://lit.dev/docs/tools/requirements/) to import the components.

  ```javascript
  import '@patternfly/pfe-card';
  import '@patternfly/pfe-cta';
  ```
{% endband %}

{% band header="Add PatternFly Elements markup" %}
  Add a [call-to-action component](/components/cta).
  ```html
  <pfe-cta>
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-cta>
  ```

  <pfe-cta>
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-cta>

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

  Change the priority of a [call-to-action component](/components/cta) using the [priority attribute](http://localhost:8080/components/cta/#priority).
  ```html
  <pfe-cta priority="primary">
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-cta>
  ```

  <pfe-cta priority="primary">
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-cta>

  Change the color value of a [card component](/components/card) to change its appearance using the [color attribute](http://localhost:8080/components/card/#color).
  ```html
  <pfe-card color="accent">
    <h3 slot="header">Card header</h3>
    <p>This is the pfe-card body.</p>
    <div slot="footer">
      <p>This is the footer</p>
    </div>
  </pfe-card>
  ```
  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-card color="accent" class="pfe-l-grid__item pfe-m-4-col">
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

  **Note**: overriding local variables (i.e., –pfe-cta–foo) will not work at this level. Those overrides can only be done on the component via tag name, class, or ID.

  ### Page-level CSS, component variables
  ```css
  /* your-page.css */
  pfe-cta {
    --pfe-cta--BackgroundColor: pink;
    --pfe-cta--Color: black;
  }

  pfe-band {
    --pfe-band--Padding--vertical: 34px;
    --pfe-band--BackgroundColor: green;
    --theme: saturated;
  }
  ```

  ### Component-level inline CSS
  As a last resort, you may choose to override variables with inline styles. This could be desirable if you only need one component to deviate from the design system. Note that this incurs some level of risk, especially related to colors, as you are opting out of the color combinations in the system.

  ```html
  <pfe-cta style="--pfe-cta--BackgroundColor: pink">
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-cta>
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
    <!-- Add PFE core styles to the head -->
    <link rel="stylesheet" href="https://jspm.dev/@patternfly/pfe-styles@2.0.0/pfe.min.css">
    <style>
      :root {
        /* Optional: customize the delay until the body is revealed regardless */
        --pfe-reveal-delay: 1;
        /* Optional: customize the animation duration of the reveal */
        --pfe-reveal-duration: 0.2s;
      }
    </style>
    <!-- Add noscript styles to immediately reveal content when JavaScript is disabled -->
    <noscript>
      <link rel="stylesheet" href="https://jspm.dev/@patternfly/pfe-styles@2.0.0/pfe--noscript.min.css">
    </noscript>
    <script type="module" src="https://jspm.dev/@patternfly/pfe-band@2.0.0"></script>
  </head>
  <!-- Add the unresolved attribute to the body tag -->
  <!-- The pfe-core library and pfe.min.css file automatically remove the unresolved attribute -->
  <body unresolved>
    <pfe-band>
      <h1 slot="header">No FOUC</h1>
      <p>Content will remain hidden until component definitions are loaded.</p>
    </pfe-band>
  </body>
  </html>
  ```
{% endband %}
