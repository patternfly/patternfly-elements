class PfeIconSet {
  /**
   * Run the icon set's name resolver to turn an icon name into an icon path, id, etc.
   */
  resolveIconName(iconName) {
    return this._resolveIconName(iconName, this.name, this.path);
  }

  /**
   * Create a new icon set.  Icon sets have a name (ie, a namespace).  For
   * example, an icon with a name of "rh-logo" represents a "logo" icon from the
   * "rh" set.  Icon set names are always separated from the rest of the icon
   * name with a hyphen `-`.  This means that set names cannot contain a hyphen.
   *
   * @param {String} name the namespace of the icon set
   * @param {String} path the web-accessible path to the icon set (for instance, a CDN)
   * @param {Function} resolveIconName an optional function to combine the path and an icon name into a final path.  The function will be passed the namespaced icon name (for example, "rh-api" where rh is the namespace and api is the individual icon's name)
   * @returns {Object} an object with the status of the icon set installation, such as `{ result: true, text: 'icon set installed' }` or `{ result: false, text: 'icon set is already installed' }`
   */
  constructor(name, path, resolveIconName) {
    this.name = name;
    this.path = path;
    this._resolveIconName = resolveIconName;
  }
}

export default PfeIconSet;
