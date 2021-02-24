// import { storiesOf } from "@storybook/polymer";
// import * as storybookBridge from "@storybook/addon-knobs";
// import * as tools from "../../../.storybook/utils.js";

// import PfeNavigationAccount from "../dist/pfe-navigation-account";

// const stories = storiesOf("Navigation account", module);

// // Define the template to be used
// const template = (data = {}) => {
//   return tools.component(PfeNavigationAccount.tag, data.prop, data.slots);
// };

// // Use these to get dynamically generated content
// // const defaultHeading = tools.autoHeading(true);
// const defaultContent = tools.autoContent(1, 2);

// stories.addDecorator(storybookBridge.withKnobs);

// stories.add(PfeNavigationAccount.tag, () => {
//   let config = {};
//   const props = PfeNavigationAccount.properties;

//   //-- Set any custom defaults just for storybook here

//   // Trigger the auto generation of the knobs for attributes
//   config.prop = tools.autoPropKnobs(PfeNavigationAccount);

//   const slots = PfeNavigationAccount.slots;

//   //-- Set any custom content for the slots here

//   // Trigger the auto generation of the knobs for slots
//   config.has = tools.autoContentKnobs(slots, bridge);

//   //-- Build your slots here using config.has[""] to get user content
//   // prettier-ignore
//   config.slots = [{
//     content: defaultContent
//   }];

//   //-- Reset default values show they don't render in the markup
//   // if (config.prop["login-link"] === "default") {
//   //   config.prop["login-link"] = "";
//   // }

//   const rendered = template(config);
//   return tools.preview(rendered);
// });
