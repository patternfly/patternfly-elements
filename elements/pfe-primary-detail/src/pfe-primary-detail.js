import PFElement from "../../pfelement/dist/pfelement.js";

class PfePrimaryDetail extends PFElement {
  static get tag() {
    return "pfe-primary-detail";
  }

  static get meta() {
    return {
      title: "Primary detail",
      description: ""
    };
  }

  get templateUrl() {
    return "pfe-primary-detail.html";
  }

  get styleUrl() {
    return "pfe-primary-detail.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super(PfePrimaryDetail, { type: PfePrimaryDetail.PfeType });

    this._handleHideShow = this._handleHideShow.bind(this);

    this._detailsNav = this.shadowRoot.getElementById("details-nav");
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._slots = {
      detailsNav: this.shadowRoot.querySelector('slot[name="details-nav"]').assignedElements(),
      details: this.shadowRoot.querySelector('slot[name="details"]').assignedElements(),
      detailsNavHeader: this.shadowRoot.querySelector('slot[name="details-nav--header"]').assignedElements(),
      detailsNavFooter: this.shadowRoot.querySelector('slot[name="details-nav--footer"]').assignedElements()
    };

    this._detailsWrapper = this.shadowRoot.getElementById("details-wrapper");

    // Add appropriate markup and behaviors
    this._scanLightDom();
    // Set first item as active for initial load
    this._handleHideShow({ target: this._slots.detailsNav[0] });
  }

  // @todo Add mutation observer in case any content changes, rerun scanLightDom?

  disconnectedCallback() {
    for (let index = 0; index < this._slots.detailsNav.length; index++) {
      this._slots.detailsNav[index].removeEventListener("click", this._handleHideShow);
    }
  }

  /**
   * Create nav functionality and adds additional HTML/attributes to markup
   */
  _scanLightDom() {
    if (this._slots.detailsNav.length !== this._slots.details.length) {
      console.error(
        `${this.tag}: The number of item headings does not match the number of item details. Found ${this._slots.detailsNav.length} item headings & ${this._slots.details.length} item details.`
      );
      return;
    }

    // Setup left sidebar navigation
    this._slots.detailsNav.forEach((toggle, index) => {
      let attr = toggle.attributes;
      toggle.dataset.index = index;

      const button = document.createElement("button");

      button.innerText = toggle.textContent;
      // Copy over attributes from original element
      [...attr].forEach(toggle => {
        button.setAttribute(toggle.name, toggle.value);
      });

      // If the toggle does not have a ID, set a unique ID
      if (!toggle.hasAttribute("id")) {
        button.setAttribute(
          "id",
          `pfe-detail-toggle-${Math.random()
            .toString(36)
            .substr(2, 9)}`
        );
      }

      button.addEventListener("click", this._handleHideShow);
      this._slots.detailsNav[index] = button;
      toggle.replaceWith(button);
    });

    // Setup item detail elements
    this._slots.details.forEach((detail, index) => {
      // If the toggle does not have a ID, set a unique ID
      if (!detail.hasAttribute("id")) {
        detail.setAttribute(
          "id",
          `pfe-detail-${Math.random()
            .toString(36)
            .substr(2, 9)}`
        );
      }

      const toggleId = this._slots.detailsNav[index].getAttribute("id");
      if (!detail.hasAttribute("aria-labelledby") && toggleId) {
        detail.setAttribute("aria-labelledby", toggleId);
      }

      detail.dataset.index = index;
    });

    // Swing back to detailsNav to add aria-controls, now that details have an Id
    this._slots.detailsNav.forEach((toggle, index) => {
      const detailId = this._slots.details[index].getAttribute("id");
      if (!toggle.hasAttribute("aria-controls") && detailId) {
        toggle.setAttribute("aria-controls", detailId);
      }
    });
  }

  /**
   * Handles changes in state
   * @param {object} e Event object
   */
  _handleHideShow(e) {
    if (!e.target.classList.contains("pfe-primary-detail__toggle--active")) {
      const currentItem = this.querySelector(".pfe-primary-detail__toggle--active");
      const nextItem = e.target;

      // Get details elements
      const nextDetails = this._slots.details[parseInt(nextItem.dataset.index)];

      if (currentItem) {
        const currentDetails = this._slots.details[parseInt(currentItem.dataset.index)];

        // Remove Current Item's active attributes
        currentItem.classList.remove("pfe-primary-detail__toggle--active");
        currentItem.setAttribute("aria-expanded", "false");

        // Remove Current Detail's attributes
        currentDetails.classList.remove("pfe-primary-detail__details--active");
        currentDetails.setAttribute("aria-hidden", "true");
      }

      // Add active attributes to Next Item
      nextItem.classList.add("pfe-primary-detail__toggle--active");
      nextItem.setAttribute("aria-expanded", "false");

      // Add active attributes to Next Details
      nextDetails.classList.add("pfe-primary-detail__details--active");
      nextDetails.setAttribute("aria-hidden", "false");
    }
  }
}

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
