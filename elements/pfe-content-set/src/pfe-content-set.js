import PFElement from "../pfelement/pfelement.js";

class PfeContentSet extends PFElement {
  static get tag() {
    return "pfe-content-set";
  }

  get styleUrl() {
    return "pfe-content-set.css";
  }

  get templateUrl() {
    return "pfe-content-set.html";
  }

  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
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

  get orientation() {
    if (this.hasAttribute("vertical")) {
      return " vertical";
    }
  }

  static get observedAttributes() {
    return ["pfe-vertical", "selected-index", "pfe-variant", "theme", "color"];
  }

  static get cascadingAttributes() {
    return {
      vertical: "pfe-tabs",
      "selected-index": "pfe-tabs",
      "pfe-variant": "pfe-tabs",
      theme: "pfe-accordion",
      color: "pfe-accordion"
    };
  }

  // Declare the type of this component
  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  constructor() {
    super(PfeContentSet, {
      delayRender: true
    });

    this.groupings = [];

    this._observer = new MutationObserver(() => {
      const tempGrouping = [...this.querySelectorAll("pfe-content-set-group")];

      tempGrouping.forEach(group => {
        const tempGroup = {
          heading: group.querySelector("[pfe-heading]"),
          body: [...group.children].filter(child => {
            return !child.hasAttribute("pfe-heading");
          })
        };

        this.groupings.push(tempGroup);
      });

      this.render();
    });

    this._observer.observe(this, {
      attributes: true,
      childList: true
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
