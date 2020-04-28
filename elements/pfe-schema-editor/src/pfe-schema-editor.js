import PFElement from "../../pfelement/dist/pfelement.js";

class PfeSchemaEditor extends PFElement {
  static get tag() {
    return "pfe-schema-editor";
  }

  get schemaUrl() {
    return "pfe-schema-editor.json";
  }

  get templateUrl() {
    return "pfe-schema-editor.html";
  }

  get styleUrl() {
    return "pfe-schema-editor.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      export: `${this.tag}:export`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeSchemaEditor, { type: PfeSchemaEditor.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeSchemaEditor.events.change, this._changeHandler);
    this.addEventListener(PfeSchemaEditor.events.export, this._exportHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(
      PfeSchemaEditor.events.change,
      this._changeHandler
    );
    this.removeEventListener(
      PfeSchemaEditor.events.export,
      this._exportHandler
    );
  }

  _changeHandler(event) {
    this.emitEvent(PfeSchemaEditor.events.change, {
      detail: {}
    });
  }
  _exportHandler(event) {
    this.emitEvent(PfeSchemaEditor.events.export, {
      detail: {}
    });
  }
}

PFElement.create(PfeSchemaEditor);

export default PfeSchemaEditor;
