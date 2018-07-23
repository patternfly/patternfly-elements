import Rhelement from "../rhelement/rhelement.js";
import "../../dialog-polyfill/dialog-polyfill.js";

class RhDialog extends Rhelement {
  get html() {
    return `
<style>
dialog {
  position: absolute;
  left: 0;
  right: 0;
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 1em;
  background: white;
  color: black;
  display: block; }

dialog:not([open]) {
  display: none; }

dialog + .backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1); }

._dialog_overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; }

dialog.fixed {
  position: fixed;
  top: 50%;
  transform: translate(0, -50%); }
</style>

<dialog>
    <slot></slot>
  </dialog>`;
  }

  static get tag() {
    return "rh-dialog";
  }

  get styleUrl() {
    return "rh-dialog.scss";
  }

  get templateUrl() {
    return "rh-dialog.html";
  }

  constructor() {
    super(RhDialog.tag);
  }

  connectedCallback() {
    super.connectedCallback();

    const dialog = this.shadowRoot.querySelector("dialog");
    dialogPolyfill.registerDialog(dialog);

    const openButton = document.querySelector(
      this.getAttribute("data-trigger")
    );

    const cancelButton = document.querySelector("#cancel");

    openButton.addEventListener("click", function() {
      dialog.showModal();
    });

    cancelButton.addEventListener("click", function() {
      dialog.close();
    });
  }

  disconnectedCallback() {}
}

Rhelement.create(RhDialog);
