/**
 * An icon name parser for the PFE built-in icon sets.
 */
function parseIconName(name, iconSetName, iconSetPath) {
  const [, , iconName] = /^([^-]+)-(.*)/.exec(name);

  const iconId = `${iconSetName}-icon-${iconName}`;
  const iconPath = `${iconSetPath}/${iconId}.svg`;

  return {
    iconSetName,
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
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    },
    {
      name: "rh",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    }
  ].forEach(set => PfeIcon.addIconSet(set.name, set.path, parseIconName));
}
