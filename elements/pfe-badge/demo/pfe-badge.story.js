import { storiesOf } from "@storybook/polymer";
import  PfeBadge from "../dist/pfe-badge";

storiesOf("Badge", module).add(
  PfeBadge.tag,
  () => `
  <pfe-badge>
    Badge
  </pfe-badge>
  `
);
