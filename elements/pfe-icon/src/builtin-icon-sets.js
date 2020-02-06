/**
 * An icon name resolver for the PFE built-in icon sets.
 */
function resolveIconName(name, iconSetName, iconSetPath) {
  const [, , iconName] = /^([^-]+)-(.*)/.exec(name);

  const iconId = `${iconSetName}-icon-${iconName}`;
  const iconPath = `${iconSetPath}/${iconId}.svg`;

  return iconPath;
}

/**
 * An 'init' function to add the PFE built-in icon sets to the current page.
 */
export function addBuiltIns(PfeIcon) {
  [
    {
      name: "web",
      path: "https://static.redhat.com/libs/redhat/rh-iconfont/latest/svg"
    },
    {
      name: "rh",
      path: "https://static.redhat.com/libs/redhat/rh-iconfont/latest/svg"
    }
  ].forEach(set => PfeIcon.addIconSet(set.name, set.path, resolveIconName));
}
