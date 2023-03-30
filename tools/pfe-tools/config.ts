import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import slugify from 'slugify';

interface SiteOptions {
  /** The site's default page description */
  description?: string;
  /** URL to the site's favicon */
  favicon?: string;
  /** URL to the demo page's main brand logo */
  logoUrl?: string;
  /** URLs to stylesheets to add to the demo (absolute from cwd) */
  stylesheets?: string[];
  /** Title for main page of the demo */
  title?: string;
  /** Site subpath for components. e.g. 'elements'. default: 'components' */
  componentSubpath?: string;
}

export interface PfeConfig {
  /** rootDir of the package. Default process.cwd() */
  rootDir?: string;
  /** object mapping custom element name to page title */
  aliases?: Record<string, string> ;
  /** Directory containing the custom elements, defaults to `elements` */
  elementsDir?: string;
  /** absolute URL to the web page representing the repo root in source control, with trailing slash. default 'https://github.com/patternfly/patternfly-elements/tree/main/' */
  sourceControlURLPrefix?: string ;
  /** absolute URL prefix for demos, with trailing slash. Default 'https://patternflyelements.org/' */
  demoURLPrefix?: string ;
  /** custom elements namespace. Default 'pf' */
  tagPrefix?: string;
  /** Dev Server site options */
  site?: SiteOptions;
}

const SITE_DEFAULTS: Required<SiteOptions> = {
  description: 'PatternFly Elements: A set of community-created web components based on PatternFly design.',
  favicon: '/docs/images/logo/pfe-icon-blue.svg',
  logoUrl: '/docs/images/pfe-logo-inverse-white.svg',
  stylesheets: [],
  title: 'PatternFly Elements',
  componentSubpath: 'components',
};

const DEFAULT_CONFIG: PfeConfig = {
  demoURLPrefix: 'https://patternflyelements.org/',
  sourceControlURLPrefix: 'https://github.com/patternfly/patternfly-elements/tree/main/',
  tagPrefix: 'pf',
  aliases: {},
};

function tryJson(path: string) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {};
  }
}

export function getPfeConfig(rootDir = process.cwd()): Required<PfeConfig> {
  const jsonConfig = tryJson(join(rootDir, '.pfe.config.json'));
  return {
    ...DEFAULT_CONFIG,
    rootDir,
    ...jsonConfig,
    site: {
      ...SITE_DEFAULTS,
      ...jsonConfig.site ?? {}
    }
  };
}

const slugsConfigMap = new Map<string, { config: PfeConfig; slugs: Map<string, string> }>();
const reverseSlugifyObject = ([k, v]: [string, string]): [string, string] =>
  [slugify(v).toLowerCase(), k];

function getSlugsMap(rootDir: string) {
  if (!slugsConfigMap.get(rootDir)) {
    const config = getPfeConfig(rootDir);
    const slugs = new Map(Object.entries(config.aliases).map(reverseSlugifyObject));
    slugsConfigMap.set(rootDir, { slugs, config });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return slugsConfigMap.get(rootDir)!;
}

export function deslugify(slug: string, rootDir = process.cwd()): string {
  const { slugs, config } = getSlugsMap(rootDir);
  return slugs.get(slug) ?? `${config.tagPrefix}-${slug}`;
}
