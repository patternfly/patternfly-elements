import type { PfeConfig } from '@patternfly/pfe-tools/config.js';
import type {
  Attribute,
  ClassField,
  ClassMember,
  ClassMethod,
  CssCustomProperty,
  CssPart,
  CustomElementDeclaration,
  Declaration,
  Demo,
  Event,
  Export,
  Module,
  Package,
  Slot,
} from 'custom-elements-manifest/schema';

import { join, normalize } from 'node:path';
import { readFileSync } from 'node:fs';

import { getAllPackages } from './get-all-packages.js';
import slugify from 'slugify';
import { deslugify } from '@patternfly/pfe-tools/config.js';

type PredicateFn = (x: unknown) => boolean;

export interface PackageJSON {
  customElements?: string;
  name: string;
  version: string;
  private?: boolean;
  contributors?: string[];
  author?: string;
  workspaces?: string[];
}

export interface DemoRecord extends Demo {
  tagName: string;
  primaryElementName: string;
  permalink: string;
  slug: string;
  title: string;
  filePath?: string;
  manifest: Manifest;
}

const all = (...ps: PredicateFn[]) => (x: unknown) => ps.every(p => p(x));
const not = (p: PredicateFn) => (x: unknown) => !p(x);
const and = (p: PredicateFn, q: PredicateFn) => (x: unknown) => p(x) && q(x);

export const isField = (x: ClassMember): x is ClassField => x.kind === 'field';
export const isMethod = (x: ClassMember): x is ClassMethod => x.kind === 'method';
export const isStatic = (x: ClassMember): x is ClassMethod & { static: true } => !!x.static;
export const isPublic = (x: ClassMember): boolean =>
  !x.privacy || !x.privacy?.match?.(/private|protected/);

export const isPublicInstanceField: (x: ClassMember) => x is ClassField =
  all(
    isField as PredicateFn,
    not(isStatic as PredicateFn),
    isPublic as PredicateFn,
  ) as (x: ClassMember) => x is ClassField;

export const isPublicInstanceMethod: (x: ClassMember) => x is ClassMethod =
  all(
    isMethod as PredicateFn,
    not(isStatic as PredicateFn),
    isPublic as PredicateFn,
  ) as (x: ClassMember) => x is ClassMethod;

export const isCustomElement = (x: Declaration): x is CustomElementDeclaration => 'tagName' in x;
export const isTheField = (x: ClassField) => (y: Attribute) => y.fieldName === x.name;

const readJsonSync = (path: string) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
};

class ManifestCustomElement {
  /** The element's name */
  declare tagName?: string;

  /** The element's attributes */
  declare attributes: Attribute[];

  /** The element's cssCustomProperties */
  declare cssCustomProperties: CssCustomProperty[];

  /** The element's cssParts */
  declare cssParts: CssPart[];

  /** The element's description */
  declare description: string;

  /** The element's events */
  declare events: Event[];

  /** The element's methods */
  declare methods: ClassMethod[];

  /** The element's properties */
  declare properties: ClassField[];

  /** The element's slots */
  declare slots: Slot[];

  /** The element's summary */
  declare summary: string;

  /** The export for the element */
  declare export?: Export;

  /** The demos for the element */
  declare demos?: Demo[];

  constructor(
    public declaration: CustomElementDeclaration,
    public module: Module,
    public manifest: Manifest
  ) {
    const isAnAttr = (x: ClassField) => !this.declaration?.attributes?.some?.(isTheField(x));

    this.tagName = this.declaration.tagName;
    this.attributes = this.declaration?.attributes ?? [];
    this.cssCustomProperties = this.declaration?.cssProperties ?? [];
    this.cssParts = this.declaration?.cssParts ?? [];
    this.description = this.declaration?.description ?? '';
    this.events = this.declaration?.events ?? [];
    this.methods = this.declaration?.members?.filter?.(isPublicInstanceMethod) ?? [];
    this.properties = this.declaration?.members?.filter?.(and(
      isPublicInstanceField as PredicateFn,
      isAnAttr as PredicateFn,
    ) as (typeof isField)) ?? [];
    this.slots = this.declaration?.slots ?? [];
    this.demos = this.declaration?.demos ?? [];
    this.summary = this.declaration?.summary ?? '';
    this.export = manifest.manifest
        ?.modules
        ?.flatMap(x => x.exports ?? [])
        ?.find(z => z.declaration.name === this.declaration.name);
  }
}

export class Manifest {
  static #instances = new WeakMap<PackageJSON, Manifest>();

  public static empty(): Manifest {
    return new Manifest(null, null);
  }

  public static from({
    package: packageJson,
    location,
  }: { package: PackageJSON; location: string }): Manifest {
    if (!Manifest.#instances.has(packageJson)) {
      const manifestPath = join(location, packageJson?.customElements ?? '');
      const json = readJsonSync(normalize(manifestPath));
      Manifest.#instances.set(packageJson, new Manifest(json as Package, packageJson, location));
    }
    return Manifest.#instances.get(packageJson) as Manifest;
  }

