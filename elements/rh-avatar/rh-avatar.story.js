import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./rh-avatar";

const stories = storiesOf("Avatar", module);
stories.addDecorator(withKnobs);

stories.add("rh-avatar", () => {
  const value = text("Value", "Apple Cinnamon");
  return `
  <rh-avatar shape="square" value="${value}"></rh-avatar>
  <rh-avatar shape="triangle" value="${value}"></rh-avatar>
  `;
});
