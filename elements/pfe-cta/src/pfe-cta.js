// Import polyfills: Object.assign()
import "./polyfills--pfe-cta.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCta extends PFElement {
  static get tag() {
    return "pfe-cta";
  }

  get styleUrl() {
    return "pfe-cta.scss";
  }

  get templateUrl() {
    return "pfe-cta.html";
  }

  get schemaUrl() {
    return "pfe-cta.json";
  }

  get isDefault() {
    return this.hasAttribute("priority") ? false : true;
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get events() {
    return {
      select: `${this.tag}:select`
    };
  }

  static get properties() {
    return {
      priority: {
        title: "Priority",
        type: String,
        values: ["primary", "secondary"]
      },
      // @TODO: Deprecated
      oldPriority: {
        alias: "priority",
        attr: "pfe-priority"
      },
      color: {
        title: "Color",
        type: String,
        values: ["accent", "base", "complement", "lightest"]
      },
      // @TODO: Deprecated
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      },
      variant: {
        title: "Style variant",
        type: String,
        values: ["wind"]
      },
      // @TODO: Deprecated
      oldVariant: {
        alias: "variant",
        attr: "pfe-variant"
      }
    };
  }

  // static get observedAttributes() {
  //   return ["pfe-priority", "pfe-color", "pfe-variant"];
  // }

  click(event) {
    this.emitEvent(PfeCta.events.select, {
      detail: Object.assign(this.data, {
        originEvent: event
      })
    });
  }

  constructor() {
    super(PfeCta);
    this.cta = null;

    this._init = this._init.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // Get the slot
    this._slot = this.shadowRoot.querySelector("slot");

    // Attach the slotchange listener
    this._slot.addEventListener("slotchange", this._init);

    if (this.hasLightDOM()) this._init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the slot change listeners
    this._slot.removeEventListener("slotchange", this._init);

    // Remove the focus state listeners
    if (this.cta) {
      this.cta.removeEventListener("focus", this._focusHandler);
      this.cta.removeEventListener("blur", this._blurHandler);
      this.cta.removeEventListener("click", this._clickHandler);
      this.cta.removeEventListener("keyup", this._keyupHandler);
    }
  }

  // Initialize the component
  _init() {
    const supportedTags = ["a", "button"]; // add input later
    let supportedTag = false;

    // If the first child does not exist or that child is not a supported tag
    if (this.firstElementChild) {
      supportedTags.forEach(tag => {
        if (this.firstElementChild.tagName.toLowerCase() === tag) {
          supportedTag = true;
        }
      });
    }

    if (!this.firstElementChild || !supportedTag) {
      this.warn(`The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)`);
    } else if (
      this.firstElementChild.tagName.toLowerCase() === "button" &&
      this.priority === null &&
      this.getAttribute("aria-disabled") !== "true"
    ) {
      this.warn(`Button tag is not supported semantically by the default link styles`);
    } else {
      // Capture the first child as the CTA element
      this.cta = this.firstElementChild;

      this.data = {
        href: this.cta.href,
        text: this.cta.text,
        title: this.cta.title,
        color: this.color
      };

      // Set the value for the priority property
      // this.priority = this.isDefault ? "default" : this.getAttribute("priority");

      // Add the priority value to the data set for the event
      this.data.type = this.priority;

      // Append the variant to the data type
      if (this.variant) {
        this.data.type = `${this.data.type} ${this.variant}`;
      }

      // Override type if set to disabled
      if (this.getAttribute("aria-disabled")) {
        this.data.type = "disabled";
      }

      // Watch the light DOM link for focus and blur events
      this.cta.addEventListener("focus", this._focusHandler);
      this.cta.addEventListener("blur", this._blurHandler);

      // Attach the click listener
      this.cta.addEventListener("click", this._clickHandler);
      this.cta.addEventListener("keyup", this._keyupHandler);
    }
  }

  // On focus, add a focus class
  _focusHandler(event) {
    this.classList.add("focus-within");
  }

  // On focus out, remove the focus class
  _blurHandler(event) {
    this.classList.remove("focus-within");
  }

  // On enter press, trigger click event
  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        this.click(event);
    }
  }

  // On click, trigger click event
  _clickHandler(event) {
    this.click(event);
  }
}

PFElement.create(PfeCta);

export default PfeCta;
