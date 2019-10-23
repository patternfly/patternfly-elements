import { storiesOf } from "@storybook/polymer";
import "../pfe-toast";

storiesOf("Toast", module).add(
  "pfe-toast",
  () => `
  <pfe-toast>
    Toast
  </pfe-toast>
  `
);
