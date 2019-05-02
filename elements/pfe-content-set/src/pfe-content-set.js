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

  get schemaUrl() {
    return "pfe-content-set.json";
  }

  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
  }

  constructor() {
    super(PfeContentSet, { delayRender: true });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length) {
      this._init();
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (this.isTab) {
      this._buildTabs();
    } else {
      this._buildAccordion();
    }

    this.render();

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
    }
  }

  _buildAccordion() {
    const existingAccordion = this.querySelector("pfe-accordion");
    const fragment = document.createDocumentFragment();
    const accordion = existingAccordion || document.createElement("pfe-accordion");

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

    if (!existingAccordion) {
      fragment.appendChild(accordion);
    }

    if (this.on) {
      accordion.setAttribute("on", this.on);
    }

    if (!existingAccordion) {
      this.appendChild(fragment);
    }
  }

  _buildTabs() {
    const existingTabs = this.querySelector("pfe-tabs");
    const fragment = document.createDocumentFragment();
    const tabs = existingTabs || document.createElement("pfe-tabs");

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

    if (!existingTabs) {
      fragment.appendChild(tabs);
    }

    if (this.vertical.value !== null && this.vertical.value !== false) {
      tabs.setAttribute("vertical", true);
    }

    if (this.variant.value !== this.variant.default) {
      tabs.setAttribute("pfe-variant", this.variant.value);
    }

    if (this.on.value) {
      tabs.setAttribute("on", this.on.value);
    }

    if (!existingTabs) {
      this.appendChild(fragment);
    }
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
