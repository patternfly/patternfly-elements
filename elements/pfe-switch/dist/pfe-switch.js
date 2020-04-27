import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeSwitch 1.0.0-prerelease.39
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

class PfeSwitch extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
  }

  get html() {
    return `<style>::slotted(input){position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host{--pfe-switch__toggle-knob--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-switch__toggle-knob--BackgroundColor--disabled:var(--pfe-theme--color--ui-disabled, #d2d2d2);--pfe-switch__toggle-knob--BoxShadow:0 0.0625rem 0.0625rem 0rem rgba(3, 3, 3, 0.05),0 0.25rem 0.5rem 0.25rem rgba(3, 3, 3, 0.06);--pfe-switch__toggle--BackgroundColor:#d2d2d2;--pfe-switch__toggle--BackgroundColor--checked:var(--pfe-theme--color--ui-base, #0477a4);--pfe-switch__toggle--BackgroundColor--disabled:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-switch__label--Color--default:var(--pfe-theme--color--text, #333);--pfe-switch__label--Color--checked:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-switch__label--Color--disabled:var(--pfe-theme--color--ui-disabled--text, #797979);--pfe-switch__label--Outline--focused:var(--pfe-theme--color--ui-base, #0477a4);position:relative;display:inline-block;margin:0 1.5em 0 0;overflow:hidden}:host([hidden]){display:none}:host(.pfe-focused){outline:2px solid var(--pfe-switch__label--Outline--focused);outline-offset:.25em}.pfe-sr-only,::slotted(.pfe-sr-only){text-indent:-9999em}::slotted(label){position:relative;display:block;min-height:calc(1.5 * 1em);min-height:calc(var(--pfe-theme--line-height,1.5) * 1em);padding-left:3.125em;font-size:16px;font-size:var(--pfe-theme--font-size,16px);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:var(--pfe-switch__label--Color--default);cursor:pointer}::slotted(label),::slotted(label) :host([pfe-hide-label=false]){padding-left:3.125em}:host([pfe-hide-label]) ::slotted(label){padding-left:2.625em}::slotted(.pfe-sr-only){min-width:42px}:host([pfe-checked]){--pfe-switch__label--Color:var(--pfe-switch__label--Color--checked);--pfe-switch__toggle--BackgroundColor:var(--pfe-switch__toggle--BackgroundColor--checked)}:host([pfe-checked]) ::slotted(label):after{-webkit-transform:translate(32px) translate(-100%);transform:translate(32px) translate(-100%)}:host([pfe-disabled]){--pfe-switch__label--Color:var(--pfe-switch__label--Color--disabled);--pfe-switch__toggle--BackgroundColor:var(--pfe-switch__toggle--BackgroundColor--disabled);--pfe-switch__toggle-knob--BackgroundColor:var(--pfe-switch__toggle-knob--BackgroundColor--disabled)}.pfe-switch__checkmark{position:absolute;top:calc(1.5 * .5em);top:calc(var(--pfe-theme--line-height,1.5) * .5em);left:-.3125em;display:block;width:36px;height:58.896px;-webkit-transform:translate(0,-50%) scale(.16667) translate(-.25em,1.25em);transform:translate(0,-50%) scale(.16667) translate(-.25em,1.25em);-webkit-transform-origin:center center;transform-origin:center center;pointer-events:none}.pfe-switch__checkmark:before{content:'';position:absolute;top:0;left:0;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:36px;height:58.896px;border-color:var(--pfe-switch__toggle-knob--BackgroundColor);border-style:solid;border-width:0 14.4px 14.4px 0;-webkit-transform:translate(0,-50%) rotate(45deg);transform:translate(0,-50%) rotate(45deg);opacity:0;-webkit-transition:opacity .25s;transition:opacity .25s}:host([pfe-checked]) .pfe-switch__checkmark:before{opacity:1}:host([pfe-disabled]) .pfe-switch__checkmark:before{border-color:var(--pfe-switch__toggle-knob--BackgroundColor--disabled)}#switch-container{position:absolute;top:0;left:0;display:block;width:2.625em;height:calc(1.5 * 1em);height:calc(var(--pfe-theme--line-height,1.5) * 1em);border-radius:calc(1.5 * .5em);border-radius:calc(var(--pfe-theme--line-height,1.5) * .5em);background:var(--pfe-switch__toggle--BackgroundColor);-webkit-transition:background-color .25s;transition:background-color .25s}#knob{position:absolute;top:5px;left:5px;display:block;width:.875em;height:.875em;border-radius:50%;background:var(--pfe-switch__toggle-knob--BackgroundColor);-webkit-box-shadow:var(--pfe-switch__toggle-knob--BoxShadow);box-shadow:var(--pfe-switch__toggle-knob--BoxShadow);-webkit-transition:-webkit-transform .25s cubic-bezier(.21,.84,.56,1.55);transition:-webkit-transform .25s cubic-bezier(.21,.84,.56,1.55);transition:transform .25s cubic-bezier(.21,.84,.56,1.55);transition:transform .25s cubic-bezier(.21,.84,.56,1.55),-webkit-transform .25s cubic-bezier(.21,.84,.56,1.55)}:host([pfe-checked]){--pfe-switch__label--Color:var(--pfe-switch__label--Color--checked);--pfe-switch__toggle--BackgroundColor:var(--pfe-switch__toggle--BackgroundColor--checked)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-checked]) #switch-container{background:#0477a4;background:var(--pfe-theme--color--ui-base,#0477a4)}}:host([pfe-checked]) #knob{-webkit-transform:translate(32px) translate(-100%);transform:translate(32px) translate(-100%)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-disabled]) #switch-container{background:#797979;background:var(--pfe-theme--color--ui-disabled--text,#797979)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-disabled]) #knob{background:#d2d2d2;background:var(--pfe-theme--color--ui-disabled,#d2d2d2)}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([pfe-checked][pfe-disabled]) #switch-container{background:#0477a4;background:var(--pfe-theme--color--ui-base,#0477a4)}}
/*# sourceMappingURL=pfe-switch.min.css.map */
</style><div id="switch-container"></div>
<div id="knob"></div>
<slot></slot>`;
  }

  static get properties() {
    return {"form":{"title":"Form","type":"string","enum":[],"default":"","prefixed":true}};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
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

  get checked() {
    return this.getAttribute("pfe-checked");
  }

  set checked(val) {
    val = Boolean(val);

    if (val) {
      this.checkbox.setAttribute("checked", "");
      this.setAttribute("pfe-checked", "");
    } else {
      this.checkbox.removeAttribute("checked");
      this.removeAttribute("pfe-checked");
    }
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
    const assignedNodes = this.shadowRoot.querySelector("slot").assignedNodes();
    for (let index = 0; index < assignedNodes.length; index++) {
      const assignedNode = assignedNodes[index];
      switch (assignedNode.tagName) {
        case "LABEL":
          this.label = assignedNode;
          break;
        case "INPUT":
          this.checkbox = assignedNode;
          break;
      }
    }

    if (this.label) {
      // Get the fallback text and store it as a var
      this.settings["pfe-fallback-text"] = this.label.textContent;

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
      this.checkbox.removeEventListener("focus", this._inputFocusHandler);
      this.checkbox.removeEventListener("blur", this._inputBlurHandler);
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
//# sourceMappingURL=pfe-switch.js.map
