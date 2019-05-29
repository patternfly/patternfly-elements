import PFElement from "../pfelement/pfelement.js";
import PfeIconSet from "../pfe-icon-set/pfe-icon-set.js";

class PfeIcon extends PFElement {
  static get tag() {
    return "pfe-icon";
  }

  get templateUrl() {
    return "pfe-icon.html";
  }

  get styleUrl() {
    return "pfe-icon.scss";
  }

  static get observedAttributes() {
    return ["pfe-icon"];
  }

  static iconSetInstalled(setName) {
    return document.body.querySelector(
      `pfe-icon-set[pfe-set-name='${setName}']`
    );
  }

  static startLoading(name) {
    const alreadyLoading = PfeIcon.currentlyLoading.has(name);

    if (alreadyLoading) {
    } else {
      PfeIcon.currentlyLoading.add(name);
    }

    fetch(/* TODO write get path code*/)
      .then(rsp => rsp.text())
      .then(PfeIcon.completeLoading);
  }

  static completeLoading(name, text) {
    PfeIcon.currentlyLoading.delete(name);
    /* TODO inject SVG into somewhere (head?) */
  }

  constructor() {
    super(PfeIcon);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    if (attr == "pfe-icon" && oldValue !== newValue) {
      this.handleNewIcon(newValue);
    }
  }

  handleNewIcon(iconAttr) {
    const [set, ...icon] = iconAttr.split("-");
    console.log(set, icon);
  }
}

PfeIcon.currentlyLoading = new Set();

PFElement.create(PfeIcon);

export default PfeIcon;
