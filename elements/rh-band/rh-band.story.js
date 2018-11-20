import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./rh-band";

const stories = storiesOf("Band", module);
stories.addDecorator(withKnobs);

stories.add("rh-band", () => {
  // Pointer to theme file
  const themeLabel = "Theme file";
  const themeValue = text(themeLabel, "");

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
  let colorAttr = colorValue != "base" ? ` color="${colorValue}"` : "";

  // Slots
  const titleLabel = "Title";
  const titleDefault = "Foo bar";
  const titleValue = text(titleLabel, titleDefault);

  const headingLabel = "Heading";
  const headingDefault = "Lorem ipsum dolor sit amet";
  const headingValue = text(headingLabel, headingDefault);

  const summaryLabel = "Summary";
  const summaryDefault =
    "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.";
  const summaryValue = text(summaryLabel, summaryDefault);

  const bodyLabel = "Body";
  const bodyDefault =
    "<p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>";
  const bodyValue = text(bodyLabel, bodyDefault);

  const footerLabel = "Footer";
  const footerDefault =
    '<rh-cta priority="primary"><a href="#">Learn more</a></rh-cta>';
  const footerValue = text(footerLabel, footerDefault);

  const asideLabel = "Aside";
  const asideDefault =
    '<rh-card color="dark"><h3>Lorem ipsum</h3><p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p><rh-cta priority="tertiary" on="dark"><a href="#">Learn more</a></rh-cta></rh-card>';
  const asideValue = text(asideLabel, asideDefault);

  return `
  <section>
    <h2>Your RH Element</h2>
    <rh-band${colorAttr}>
        ${titleValue ? '<h2 slot="header_title">' + titleValue + "</h2>" : ""}
        ${
          headingValue
            ? '<h3 slot="header_heading">' + headingValue + "</h3>"
            : ""
        }
        ${
          summaryValue
            ? '<p slot="header_summary">' + summaryValue + "</p>"
            : ""
        }
      ${bodyValue ? bodyValue : ""}
      ${footerValue ? '<div slot="footer">' + footerValue + "</div>" : ""}
      ${asideValue ? '<div slot="aside">' + asideValue + "</div>" : ""}
    </rh-band>
  </section>
  <section>
    <h2>Markup</h2>
    <pre>
    &lt;rh-band${colorAttr}&gt;
        ${
          titleValue
            ? '&lt;h2 slot="header_title"&gt;' +
              escapeHTML(titleValue) +
              "&lt;/h2&gt;"
            : ""
        }
        ${
          headingValue
            ? '&lt;h3 slot="header_heading"&gt;' +
              escapeHTML(headingValue) +
              "&lt;/h3&gt;"
            : ""
        }
        ${
          summaryValue
            ? '&lt;p slot="header_summary"&gt;' +
              escapeHTML(summaryValue) +
              "&lt;/p&gt;"
            : ""
        }
      ${
        bodyValue
          ? "&lt;div&gt;\n\t" + escapeHTML(bodyValue) + "\n      &lt;/div&gt;"
          : ""
      }
      ${
        footerValue
          ? '&lt;div slot="footer"&gt;\n\t' +
            escapeHTML(footerValue) +
            "\n      &lt;/div&gt;"
          : ""
      }
      ${
        asideValue
          ? '&lt;div slot="aside"&gt;\n\t' +
            escapeHTML(asideValue) +
            "\n      &lt;/div&gt;"
          : ""
      }
    &lt;/rh-band&gt;
    </pre>
  </section>
  `;
});
