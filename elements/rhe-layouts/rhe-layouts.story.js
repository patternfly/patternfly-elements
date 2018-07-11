import { storiesOf } from "@storybook/polymer";

storiesOf("Layouts", module).add(
  "rhe-layouts",
  () => `
  <link rel="stylesheet" type="text/css" href="../elements/rhe-layouts/rhe-layouts.css">
  <div class="rhe-l-grid rhe-m-gutters rhe-m-all-6-col rhe-m-all-4-col-on-md rhe-m-all-3-col-on-lg">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
  </div>
  `
);
