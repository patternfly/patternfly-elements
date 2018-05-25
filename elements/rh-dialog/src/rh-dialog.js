import Rhelement from "../rhelement/rhelement.js";
import dialogPolyfill from "../../dialog-polyfill/dialog-polyfill.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-dialog.html and css from
 * cp-dialog.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhDialog extends Rhelement {
  constructor() {
    super("rh-dialog", template);
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

window.customElements.define("rh-dialog", RhDialog);
