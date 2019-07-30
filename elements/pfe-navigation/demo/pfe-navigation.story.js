import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeNavigation from "../pfe-navigation";
import PfeCta from "../pfe-cta";
import PfeCard from "../pfe-card";

const stories = storiesOf("Navigation", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeNavigation.tag, data.prop, data.slots);
};

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

  let search = slotCheck.search ? `<pfe-navigation-item slot="search" pfe-icon="search">
  <h3 slot="trigger"><a href="#url-to-search-page">Search</a></h3>
  <div slot="tray" hidden>
    <div class="container">
      <form>
        <input type="text" name="search" value="" placeholder="Enter your search term" style="height: 30px; width: 60%; margin-right: 10px;">
        <pfe-cta priority="primary"><a href="#">Search</a></pfe-cta>
      </form>
    </div>
  </div>
</pfe-navigation-item>` : "";

  let main = `<nav slot="main" aria-label="Main">
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

  let language = slotCheck.language ? `<pfe-navigation-item slot="language" pfe-icon="globe">
  <h3 slot="trigger"><a href="/url-to-language-page">English</a></h3>
  <div slot="tray" hidden>
    <div class="container">
      <p>Language switcher content</p>
    </div>
  </div>
</pfe-navigation-item>`: "";

  let login = slotCheck.login ? `<pfe-navigation-item slot="login" pfe-icon="user">
  <h3 slot="trigger"><a href="/login">Log in</a></h3>
  <div slot="tray" hidden>
    <div class="container">
      <p>Log in content</p>
    </div>
  </div>
</pfe-navigation-item>` : "";

  let siteSwitcher = slotCheck["site-switcher"] ? `<pfe-navigation-item slot="site-switcher" pfe-icon="bento">
  <h3 slot="trigger"><a href="/url-to-rh-websites-page">Websites</a></h3>
  <div slot="tray" hidden>
    <div class="container">
      <p>Site switcher content</p>
    </div>
  </div>
</pfe-navigation-item>` : "";

  let mobileLogin = slotCheck.login ? `<a href="/login" slot="mobile-login" pfe-icon="user">Login/Register</a>` : "";
  let mobileLanguage = slotCheck.language ? `<a href="/url-to-language-page" slot="mobile-language" pfe-icon="user">English</a>` : "";

  config.slots = [{
    content: skip + logo + search + main + language + login + siteSwitcher + mobileLogin + mobileLanguage
  }];

  const render = template(config);
  return tools.preview(render);
});
