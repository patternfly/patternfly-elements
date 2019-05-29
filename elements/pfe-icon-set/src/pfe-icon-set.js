import PFElement from "../pfelement/pfelement.js";

class PfeIconSet extends PFElement {
  static get tag() {
    return "pfe-icon-set";
  }

  get templateUrl() {
    return "pfe-icon-set.html";
  }

  get styleUrl() {
    return "pfe-icon-set.scss";
  }

  static get builtIns() {
    return [
      {
        name: "web",
        path:
          "https://github.com/RedHatOfficial/rh-iconfont/blob/master/src/iconfont/vectors/web_icon"
      },
      {
        name: "rh",
        path:
          "https://raw.githubusercontent.com/RedHatOfficial/rh-iconfont/master/src/iconfont/vectors/rh_icon"
      }
    ];
  }

  /**
   * Register a new icon set.
   * @param {String} name the namespace of the icon set
   * @param {String} path the web-accessible path to the icon set (for instance, a CDN)
   * @param {Function} resolver an optional function to combine the path and an icon name into a final path.  The function will be passed the namespaced icon name (for example, "rh-api" where rh is the namespace and api is the individual icon's name)
   * @returns {Object} an object with the status of the icon set installation, such as `{ result: true, text: 'icon set installed' }` or `{ result: false, text: 'icon set is already installed' }`
   */
  static register(name, path, nameResolver = identity) {
    // TODO create the pfe-icon-set and add it to the DOM
  }

  /**
   * Get info about an installed icon set.  You can use this function to determine if an icon set is already installed.
   * @param {String} name the namespace of the icon set
   * @return {PfeIconSet|null} the pfe-icon-set element, if it's installed
   */
  static getIconSet(name) {
    return document.body.querySelector(`pfe-icon-set[pfe-name='${name}']`);
  }

  /**
   * The default name resolver function.
   * @param {String} name the name of the icon, as passed into `<pfe-icon pfe-name="..."></pfe-icon>`
   */
  static defaultNameResolver(name) {
    const path = set.path;
    const [, setName, iconName] = /^([^-]+)-(.*)/.exec(name);

    // get the icon set, and bail if it doesn't exist
    const set = this.getIconSet(setName);
    if (!set) return;

    const path = set.path;

    return {
      setName,
      iconName,
      iconPath: `${path}/${setName}_icon/${setName}-icon-${iconName}.svg`
    };
  }

  /**
   * Set the name resolver function for this icon set.
   *
   * Name resolvers take an icon-set's path and an icon's name and merge them into a full path to the icon.  They exist so pfe-icon-set can be customized to work with various sets of icons that have customized naming conventions and directory structures.
   */
  setNameResolver(nameResolver = PfeIconSet.defaultNameResolver) {
    this.nameResolver = nameResolver;
  }

  /**
   * Get a path to a given icon.
   */
  static getIcon(name) {
    const setName = name.split("-")[0];
    const set = this.getIconSet(setName);
    return set.defaultNameResolver(name).iconPath;
  }

  // const isBuiltIn = PfeIconSet.builtIns.includes(setName);

  static get observedAttributes() {
    return ["pfe-name", "pfe-path"];
  }

  constructor() {
    super(PfeIconSet);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-name":
        this.name = newValue;
      case "pfe-path":
        this.path = newValue;
        break;
    }
  }
}

PFElement.create(PfeIconSet);

export default PfeIconSet;
