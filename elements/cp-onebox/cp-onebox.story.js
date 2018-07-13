import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./cp-onebox";

storiesOf("Onebox", module).add(
  "cp-onebox",
  () => `
    <cp-onebox
      term="rhel"
      source="https://cors-anywhere.herokuapp.com/https://access.redhat.com/webassets/avalon/j/search/one-box.json">
    </cp-onebox>
  `
);
