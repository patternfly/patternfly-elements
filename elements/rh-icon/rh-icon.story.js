import { storiesOf } from "@storybook/polymer";
import "./rh-icon";

storiesOf("Icon", module).add(
  "rh-icon",
  () => `
    <h2><rh-icon icon="rh-icon-server" data-size="2x"></rh-icon> Content beside it.</h2>
    <p><rh-icon icon="rh-icon-server-alt1" data-color="black" data-size="2x"></rh-icon> More content</p>
    <div><rh-icon icon="rh-icon-server-stack" data-bg data-size="large"></rh-icon> Feature-ish?</div>
  `
);
