import type { PfeConfig } from '@patternfly/pfe-core';
import type { IconNameResolverFn } from './icon-set.js';
import type { PfeIcon } from './pfe-icon.js';

declare module '@patternfly/pfe-core' {
  export interface PfeConfig {
    IconSets?: IconSetConfig[];
  }
}

interface Options {
  PfeIcon: typeof PfeIcon;
  config?: PfeConfig;
}

interface IconSetConfig {
  name: string,
  path: string,
  resolveIconName?: IconNameResolverFn;
}

const DEFAULT_ICON_SET: IconSetConfig[] = [
  {
    name: 'web',
    path: 'https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs',
  },
  {
    name: 'rh',
    path: 'https://access.redhat.com/webassets/avalon/j/lib/rh-iconfont-svgs',
  },
];

const resolveDefaultIconName: IconNameResolverFn = (name, iconSetName, iconSetPath) => {
  const regex = new RegExp(`^${iconSetName}(-icon)?-(.*)`);
  const [, , iconName] = regex.exec(name) ?? [];

  const iconId = `${iconSetName}-icon-${iconName}`;
  const iconPath = `${iconSetPath}/${iconId}.svg`;

  return iconPath;
};

/**
 * An 'init' function to add the PFE built-in icon sets to the current page.
 */
export function addBuiltIns({ PfeIcon, config = window.PfeConfig }: Options) {
  config.IconSets ??= DEFAULT_ICON_SET;

  // If the user wants to completely opt out of default icon sets,
  // allow them to.
  if (!config.IconSets?.length) {
    return;
  }

  // If the user provides their own icon sets, use them. If not, use our defaults.
  // @TODO: Switch from access.redhat.com to another icon set.
  // Register the icon sets.
  for (const { name, path, resolveIconName } of config.IconSets) {
    // If there's a `resolveIconName` function provided, use it. If not, fall back
    // to the `resolveDefaultIconName` function.
    const resolve =
        typeof resolveIconName === 'function' ? resolveIconName
      : resolveDefaultIconName;

    PfeIcon.addIconSet(name, path, resolve);
  }
}
