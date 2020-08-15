import PFElement from "../../pfelement/dist/pfelement.js";
import PfeSelect from "../../pfe-select/dist/pfe-select.js";

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
      import: `${this.tag}:import`,
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

  loadSchema(input) {
    if (
      typeof input === "object" &&
      input.$schema.startsWith("http://json-schema.org")
    ) {
      this.schema = input;

      this.emitEvent(PfeSchemaEditor.events.import, {
        detail: {
          schema: input
        }
      });
    } else {
      // @TODO :)
      this.warn("Tis not a schema...");
    }
  }

  constructor() {
    super(PfeSchemaEditor, { type: PfeSchemaEditor.PfeType });

    this.schema = {};

    this._init = this._init.bind(this);
    this._buildHeader = this._buildHeader.bind(this);
    this._buildItem = this._buildItem.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._container = this.shadowRoot.querySelector(
      ".pfe-schema-editor--container"
    );

    // If you need to initialize any attributes, do that here
    this._init();

    this.addEventListener(PfeSchemaEditor.events.import, this._importHandler);
    this.addEventListener(PfeSchemaEditor.events.export, this._exportHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(
      PfeSchemaEditor.events.import,
      this._importHandler
    );
    this.removeEventListener(
      PfeSchemaEditor.events.export,
      this._exportHandler
    );
  }

  _buildHeader(template, object) {
    // Set up the header
    let clone = template.content.cloneNode(true);
    if (!clone) return;

    let header = clone.querySelector(".toggle--header");
    let field;

    if (header) {
      field = header.getAttribute("data-content");
      header.textContent = object[field];
    }

    let description = clone.querySelector(".toggle--description");

    if (description) {
      field = description.getAttribute("data-content");
      description.textContent = object[field];
    }

    if (object.collapsible) {
      clone.setAttribute("collapsible", "");
    } else {
      clone.querySelector(".toggle").setAttribute("disabled", "");
    }

    let dropdown = clone.querySelector(".pf-c-options-menu__menu");
    Object.keys(object.properties).map(prop => {
      let title = object.properties[prop].title;
      if (!title) title = prop;
      let item = document.createElement("li");
      let button = document.createElement("button");
      button.setAttribute("class", "pf-c-options-menu__menu-item");
      button.type = "button";
      button.innerText = title;
      button.value = prop;
      // Attach elements
      item.appendChild(button);
      dropdown.appendChild(item);
    });

    return clone;
  }

  _buildItem(template, object) {
    console.log("Build item");
    console.log(template);
    console.log(object);

    // Set up the header
    let field;
    const clone = template.content.cloneNode(true);

    // [ header.querySelector(".toggle--header") ].forEach((el) => {
    //   field = el.getAttribute("data-content");
    //   el.textContent = object[field];
    // });

    console.dir(clone);

    return clone;
  }

  _init() {
    // Parse schema
    console.log("Init");
    console.log(this.schema);

    if (
      typeof this.schema === "object" &&
      Object.keys(this.schema).length > 0
    ) {
      // @TODO: update specific fields only?
      // this._container.innerHTML = "";

      // Set up the header
      this._container.appendChild(
        this._buildHeader(this.shadowRoot.querySelector("#header"), this.schema)
      );

      // Loop over each item in the properties
      Object.entries(this.schema.properties).forEach(item => {
        let props = item[1];
        let type = props.type;
        let hidden = props.options && props.options.hidden ? true : false;
        if (props.format) {
          type += `-${props.format}`;
        }

        // Use type to get template
        if (!hidden) {
          this._buildItem(this.shadowRoot.querySelector(`#${type}`), props);
        }
      });
    }
  }

  _importHandler(event) {
    console.log("Import schema");
    this._init();
  }

  _exportHandler(event) {
    this.emitEvent(PfeSchemaEditor.events.export, {
      detail: {}
    });
  }
}

PFElement.create(PfeSchemaEditor);

export default PfeSchemaEditor;
