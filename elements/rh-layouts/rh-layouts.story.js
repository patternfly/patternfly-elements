import { storiesOf } from "@storybook/polymer";

storiesOf("Layouts", module).add(
  "rh-layouts",
  () => `
  <link rel="stylesheet" type="text/css" href="/rh-layouts/rh-base.css">
  <link rel="stylesheet" type="text/css" href="/rh-layouts/rh-layouts.css">
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
  .rh-l-grid > * {
    background: #e0d7ee;
    padding: 8px;
  }
  .rh-l-bullseye {
    background: #e0d7ee;
    height: 200px;
  }
  </style>
  <section>
    <h3>Pure Grid</h3>
    <div class="rh-l-grid rh-m-gutters rh-m-all-6-col rh-m-all-4-col-on-md rh-m-all-3-col-on-lg">
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </div>
  </section>
  <section>
    <h3>Bootstrap-style Columns</h3>
    <div class="rh-l-grid rh-m-gutters">
      <div class="rh-l-grid__item">Default Item</div>
      <div class="rh-l-grid__item rh-m-2-col"><code>rh-m-2-col</code></div>
      <div class="rh-l-grid__item rh-m-10-col"><code>rh-m-10-col</code></div>
      <div class="rh-l-grid__item rh-m-4-col"><code>rh-m-4-col</code></div>
      <div class="rh-l-grid__item rh-m-4-col"><code>rh-m-4-col</code></div>
      <div class="rh-l-grid__item rh-m-4-col"><code>rh-m-4-col</code></div>
      <div class="rh-l-grid__item rh-m-6-col rh-m-3-col-on-md"><code>rh-m-6-col rh-m-3-col-on-md</code></div>
      <div class="rh-l-grid__item rh-m-6-col rh-m-3-col-on-md rh-m-startat-7-col-on-md"><code>rh-m-6-col rh-m-3-col-on-md rh-m-startat-7-col-on-md</code></div>
      <div class="rh-l-grid__item rh-m-6-col rh-m-3-col-on-md"><code>rh-m-6-col rh-m-3-col-on-md</code></div>
    </div>
  </section>
  <section>
    <h3>Basic Bullseye</h3>
    <div class="rh-l-bullseye">
      <div class="rh-l-bullseye__item">Bam!</div>
    </div>
  </section>
  `
);
