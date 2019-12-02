import { storiesOf } from "@storybook/polymer";

const stories = storiesOf("Layouts", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.add(
  "pfe-styles",
  () => `
  <link rel="stylesheet" type="text/css" href="/pfe-styles/dist/pfe-base.css">
  <link rel="stylesheet" type="text/css" href="/pfe-styles/dist/pfe-layouts.css">
  <style>
  body {
    padding: 32px;
  }
  section {
    padding: 32px;
    margin-bottom: 32px;
    border-radius: 2px;
    background: #fff;
    border: 1px solid rgb(234, 234, 234);
  }
  section > h3 {
    position: relative;
    margin: -32px -32px 1em;
    padding: 8px 32px;
    border-bottom: 1px solid rgb(234, 234, 234);
  }
  .pfe-l-grid > * {
    background: #e0d7ee;
    padding: 8px;
  }
  .pfe-l-bullseye {
    background: #e0d7ee;
    height: 200px;
  }
  </style>
  <section>
    <h3>Pure Grid</h3>
    <div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md pfe-m-all-3-col-on-lg">
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </div>
  </section>
  <section>
    <h3>Bootstrap-style Columns</h3>
    <div class="pfe-l-grid pfe-m-gutters">
      <div class="pfe-l-grid__item">Default Item</div>
      <div class="pfe-l-grid__item pfe-m-2-col"><code>pfe-m-2-col</code></div>
      <div class="pfe-l-grid__item pfe-m-10-col"><code>pfe-m-10-col</code></div>
      <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
      <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
      <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
      <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
      <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md</code></div>
      <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
    </div>
  </section>
  <section>
    <h3>Basic Bullseye</h3>
    <div class="pfe-l-bullseye">
      <div class="pfe-l-bullseye__item">Bam!</div>
    </div>
  </section>
  `
);
