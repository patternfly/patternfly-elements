import { storiesOf } from "@storybook/polymer";
import { withKnobs, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";
import "./rh-tabs";

const stories = storiesOf("Tabs", module);
stories.addDecorator(withKnobs);

stories.add("rh-tabs", () => {
  const orientation = select(
    "Orientation",
    {
      "": "Horizontal",
      vertical: "Vertical"
    },
    ""
  );

  const variant = select("Variant", {
    "": "default",
    "rh-variant=primary": "Primary",
    "rh-variant=secondary": "Secondary"
  });

  return `
      <section>
        <rh-tabs ${orientation} ${variant} >
          <rh-tab role="heading" slot="tab">Super long tab here</rh-tab>
          <rh-tab-panel role="region" slot="panel">
            <h2>Content 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </rh-tab-panel>
          <rh-tab role="heading" slot="tab">Tab 2</rh-tab>
          <rh-tab-panel role="region" slot="panel">
            <h2>Content 2</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </rh-tab-panel>
          <rh-tab role="heading" slot="tab">Tab 3</rh-tab>
          <rh-tab-panel role="region" slot="panel">
            <h2>Content 3</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </rh-tab-panel>
        </rh-tabs>
      </section>
      <section>
        <h2>Markup</h2>
        <pre>
        ${escapeHTML(`<rh-tabs>`)}
            ${escapeHTML(
              `<rh-tab role="heading" slot="tab">`
            )}First tab${escapeHTML(`</rh-tab>`)}
            ${escapeHTML(`<rh-tab-panel role="region" slot="panel">`)}
                ${escapeHTML(
                  `<h2>Header</h2><p>Aenean lacinia bibendum nulla sed consectetur.</p>`
                )}
            ${escapeHTML(`</rh-tab-panel>`)}
            ${escapeHTML(
              `<rh-tab role="heading" slot="tab">`
            )}Second tab${escapeHTML(`</rh-tab>`)}
            ${escapeHTML(`<rh-tab-panel role="region" slot="panel">`)}
                ${escapeHTML(
                  `<h2>Second header</h2><p>Aenean lacinia bibendum nulla sed consectetur.</p>`
                )}
            ${escapeHTML(`</rh-tab-panel>`)}
        ${escapeHTML(`</rh-tabs>`)}
        </pre>
      </section>
    `;
});
