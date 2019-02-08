import e from "../pfelement/pfelement.js";
import "../pfe-icon/pfe-icon.js";
class n extends e {
  get html() {
    return '<style>:host {\n  display: flex;\n  align-content: flex-start;\n  flex-direction: column; }\n  @media (min-width: 576px) {\n    :host {\n      flex-direction: row; } }\n\n:host pfe-icon {\n  --pfe-icon--spacing:                 var(--pfe-theme--container-spacer, 1rem);\n  --pfe-icon--size:                    var(--pfe-theme--icon-size, 64px);\n  margin-right: var(--pfe-icon--spacing);\n  font-size: var(--pfe-icon--size);\n  line-height: var(--pfe-icon--size);\n  padding: 0.05em;\n  min-width: var(--pfe-icon--size);\n  max-width: var(--pfe-icon--size); }\n\n:host ::slotted([slot="header"]),\n:host ::slotted([slot="footer"]) {\n  display: block; }\n\n:host ::slotted([slot="footer"]) {\n  margin-top: 1em; }\n\n:host([stacked]) {\n  flex-direction: column !important; }\n\n:host([stacked][centered]) {\n  align-items: center;\n  text-align: center; }</style>\n<pfe-icon></pfe-icon>\n<div class="content">\n  <slot class="header" name="header"></slot>\n  <slot class="body"></slot>\n  <slot class="footer" name="footer"></slot>\n</div>';
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
    return { icon: "pfe-icon", circled: "pfe-icon" };
  }
  constructor() {
    super(n);
  }
}
e.create(n);
//# sourceMappingURL=pfe-icon-panel.js.map
