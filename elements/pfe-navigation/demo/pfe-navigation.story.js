import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeNavigation from "../pfe-navigation";
import PfeCta from "../../pfe-cta/pfe-cta";
import PfeCard from "../../pfe-card/pfe-card";

const stories = storiesOf("Navigation", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeNavigation.tag, data.prop, data.slots);
};

const createItem = (mySlot, icon, label, tray) => {
  let mobile = "";
  if(mySlot === "language" || mySlot === "login") {
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

  return tools.component("pfe-navigation-item", {
    "slot": mySlot,
    "pfe-icon": icon
  }, [{
    tag: "h3",
    slot: "trigger",
    content: `<a href="#url-to-${mySlot}-page">${label}</a>`
  }, {
    tag: "div",
    slot: "tray",
    attributes: {
      hidden: true
    },
    content: tray ? tray : `<div class="container"><p>${mySlot} tray content</p></div>`
  }]) + mobile;
}

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeNavigation.tag, () => {

  let config = {};
  const props = PfeNavigation.properties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const slots = PfeNavigation.slots;

  let slotCheck = {};
  Object.keys(slots).forEach(slot => {
    if(!slot.startsWith("mobile-") && !slot.startsWith("main")) {
      slotCheck[slot] = storybookBridge.boolean(`${slots[slot].title}`, true);
    }
  });

  // Trigger the auto generation of the knobs for slots
  // config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [];

  let skip = slotCheck.skip ? tools.customTag({
    tag: "div",
    slot: "skip",
    content: tools.customTag({
      tag: "a",
      attributes: {
        href: "#rh-main-content"
      },
      content: "Skip to content"
    })
  }) : "";

  let logo = slotCheck.logo ? tools.customTag({
    tag: "h2",
    slot: "logo",
    content: tools.customTag({
      tag: "a",
      attributes: {
        href: "#"
      },
      content: `<img class="logo" src="https://via.placeholder.com/150x50.png" class="screen" title="A logo"/>`
    })
  }) : "";


  let search = slotCheck.search ? createItem("search", "search", "Search", `<div class="container">
    <form pfe-navigation--mobile-search>
      <input type="text" name="search" value="" placeholder="Enter your search term" style="height: 30px; width: 60%; margin-right: 10px;">
      <pfe-cta priority="primary"><a href="#">Search</a></pfe-cta>
    </form>
  </div>`) : "";

  let main = `<nav aria-label="Main">
  <pfe-navigation-main>
    <ul>
      <li>
        <pfe-navigation-item>
          <h2 slot="trigger"><a href="#">Products</a></h2>
          <div slot="tray" hidden>
              <div class="container test-overflow">
                <div columns="3">
                  <div stacked>
                    <div class="link-list">
                      <h3 class="link-list--header">
                        <a href="#">Platforms</a>
                      </h3>
                      <ul class="link-list--list">
                        <li><a href="#">Red Hat Enterprise Linux</a></li>
                        <li><a href="#">Red Hat JBoss Enterprise Application Platform</a></li>
                        <li><a href="#">Red Hat OpenShift</a></li>
                        <li><a href="#">Red Hat OpenStack Platform</a></li>
                        <li><a href="#">Red Hat Virtualization</a></li>
                      </ul>
                    </div>
                    <pfe-cta><a href="#">Buy products online</a></pfe-cta>
                  </div>
                  <div class="link-list">
                    <h3 class="link-list--header">
                      <a href="#">Integration</a>
                    </h3>
                    <ul class="link-list--list">
                      <li><a href="#">Red Hat 3scale API Management</a></li>
                      <li><a href="#">Red Hat AMQ</a></li>
                      <li><a href="#">Red Hat Fuse</a></li>
                      <li><a href="#">Red Hat Fuse Online</a></li>
                    </ul>
                  </div>
                  <div class="link-list">
                    <h3 class="link-list--header">
                      <a href="#">Cloud computing</a>
                    </h3>
                    <ul class="link-list--list">
                      <li><a href="#" data-analytics="foo">Red Hat Cloud Infrastructure</a></li>
                      <li><a href="#">Red Hat Cloud Suite</a></li>
                      <li><a href="#">Red Hat CloudForms</a></li>
                      <li><a href="#">Red Hat Hyperconverged Infrastructure</a></li>
                      <li><a href="#">Red Hat OpenShift</a></li>
                      <li><a href="#">Red Hat OpenStack Platform</a></li>
                      <li><a href="#">Red Hat Quay</a></li>
                  </ul>
                </div>
              </div>
              <pfe-card style="height: 300px;">
                <h2>Promotional content</h2>
              </pfe-card>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item aria-current="location">
          <h2 slot="trigger"><a href="#">Solutions</a></h2>
          <div slot="tray" hidden>
            <div class="container">
              <p>Solutions tray content</p>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h2 slot="trigger"><a href="/support">Services &amp; support</a></h2>
          <div slot="tray" hidden>
            <div class="container">
              <p>Services tray content</p>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h2 slot="trigger"><a href="/resources">Resources</a></h2>
          <div slot="tray" hidden>
            <div class="container">
              <p>Resources tray content</p>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h2 slot="trigger"><a href="/en/about">Red Hat &amp; open source</a></h2>
          <div slot="tray" hidden>
            <div class="container">
              <p>Open source tray content</p>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
    </ul>
  </pfe-navigation-main>
</nav>`;

  let language = slotCheck.language ? createItem("language", "globe", "English") : "";

  let login = slotCheck.login ? createItem("login", "user", "Log in") : "";

  let siteSwitcher = slotCheck["site-switcher"] ? createItem("site-switcher", "bento", "Websites") : "";

  config.slots = [{
    content: skip + logo + search + main + language + login + siteSwitcher
  }];

  const render = `<link rel="stylesheet" type="text/css" href="/pfe-navigation/pfe-navigation--lightdom.css"></link>` +
    template(config);
  const warningMessage = `<p><strong>Please note</strong> that due to the experimental nature of this preview tool and the complexity of this component, we cannot show a preview of the rendered view at this time.  Please check out the repository and run the demo to preview the component.</p><p>In the meantime, please enjoy the markup preview below which can help you configure your markup correctly.</p>`;
  return warningMessage + tools.code(render);
});
