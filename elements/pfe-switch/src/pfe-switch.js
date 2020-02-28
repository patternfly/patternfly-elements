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

  static get observedAttributes() {
    return ["pfe-form"];
  }

  get pfeChecked() {
    return this.getAttribute("pfe-checked");
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeSwitch, { type: PfeSwitch.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    const $pfeSwitch = this.shadowRoot.querySelector(".pfe-switch");

    // Get settings from attributes
    const settingAttributes = [
      "pfe-message-on",
      "pfe-message-off",
      "pfe-hide-label"
    ];
    const settings = {};
    for (let index = 0; index < settingAttributes.length; index++) {
      const settingAttribute = settingAttributes[index];
      // Adds settings to an object and lops of `data-` from the index
      settings[settingAttribute.substr(4)] = this.getAttribute(
        settingAttribute
      );
    }

    // Get a reference to the checkbox and label that should be slotted
    this.checkbox = null;
    this.label = null;
    const $assignedElements = this.shadowRoot
      .querySelector("slot")
      .assignedElements();
    for (let index = 0; index < $assignedElements.length; index++) {
      const $assignedElement = $assignedElements[index];
      switch ($assignedElement.tagName) {
        case "LABEL":
          this.label = $assignedElement;
          break;
        case "INPUT":
          this.checkbox = $assignedElement;
          break;
      }
    }

    if (this.label) {
      // Get the fallback text and store it as a var
      settings["fallback-text"] = this.label.textContent;

      // Hide the label if necessary
      if (settings["hide-label"]) {
        this.label.classList.add("sr-only");
        const switchIcon = document.createElement("span");
        switchIcon.classList.add("pfe-switch__checkmark");
        $pfeSwitch.appendChild(switchIcon);
      }

      // Check for label text
      if (!this.label.textContent.trim().length) {
        console.error(
          "pfe-switch: Label text not found. Form elements require meaningful label text for accessibility. The label can be visually hidden, but must exist."
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
          `pfe-switch: Label element does not have a corresponding checkbox, label's for attribute is ${labelFor}`
        );
        this.setAttribute("disabled", "");
        return;
      } else if (labelFor === null || !labelFor.length) {
        // There isn't a for attribute
        console.error(
          "pfe-switch: Label does not have a for attribute, which is required for it to function. For attribute should have the id of the checkbox it is labelling."
        );
        return;
      }
    } else {
      // There isn't a label
      console.error(
        "pfe-switch: Label element with text and for element required for pfe-switch to function"
      );
      return;
    }

    // Check the state of the checkbox and update everything accordingly
    const updateSwitchState = () => {
      if (this.checkbox !== null) {
        // Update disabled status
        if (this.checkbox.getAttribute("disabled") !== null) {
          this.setAttribute("disabled", "");
        } else {
          this.removeAttribute("disabled");
        }

        // Update checked status
        if (this.checkbox.checked) {
          this.checked = true;
          this.setAttribute("checked", "");
          if (settings["message-on"] || settings["message-off"]) {
            if (settings["message-on"]) {
              this.label.textContent = settings["message-on"];
            } else {
              this.label.textContent = settings["fallback-text"];
            }
          }
        } else {
          this.checked = false;
          this.removeAttribute("checked");
          if (settings["message-on"] || settings["message-off"]) {
            if (settings["message-off"]) {
              this.label.textContent = settings["message-off"];
            } else {
              this.label.textContent = settings["fallback-text"];
            }
          }
        }
      }
    };

    // Resolve switch state when connected
    updateSwitchState();

    // Resolve switch state if the checkboxes changes
    this.checkbox.addEventListener("change", () => updateSwitchState());
  }

  // disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
}

PFElement.create(PfeSwitch);

export default PfeSwitch;
