/*
 * Copyright 2019 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeTabs from "../pfe-tabs.js";

// import cpTheme from "../../../themes/cp-theme/cp-theme.js";

const stories = storiesOf("Tabs", module);

const defaultTab = tools.autoHeading(true);
const defaultPanel =
  tools.customTag({
    tag: "h3",
    content: tools.autoHeading()
  }) +
  tools.autoContent(3, 3) +
  tools.component("pfe-cta", {}, [
    {
      content: "<a href='#'>Learn more</a>"
    }
  ]);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeTabs.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeTabs.tag, () => {
  let config = {};
  // const props = PfeTabs.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    vertical: {
      title: "Vertical orientation",
      type: "boolean",
      default: false
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // const slots = PfeTabs.slots;

  //-- Add content to light DOM
  config.slots = [];

  // Let the user determine number of tabs
  let tabCount = storybookBridge.number("Count", 3, {
    min: 1,
    max: 10
  });

  // Let the user customize the first header + panel set
  let tab = storybookBridge.text("Tab", defaultTab, "tabset");
  let panel = storybookBridge.text("Panel", defaultPanel, "tabset");

  config.slots.push({
    content:
      tools.component(
        "pfe-tab",
        {
          role: "heading",
          slot: "tab"
        },
        [
          {
            content: tab
          }
        ]
      ) +
      tools.component(
        "pfe-tab-panel",
        {
          role: "region",
          slot: "panel"
        },
        [
          {
            content: panel
          }
        ]
      )
  });

  // Use dynamic content for the rest
  for (let i = 1; i < tabCount; i++) {
    config.slots.push({
      content:
        tools.component(
          "pfe-tab",
          {
            role: "heading",
            slot: "tab"
          },
          [
            {
              content: tools.autoHeading(true)
            }
          ]
        ) +
        tools.component(
          "pfe-tab-panel",
          {
            role: "region",
            slot: "panel"
          },
          [
            {
              content:
                tools.customTag({
                  tag: "h3",
                  content: tools.autoHeading()
                }) +
                tools.autoContent(3, 3) +
                tools.component("pfe-cta", {}, [
                  {
                    content: "<a href='#'>Learn more</a>"
                  }
                ])
            }
          ]
        )
    });
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
