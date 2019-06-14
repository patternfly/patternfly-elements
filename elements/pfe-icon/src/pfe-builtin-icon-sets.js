/**
 * An icon name parser for the PFE built-in icon sets.
 */
function parseIconName(name) {
  const [, , iconName] = /^([^-]+)-(.*)/.exec(name);

  const setName = this.name;
  const path = this.path;

  const iconId = `${this.name}-icon-${iconName}`;
  const iconPath = `${path}/${iconId}.svg`;

  return {
    setName,
    iconName,
    iconId,
    iconPath
  };
}

/**
 * An 'init' function to add the PFE built-in icon sets to the current page.
 */
export function addBuiltIns(PfeIcon) {
  [
    {
      name: "web",
      path: "/webassets/avalon/j/lib/rh-iconfont-svgs"
    },
    {
      name: "rh",
      path: "/webassets/avalon/j/lib/rh-iconfont-svgs"
    }
  ].forEach(set => PfeIcon.addIconSet(set.name, set.path, parseIconName));
}
