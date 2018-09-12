import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./rh-cta";

const stories = storiesOf("Call To Action", module);
stories.addDecorator(withKnobs);

stories.add("rh-cta", () => {
  const priorityType = "Priority";
  const colorType = "Color";

  const priorityOptions = {
    default: "default",
    primary: "primary",
    secondary: "secondary"
  };

  const colorOptions = {
    default: "default",
    base: "base",
    complement: "complement",
    accent: "accent"
  };

  const priorityDefault = "default";
  const colorDefault = "default";

  const value = select(priorityType, priorityOptions, priorityDefault);
  const colorValue = select(colorType, colorOptions, colorDefault);

  let valueAttr = value != "default" ? ` priority="${value}"` : "";
  let colorAttr = colorValue != "default" ? ` color="${colorValue}"` : "";

  return `
  <p>
    <rh-cta${valueAttr}${colorAttr}><a href="#">Become a Member</a></rh-cta>
  </p>

  `;
});
