import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./cp-accordion-heading";

const stories = storiesOf("Accordion", module);

stories.addDecorator(withKnobs);

stories.add("cp-accordion-heading", () => {
  const heading = text("Heading", "Heading");

  return `
    <cp-accordion-heading>
      <h1>${heading}</h1>
    </cp-accordion-heading>
  `;
});
