import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./cp-accordion-heading";

storiesOf("Accordion", module).add(
  "cp-accordion-heading",
  () => `
    <cp-accordion-heading>
      <h1>Heading 1</h1>
    </cp-accordion-heading>
  `
);
