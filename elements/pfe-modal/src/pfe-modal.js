import PFElement from "../pfelement/pfelement.js";

class PfeModal extends PFElement {
  static get tag() {
    return "pfe-modal";
  }

  get templateUrl() {
    return "pfe-modal.html";
  }

  get schemaUrl() {
    return "pfe-modal.json";
  }

  get styleUrl() {
    return "pfe-modal.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeModal, { type: PfeModal.PfeType });

    this.open = false;
    this.header_id = this.randomId;

    this._clickHandler = this._clickHandler.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);

    this._modalContainer = this.shadowRoot.querySelector(".pfe-modal__container");
    this._modalCloseButton = this.shadowRoot.querySelector(".pfe-modal__close");
    this._overlay = this.shadowRoot.querySelector(".pfe-modal__overlay");
    
    this._modalCloseButton.addEventListener("click", this._clickHandler);
    
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
      this._init();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    this.addEventListener(`${this.tag}:toggle`, this._toggleModal);
    // this.addEventListener("keydown", this._keydownHandler);
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this.removeEventListener(`${this.tag}:toggle`, this._toggleModal);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);
  }

  _init() {
    this.trigger = this.querySelector(`[slot="pfe-modal--trigger"]`);
    this.header = this.querySelector(`[slot="pfe-modal--header"]`);
    this.body = [...this.querySelectorAll(`*:not([slot])`)];
    // Remove the trigger link from the focusable events in this component
    this.modalFocusableEls = [...this.focusableLight].filter(el => !(el.getAttribute("slot") === `${this.tag}--trigger`));

    if (this.trigger) {
      this.trigger.addEventListener("click", this._clickHandler);
    } else {
      console.error(`${this.tag}: This modal will not open without a trigger defined.  Please see documentation.`)
    }

    if (this.header) {
      this.header.setAttribute("id", this.header_id);
      this._modalContainer.setAttribute("aria-labelledby", this.header_id);
    } else {
      // Do something else to assign the label
    }

    this._overlay.addEventListener("click", this._clickHandler);

    if (this.modalFocusableEls.length > 1) {
      // Add a tab event on the last focusable element to 
      const lastFocusableEl = this.modalFocusableEls.pop();
      lastFocusableEl.addEventListener("keydown", event => {
        // Tab event
        if (event.keyCode == 9) {
          event.preventDefault();
          this._modalCloseButton.focus();
        }
      });

      this._modalCloseButton.addEventListener("keydown", event => {
        // Tab event
        if (event.keyCode == 9) {
          event.preventDefault();
          this.modalFocusableEls[0].focus();
        }
      });
    }
  }

  _clickHandler(event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:toggle`, {
        detail: { open: !this.open },
        bubbles: true
      })
    );
  }

  _toggleModal(event) {
    if(event.detail.open) {
      this._openModal();
    } else {
      this._closeModal();
    }
  }

  _openModal() {
    this.open = true;
    // Reveal the container and overlay
    this._modalContainer.removeAttribute("hidden");
    this._overlay.removeAttribute("hidden");
    // Set the focus to the container
    this._modalContainer.focus();
  }

  _closeModal() {
    this.open = false;
    // Hide the container and overlay
    this._modalContainer.setAttribute("hidden", true);
    this._overlay.setAttribute("hidden", true);
    // Move focus back to the trigger element
    this.trigger.focus();
  }
}

PFElement.create(PfeModal);

export default PfeModal;
