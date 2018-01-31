import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./cp-card";

const stories = storiesOf("Card", module);

stories.addDecorator(withKnobs);

stories.add("Default", () => {
  const heading = text("Heading", "Cp Card Heading");
  const bodyText = text(
    "Body",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const theme = select(
    "Theme",
    { "": "Default", light: "Light", dark: "Dark" },
    ""
  );

  return `
    <cp-card data-theme="${theme}">
      <cp-card-heading>${heading}</cp-card-heading>
      ${bodyText}
    </cp-card>
  `;
});

stories.add(
  "Dark Theme",
  () => `
  <cp-card data-theme="dark">
    <h2>This is a card header</h2>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    <h3>Subheading</h3>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </cp-card>
`
);

stories.add(
  "Light Theme",
  () => `
  <cp-card data-theme="light">
    <h3>Header 2</h3>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </cp-card>
`
);

stories.add(
  "White Theme with a Dark Border",
  () => `
  <cp-card data-theme="white" data-border="dark">
    <h3>Another Card</h3>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </cp-card>
`
);

stories.add(
  "Alternate Heading Level",
  () => `
  <cp-card>
    <cp-card-heading data-level="2">Cp Card Heading</cp-card-heading>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </cp-card>
`
);
