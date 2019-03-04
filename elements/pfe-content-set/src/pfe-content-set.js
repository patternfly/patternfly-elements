import PFElement from "../pfelement/pfelement.js";
import PfeAccordion from "../pfe-accordion/pfe-accordion.js";
import PfeTabs from "../pfe-tabs/pfe-tabs.js";

class PfeContentSet extends PFElement {
  static get tag() {
    return "pfe-content-set";
  }

  get templateUrl() {
    return "pfe-content-set.html";
  }

  get styleUrl() {
    return "pfe-content-set.scss";
  }

  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
  }

  get orientation() {
    return this.hasAttribute("vertical") ? "vertical" : null;
  }

  get settings() {
    let settings = {};
    const variant = this.getAttribute("pfe-variant");

    if (variant === "primary") {
      settings.variant = variant;
      settings.color = "striped";
    } else if (variant === "secondary") {
      settings.variant = variant;
      settings.color = "dark";
    } else {
      settings.color = "lightest";
    }

    return settings;
  }

  constructor() {
    super(PfeContentSet, { delayRender: true });
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.isTab) {
      this._buildTabs();
    } else {
      this._buildAccordion();
    }

    this.render();
  }

  _buildAccordion() {
    const fragment = document.createDocumentFragment();
    const accordion = document.createElement(PfeAccordion.tag);

    [...this.children].forEach(child => {
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-accordion-header");
        header.appendChild(child);
        accordion.appendChild(header);
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-accordion-panel");
        panel.appendChild(child);
        accordion.appendChild(panel);
      }
    });

    fragment.appendChild(accordion);

    if (this.settings.color) {
      accordion.setAttribute("color", this.settings.color);
    }

    this.appendChild(fragment);
  }

  _buildTabs() {
    const fragment = document.createDocumentFragment();
    const tabs = document.createElement(PfeTabs.tag);

    [...this.children].forEach(child => {
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-tab");
        header.setAttribute("slot", "tab");
        header.appendChild(child);
        tabs.appendChild(header);
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-tab-panel");
        panel.setAttribute("slot", "panel");
        panel.appendChild(child);
        tabs.appendChild(panel);
      }
    });

    fragment.appendChild(tabs);

    if (this.orientation) {
      tabs.setAttribute("vertical", true);
    }

    if (this.settings.variant) {
      tabs.setAttribute("pfe-variant", this.settings.variant);
    }

    this.appendChild(fragment);
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
