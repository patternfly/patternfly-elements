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

  /**
   * Register a new icon set.
   * @param {String} name the namespace of the icon set
   * @param {String} path the web-accessible path to the icon set (for instance, a CDN)
   * @param {Function} resolver an optional function to combine the path and an icon name into a final path.  The function will be passed the namespaced icon name (for example, "rh-api" where rh is the namespace and api is the individual icon's name)
   * @returns {Object} an object with the status of the icon set installation, such as `{ result: true, text: 'icon set installed' }` or `{ result: false, text: 'icon set is already installed' }`
   */
  static register(name, path, nameResolver = this.defaultNameResolver) {
    if (this.getIconSet(name) == null) {
      console.log(`${name} icon set: registering`);
      const setEl = document.createElement(this.tag);
      setEl.setNameResolver(nameResolver);
      setEl.setAttribute("pfe-name", name);
      setEl.setAttribute("pfe-path", path);
      document.body.appendChild(setEl);
    } else {
      console.warn(
        `${name} icon set: can't register because it is already registered`
      );
    }
  }

  /**
   * Get info about an installed icon set.  You can use this function to determine if an icon set is already installed.
   * @param {String} name the namespace of the icon set
   * @return {PfeIconSet|null} the pfe-icon-set element, if it's installed
   */
  static getIconSet(name) {
    return document.body.querySelector(
      `body > pfe-icon-set[pfe-name='${name}']`
    );
  }

  /**
   * Generate an ID for a given icon name.
   * @param {String} iconName the name of the icon, ex `web-check`
   * @return {String} a generated name for the svg
   */
  // static getIconId(name) {
  //   return `pfe-icon-set--${name}`;
  // }

  static loadIcon(name) {
    console.log(`${name} icon: loading`);

    const setName = this.getSetName(name);
    const set = this.getIconSet(setName);

    if (!set) {
      console.log(`${name} icon: can't load, set does not exist`);
      return;
    }

    if (this.getIconElement(name)) {
      console.log(`${name} icon: already installed, skipping fetch`);
      return;
    }

    console.log(`${name} icon: not yet installed`);

    const isAlreadyLoading = this.pendingIcons[name];

    if (isAlreadyLoading) {
      console.log(`${name} icon: already being fetched`);
    }

    if (!isAlreadyLoading) {
      console.log(
        `${name} icon: fetching (not already installed and not already fetching)`
      );
      this.pendingIcons[name] = true;
      set.fetchIcon(name);
    }
  }

  /**
   * Get an icon's DOM element, if it it exists.  This is also a good way to check if an icon has been installed.
   */
  static getIconElement(name) {
    const setName = this.getSetName(name);
    const set = this.getIconSet(setName);
    if (set) {
      return set.querySelector(`#${name} svg`);
    } else {
      console.log(`${name} icon: requested from nonexistant set ${setName}`);
      return null;
    }
  }

  fetchIcon(name) {
    fetch(PfeIconSet.getIconPath(name))
      .then(rsp => rsp.text())
      .then(svgText => this.completeLoading(name, svgText));
  }

  /**
   * The default name resolver function.
   * @param {String} name the name of the icon, as passed into `<pfe-icon pfe-name="..."></pfe-icon>`
   */
  static defaultNameResolver(name) {
    const [, setName, iconName] = /^([^-]+)-(.*)/.exec(name);

    // get the icon set, and bail if it doesn't exist
    const set = this.getIconSet(setName);
    if (!set) return;

    const path = set.path;

    const iconId = `${setName}-icon-${iconName}`;
    const iconPath = `${path}/${iconId}.svg`;

    return {
      setName,
      iconName,
      iconId,
      iconPath
    };
  }

  /**
   * Get the set name from an icon's full name.  All icon names are prefixed with "foo-" where foo is the set namespace.  This is true regardless of the icon set's individual naming conventions.  After the hyphen, anything goes.
   */
  static getSetName(name) {
    return name.split("-")[0];
  }

  /**
   * Set the name resolver function for this icon set.
   *
   * Name resolvers take an icon-set's path and an icon's name and merge them into a full path to the icon.  They exist so pfe-icon-set can be customized to work with various sets of icons that have customized naming conventions and directory structures.
   */
  setNameResolver(nameResolver = PfeIconSet.defaultNameResolver) {
    this._nameResolver = nameResolver;
  }

  /**
   * Run the icon set's name resolver to turn an icon name into an icon path, id, etc.
   */
  resolveIconName(iconName) {
    return this._nameResolver(iconName);
  }

  /**
   * Inject an SVG icon into this element.
   */
  injectSVG(name, svgText) {
    this.insertAdjacentHTML("beforeend", svgText);
    return this.lastChild;
    // document.body.insertAdjacentHTML("beforeend", svgText);
    // return document.body.lastChild;
  }

  /**
   * Handler for when an icon completes loading.
   */
  completeLoading(name, svgText) {
    console.log(`${name} icon: loading complete`);
    PfeIconSet.pendingIcons[name] = undefined;
    const svg = this.injectSVG(name, svgText);
    const svgStuff = { svg, svgText };
    PfeIconSet.installedIcons[name] = svgStuff;
  }

  /**
   * Get a path to a given icon.
   */
  static getIconPath(name) {
    const setName = this.getSetName(name);
    const set = this.getIconSet(setName);
    return set.resolveIconName(name).iconPath;
  }

  static get observedAttributes() {
    return ["pfe-name", "pfe-path"];
  }

  constructor() {
    super(PfeIconSet);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "pfe-name":
        this.name = newValue;
        break;
      case "pfe-path":
        this.path = newValue;
        break;
    }
  }
}

PfeIconSet.pendingIcons = {};
PfeIconSet.installedIcons = {};

PFElement.create(PfeIconSet);

// add some built-in icons
[
  {
    name: "web",
    path: "/webassets/avalon/j/lib/rh-iconfont-svgs"
  },
  {
    name: "rh",
    path: "/webassets/avalon/j/lib/rh-iconfont-svgs"
  }
].forEach(set =>
  PfeIconSet.register(
    set.name,
    set.path,
    PfeIconSet.defaultNameResolver.bind(PfeIconSet)
  )
);

window.PfeIconSet = PfeIconSet;

export default PfeIconSet;
