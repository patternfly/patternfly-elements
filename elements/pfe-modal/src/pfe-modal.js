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

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  openModal(event) {
    event.preventDefault();

    this.trigger = event.target;

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:open`, {
        detail: {
          open: true
        },
        bubbles: true
      })
    );
  }

  closeModal(event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent(`${this.tag}:close`, {
        detail: {
          open: false
        },
        bubbles: true
      })
    );
  }

  constructor() {
    super(PfeModal, { type: PfeModal.PfeType });

    this.open = false;
    this.header_id = this.randomId;

    this._keydownHandler = this._keydownHandler.bind(this);
    this._toggleModal = this._toggleModal.bind(this);

    // These fire custom events
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this._modalWrapper = this.shadowRoot.querySelector(`.${this.tag}__wrapper`);
    this._modalCloseButton = this.shadowRoot.querySelector(`.${this.tag}__close`);
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
      this._init();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    this.addEventListener(`${this.tag}:open`, this._toggleModal);
    this.addEventListener(`${this.tag}:close`, this._toggleModal);

    this.addEventListener("keydown", this._keydownHandler);
    this._modalCloseButton.addEventListener("click", this.closeModal);

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this.removeEventListener(`${this.tag}:open`, this._toggleModal);
    this.removeEventListener(`${this.tag}:close`, this._toggleModal);

    this.removeEventListener("keydown", this._keydownHandler);

    this._modalCloseButton.removeEventListener("click", this.closeModal);

    if (this.trigger) {
      this.trigger.removeEventListener("click", this.openModal);
    }

    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);
  }

  _init() {
    this.trigger = this.querySelector(`[slot="pfe-modal--trigger"]`);
    this.header = this.querySelector(`[slot="pfe-modal--header"]`);
    this.body = [...this.querySelectorAll(`*:not([slot])`)];

    if (this.trigger) {
      this.trigger.addEventListener("click", this.openModal);
    }

    if (this.header) {
      this.header.setAttribute("id", this.header_id);
      this._modalWrapper.setAttribute("aria-labelledby", this.header_id);
    } else {
      // @TODO Do something else to assign the label
      const headings = this.body.filter(el => el.tagName.startsWith("H"));
      if (headings.length > 0) {
        headings[0].setAttribute("id", this.header_id);
        this._modalWrapper.setAttribute("aria-labelledby", this.header_id);
      } else if (this.trigger) {
        this._modalWrapper.setAttribute("aria-label", this.trigger.innerText);
      }
    }

    this._overlay.addEventListener("click", this.closeModal);
    this._modalCloseButton.addEventListener("keydown", this._keydownHandler);
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Tab":
        if (event.target === this._modalCloseButton) {
          event.preventDefault();
          this._modalWrapper.focus();
        }
        return;
      case "Escape":
        this.closeModal(event);
        return;
      case "Enter":
          if (event.target === this.trigger) {
            this.openModal(event);
          }
          return;
    }
  }

  _toggleModal(event) {
    if(event && event.detail) {
      if(event.detail.open) {
        this.open = true;
        // Reveal the container and overlay
        this._modalWrapper.removeAttribute("hidden");
        this._overlay.removeAttribute("hidden");
        // Set the focus to the container
        this._modalWrapper.focus();
      } else {
        this.open = false;
        // Hide the container and overlay
        this._modalWrapper.setAttribute("hidden", true);
        this._overlay.setAttribute("hidden", true);
        // Move focus back to the trigger element
        this.trigger.focus();
      }
    }
  }
}

PFElement.create(PfeModal);

export default PfeModal;
