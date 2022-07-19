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
  Package,
  Slot,
} from 'custom-elements-manifest/schema';

import { join } from 'node:path';
import { readFileSync } from 'node:fs';

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

const all = (...ps: PredicateFn[]) => (x: unknown) => ps.every(p => p(x));
const not = (p: PredicateFn) => (x: unknown) => !p(x);
const and = (p: PredicateFn, q: PredicateFn) => (x: unknown) => p(x) && q(x);

export const isField = (x: ClassMember): x is ClassField => x.kind === 'field';
export const isMethod = (x: ClassMember): x is ClassMethod => x.kind === 'method';
export const isStatic = (x: ClassMember): x is ClassMethod & { static: true } => !!x.static;
export const isPublic = (x: ClassMember): boolean => !x.privacy || !x.privacy?.match?.(/private|protected/);

export const isPublicInstanceField: (x: ClassMember) => x is ClassField =
  all(isField as PredicateFn, not(isStatic as PredicateFn), isPublic as PredicateFn) as (x: ClassMember) => x is ClassField;
export const isPublicInstanceMethod: (x: ClassMember) => x is ClassMethod =
  all(isMethod as PredicateFn, not(isStatic as PredicateFn), isPublic as PredicateFn) as (x: ClassMember) => x is ClassMethod;

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

  constructor(private declaration: CustomElementDeclaration, private manifest: Manifest) {
    const isAnAttr = (x: ClassField) => !this.declaration?.attributes?.some?.(isTheField(x));

    this.tagName = this.declaration.tagName;
    this.attributes = this.declaration?.attributes ?? [];
    this.cssCustomProperties = this.declaration?.cssProperties ?? [];
    this.cssParts = this.declaration?.cssParts ?? [];
    this.description = this.declaration?.description ?? '';
    this.events = this.declaration?.events ?? [];
    this.methods = this.declaration?.members?.filter?.(isPublicInstanceMethod) ?? [];
    this.properties = this.declaration?.members?.filter?.(and(isPublicInstanceField as PredicateFn, isAnAttr as PredicateFn) as (typeof isField)) ?? [];
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

  public static from({ package: packageJson, location }: { package: PackageJSON, location: string }): Manifest {
    if (!Manifest.#instances.has(packageJson)) {
      const manifestPath = join(location, packageJson?.customElements ?? '');
      const json = readJsonSync(manifestPath);
      Manifest.#instances.set(packageJson, new Manifest(json as Package, packageJson, location));
    }
    return Manifest.#instances.get(packageJson) as Manifest;
  }

  declarations = new Map<string, ManifestCustomElement>();

  constructor(
    public manifest: Package|null,
    public packageJson: PackageJSON|null,
    public location?: string
  ) {
    for (const { declarations } of manifest?.modules ?? []) {
      for (const declaration of declarations ?? []) {
        if (isCustomElement(declaration) && declaration.tagName) {
          this.declarations.set(declaration.tagName, new ManifestCustomElement(declaration, this));
        }
      }
    }
  }

  #tag(tagName: string): ManifestCustomElement|null {
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
  getAttributes(tagName: string): undefined|Attribute[] {
    return this.#tag(tagName)?.attributes;
  }

  /**
   */
  getCssCustomProperties(tagName: string): undefined|CssCustomProperty[] {
    return this.#tag(tagName)?.cssCustomProperties;
  }

  /**
   */
  getCssParts(tagName: string): undefined|CssPart[] {
    return this.#tag(tagName)?.cssParts;
  }

  /**
   */
  getDescription(tagName: string): undefined|string {
    return this.#tag(tagName)?.description;
  }

  /**
   */
  getEvents(tagName: string): undefined|Event[] {
    return this.#tag(tagName)?.events;
  }

  /**
   */
  getMethods(tagName: string): undefined|ClassMethod[] {
    return this.#tag(tagName)?.methods;
  }

  /**
   */
  getProperties(tagName: string): undefined|ClassField[] {
    return this.#tag(tagName)?.properties;
  }

  /**
   */
  getSummary(tagName: string): undefined|string {
    return this.#tag(tagName)?.summary;
  }

  /**
   */
  getSlots(tagName: string): undefined|Slot[] {
    return this.#tag(tagName)?.slots;
  }

  /**
   */
  getDemos(tagName: string): undefined|Demo[] {
    return this.#tag(tagName)?.demos;
  }
}
