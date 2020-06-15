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
  ].forEach(set =>
    PfeIcon.addIconSet(set.name, set.path, (name, iconSetName, iconSetPath) => {
      const regex = new RegExp(`^${iconSetName}(-icon)?-(.*)`);
      const [, , iconName] = regex.exec(name);

      const iconId = `${iconSetName}-icon-${iconName}`;
      const iconPath = `${iconSetPath}/${iconId}.svg`;

      return iconPath;
    })
  );
}
