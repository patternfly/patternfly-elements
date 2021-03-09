import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeNavigation from "../dist/pfe-navigation";
import PfeCta from "../../pfe-cta/dist/pfe-cta";

const stories = storiesOf("Navigation", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeNavigation.tag, data.prop, data.slots);
};

const createItem = (mySlot, icon, label, tray) => {
  let mobile = "";
  if (mySlot === "language" || mySlot === "login") {
    mobile = tools.customTag({
      tag: "a",
      slot: `mobile-${mySlot}`,
      attributes: {
        href: `#url-to-${mySlot}-page`,
        "pfe-icon": icon,
        hidden: true
      },
      content: label
    });
  }

  return (
    tools.component(
      "pfe-navigation-item",
      {
        slot: mySlot,
        "pfe-icon": icon
      },
      [
        {
          tag: "h3",
          slot: "trigger",
          content: `<a href="#url-to-${mySlot}-page">${label}</a>`
        },
        {
          tag: "div",
          slot: "tray",
          attributes: {
            hidden: true
          },
          content: tray ? tray : `<div class="container"><p>${mySlot} tray content</p></div>`
        }
      ]
    ) + mobile
  );
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeNavigation.tag, () => {
  let config = {};
  const props = PfeNavigation.schemaProperties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeNavigation);

  const slots = PfeNavigation.slots;

  let slotCheck = {};
  Object.keys(slots).forEach(slot => {
    if (!slot.startsWith("mobile-") && !slot.startsWith("main")) {
      slotCheck[slot] = storybookBridge.boolean(`${slots[slot].title}`, true);
    }
  });

  // Trigger the auto generation of the knobs for slots
  // config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [];

  let skip = slotCheck.skip
    ? tools.customTag({
        tag: "div",
        slot: "skip",
        content: tools.customTag({
          tag: "a",
          attributes: {
            href: "#rh-main-content"
          },
          content: "Skip to content"
        })
      })
    : "";

  let logo = slotCheck.logo
    ? tools.customTag({
        tag: "div",
        slot: "logo",
        content: tools.customTag({
          tag: "a",
          attributes: {
            href: "#"
          },
          content: `<img src="https://via.placeholder.com/150x50.png" title="Company logo"/>`
        })
      })
    : "";

  let search = slotCheck.search
    ? createItem(
        "search",
        "web-search",
        "Search",
        `<div class="pfe-navigation-item__tray--container">
  <form>
    <input type="text" name="search" value="" placeholder="Enter your search term"
      style="height: 30px; width: 60%; margin-right: 10px;">
    <pfe-cta priority="primary"><a href="#">Search</a></pfe-cta>
  </form>
</div>`
      ) +
      tools.customTag({
        tag: "form",
        slot: "mobile-search",
        attributes: {
          hidden: true
        },
        content: `<input type="text" name="search" value="" placeholder="Enter your search term" style="height: 30px; width: 60%; margin-right: 10px;">
        <pfe-cta priority="primary"><a href="#">Search</a></pfe-cta>`
      })
    : "";

  let main = `<pfe-navigation-main role="navigation" aria-label="Main">
    <ul>
      <li>
        <pfe-navigation-item>
          <h3 slot="trigger"><a href="#">Products</a></h3>
          <div slot="tray" hidden>
            <div class="pfe-navigation-item__tray--container">
              <div class="pfe-navigation-grid">
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">Widget</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Widget #1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Widget #2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Widget #3</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Widget #4</a></li>
                    </ul>
                  </div>
                </div>
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">Thing-a-majig</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Thing-a-majig #1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Thing-a-majig #2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Thing-a-majig #3</a></li>
                    </ul>
                  </div>
                </div>
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">Doohicky</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Doohicky #1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Doohicky #2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Doohicky #3</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="pfe-navigation--footer">
                <div class="pfe-navigation--column">
                  <pfe-cta priority="primary"><a href="#">View all widgets</a></pfe-cta>
                </div>
                <div class="pfe-navigation--column">
                  <pfe-cta><a href="#">Explore our thing-a-magigs</a></pfe-cta>
                </div>
                <div class="pfe-navigation--column">
                  <pfe-cta><a href="#">Buy things online</a></pfe-cta>
                </div>
              </div>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h3><a href="#">Direct link example</a></h3>
        </pfe-navigation-item>
      </li>
    </ul>
  </pfe-navigation-main>
</nav>`;

  let language = slotCheck.language ? createItem("language", "web-globe", "English") : "";

  let login = slotCheck.login ? createItem("login", "web-user", "Log in") : "";

  let siteSwitcher = slotCheck["site-switcher"] ? createItem("site-switcher", "web-grid-3x3", "Websites") : "";

  config.slots = [
    {
      content: skip + logo + search + main + language + login + siteSwitcher
    }
  ];

  const render =
    `<link rel="stylesheet" type="text/css" href="/pfe-navigation/dist/pfe-navigation--lightdom.css"></link>` +
    template(config);
  return tools.preview(render);
});
