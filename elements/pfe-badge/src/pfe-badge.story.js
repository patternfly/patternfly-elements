import { storiesOf } from "@storybook/polymer";
import  PfeBadge from "../pfe-badge";

storiesOf("Badge", module).add(
  PfeBadge.tag,
  () => `
  <pfe-badge>
    Badge
  </pfe-badge>
  `
);
