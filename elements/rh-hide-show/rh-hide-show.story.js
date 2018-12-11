import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./rh-hide-show";

const stories = storiesOf("Hide-show", module);
stories.addDecorator(withKnobs);

stories.add("rh-hide-show", () => {
  // Pointer to theme file
  // const themeLabel = "Theme file";
  // const themeValue = text(themeLabel, "");

  // Attributes
  // const colorLabel = "Foo";
  // const colorOptions = {
  //   lightest: "lightest",
  //   light: "light",
  //   base: "base",
  //   dark: "dark",
  //   darkest: "darkest",
  //   complement: "complement",
  //   accent: "accent"
  // };
  // const colorDefault = "light";
  // const colorValue = select(colorLabel, colorOptions, colorDefault);
  // let colorAttr = colorValue != "base" ? ` color="${colorValue}"` : "";

  // Slots
  // const headerLabel = "Header";
  // const headerDefault = "<h2>Foo bar</h2>";
  // const headerValue = text(headerLabel, headerDefault);

  return `
  <section>
    <h2>Your Element</h2>
    <rh-hide-show>
    </rh-hide-show>
  </section>
  <section>
    <h2>Markup</h2>
    <pre>
    ${escapeHTML(`<rh-hide-show>`)}
    ${escapeHTML("</rh-hide-show>")}
    </pre>
  </section>
  `;
});
