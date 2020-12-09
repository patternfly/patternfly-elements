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

    this._init = this._init.bind(this);
    this._handleHideShow = this._handleHideShow.bind(this);

    this._primaryList = this.shadowRoot.getElementById("primary-list");
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._slots = {
      list: this.querySelectorAll('[slot="primary-list"]'),
      detail: this.querySelectorAll('[slot="item-details"]'),
      listFooter: this.querySelector('[slot="primary-list--footer"')
    };

    this._primaryList.addEventListener("click", this._handleHideShow);

    this._init();
  }

  // @todo Add mutation observer in case any content changes, rerun scanLightDom?

  disconnectedCallback() {
    this._primaryList.removeEventListener("click", this._handleHideShow);
  }

  /**
   * Create nav functionality and adds additional HTML/attributes to markup
   */
  _scanLightDom() {
    let primaryListElements = Array.from(this._slots.list);
    let itemDetail = Array.from(this._slots.detail);
    const primaryListFooter = this.shadowRoot.getElementById("primary-list__footer");

    // Build nav with items in 'primary-detail' slot
    primaryListElements[0].classList.add("current-item");
    primaryListElements.forEach((item, index) => {
      let attr = item.attributes;

      item.setAttribute("id", `primary-detail-${index + 1}`);

      const li = document.createElement("li");
      const button = document.createElement("button");

      button.innerText = item.textContent;
      // Copy over attributes from original element
      [...attr].forEach(item => {
        if (item.name !== "slot") {
          button.setAttribute(item.name, item.value);
        }
      });

      // Hide unslotted content, some browsers still read it
      item.hidden = true;
      li.append(button);
      this._primaryList.append(li);
    });

    // Make sure the footer stays at the bottom
    this._primaryList.append(primaryListFooter);

    // Add attributes to item detail elements
    itemDetail.forEach((item, index) => {
      // @todo This Id is in the light DOM, so if we have multiple primary-details we'll get multiple matching ID's in the same DOM
      // We could go with classes instead?
      item.setAttribute("id", `item-detail-${index + 1}`);
      if (index !== 0) {
        item.setAttribute("hidden", "true");
      } else {
        item.classList.add("current-content");
      }
    });

    // Hide footer li if there isn't a primary-list--footer
    if (!this._slots.listFooter) {
      primaryListFooter.hidden = true;
    } else {
      primaryListFooter.removeAttribute("hidden");
    }
  }

  _init() {
    this._scanLightDom();
  }

  _handleHideShow(e) {
    if (!e.target.classList.contains("current-item")) {
      let currentItem = this.shadowRoot.querySelector(".current-item");
      currentItem.classList.remove("current-item");
      e.target.classList.add("current-item");

      let newItemPosition = e.target.getAttribute("id").charAt(e.target.getAttribute("id").length - 1);
      let currentItemPosition = currentItem.getAttribute("id").charAt(e.target.getAttribute("id").length - 1);
      document.querySelector(`#item-detail-${newItemPosition}`).removeAttribute("hidden");
      document.querySelector(`#item-detail-${currentItemPosition}`).setAttribute("hidden", "true");
    }
  }
}

PFElement.create(PfePrimaryDetail);

export default PfePrimaryDetail;
