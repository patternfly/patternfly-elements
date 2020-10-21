// Import polyfills: startsWith
import "./polyfills--pfelement.js";

import { autoReveal } from "./reveal.js";
import { isAllowedType, isValidDefaultType } from "./attrDefValidators.js";

const prefix = "pfe";

class PFElement extends HTMLElement {
  /**
   * This prefix is prepended to the name of any attributes defined and managed by the base class.
   *
   * @example A "context" prop, when reflected as an attribute, prefixed with "pfe-g-": `<pfe-foo on="dark">`
   */
  static get _globalAttrPrefix() {
    return `${prefix}-g-`;
  }

  /**
   * This prefix is prepended to the name of attributes defined and managed by the component.
   *
   * @example A "color" prop, when reflected as an attribute, prefixed with "pfe-c-": `<pfe-foo pfe-c-color="accent">`
   */
  static get _attrPrefix() {
    return `${prefix}-c-`;
  }

  /**
   * A boolean value that indicates if the logging should be printed to the console; used for debugging.
   *
   * @example In a JS file or script tag: `PFElement._debugLog = true;`
   */
  static debugLog(preference = null) {
    if (preference !== null) {
      PFElement._debugLog = !!preference;
    }
    return PFElement._debugLog;
  }

  /**
   * A logging wrapper which checks the debugLog boolean and prints to the console if true.
   *
   * @example `PFElement.log("Hello")`
   */
  static log(...msgs) {
    if (PFElement.debugLog()) {
      console.log(...msgs);
    }
  }

  /**
   * Local logging that outputs the tag name as a prefix automatically
   *
   * @example In a component's function: `this.log("Hello")`
   */
  log(...msgs) {
    PFElement.log(`[${this.tag}]`, ...msgs);
  }

  /**
   * A console warning wrapper which formats your output with useful debugging information.
   *
   * @example `PFElement.warn("Hello")`
   */
  static warn(...msgs) {
    console.warn(...msgs);
  }

