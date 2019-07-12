import { storiesOf } from "@storybook/polymer";
import "../pfe-progress-indicator";

storiesOf("Progress", module).add(
  "pfe-progress-indicator",
  () => `
  <pfe-progress-indicator>
    Progress
  </pfe-progress-indicator>
  `
);