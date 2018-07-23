import Rhelement from "../rhelement/rhelement.js";

class RhMultiswitch extends Rhelement {
  get html() {
    return `
<style>
:host {
  display: block; }

::slotted(*) {
  display: none; }

.rh-multiswitch__fieldset {
  border: 0;
  padding: 0; }
  .rh-multiswitch__fieldset *, .rh-multiswitch__fieldset *::before, .rh-multiswitch__fieldset *::after {
    box-sizing: border-box; }
  .rh-multiswitch__fieldset legend {
    display: block;
    margin-bottom: 10px;
    font-weight: 600; }

.rh-multiswitch__container {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  max-width: 50em;
  line-height: 2em;
  user-select: none;
  background: #333;
  color: #fff;
  transition: background 0.1s ease-out;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3); }
  .rh-multiswitch__container input {
    position: absolute;
    left: -200vw; }
    .rh-multiswitch__container input:checked ~ a {
      left: 0;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25); }
    .rh-multiswitch__container input:not(:first-child):checked ~ a {
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.2), -1px 0 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25); }
    .rh-multiswitch__container input:focus ~ a {
      outline: 2px solid #0088ce; }
  .rh-multiswitch__container label {
    width: 50%;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    z-index: 2;
    cursor: pointer;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4); }
    .rh-multiswitch__container label:nth-last-child(6),
    .rh-multiswitch__container label:nth-last-child(6) ~ label,
    .rh-multiswitch__container label:nth-last-child(6) ~ a {
      width: 33.3334%; }
    .rh-multiswitch__container label:nth-last-child(8),
    .rh-multiswitch__container label:nth-last-child(8) ~ label,
    .rh-multiswitch__container label:nth-last-child(8) ~ a {
      width: 25%; }
    .rh-multiswitch__container label:nth-last-child(10),
    .rh-multiswitch__container label:nth-last-child(10) ~ label,
    .rh-multiswitch__container label:nth-last-child(10) ~ a {
      width: 20%; }
    .rh-multiswitch__container label:nth-last-child(12),
    .rh-multiswitch__container label:nth-last-child(12) ~ label,
    .rh-multiswitch__container label:nth-last-child(12) ~ a {
      width: 16.6667%; }
    .rh-multiswitch__container label:nth-last-child(4) ~ input:nth-child(3):checked ~ a {
      left: 50%; }
    .rh-multiswitch__container label:nth-last-child(6) ~ input:nth-child(3):checked ~ a {
      left: 33.3334%; }
    .rh-multiswitch__container label:nth-last-child(6) ~ input:nth-child(5):checked ~ a {
      left: 66.6667%; }
    .rh-multiswitch__container label:nth-last-child(8) ~ input:nth-child(3):checked ~ a {
      left: 25%; }
    .rh-multiswitch__container label:nth-last-child(8) ~ input:nth-child(5):checked ~ a {
      left: 50%; }
    .rh-multiswitch__container label:nth-last-child(8) ~ input:nth-child(7):checked ~ a {
      left: 75%; }
    .rh-multiswitch__container label:nth-last-child(10) ~ input:nth-child(3):checked ~ a {
      left: 20%; }
    .rh-multiswitch__container label:nth-last-child(10) ~ input:nth-child(5):checked ~ a {
      left: 40%; }
    .rh-multiswitch__container label:nth-last-child(10) ~ input:nth-child(7):checked ~ a {
      left: 60%; }
    .rh-multiswitch__container label:nth-last-child(10) ~ input:nth-child(9):checked ~ a {
      left: 80%; }
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(3):checked ~ a {
      left: 16.6667%; }
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(5):checked ~ a {
      left: 33.3334%; }
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(7):checked ~ a {
      left: 50%; }
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(9):checked ~ a {
      left: 66.6667%; }
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(11):checked ~ a {
      left: 83.3334%; }
    .rh-multiswitch__container label:nth-last-child(4) ~ input:nth-child(3):checked ~ a,
    .rh-multiswitch__container label:nth-last-child(6) ~ input:nth-child(5):checked ~ a,
    .rh-multiswitch__container label:nth-last-child(8) ~ input:nth-child(7):checked ~ a,
    .rh-multiswitch__container label:nth-last-child(10) ~ input:nth-child(9):checked ~ a,
    .rh-multiswitch__container label:nth-last-child(12) ~ input:nth-child(11):checked ~ a {
      box-shadow: -1px 0 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25); }
  .rh-multiswitch__container .rh-multiswitch__slide {
    position: absolute;
    left: 50%;
    z-index: 1;
    height: 100%;
    width: 50%;
    transition: left 0.1s ease-out;
    box-shadow: 1px 0 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    background: #0088ce;
    border: 1px solid #005f90; }


.multiswitch[data-theme="stoplight"] .slide-container > a {
  background: #c00;
  border-color: #8a0000; }

.multiswitch[data-theme="stoplight"] input:not(:first-child):checked ~ a {
  background: #ec7a08;
  border-color: #bc6106; }

.multiswitch[data-theme="stoplight"] label:nth-last-child(4) ~ input:nth-child(3):checked ~ a,
.multiswitch[data-theme="stoplight"] label:nth-last-child(6) ~ input:nth-child(5):checked ~ a,
.multiswitch[data-theme="stoplight"] label:nth-last-child(8) ~ input:nth-child(7):checked ~ a,
.multiswitch[data-theme="stoplight"] label:nth-last-child(10) ~ input:nth-child(9):checked ~ a,
.multiswitch[data-theme="stoplight"] label:nth-last-child(12) ~ input:nth-child(11):checked ~ a {
  background: #3f9c35;
  border-color: #307628; }
</style>

<slot></slot>`;
  }

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

Rhelement.create(RhMultiswitch);
