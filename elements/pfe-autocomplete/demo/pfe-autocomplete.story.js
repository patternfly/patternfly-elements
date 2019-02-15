import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeAutocomplete from "../pfe-autocomplete";

const stories = storiesOf("Autocomplete", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeAutocomplete.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeAutocomplete.tag, () => {
    let config = {};

    const props = {
        "is-disabled": {
            title: "Disabled",
            type: "boolean",
            default: false
        },
        "init-value": {
            title: "Initial value",
            type: "string"
        }
    };

    // Trigger the auto generation of the knobs for attributes
    config.prop = tools.autoPropKnobs(props, storybookBridge);

    config.slots = [{
        content: tools.customTag({
            tag: "input",
            attributes: {
                placeholder: "Enter your search term"
            }
        })
    }];

    const render = template(config);
    const output = tools.preview(render);
    return output;
});