  public static getAll(rootDir = process.cwd()): Manifest[] {
    return getAllPackages(rootDir).flatMap(x =>
      !x.package.customElements ? [] : [Manifest.from(x)]);
  }

  public static prettyTag = (
    tagName: string,
    aliases?: Record<string, string>,
  ) => aliases?.[tagName] ?? tagName
      .replace(/^\w+-/, '')
      .toLowerCase()
      .replace(/(?:^|[-/\s])\w/g, x => x.toUpperCase())
      .replace(/-/g, ' ');

  declarations = new Map<string, ManifestCustomElement>();

  /** file path to the custom elements manifest */
  path = '';

  constructor(
    public manifest: Package | null,
    public packageJson: PackageJSON | null,
    public location?: string
  ) {
    if (manifest && packageJson && location && packageJson.customElements) {
      this.path = join(location, packageJson.customElements);
    }
    for (const mod of manifest?.modules ?? []) {
      for (const declaration of mod.declarations ?? []) {
        if (isCustomElement(declaration) && declaration.tagName) {
          this.declarations.set(
            declaration.tagName,
            new ManifestCustomElement(declaration, mod, this),
          );
        }
      }
    }
  }

  #tag(tagName: string): ManifestCustomElement | null {
    return this.declarations?.get(tagName) ?? null;
  }

  /**
   */
  getTagNames(): string[] {
    return this.manifest?.modules
        ?.flatMap?.(m => m.exports
            ?.filter?.(x => x.kind === 'custom-element-definition')
            ?.map?.(x => x.name)) as string[] ?? [];
  }

  /**
   */
  getAttributes(tagName: string): undefined | Attribute[] {
    return this.#tag(tagName)?.attributes;
  }

  /**
   */
  getCssCustomProperties(tagName: string): undefined | CssCustomProperty[] {
    return this.#tag(tagName)?.cssCustomProperties;
  }

  /**
   */
  getCssParts(tagName: string): undefined | CssPart[] {
    return this.#tag(tagName)?.cssParts;
  }

  /**
   */
  getDescription(tagName: string): undefined | string {
    return this.#tag(tagName)?.description;
  }

  /**
   */
  getEvents(tagName: string): undefined | Event[] {
    return this.#tag(tagName)?.events;
  }

  /**
   */
  getMethods(tagName: string): undefined | ClassMethod[] {
    return this.#tag(tagName)?.methods;
  }

  /**
   */
  getProperties(tagName: string): undefined | ClassField[] {
    return this.#tag(tagName)?.properties;
  }

  /**
   */
  getSummary(tagName: string): undefined | string {
    return this.#tag(tagName)?.summary;
  }

  /**
   */
  getSlots(tagName: string): undefined | Slot[] {
    return this.#tag(tagName)?.slots;
  }

  /**
   */
  getDemos(tagName: string): Demo[] {
    return this.#tag(tagName)?.demos ?? [];
  }

  getAllDemos(): Demo[] {
    return this.manifest?.modules
        ?.flatMap?.(m => m.declarations)
        ?.filter?.((x): x is CustomElementDeclaration => !!x && isCustomElement(x))
        ?.flatMap?.(x => x?.demos ?? []) ?? [];
  }

  getDemoMetadata(tagName: string, options: Required<PfeConfig>): DemoRecord[] {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const manifest = this;
    const { prettyTag } = Manifest;
    return this.getDemos(tagName).map(demo => {
      const permalink = demo.url.replace(options.demoURLPrefix, '/');

      /**
       * `/components/`
       * capture group 1:
       * > **ANY** (_>= 0x_)
       * `/demo`
       */
      const DEMO_PATH_RE = new RegExp(`/${options.site.componentSubpath}/(.*)/demo`);
      let [, slug = ''] = permalink.match(DEMO_PATH_RE) ?? [];
      // strict removes all special characters from slug
      slug = slugify(slug, { strict: true, lower: true });
      const primaryElementName = deslugify(slug, options.rootDir);
      const filePath = demo.source?.href.replace(options.sourceControlURLPrefix, `${options.rootDir}/`) ?? '';
      const [last = ''] = filePath.split('/').reverse();
      const filename = last.replace('.html', '');
      const isMainElementDemo = this.getTagNames().includes(filename);
      const title = isMainElementDemo ? options.aliases[tagName] ?? prettyTag(tagName) : last
          .replace(/(?:^|[-/\s])\w/g, x => x.toUpperCase())
          .replace(/-/g, ' ')
          .replace('.html', '');
      return {
        tagName,
        primaryElementName,
        permalink,
        slug,
        title,
        filePath,
        manifest,
        ...demo,
      };
    });
  }
}
