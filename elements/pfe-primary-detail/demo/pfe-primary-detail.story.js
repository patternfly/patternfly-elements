// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! This is a placeholder
// !!
// !! Having a hard time understanding how to get this setup,
// !! leaving it with a working sample that does not respond to
// !! story book configuration.
// !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfePrimaryDetail from "../dist/pfe-primary-detail";

const stories = storiesOf("Primary detail", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfePrimaryDetail.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
const defaultHeading = tools.autoHeading(true);
// const defaultContent = tools.autoContent(1, 2);

let list = [];
for (let i = 1; i <= 6; i++) {
  list.push(tools.autoHeading(true));
}

stories.addDecorator(bridge.withKnobs);

stories.add(PfePrimaryDetail.tag, () => {
  let config = {};
  // const props = PfePrimaryDetail.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  // config.prop = tools.autoPropKnobs(PfePrimaryDetail);

  // config.slots = PfePrimaryDetail.slots;

  config.slots = [
    {
      slot: "details-nav",
      tag: "h3",
      content: defaultHeading
    },
    {
      slot: "details",
      tag: "ul",
      content: list
        .map(content =>
          tools.customTag({
            tag: "li",
            attributes: {
              href: "#nowhere"
            },
            content: content
          })
        )
        .join("")
    },
    {
      slot: "details-nav",
      tag: "h3",
      content: defaultHeading
    },
    {
      slot: "details",
      tag: "ul",
      content: list
        .map(content =>
          tools.customTag({
            tag: "li",
            attributes: {
              href: "#nowhere"
            },
            content: content
          })
        )
        .join("")
    },
    {
      slot: "details-nav",
      tag: "h3",
      content: defaultHeading
    },
    {
      slot: "details",
      tag: "ul",
      content: list
        .map(content =>
          tools.customTag({
            tag: "li",
            attributes: {
              href: "#nowhere"
            },
            content: content
          })
        )
        .join("")
    },
    {
      slot: "details-nav",
      tag: "h3",
      content: defaultHeading
    },
    {
      slot: "details",
      tag: "ul",
      content: list
        .map(content =>
          tools.customTag({
            tag: "li",
            attributes: {
              href: "#nowhere"
            },
            content: content
          })
        )
        .join("")
    },
    {
      slot: "details-nav--footer",
      content: tools.component("pfe-cta", { priority: "primary" }, [
        {
          content: "<a href='#'>All products</a>"
        }
      ])
    }
  ];

  // Trigger the auto generation of the knobs for slots
  // config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore

  //-- Reset default values show they don't render in the markup
  // if (config.prop[""] === "default") {
  //   config.prop[""] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);

  // return `
  //     <pfe-primary-detail>
  //       <h3 slot="details-nav">Infrastructure and Management</h3>
  //       <ul slot="details">
  //         <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
  //         <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //       </ul>

  //       <h3 slot="details-nav">Cloud Computing</h3>
  //       <ul slot="details">
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //         <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
  //         <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //         <li><a href="#nowhere">Lorum ipsum dolor sit amet</a></li>
  //         <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //       </ul>

  //       <h3 slot="details-nav">Storage</h3>
  //       <ul slot="details">
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //       </ul>

  //       <h3 slot="details-nav">Runtimes</h3>
  //       <ul slot="details">
  //         <li><a href="#nowhere">Pellentesque fermentum dolor</a></li>
  //         <li><a href="#nowhere">Morbi in sem quis dui placerat ornare</a></li>
  //         <li><a href="#nowhere">Aliquam tincidunt mauris eu risus</a></li>
  //         <li><a href="#nowhere">Praesent dapibus, neque id cursus faucibus</a></li>
  //       </ul>

  //       <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
  //         <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
  //       </div>
  //     </pfe-primary-detail>
  //   `;
});
