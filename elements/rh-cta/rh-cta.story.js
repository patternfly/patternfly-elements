import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./rh-cta";

const stories = storiesOf("Call To Action", module);
stories.addDecorator(withKnobs);

stories.add("rh-cta", () => {
  const type = "Type";
  const options = {
    solid: "Solid",
    outlined: "Outlined",
    ghost: "Ghost"
  };

  const groupId = "number1";
  const defaultValue = "Solid";

  const value = select(type, options, defaultValue);

  return `
  <p>
    <rh-cta><a href="#">Become a Member</a></rh-cta>
  </p>
  <p>
    <rh-cta class="rh--${value}"><a href="#">Become a Member</a></rh-cta>
  </p>

  `;
});
