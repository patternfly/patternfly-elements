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

class CpDialog extends Rhelement {
  constructor() {
    super("cp-dialog", template);
  }

  connectedCallback() {
    super.connectedCallback();

    const dialog = this.shadowRoot.querySelector("dialog");
    dialogPolyfill.registerDialog(dialog);
    console.log(dialogPolyfill);

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

window.customElements.define("cp-dialog", CpDialog);
