import PFElement from "../pfelement/pfelement.js";
import "../pfe-icon/pfe-icon.js";

class PfeIconPanel extends PFElement {
  get html() {
    return `<style>:host {
  display: flex;
  align-content: flex-start;
  flex-direction: column; }
  @media (min-width: 576px) {
    :host {
      flex-direction: row; } }

:host pfe-icon {
  --pfe-icon--spacing:                 var(--pfe-theme--container-spacer, 1rem);
  --pfe-icon--size:                    var(--pfe-theme--icon-size, 64px);
  margin-right: var(--pfe-icon--spacing);
  font-size: var(--pfe-icon--size);
  line-height: var(--pfe-icon--size);
  padding: 0.05em;
  min-width: var(--pfe-icon--size);
  max-width: var(--pfe-icon--size); }

:host ::slotted([slot="header"]),
:host ::slotted([slot="footer"]) {
  display: block; }

:host ::slotted([slot="footer"]) {
  margin-top: 1em; }

:host([stacked]) {
  flex-direction: column !important; }

:host([stacked][centered]) {
  align-items: center;
  text-align: center; }</style>
<pfe-icon></pfe-icon>
<div class="content">
  <slot class="header" name="header"></slot>
  <slot class="body"></slot>
  <slot class="footer" name="footer"></slot>
</div>`;
  }

  static get tag() {
    return "pfe-icon-panel";
  }

  get styleUrl() {
    return "pfe-icon-panel.scss";
  }

  get templateUrl() {
    return "pfe-icon-panel.html";
  }

  static get observedAttributes() {
    return ["icon", "circled"];
  }

  static get cascadingAttributes() {
    return {
      icon: "pfe-icon",
      circled: "pfe-icon"
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);
//# sourceMappingURL=pfe-icon-panel.js.map
