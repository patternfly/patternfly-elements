class PfeIconSet {
  /**
   * The default icon name parser function.
   * @param {String} name the name of the icon, as passed into `<pfe-icon pfe-name="..."></pfe-icon>`
   */
  static defaultParseIconName(name) {
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
   * Set the icon name parser function for this icon set.
   *
   * Icon name parsers take an icon-set's path and an icon's name and merge them into a full path to the icon.  They exist so pfe-icon-set can be customized to work with various sets of icons that have customized naming conventions and directory structures.
   */
  setParseIconName(parseIconName = PfeIconSet.defaultParseIconName) {
    this._parseIconName = parseIconName;
  }

  /**
   * Run the icon set's name resolver to turn an icon name into an icon path, id, etc.
   */
  parseIconName(iconName) {
    return this._parseIconName(iconName);
  }

  /**
   * Create a new icon set.  Icon sets have a name (ie, a namespace).  For
   * example, an icon with a name of "rh-logo" represents a "logo" icon from the
   * "rh" set.  Icon set names are always separated from the rest of the icon
   * name with a hyphen `-`.
   *
   * @param {String} name the namespace of the icon set
   * @param {String} path the web-accessible path to the icon set (for instance, a CDN)
   * @param {Function} parseIconName an optional function to combine the path and an icon name into a final path.  The function will be passed the namespaced icon name (for example, "rh-api" where rh is the namespace and api is the individual icon's name)
   * @returns {Object} an object with the status of the icon set installation, such as `{ result: true, text: 'icon set installed' }` or `{ result: false, text: 'icon set is already installed' }`
   */
  constructor({ name, path, parseIconName = this.defaultParseIconName }) {
    this.name = name;
    this.path = path;
    this.setParseIconName(parseIconName);
  }
}

window.PfeIconSet = PfeIconSet;

export default PfeIconSet;
