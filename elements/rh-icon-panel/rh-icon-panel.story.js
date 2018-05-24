import { storiesOf } from "@storybook/polymer";
import "./rh-icon-panel";

storiesOf("Icon", module).add(
  "rh-icon-panel",
  () => `
    <rh-icon-panel icon="rh-icon-server">
      <h2 slot="header">This is rh-icon-panel</h2>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      <rh-cta slot="footer"><a href="#">Learn more</a></rh-cta>
    </rh-icon-panel>
  `
);
