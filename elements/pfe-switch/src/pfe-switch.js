import PFElement from "../../pfelement/dist/pfelement.js";

class PfeSwitch extends PFElement {
  static get tag() {
    return "pfe-switch";
  }

  get schemaUrl() {
    return "pfe-switch.json";
  }

  get templateUrl() {
    return "pfe-switch.html";
  }

  get styleUrl() {
    return "pfe-switch.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  get pfeChecked() {
    return this.getAttribute("pfe-checked");
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-message-on", "pfe-message-off", "pfe-hide-label"];
  }

  constructor() {
    super(PfeSwitch, { type: PfeSwitch.PfeType });
    // Ensure that 'this' is the 'this' we want when used in _updateSwitchState
    this._updateSwitchState = this._updateSwitchState.bind(this);
    this._inputFocusHandler = this._inputFocusHandler.bind(this);
    this._inputBlurHandler = this._inputBlurHandler.bind(this);
    // Instatiate a settings object
    this.settings = {};
  }

  connectedCallback() {
    super.connectedCallback();

    // Get settings from attributes
    const settingAttributes = [
      "pfe-message-on",
      "pfe-message-off",
      "pfe-hide-label"
    ];
    for (let index = 0; index < settingAttributes.length; index++) {
      const settingAttribute = settingAttributes[index];
      // Adds settings to an object and lops of `data-` from the index
      this.settings[settingAttribute] = this.getAttribute(settingAttribute);
    }

    // Get a reference to the checkbox and label that should be slotted
    this.checkbox = null;
    this.label = null;
    const assignedElements = this.shadowRoot
      .querySelector("slot")
      .assignedElements();
    for (let index = 0; index < assignedElements.length; index++) {
      const assignedElement = assignedElements[index];
      switch (assignedElement.tagName) {
        case "LABEL":
          this.label = assignedElement;
          break;
        case "INPUT":
          this.checkbox = assignedElement;
          break;
      }
    }

    if (this.label) {
      // Get the fallback text and store it as a var
      this.settings["pfe-fallback-text"] = this.label.textContent;
      // Make the label focusable if it isn't already
      if (!this.label.hasAttribute("tab-index")) {
        this.label.setAttribute("tab-index", 0);
      }

      // Hide the label if necessary
      if (this.settings["pfe-hide-label"]) {
        this.label.classList.add("pfe-sr-only");
        const switchIcon = document.createElement("span");
        switchIcon.classList.add("pfe-switch__checkmark");
        this.shadowRoot.appendChild(switchIcon);
      }

      // Check for label text
      if (!this.label.textContent.trim().length) {
        console.error(
          `${this.tag}: Label text not found. Form elements require meaningful label text for accessibility. The label can be visually hidden, but must exist.`
        );
        return;
      }

      // Make sure we have a valid label with for
      const labelFor = this.label.getAttribute("for");
      if (
        labelFor !== null &&
        labelFor.length &&
        !document.getElementById(labelFor)
      ) {
        // There is a for attribute, but it doesn't point to anything
        console.error(
          `${this.tag}: Label element does not have a corresponding checkbox, label's for attribute is ${labelFor}`
        );
        this.setAttribute("pfe-disabled", "");
        return;
      } else if (labelFor === null || !labelFor.length) {
        // There isn't a for attribute
        console.error(
          `${this.tag}: Label does not have a for attribute, which is required for it to function. For attribute should have the id of the checkbox it is labelling.`
        );
        return;
      }
    } else {
      // There isn't a label
      console.error(
        `${this.tag}: Label element with text and for element required for ${this.tag} to function`
      );
      return;
    }

    // Resolve switch state when connected
    this._updateSwitchState();

    // Resolve switch state if the checkboxes changes
    this.checkbox.addEventListener("change", this._updateSwitchState);

    this.checkbox.addEventListener("focus", this._inputFocusHandler);
    this.checkbox.addEventListener("blur", this._inputBlurHandler);
  }

  disconnectedCallback() {
    if (this.checkbox) {
      this.checkbox.removeEventListener("change", this._updateSwitchState);
    }
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    this.settings[attr] = newValue;
    this._updateSwitchState();
  }

  // Check the state of the checkbox and update everything accordingly
  _updateSwitchState() {
    if (this.checkbox !== null && typeof this.checkbox !== "undefined") {
      // Update disabled status
      if (this.checkbox.getAttribute("disabled") !== null) {
        this.setAttribute("pfe-disabled", "");
      } else {
        this.removeAttribute("pfe-disabled");
      }

      // Update checked status
      if (this.checkbox.checked) {
        this.checked = true;
        this.setAttribute("pfe-checked", "");
        if (
          this.settings["pfe-message-on"] ||
          this.settings["pfe-message-off"]
        ) {
          if (this.settings["pfe-message-on"]) {
            this.label.textContent = this.settings["pfe-message-on"];
          } else {
            this.label.textContent = this.settings["pfe-fallback-text"];
          }
        }
      } else {
        this.checked = false;
        this.removeAttribute("pfe-checked");
        if (
          this.settings["pfe-message-on"] ||
          this.settings["pfe-message-off"]
        ) {
          if (this.settings["pfe-message-off"]) {
            this.label.textContent = this.settings["pfe-message-off"];
          } else {
            this.label.textContent = this.settings["pfe-fallback-text"];
          }
        }
      }
    }
  }

  _inputFocusHandler() {
    if (this.label !== null && typeof this.label !== "undefined") {
      this.classList.add("pfe-focused");
    }
  }

  _inputBlurHandler() {
    if (this.label !== null && typeof this.label !== "undefined") {
      this.classList.remove("pfe-focused");
    }
  }
}

PFElement.create(PfeSwitch);

export default PfeSwitch;
