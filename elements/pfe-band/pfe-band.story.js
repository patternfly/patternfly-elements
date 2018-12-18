import { storiesOf } from "@storybook/polymer";
// import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import PfeBand from "./pfe-band.js";

const stories = storiesOf("Band", module);
stories.addDecorator(storybookBridge.withKnobs);
stories.add("pfe-band", () => {
  var binding = {};
  let attributes = "";

  // Loop over properties defined on the class
  for (var key in PfeBand.properties) {
    // Skip prototype
    if (!PfeBand.properties.hasOwnProperty(key)) continue;

    // Convert typed props
    if (PfeBand.properties[key].type) {
      let method = "text";
      switch (PfeBand.properties[key].type) {
        case "boolean":
        case "number":
        case "object":
        case "array":
        case "date":
          method = PfeBand.properties[key].type.toLowerCase();
          break;
        default:
          method = "text";
          break;
      }

      // If the enum exists, create a dropdown object
      if (PfeBand.properties[key].enum) {
        method = "select";
        let options = {};
        PfeBand.properties[key].enum.forEach((item, idx) => {
          options[item] = item;
        });
        binding[key] = storybookBridge[method](
          PfeBand.properties[key].title,
          options,
          PfeBand.properties[key].default
        );
      } else {
        binding[key] = storybookBridge[method](
          PfeBand.properties[key].title,
          PfeBand.properties[key].default
        );
      }

      // Ensure ke-bab case
      let kebab = key.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function(
        match
      ) {
        return "-" + match.toLowerCase();
      });

      if (binding[key] && binding[key] !== "")
        attributes += ` ${kebab}="${binding[key]}"`;
    }
  }

  console.log(attributes);

  return `
<pfe-band${attributes}>
  <h1 slot="header">Lorem ipsum</h1>
  <article>
    <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <pfe-cta priority="primary" slot="footer">
      <a href="#">Learn more</a>
    </pfe-cta>
  </article>
  <pfe-card color="base" slot="aside">
    <h3 slot="header">Aside: right body bottom</h3>
    <p>Ut wisi enim ad minim veniam.</p>
    <pfe-cta slot="footer" priority="tertiary">
      <a href="#">Learn more</a>
    </pfe-cta>
  </pfe-card>
</pfe-band>
`;
});

// const stories = storiesOf("Band", module);
// stories.addDecorator(withKnobs);

// stories.add("pfe-band", () => {
//   // Pointer to theme file
//   // const themeLabel = "Theme file";
//   // const themeValue = text(themeLabel, "");

//   // Attributes
//   const colorLabel = "Background color";
//   const colorOptions = {
//     lightest: "lightest",
//     light: "light",
//     base: "base",
//     dark: "dark",
//     darkest: "darkest",
//     complement: "complement",
//     accent: "accent"
//   };
//   const colorDefault = "light";
//   const colorValue = select(colorLabel, colorOptions, colorDefault);
//   let colorAttr = colorValue != "base" ? ` pfe-color="${colorValue}"` : "";

//   const customColorLabel = "Custom background color";
//   const customColorDefault = "";
//   const customColorValue = text(customColorLabel, customColorDefault);
//   let customColorAttr = customColorValue ? ` style="--pfe-band--backgroundColor: ${customColorValue};"` : "";

//   // Slots
//   const headerLabel = "Header";
//   const headerDefault = "<h2>Foo bar</h2>";
//   const headerValue = text(headerLabel, headerDefault);

//   const bodyLabel = "Body";
//   const bodyDefault =
//     "<p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>";
//   const bodyValue = text(bodyLabel, bodyDefault);

//   const footerLabel = "Footer";
//   const footerDefault =
//     '<pfe-cta priority="primary"><a href="#">Learn more</a></pfe-cta>';
//   const footerValue = text(footerLabel, footerDefault);

//   // Attributes
//   const asidePositionXLabel = "Aside position (x)";
//   const asidePositionXOptions = {
//     left: "left",
//     right: "right"
//   };
//   const asidePositionXDefault = "right";
//   const asidePositionXValue = select(
//     asidePositionXLabel,
//     asidePositionXOptions,
//     asidePositionXDefault
//   );
//   let asidePositionAttr = ` pfe-aside="${asidePositionXValue}`;

//   const asidePositionYLabel = "Aside position (y)";
//   const asidePositionYOptions = {
//     full: "full",
//     body: "body"
//   };
//   const asidePositionYDefault = "body";
//   const asidePositionYValue = select(
//     asidePositionYLabel,
//     asidePositionYOptions,
//     asidePositionYDefault
//   );
//   asidePositionAttr += asidePositionYValue ? ` ${asidePositionYValue}` : ``;

//   const asideMobileLabel = "Aside position (mobile)";
//   const asideMobileOptions = {
//     top: "top",
//     bottom: "bottom"
//   };
//   const asideMobileDefault = "bottom";
//   const asideMobileValue = select(
//     asideMobileLabel,
//     asideMobileOptions,
//     asideMobileDefault
//   );
//   asidePositionAttr += asideMobileValue ? ` ${asideMobileValue}"` : `"`;

//   const asideLabel = "Aside";
//   const asideDefault =
//     '<pfe-card color="dark"><h3 slot="header">Lorem ipsum</h3><p>Ut wisi enim ad minim veniam.</p><pfe-cta slot="footer" priority="tertiary" on="dark"><a href="#">Learn more</a></pfe-cta></pfe-card>';
//   const asideValue = text(asideLabel, asideDefault);

//   return `
//   <section>
//     <h2>Band container</h2>
//     <pfe-band${colorAttr}${asidePositionAttr}${customColorAttr}>
//       ${headerValue ? '<div slot="header">' + headerValue + "</div>" : ""}
//       ${bodyValue ? bodyValue : ""}
//       ${footerValue ? '<div slot="footer">' + footerValue + "</div>" : ""}
//       ${asideValue ? '<div slot="aside">' + asideValue + "</div>" : ""}
//     </pfe-band>
//   </section>
//   <section>
//     <h2>Markup</h2>
//     <pre>
//     ${escapeHTML(`<pfe-band${colorAttr}${asidePositionAttr}${customColorAttr}>`)}
//       ${
//         headerValue
//           ? `${escapeHTML(`<div slot="header">${headerValue}</div>`)}`
//           : ""
//       }
//       ${bodyValue ? `${escapeHTML(bodyValue)}` : ""}
//       ${
//         footerValue
//           ? `${escapeHTML(`<div slot="footer">${footerValue}</div>`)}`
//           : ""
//       }
//       ${
//         asideValue
//           ? `${escapeHTML(`<div slot="aside">${asideValue}</div>`)}`
//           : ""
//       }
//     ${escapeHTML("</pfe-band>")}
//     </pre>
//   </section>
//   `;
// });
