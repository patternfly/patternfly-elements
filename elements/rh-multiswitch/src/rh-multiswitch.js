import RHElement from "../rhelement/rhelement.js";

class RhMultiswitch extends RHElement {
  static get tag() {
    return "rh-multiswitch";
  }

  get styleUrl() {
    return "rh-multiswitch.scss";
  }

  get templateUrl() {
    return "rh-multiswitch.html";
  }

  constructor() {
    super(RhMultiswitch.tag);

    this._slotChange = this._slotChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    let slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", this._slotChange);
  }

  disconnectedCallback() {}

  _slotChange(event) {
    // Make sure we're applying proper form semantics
    const firstChild = this.children[0];
    if (!firstChild) {
      console.warn(
        "The first child in the light DOM must be a fieldset (<fieldset>) with a legend"
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "fieldset") {
      console.warn(
        "The first child in the light DOM must be a fieldset (<fieldset>) with a legend"
      );
    } else {
      let fieldset = this.querySelector("fieldset");
      fieldset.classList.add("rh-multiswitch__fieldset");

      // Wrap everything with a <div>
      let wrapper = document.createElement("div");
      wrapper.classList.add("rh-multiswitch__container");
      while (fieldset.childNodes.length > 0) {
        wrapper.appendChild(fieldset.childNodes[0]);
      }
      fieldset.appendChild(wrapper);

      // Add a "slide" at the end
      let slide = document.createElement("a");
      slide.classList.add("rh-multiswitch__slide");
      slide.setAttribute("aria-hidden", "true");
      wrapper.appendChild(slide);

      let legend = this.querySelector("legend");
      fieldset.insertBefore(legend, wrapper);

      let fieldsetClone = fieldset.cloneNode(true);

      // TODO: Figure out how to clear children before appending so the copy is clean.
      this.shadowRoot.appendChild(fieldsetClone);
    }
  }
}

RHElement.create(RhMultiswitch);