  /**
   * Local warning wrapper that outputs the tag name as a prefix automatically.
   *
   * @example In a component's function: `this.warn("Hello")`
   */
  warn(...msgs) {
    PFElement.warn(`[${this.tag}${this.id ? `#${this.id}` : ``}]`, ...msgs);
  }

  /**
   * A global definition of component types (a general way of defining the purpose of a
   * component and how it is put together).
   */
  static get PfeTypes() {
    return {
      Container: "container",
      Content: "content",
      Combo: "combo"
    };
  }

  /**
   * The current version of a component; set by the compiler using the package.json data.
   */
  static get version() {
    return "{{version}}";
  }

  /**
   * A local alias to the static version.
   *
   * @example: In the console: `PfeAccordion.version`
   */
  get version() {
    return this._pfeClass.version;
  }

  /**
   * Global property definitions: properties managed by the base class that apply to all components.
   */
  static get properties() {
    return {
      pfelement: {
        title: "Upgraded flag",
        type: Boolean,
        default: true,
        observer: "_upgradeObserver"
      },
      on: {
        title: "Context",
        description: "Describes the visual context (backgrounds).",
        type: String,
        values: ["light", "dark", "saturated"],
        default: el => el.contextVariable, // || "light",
        prefix: false,
        observer: "_onObserver"
      },
      context: {
        title: "Context hook",
        description: "Lets you override the system-set context.",
        type: String,
        values: ["light", "dark", "saturated"],
        observer: "_contextObserver"
      },
      // @TODO: Deprecate with 1.0
      oldTheme: {
        type: String,
        values: ["light", "dark", "saturated"],
        alias: "context",
        attr: "pfe-theme"
      },
      _style: {
        title: "Custom styles",
        type: String,
        attr: "style",
        observer: "_inlineStyleObserver"
      },
      type: {
        title: "Component type",
        type: String,
        values: ["container", "content", "combo"]
      }
    };
  }

  static get observedAttributes() {
    const properties = this.allProperties;
    if (properties) {
      const oa = Object.keys(properties)
        .filter(prop => properties[prop].observer || properties[prop].cascade || properties[prop].alias)
        .map(p => this._convertPropNameToAttrName(p));
      return [...oa];
    }
  }

  /**
   * A quick way to fetch a random ID value.
   * _Note:_ All values are prefixes with `pfe` automatically to ensure an ID-safe value is returned.
   *
   * @example: In a component's JS: `this.id = this.randomID;`
   */
  get randomId() {
    return (
      `${prefix}-` +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  /**
   * Set the --context variable with the provided value in this component.
   */
  set contextVariable(value) {
    this.cssVariable("context", value);
  }

  /**
   * Get the current value of the --context variable in this component.
   */
  get contextVariable() {
    // @TODO: Deprecate theme in 1.0
    return this.cssVariable("context") || this.cssVariable("theme");
  }

  /**
   * Returns a boolean statement of whether or not that slot exists in the light DOM.
   *
   * @example: `this.hasSlot("header")`
   */
  hasSlot(name) {
    if (!name) {
      this.warn(`Please provide at least one slot name for which to search.`);
      return;
    }

    switch (typeof name) {
      case "string":
        return (
          [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === name).length >
          0
        );
      case "array":
        return name.reduce(
          n =>
            [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === n).length >
            0
        );
      default:
        this.warn(
          `Did not recognize the type of the name provided to hasSlot; this funciton can accept a string or an array.`
        );
        return;
    }
  }

  /**
   * Returns an array with all the slot with the provided name defined in the light DOM.
   * If no value is provided (i.e., `this.getSlots()`), it returns all unassigned slots.
   *
   * @example: `this.hasSlot("header")`
   */
  getSlots(name = "unassigned") {
    if (name !== "unassigned") {
      return [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === name);
    } else {
      return [...this.children].filter(child => !child.hasAttribute("slot"));
    }
  }

  cssVariable(name, value, element = this) {
    name = name.substr(0, 2) !== "--" ? "--" + name : name;
    if (value) {
      element.style.setProperty(name, value);
      return value;
    }
    return (
      window
        .getComputedStyle(element)
        .getPropertyValue(name)
        .trim() || null
    );
  }

  /**
   * This alerts nested components to a change in the context
   */
  contextUpdate() {
    // If a value has been set, alert any nested children of the change
    [...this.querySelectorAll("*")]
      .filter(item => item.tagName.toLowerCase().startsWith("pfe-"))
      .map(child => {
        this.log(`Update context of ${child.tag}`);
        Promise.all([customElements.whenDefined(child.tagName.toLowerCase())]).then(() => {
          // Ask the component to recheck it's context in case it changed
          child.resetContext();
        });
      });
  }

  resetContext() {
    this.log(`Resetting context on ${this.tag}`);
    // Priority order for context values to be pulled from:
    //--> 1. pfe-g-context / pfe-theme
    //--> 2. --context / --theme
    let value = this.context || this.contextVariable;
    // if (this.on !== value) this.on = value;
    this.on = value;
  }

  constructor(pfeClass, { type = null, delayRender = false } = {}) {
    super();

    this.connected = false;
    this._pfeClass = pfeClass;
    this.tag = pfeClass.tag;

    // TODO: Deprecate for 1.0 release
    this.schemaProps = pfeClass.schemaProperties;
    // TODO: Migrate this out of schema for 1.0
    this.slots = pfeClass.slots;

    this._queue = [];
    this.template = document.createElement("template");

    // Set the default value to the passed in type
    if (type && this._pfeClass.allProperties.type) this._pfeClass.allProperties.type.default = type;

    // Throw a warning if the on attribute was manually added before upgrade
    if (this.hasAttribute("on")) {
      this.warn(
        `The "on" attribute is protected and should not be manually added to a component. The base class will manage this value for you on upgrade.`
      );
    }

    // Initalize the properties and attributes from the property getter
    this._initializeProperties();

    this.attachShadow({ mode: "open" });

    if (!delayRender) this.render();
  }

  /**
   * Standard connected callback; fires when the component is added to the DOM.
   */
  connectedCallback() {
    // @TODO Is this the same as Node.isConnected?
    this.connected = true;

    this._initializeAttributeDefaults();

    if (window.ShadyCSS) window.ShadyCSS.styleElement(this);

    // @TODO deprecate for 1.0
    if (typeof this.schemaProps === "object" && typeof this._pfeClass.properties !== "object")
      this._mapSchemaToProperties(this.tag, this.schemaProps);

    // @TODO deprecate for 1.0
    if (typeof this.slots === "object") this._mapSchemaToSlots(this.tag, this.slots);

    // @TODO is this being used?
    if (this._queue.length) this._processQueue();
  }

  /**
   * Standard disconnected callback; fires when a componet is removed from the DOM.
   * Add your removeEventListeners here.
   */
  disconnectedCallback() {
    this.connected = false;
  }

  /**
   * Attribute changed callback fires when attributes are updated.
   * This combines the global and the component-specific logic.
   */
  attributeChangedCallback(attr, oldVal, newVal) {
    if (this._pfeClass.cascadingAttributes) {
      const cascadeTo = this._pfeClass.cascadingAttributes[attr];
      if (cascadeTo) {
        this._copyAttribute(attr, cascadeTo);
      }
    }

    if (!this._pfeClass.allProperties) {
      return;
    }

    let propName = this._pfeClass._attr2prop(attr);

    const propDef = this._pfeClass.allProperties[propName];

    // If the attribute that changed derives from a property definition
    if (propDef) {
      // If the property/attribute pair has an observer, fire it
      // Observers receive the oldValue and the newValue from the attribute changed callback
      if (propDef.observer) {
        this[propDef.observer](this._castPropertyValue(propDef, oldVal), this._castPropertyValue(propDef, newVal));
      }

      // If the property/attribute pair has an alias, copy the new value to the alias target
      if (propDef.alias) {
        const aliasedPropDef = this._pfeClass.allProperties[propDef.alias];
        const aliasedAttr = this._pfeClass._prop2attr(propDef.alias);
        const aliasedAttrVal = this.getAttribute(aliasedAttr);
        if (aliasedAttrVal !== newVal) {
          this[propDef.alias] = this._castPropertyValue(aliasedPropDef, newVal);
        }
      }

      // If the property/attribute pair has a cascade target, copy the attribute to the matching elements
      if (propDef.cascade) {
        this._copyAttribute(attr, propDef.cascade);
      }
    }
  }

  /**
   * Standard render function.
   */
  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    // Cascade attributes after the template is added
    if (this._pfeClass.cascadingAttributes) {
      const cascadeTo = this._pfeClass.cascadingAttributes[attr];
      if (cascadeTo) {
        this._copyAttribute(attr, cascadeTo);
      }
    }
  }

  /**
   * A wrapper around an event dispatch to standardize formatting.
   */
  emitEvent(name, { bubbles = true, cancelable = false, composed = false, detail = {} } = {}) {
    this.log(`Custom event: ${name}`);
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles,
        cancelable,
        composed,
        detail
      })
    );
  }

  /* --- Observers for global properties --- */

  /**
   * This responds to changes in the pfelement attribute; indicates if the component upgraded
   * @TODO maybe we should use just the attribute instead of the class?
   * https://github.com/angular/angular/issues/15399#issuecomment-318785677
   */
  _upgradeObserver() {
    this.classList.add("PFElement");
  }

  /**
   * This responds to changes in the context attribute; manual override tool
   */
  _contextObserver(oldValue, newValue) {
    console.log({ oldValue, newValue });
    if (newValue && ((oldValue && oldValue !== newValue) || !oldValue)) {
      this.on = newValue;
      this.cssVariable("context", newValue);
    }
  }

  /**
   * This responds to changes in the context; source of truth for components
   */
  _onObserver(oldValue, newValue) {
    if ((oldValue && oldValue !== newValue) || (newValue && !oldValue)) {
      // Fire an event for child components
      this.contextUpdate();
    }
  }

  /**
   * This responds to inline style changes and greps for context or theme updates.
   */
  _inlineStyleObserver(oldValue, newValue) {
    this.log(`Style observer activated on ${this.tag}`);
    let newTheme = "";
    // Grep for context/theme
    const regex = /--(?:context|theme):\s*(?:\"*(light|dark|saturated)\"*)/gi;
    let found = regex.exec(newValue);
    if (found) {
      newTheme = found[1];
      // If the new theme value differs from the on value, update the context
      if (newTheme !== this.on && !this.context) this.on = newTheme;
    }
  }
  /* --- End observers --- */

  /**
   * Validate that the property meets the requirements for type and naming.
   */
  static _validateProperties() {
    for (let propName in this.allProperties) {
      const propDef = this.allProperties[propName];

      // Verify that properties conform to the allowed data types
      if (!isAllowedType(propDef)) {
        throw new Error(
          `Property "${propName}" on ${this.constructor.name} must have type String, Number, or Boolean.`
        );
      }

      // Verify the property name conforms to our naming rules
      if (!/^[a-z_]/.test(propName)) {
        throw new Error(
          `Property ${this.name}.${propName} defined, but prop names must begin with a lower-case letter or an underscore`
        );
      }
    }
  }

  /**
   * Convert provided property value to the correct type as defined in the properties method.
   */
  _castPropertyValue(propDef, attrValue) {
    switch (propDef.type) {
      case Number:
        // map various attribute string values to their respective
        // desired property values
        return {
          [attrValue]: Number(attrValue),
          null: null,
          NaN: NaN,
          undefined: undefined
        }[attrValue];

      case Boolean:
        return attrValue !== null;

      case String:
        return {
          [attrValue]: attrValue,
          undefined: undefined
        }[attrValue];

      default:
        return attrValue;
    }
  }

  /**
   * Map provided value to the attribute name on the component.
   */
  _assignValueToAttribute(obj, attr, value) {
    // If the default is false and the property is boolean, we don't need to do anything
    const isBooleanFalse = obj.type === Boolean && !value;
    const isNull = value === null;
    const isUndefined = typeof value === "undefined";

    // If the attribute is not defined, set the default value
    if (isBooleanFalse || isNull || isUndefined) {
      this.removeAttribute(attr);
    } else {
      // Boolean values get an empty string: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
      if (obj.type === Boolean && typeof value === "boolean") {
        this.setAttribute(attr, "");
      } else {
        // Validate against the provided values
        if (obj.values) {
          this._validateAttributeValue(obj, value);
        }

        // Still accept the value provided even if it's not valid
        this.setAttribute(attr, value);
      }
    }
  }

  /**
   * Sets up the property definitions based on the properties method.
   */
  _initializeProperties() {
    const properties = this._pfeClass.allProperties;
    for (let propName in properties) {
      const propDef = properties[propName];

      // Check if the property exists, throw a warning if it does.
      // HTMLElements have a LOT of properties; it wouldn't be hard
      // to overwrite one accidentally.
      if (typeof this[propName] !== "undefined") {
        this.log(
          `Property "${propName}" on ${this.constructor.name} cannot be defined because the property name is reserved`
        );
      } else {
        const attrName = this._pfeClass._prop2attr(propName);

        Object.defineProperty(this, propName, {
          get: () => {
            const attrValue = this.getAttribute(attrName);

            return this._castPropertyValue(propDef, attrValue);
          },
          set: rawNewVal => {
            // Assign the value to the attribute
            this._assignValueToAttribute(propDef, attrName, rawNewVal);

            return rawNewVal;
          },
          writeable: true,
          enumerable: true,
          configurable: false
        });
      }
    }
  }

  /**
   * Intialize the default value for an attribute.
   */
  _initializeAttributeDefaults() {
    const properties = this._pfeClass.allProperties;

    for (let propName in properties) {
      const propDef = properties[propName];

      const attrName = this._pfeClass._prop2attr(propName);

      if (propDef.hasOwnProperty("default")) {
        let value = propDef.default;

        // Check if default is a function
        if (typeof propDef.default === "function") {
          value = propDef.default(this);
        }

        // Assign the value to the attribute
        if (!this.hasAttribute(attrName)) this._assignValueToAttribute(propDef, attrName, value);
      }
    }
  }

  /**
   * Validate the value against provided values.
   */
  // @TODO this needs a test added; currently only supports values as an array
  // @TODO add support for a validation function
  _validateAttributeValue(propDef, value) {
    if (
      typeof propDef.values === "array" &&
      propDef.values.length > 0 &&
      !propDef.values.includes(value) // ||
      // (typeof propDef.values === "string" && propDef.values !== value) ||
      // (typeof propDef.values === "function" && !propDef.values(value))
    ) {
      console.warn(
        `[${
          this.tag
        }]: ${value} is not a valid value for ${attrName}. Please provide one of the following values: ${propDef.values.join(
          ","
        )}`
      );
    }

    return value;
  }

  /**
   * Look up an attribute name linked to a given property name.
   */
  static _prop2attr(propName) {
    return this._getCache("prop2attr")[propName];
  }

  /**
   * Look up an property name linked to a given attribute name.
   */
  static _attr2prop(attrName) {
    return this._getCache("attr2prop")[attrName];
  }

  /**
   * Convert a property name to an attribute name.
   */
  static _convertPropNameToAttrName(propName) {
    const propDef = this.allProperties[propName];

    if (propDef.attr) {
      return propDef.attr;
    }

    // if the property is a global one, use the global attribute name prefix,
    // otherwise use the component attribute name prefix.
    const prefix = PFElement.properties[propName] ? this._globalAttrPrefix : this._attrPrefix;
    const attrPrefix = propDef.prefix === false ? "" : prefix;
    return (
      attrPrefix +
      propName
        .replace(/^_/, "")
        .replace(/^[A-Z]/, l => l.toLowerCase())
        .replace(/[A-Z]/g, l => `-${l.toLowerCase()}`)
    );
  }

  /**
   * Convert an attribute name to a property name.
   */
  static _convertAttrNameToPropName(attrName) {
    // when converting attribute name to property name, we can attempt to
    // remove the prefix without knowing yet if the property is prefixed.  if
    // no prefix is there, nothing changes, so it's a harmless operation
    // (famous last words).
    for (let prop in this.allProperties) {
      if (this.allProperties[prop].attr === attrName) {
        return prop;
      }
    }

    const attrPrefix = this._attrPrefix;
    const propName = attrName
      .replace(new RegExp(`^${attrPrefix}`), "")
      .replace(/-([A-Za-z])/g, l => l[1].toUpperCase());
    return propName;
  }

  _copyAttribute(name, to) {
    const recipients = [...this.querySelectorAll(to), ...this.shadowRoot.querySelectorAll(to)];
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  static create(pfe) {
    pfe._createCache();
    pfe._populateCache(pfe);
    pfe._validateProperties();
    window.customElements.define(pfe.tag, pfe);
  }

  static _createCache() {
    this._cache = {
      properties: {},
      globalProperties: {},
      componentProperties: {},
      attr2prop: {},
      prop2attr: {}
    };
  }

  /**
   * Cache an object in a given cache namespace.  This overwrites anything
   * already in that namespace.
   */
  static _setCache(namespace, object) {
    this._cache[namespace] = object;
  }

  /**
   * Get a cached object by namespace, or get all cached objects.
   */
  static _getCache(namespace) {
    return namespace ? this._cache[namespace] : this._cache;
  }

  /**
   * Populate initial values for properties cache.
   */
  static _populateCache(pfe) {
    // @TODO add a warning when a component property conflicts with a global property.
    const mergedProperties = { ...pfe.properties, ...PFElement.properties };

    pfe._setCache("componentProperties", pfe.properties);
    pfe._setCache("globalProperties", PFElement.properties);
    pfe._setCache("properties", mergedProperties);

    // create mapping objects to go from prop name to attrname and back
    const prop2attr = {};
    const attr2prop = {};
    for (let propName in mergedProperties) {
      const attrName = this._convertPropNameToAttrName(propName);
      prop2attr[propName] = attrName;
      attr2prop[attrName] = propName;
    }
    pfe._setCache("attr2prop", attr2prop);
    pfe._setCache("prop2attr", prop2attr);
  }

  /**
   * allProperties returns an object containing PFElement's global properties
   * and the descendents' (such as PfeCard, etc) component properties.  The two
   * objects are merged together and in the case of a property name conflict,
   * PFElement's properties override the component's properties.
   */
  static get allProperties() {
    return this._getCache("properties");
  }

  // TODO: Deprecate for 1.0
  // Map the imported properties json to real schemaProps on the element
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToProperties(tag, properties) {
    this.log("Mapping properties...");
    // Loop over the properties provided by the schema
    Object.keys(properties).forEach(attr => {
      let data = properties[attr];

      // Only attach the information if the data provided is a schema object
      if (typeof data === "object") {
        // Prefix default is true
        let hasPrefix = true;
        let attrName = attr;
        // Set the attribute's property equal to the schema input
        this[attr] = data;
        // Initialize the value to null
        this[attr].value = null;

        if (typeof this[attr].prefixed !== "undefined") {
          hasPrefix = this[attr].prefixed;
        }

        if (hasPrefix) {
          attrName = `${prefix}-c-${attr}`;
        }

        // If the attribute exists on the host
        if (this.hasAttribute(attrName)) {
          // Set property value based on the existing attribute
          this[attr].value = this.getAttribute(attrName);
        }
        // Otherwise, look for a default and use that instead
        else if (data.default) {
          const dependency_exists = this._hasDependency(tag, data.options);
          const no_dependencies = !data.options || (data.options && !data.options.dependencies.length);
          // If the dependency exists or there are no dependencies, set the default
          if (dependency_exists || no_dependencies) {
            this.setAttribute(attrName, data.default);
            this[attr].value = data.default;
          }
        }
      }
    });

    this.log("Properties mapped.");
  }

  // TODO: Deprecate for 1.0?
  // Test whether expected dependencies exist
  _hasDependency(tag, opts) {
    // Get any possible dependencies for this attribute to exist
    let dependencies = opts ? opts.dependencies : [];
    // Initialize the dependency return value
    let hasDependency = false;
    // Check that dependent item exists
    // Loop through the dependencies defined
    for (let i = 0; i < dependencies.length; i += 1) {
      const slot_exists = dependencies[i].type === "slot" && this.getSlots(`${tag}--${dependencies[i].id}`).length > 0;
      const attribute_exists =
        dependencies[i].type === "attribute" && this.getAttribute(`${prefix}-${dependencies[i].id}`);
      // If the type is slot, check that it exists OR
      // if the type is an attribute, check if the attribute is defined
      if (slot_exists || attribute_exists) {
        // If the slot does exist, add the attribute with the default value
        hasDependency = true;
        // Exit the loop
        break;
      }
    }
    // Return a boolean if the dependency exists
    return hasDependency;
  }

  // TODO: Update this for new, no schema approach
  // Map the imported slots json
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToSlots(tag, slots) {
    this.log("Validate slots...");
    // Loop over the properties provided by the schema
    Object.keys(slots).forEach(slot => {
      let slotObj = slots[slot];

      // Only attach the information if the data provided is a schema object
      if (typeof slotObj === "object") {
        let slotExists = false;
        let result = [];
        // If it's a named slot, look for that slot definition
        if (slotObj.namedSlot) {
          // Check prefixed slots
          result = this.getSlots(`${tag}--${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }

          // Check for unprefixed slots
          result = this.getSlots(`${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
          // If it's the default slot, look for direct children not assigned to a slot
        } else {
          result = [...this.children].filter(child => !child.hasAttribute("slot"));

          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
        }

        // If the slot exists, attach an attribute to the parent to indicate that
        if (slotExists) {
          this.setAttribute(`has_${slot}`, "");
        } else {
          this.removeAttribute(`has_${slot}`);
        }
      }
    });
    this.log("Slots validated.");
  }

  _queueAction(action) {
    this._queue.push(action);
  }

  _processQueue() {
    this._queue.forEach(action => {
      this[`_${action.type}`](action.data);
    });

    this._queue = [];
  }

  /**
   * Set a given property name to the given value.  This is used when setting
   * reflected properties.  Reflected properties are created when an attribute
   * definition includes `reflect: true`, and have two-way binding with their
   * respective attributes.
   *
   * The two-way binding is mediated by a type-casting system.  Attribute
   * definitions can be String, Number, or Boolean.  This is complicated by the
   * fact that attribute values can only be strings.  To overocme that limitation,
   */
  // _propertySetter({ name, value }) {
  //   const propDef = this._pfeClass.allProperties[name];
  //   const oldVal = this._________TOP_SECRET__[name];
  //   // attempt to cast the new value to the new value's type
  //   const castVal =
  //     propDef.type === Boolean
  //       ? { true: true, false: false }[value] || false
  //       : propDef.type(value);
  //   console.log(
  //     `${this.constructor.name}.allProperties.${name} setter was ${oldVal}, received ${value}, cast it to ${propDef.type.name} which returned ${castVal}`
  //   );

  //   // bail early if the value didn't change
  //   if (oldVal === castVal) {
  //     console.log(
  //       `${this.constructor.name}.allProperties.${name} assigned a value equal to its old value, skipping rest of the setter`
  //     );
  //     return;
  //   }

  //   // do a type check before anything else
  //   if (castVal.constructor !== propDef.type) {
  //     console.warn(
  //       `can't set ${propDef.type.name} attribute ${this.constructor.name}.allProperties.${name} to ${castVal}, a ${castVal.constructor.name} value`
  //     );
  //     return;
  //   }

  //   if (propDef.observer && this[propDef.observer]) {
  //     this[propDef.observer].call(this, oldVal, castVal);
  //   }

  //   this._________TOP_SECRET__[name] = castVal;

  //   // if reflected, update the attribute as well.
  //   if (propDef.reflect && propDef.type === Boolean && castVal === false) {
  //     // for boolean properties, if they're set to false, remove the attribute instead of setting `attrName="false"`
  //     console.log(
  //       `Boolean property ${
  //         this.constructor.name
  //       }.allProperties.${name} set to false; removing attribute ${prop2attr(
  //         name,
  //         this._pfeClass.attrPrefix
  //       )}`
  //     );
  //     this.removeAttribute(prop2attr(name, this._pfeClass.attrPrefix));
  //   } else if (propDef.reflect) {
  //     console.log(
  //       `property ${
  //         this.constructor.name
  //       }.allProperties.${name} set to ${castVal}; updating attribute ${prop2attr(
  //         name,
  //         this._pfeClass.attrPrefix
  //       )}`
  //     );
  //     this.setAttribute(prop2attr(name, this._pfeClass.attrPrefix), castVal);
  //   }
  //   this[name] = value;
  // }
}

autoReveal(PFElement.log);

export default PFElement;
