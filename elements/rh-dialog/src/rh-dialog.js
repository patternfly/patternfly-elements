import RHElement from "../rhelement/rhelement.js";
import "../../dialog-polyfill/dialog-polyfill.js";

class RhDialog extends RHElement {
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

RHElement.create(RhDialog);
