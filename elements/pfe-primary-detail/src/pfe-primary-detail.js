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

    this._primaryList = this.shadowRoot.querySelector(".primary-list");
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this._slots = {
      list: this.querySelectorAll('[slot="primary-list"]'),
      detail: this.querySelectorAll('[slot="item-details"]')
    };

    this._primaryList.addEventListener("click", this._handleHideShow);

    this._init();
  }

  disconnectedCallback() {
    this._primaryList.removeEventListener("click", this._handleHideShow);
  }

  _scanLightDom() {
    let primaryListElements = Array.from(this._slots.list);
    let itemDetail = Array.from(this._slots.detail);

    primaryListElements[0].classList.add("current-item");
    primaryListElements.forEach((item, index) => {
      // let content = item.textContent;

      item.setAttribute("id", `primary-detail-${index + 1}`);

      // let createButton = document.createElement("button");
      // createButton.textContent = content;

      // item.appendChild(createButton);
    });

    itemDetail.forEach((item, index) => {
      item.setAttribute("id", `item-detail-${index + 1}`);
      if (index !== 0) {
        item.setAttribute("hidden", "true");
      } else {
        item.classList.add("current-content");
      }
    });
  }

  _init() {
    this._scanLightDom();
  }

  _handleHideShow(e) {
    if (!e.target.classList.contains("current-item")) {
      let currentItem = document.querySelector(".current-item");
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
