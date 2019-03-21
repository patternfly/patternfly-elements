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
    return this.hasAttribute("vertical") ? "vertical" : "horizontal";
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
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Create the accordion wrapper component
    const accordion = document.createElement("pfe-accordion");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        // Create a header component
        const header = document.createElement("pfe-accordion-header");
        // Append the light DOM element to that component
        header.appendChild(child);
        // Append the component to the accordion parent
        accordion.appendChild(header);
      }
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--panel")) {
        // Create a panel component
        const panel = document.createElement("pfe-accordion-panel");
        // Append the light DOM element to that component
        panel.appendChild(child);
        // Append the component to the accordion parent
        accordion.appendChild(panel);
      }
    });

    // Append the accordion to the document fragment
    fragment.appendChild(accordion);

    // Pass the color property down to the accordion component
    if (this.settings.color) {
      accordion.setAttribute("color", this.settings.color);
    }

    // Append the fragment to the component
    this.appendChild(fragment);
  }

  _buildTabs() {
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Create the tabs wrapper component
    const tabs = document.createElement("pfe-tabs");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        // Create a tab component
        const header = document.createElement("pfe-tab");
        // Set the attribute indicating its slot
        header.setAttribute("slot", "tab");
        // Append the light DOM element to that component
        header.appendChild(child);
        // Append the component to the tabs parent
        tabs.appendChild(header);
      }
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--panel")) {
        // Create the panel component
        const panel = document.createElement("pfe-tab-panel");
        // Set the attribute indicating its slot
        panel.setAttribute("slot", "panel");
        // Append the light DOM element to that component
        panel.appendChild(child);
        // Append the component to the tabs parent
        tabs.appendChild(panel);
      }
    });

    // Append the tabs to the document fragment
    fragment.appendChild(tabs);

    // If the orientation is set to vertical, add that attribute to the tabs
    if (this.orientation === "vertical") {
      tabs.setAttribute("vertical", true);
    }

    // Pass the variant attribute down to the tabs component
    if (this.settings.variant) {
      tabs.setAttribute("pfe-variant", this.settings.variant);
    }

    // Append the fragment to the component
    this.appendChild(fragment);
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
