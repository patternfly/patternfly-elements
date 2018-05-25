import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./rh-dialog";

storiesOf("Dialog", module).add(
  "rh-dialog",
  () => `
    <button data-target="#dialog" id="dialog-btn">Open Dialog</button>
    <rh-dialog id="dialog" data-trigger="#dialog-btn">
      <p>Hello!</p>
      <button id="cancel">Cancel</button>
    </rh-dialog>
  `
);
