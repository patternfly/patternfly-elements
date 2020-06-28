import PFElement from "../../pfelement/dist/pfelement.js";

// requestSubmit polyfill
// https://github.com/javan/form-request-submit-polyfill/blob/master/form-request-submit-polyfill.js
(function(prototype) {
  if (typeof prototype.requestSubmit == "function") return;

  prototype.requestSubmit = function(submitter) {
    if (submitter) {
      validateSubmitter(submitter, this);
      submitter.click();
    } else {
      submitter = document.createElement("input");
      submitter.type = "submit";
      submitter.hidden = true;
      this.appendChild(submitter);
      submitter.click();
      this.removeChild(submitter);
    }
  };

  function validateSubmitter(submitter, form) {
    submitter instanceof HTMLElement ||
      raise(TypeError, "parameter 1 is not of type 'HTMLElement'");
    submitter.type == "submit" ||
      raise(TypeError, "The specified element is not a submit button");
    submitter.form == form ||
      raise(
        DOMException,
        "The specified element is not owned by this form element",
        "NotFoundError"
      );
  }

  function raise(errorConstructor, message, name) {
    throw new errorConstructor(
      "Failed to execute 'requestSubmit' on 'HTMLFormElement': " +
        message +
        ".",
      name
    );
  }
})(HTMLFormElement.prototype);

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

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeTextinput, { type: PfeTextinput.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}
}

class PfeTextinputShadow extends PFElement {
  static get tag() {
    return "pfe-textinput-shadow";
  }

  get schemaUrl() {
    return "pfe-textinput.json";
  }

  get templateUrl() {
    return "pfe-textinput-shadow.html";
  }

  get styleUrl() {
    return "pfe-textinput-shadow.scss";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-c-value"];
  }

  constructor() {
    super(PfeTextinputShadow, { type: PfeTextinputShadow.PfeType });

    this._lightInput = null;
    this._internalInput = null;
    this._setFocus = this._setFocus.bind(this);
    this._keyupListener = this._keyupListener.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._lightInput = this.querySelector(`input[type]`);
    this._internalInput = this._lightInput.cloneNode(true);

    // set the tabindex of _lightInput to -1 so it can't be
    // tabbed to.
    this._lightInput.setAttribute("tabindex", "-1");

    this.shadowRoot.querySelector("span").appendChild(this._internalInput);

    this._lightInput.addEventListener("focus", this._setFocus);
    this._internalInput.addEventListener("keyup", this._keyupListener);

    this._lightInputObserver = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "value"
        ) {
          this._internalInput.value = this._lightInput.value;
        }
      });
    });

    this._lightInputObserver.observe(this._lightInput, {
      attributes: true
    });
  }

  disconnectedCallback() {
    this._lightInput.removeEventListener("focus", this._setFocus);
    this._internalInput.addEventListener("keyup", this._keyupListener);
    this._lightInputObserver.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    this._internalInput.value = newVal;
    this._lightInput.value = newVal;
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
      this.closest("form").requestSubmit();
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
PFElement.create(PfeTextinputShadow);

export default PfeTextinput;
