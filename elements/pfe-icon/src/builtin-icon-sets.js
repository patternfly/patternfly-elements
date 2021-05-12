/**
 * An 'init' function to add the PFE built-in icon sets to the current page.
 */
export function addBuiltIns({ PfeIcon, config }) {
  // If the user wants to completely opt out of default icon sets,
  // allow them to.
  if (config.IconSets && config.IconSets.length === 0) {
    return;
  }

  // If the user provides their own icon sets, use them. If not, use our defaults.
  // @TODO: Switch from access.redhat.com to another icon set.
  const iconSets = config.IconSets || [
    {
      name: "web",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    },
    {
      name: "rh",
      path: "https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs"
    }
  ];

  let resolveDefaultIconName = (name, iconSetName, iconSetPath) => {
    const regex = new RegExp(`^${iconSetName}(-icon)?-(.*)`);
    const [, , iconName] = regex.exec(name);

    const iconId = `${iconSetName}-icon-${iconName}`;
    const iconPath = `${iconSetPath}/${iconId}.svg`;

    return iconPath;
  };

  // Register the icon sets.
  iconSets.forEach(set => {
    // If there's a `resolveIconName` function provided, use it. If not, fall back
    // to the `resolveDefaultIconName` function.
    if (set.resolveIconName && typeof set.resolveIconName === "function") {
      resolveDefaultIconName = set.resolveIconName;
    }

    PfeIcon.addIconSet(set.name, set.path, resolveDefaultIconName);
  });
}
