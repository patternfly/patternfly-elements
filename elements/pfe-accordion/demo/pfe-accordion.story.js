import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeAccordion from "../dist/pfe-accordion";

const stories = storiesOf(PfeAccordion.meta.title, module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeAccordion.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

// Log events
Object.values(PfeAccordion.events).forEach(event => {
  stories.addDecorator(withActions(event));
})

stories.add(PfeAccordion.tag, () => {
  tools.context();

  let config = {};
  let customDisclosure;
  // let headings = [];
  // let panels = [];

  config.prop = tools.autoPropKnobs(PfeAccordion, {
    role: {
      hidden: true
    },
    disclosure: {
      hidden: true
    },
    history: {
      hidden: true
    }
  });

  //-- Add content to light DOM
  // const slots = PfeAccordion.slots;
  config.slots = [];

  // Let the user determine number of accordions
  let accordionCount = storybookBridge.number("Count", 5, {
    min: 1,
    max: 10
  });

  if (accordionCount === 1) {
    customDisclosure = storybookBridge.boolean("Opt-out of disclosure", false);
  }

  // Ask user if they want to add any custom content
  // const customContent = storybookBridge.boolean("Use custom content?", false, "Content");

  // Let the user customize the header + panel set
  // if (customContent) {
  //   for (let i = 0; i < accordionCount; i++) {
  //     headings[i] = storybookBridge.text(`Heading ${i + 1}`, "", "accordion-set");
  //     panels[i] = storybookBridge.text(`Panel ${i + 1}`, "", "accordion-set");
  //   }
  // }

  // Use dynamic content for the rest
  for (let i = 0; i < accordionCount; i++) {
    config.slots.push({
      content:
        tools.component("pfe-accordion-header", {}, [
          {
            content: tools.customTag({
              tag: "h2",
              content: tools.autoHeading() // customContent ? headings[i] : tools.autoHeading()
            })
          }
        ]) +
        tools.component("pfe-accordion-panel", {}, [
          {
            content: tools.autoContent(2, 3) // customContent ? panels[i] : tools.autoContent(5, 3)
          }
        ])
    });
  }

  if (customDisclosure === true) {
    config.prop.disclosure = "false";
  }

  const render = template(config);
  return (
    tools.demo(render) +
    `
  <br><p><sup>*</sup>Note: the <code>history</code> attribute does not work in Storybook due to encapsulation of the components.</p>
  ` +
    tools.code(render)
  );
});
