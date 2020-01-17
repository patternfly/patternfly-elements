import { storiesOf } from "@storybook/polymer";
import "../dist/pfe-burger-button";

storiesOf("Burger", module).add(
  "pfe-burger-button",
  () => `
  <pfe-burger-button>
    Burger
  </pfe-burger-button>
  `
);
