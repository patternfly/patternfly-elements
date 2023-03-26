import type { IconPack } from '@fortawesome/free-regular-svg-icons';

import { fas as FAS } from '@fortawesome/free-solid-svg-icons';
import { far as FAR } from '@fortawesome/free-regular-svg-icons';
import { fab as FAB } from '@fortawesome/free-brands-svg-icons';

import pfIcons from '@patternfly/patternfly/icons/pf-icons.json' assert { type: 'json' };
import customIcons from './custom.json' assert { type: 'json' };

export interface IconSpec {
  /** SVG view box x offset */
  xOffset?: number;
  /** SVG view box y offset */
  yOffset?: number;
  /** Icon width in pixels */
  width: number;
  /** Icon height in pixels */
  height: number;
  /** SVG path attribute value */
  path: string | string[ ];
}

type JsonIconPack = Record<string, Omit<IconSpec, 'path'> & { svgPathData: string }>;

const NAMES: Record<string, string> = {
  'save': 'save-alt',
  'folder-open': 'folder-open-alt',
  'edit': 'edit-alt',
  'print': 'print-alt',
  'spinner': 'spinner-alt',
  'home': 'home-alt',
  'memory': 'memory-alt',
  'server': 'server-alt',
  'user': 'user-sec',
  'users': 'users-alt',
  'info': 'info-alt',
  'filter': 'filter-alt'
};

function convertFontAwesomePack(icons: IconPack): Record<string, IconSpec> {
  delete icons.faFontAwesomeLogoFull;
  return Object.fromEntries(
    Object.values(icons)
      .map(({ iconName, icon: [width, height, , , path] }) => [
        (iconName === '500px' ? 'five-hundred-px' : iconName),
        { xOffset: 0, yOffset: 0, width, height, path }
      ])
  );
}

function convertJsonIconPack(icons: JsonIconPack): Record<string, IconSpec> {
  delete icons.history;
  return Object.fromEntries(Object.entries(icons)
    .map(([name, { width, height, svgPathData: path }]) =>
      [(NAMES[name] as string ?? name), { width, height, path }]));
}

export const fab = convertFontAwesomePack(FAB);
export const far = convertFontAwesomePack(FAR);
export const fas = convertFontAwesomePack(FAS);

export const patternfly = convertJsonIconPack({ ...pfIcons, ...customIcons });
