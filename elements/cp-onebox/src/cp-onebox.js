import RhOnebox from "../rh-onebox/rh-onebox.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-onebox.html and css from
 * cp-onebox.scss
 */
const template = document.createElement("template");
const bindTemplate = data => {
  template.innerHTML = ``;
  return template;
};
/* end DO NOT EDIT */

class CpOnebox extends RhOnebox {
  constructor() {
    super("cp-onebox", {
      template: bindTemplate,
      arrayName: "rules",
      matchArrayName: "keywords"
    });

    this.expandButton = null;
    this.expanded = false;
    this.expandButtonHandler = this.expandButtonHandler.bind(this);
  }

  render() {
    super.render();

    this.expandButton = this.shadowRoot.querySelector("#expandButton");
    this.expandButton.addEventListener("click", this.expandButtonHandler);
  }

  expandButtonHandler() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
}

window.customElements.define("cp-onebox", CpOnebox);
