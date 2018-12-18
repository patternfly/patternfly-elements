import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./pfe-band";

const stories = storiesOf("Band", module);
stories.addDecorator(withKnobs);

stories.add("pfe-band", () => {
  // Pointer to theme file
  // const themeLabel = "Theme file";
  // const themeValue = text(themeLabel, "");

  // Attributes
  const colorLabel = "Color";
  const colorOptions = {
    lightest: "lightest",
    light: "light",
    base: "base",
    dark: "dark",
    darkest: "darkest",
    complement: "complement",
    accent: "accent"
  };
  const colorDefault = "light";
  const colorValue = select(colorLabel, colorOptions, colorDefault);
  let colorAttr = colorValue != "base" ? ` pfe-color="${colorValue}"` : "";

  // Slots
  const headerLabel = "Header";
  const headerDefault = "<h2>Foo bar</h2>";
  const headerValue = text(headerLabel, headerDefault);

  const bodyLabel = "Body";
  const bodyDefault =
    "<p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>";
  const bodyValue = text(bodyLabel, bodyDefault);

  const footerLabel = "Footer";
  const footerDefault =
    '<pfe-cta priority="primary"><a href="#">Learn more</a></pfe-cta>';
  const footerValue = text(footerLabel, footerDefault);

  // Attributes
  const asidePositionXLabel = "Aside position (x)";
  const asidePositionXOptions = {
    left: "left",
    right: "right"
  };
  const asidePositionXDefault = "right";
  const asidePositionXValue = select(
    asidePositionXLabel,
    asidePositionXOptions,
    asidePositionXDefault
  );
  let asidePositionAttr = ` pfe-aside="${asidePositionXValue}`;

  const asidePositionYLabel = "Aside position (y)";
  const asidePositionYOptions = {
    full: "full",
    body: "body"
  };
  const asidePositionYDefault = "body";
  const asidePositionYValue = select(
    asidePositionYLabel,
    asidePositionYOptions,
    asidePositionYDefault
  );
  asidePositionAttr += asidePositionYValue ? ` ${asidePositionYValue}` : ``;

  const asideMobileLabel = "Aside position (mobile)";
  const asideMobileOptions = {
    top: "top",
    bottom: "bottom"
  };
  const asideMobileDefault = "bottom";
  const asideMobileValue = select(
    asideMobileLabel,
    asideMobileOptions,
    asideMobileDefault
  );
  asidePositionAttr += asideMobileValue ? ` ${asideMobileValue}"` : `"`;

  const asideLabel = "Aside";
  const asideDefault =
    '<pfe-card color="dark"><h3 slot="header">Lorem ipsum</h3><p>Ut wisi enim ad minim veniam.</p><pfe-cta slot="footer" priority="tertiary" on="dark"><a href="#">Learn more</a></pfe-cta></pfe-card>';
  const asideValue = text(asideLabel, asideDefault);

  return `
  <section>
    <h2>Band container</h2>
    <pfe-band${colorAttr}${asidePositionAttr}>
      ${headerValue ? '<div slot="header">' + headerValue + "</div>" : ""}
      ${bodyValue ? bodyValue : ""}
      ${footerValue ? '<div slot="footer">' + footerValue + "</div>" : ""}
      ${asideValue ? '<div slot="aside">' + asideValue + "</div>" : ""}
    </pfe-band>
  </section>
  <section>
    <h2>Markup</h2>
    <pre>
    ${escapeHTML(`<pfe-band${colorAttr}${asidePositionAttr}>`)}
      ${
        headerValue
          ? `${escapeHTML(`<div slot="header">${headerValue}</div>`)}`
          : ""
      }
      ${bodyValue ? `${escapeHTML(bodyValue)}` : ""}
      ${
        footerValue
          ? `${escapeHTML(`<div slot="footer">${footerValue}</div>`)}`
          : ""
      }
      ${
        asideValue
          ? `${escapeHTML(`<div slot="aside">${asideValue}</div>`)}`
          : ""
      }
    ${escapeHTML("</pfe-band>")}
    </pre>
  </section>
  `;
});
