import PFElement from "../../pfelement/dist/pfelement.js";
import "./polyfills--pfe-textinput.js";

// @IE11
// watching for addition and removal of nodes so
// we can make sure we have the correct light DOM
// and so we can set the _lightInput property
const parentObserverConfig = {
  childList: true
};

// watching for changes on the _lightInput so we can
// update input attributes in our shadow DOM when the _lightInput
// changes
const lightInputObserverConfig = {
  attributes: true
};

// list of attributes that we DO NOT want to pass from
// the _lightInput to our shadow DOM input. For example,
// the style attribute could ruin our encapsulated styles
// in the shadow DOM
const denylistAttributes = ["style", "tabindex"];

class PfeTextinput extends PFElement {
  static get tag() {
    return "pfe-textinput";
  }

  get schemaUrl() {
    return "pfe-textinput.json";
  }

  get templateUrl() {
    return "pfe-textinput.html";
  }

  get styleUrl() {
    return "pfe-textinput.scss";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeTextinput, { type: PfeTextinput.PfeType });

    this._lightInput = null;
    this._internalInput = null;
    this._setFocus = this._setFocus.bind(this);
    this._keyupListener = this._keyupListener.bind(this);
    this._shadowBtnWrapper = this.shadowRoot.querySelector(
      "span.shadow-btn-wrapper"
    );

    this._init = this._init.bind(this);

    this._lightInputObserver = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        // do nothing if the attribute is part of the denylistAttributes
        // then, either copy the attribute and value or remove the attribute
        // if the attribute is no longer present in the light DOM
        if (mutation.type === "attributes") {
          if (denylistAttributes.includes(mutation.attributeName)) {
            return;
          }

          if (this._lightInput.hasAttribute(mutation.attributeName)) {
            const lightAttributeValue = this._lightInput.getAttribute(
              mutation.attributeName
            );
            this._internalInput.setAttribute(
              mutation.attributeName,
              lightAttributeValue
            );
          } else {
            this._internalInput.removeAttribute(mutation.attributeName);
          }
        }

        // make sure we keep the shadow DOM input value in sync with
        // the light DOM input value
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "value"
        ) {
          this._internalInput.value = this._lightInput.value;
        }
      });
    });

    this.observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
    this.observer.observe(this, parentObserverConfig);
  }

  disconnectedCallback() {
    this._lightInput.removeEventListener("focus", this._setFocus);
    this._internalInput.addEventListener("keyup", this._keyupListener);
    this._lightInputObserver.disconnect();
    this.observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    this._internalInput.value = newVal;
    this._lightInput.value = newVal;
  }

  _init() {
    if (!this._isValidLightDom()) {
      return;
    }

    this._lightInput = this.querySelector(`input[type]`);
    this._internalInput = this._lightInput.cloneNode(true);

    denylistAttributes.forEach(attribute => {
      if (this._internalInput.hasAttribute) {
        this._internalInput.removeAttribute(attribute);
      }
    });

    // set the tabindex of _lightInput to -1 so it can't be
    // tabbed to.
    this._lightInput.setAttribute("tabindex", "-1");

    this._shadowBtnWrapper.innerHTML = "";
    this._shadowBtnWrapper.appendChild(this._internalInput);

    this._lightInput.addEventListener("focus", this._setFocus);
    this._internalInput.addEventListener("keyup", this._keyupListener);
    this._lightInputObserver.observe(
      this._lightInput,
      lightInputObserverConfig
    );
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(
        `${PfeTextinput.tag}: You must have a text input in the light DOM`
      );
      return false;
    }

    if (
      this.children[0].tagName !== "INPUT" &&
      this.children[0].type !== "text"
    ) {
      console.warn(
        `${PfeTextinput.tag}: The only child in the light DOM must be a text input tag`
      );
      return false;
    }

    return true;
  }

  _setFocus() {
    // when the _lightInput element receives focus,
    // put it on _internalInput
    this._internalInput.focus();
  }

  _keyupListener(event) {
    if (event.keyCode === 13) {
      // find the nearest form and attempt to submit it.
      // we use requestSubmit because if we used the submit
      // method on the form, the form would submit and bypass
      // any validation
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit#Usage_notes
      const closestForm = this.closest("form");
      if (!closestForm) {
        return;
      }

      closestForm.requestSubmit();
      return;
    }

    // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
    // weird stuff to get react to work
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(this._lightInput, this._internalInput.value);

    const inputEvent = new Event("input", { bubbles: true });
    this._lightInput.dispatchEvent(inputEvent);
  }
}

PFElement.create(PfeTextinput);

export default PfeTextinput;
