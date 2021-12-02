import type {
  ClassMethod,
  Package,
} from 'custom-elements-manifest/schema';

import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

import { Manifest } from './Manifest.js';

import nunjucks, { Environment } from 'nunjucks';

interface PackageJSON {
  customElements?: string;
  name: string;
}

export interface RenderKwargs {
  title?: string;
  for?: string;
  header?: string;
  level?: number;
}

export declare class DocsPageRenderer {
  public tagName: string;
  public manifest?: Manifest;
  renderOverview(content: string, kwargs?: RenderKwargs): string;
  renderAttributes(content: string, kwargs?: RenderKwargs): string;
  renderProperties(content: string, kwargs?: RenderKwargs): string;
  renderCssCustomProperties(content: string, kwargs?: RenderKwargs): string;
  renderEvents(content: string, kwargs?: RenderKwargs): string;
  renderCssParts(content: string, kwargs?: RenderKwargs): string;
  renderMethods(content: string, kwargs?: RenderKwargs): string;
  renderSlots(content: string, kwargs?: RenderKwargs): string;
}

const readJson = (path: string) => readFile(path, 'utf-8').then(x => JSON.parse(x)).catch(() => null);

const ALIASES = new Map([
  ['cta', 'Call to Action']
]);

const pretty = (x: string) => ALIASES.get(x) ?? x
  .replace('pfe-', '' )
  .toLowerCase()
  .replace(/(?:^|[\s-/])\w/g, x => x.toUpperCase())
  .replace(/-/g, ' ');

const exists = (path: string) => stat(path).then(() => true).catch(() => false);

const ifExists = async (path: string) => await exists(path) ? path : undefined;

export class DocsPage implements DocsPageRenderer {
  public static renderBand(content: string, kwargs?: RenderKwargs) {
    const page = new DocsPage('', '');
    return page.renderBand(content, kwargs);
  }

  declare demo?: string;
  declare description?: string|null;
  declare docsPath?: string;
  declare module?: string;
  declare script?: string;
  declare summary?: string|null;
  declare manifest?: Manifest;
  declare packageJson?: PackageJSON;

  declare slug: string;
  declare tagName: string;
  declare title: string;
  declare package: string;
  declare templates: Environment;

  constructor(pkg: string, private packagePath: string) {
    this.package = pkg;
    this.tagName = this.package.replace('@patternfly/', '');
    this.slug = this.tagName.replace('pfe-', '');
    this.title = pretty(this.slug);

    this.templates = nunjucks.configure(fileURLToPath(new URL('templates', import.meta.url)));
    this.templates.addGlobal('package', this.package);
    this.templates.addGlobal('tagName', this.tagName);
    this.templates.addGlobal('slug', this.slug);
    this.templates.addGlobal('title', this.title);
    this.templates.addFilter('log', content => (console.log(content), ''));

    this.templates.addFilter('type', (content = '', { lang = 'ts' } = {}) => content.trim() &&
      `\n\n\`\`\`${lang}\n${content.trim()}\n\n\`\`\`\n\n`);

    this.templates.addFilter('innerMD', (content = '') => {
      const trimmed = content.trim();
      return trimmed && `\n\n\n${trimmed}\n\n\n`;
    });

    this.templates.addFilter('stringifyParams', (method: ClassMethod) =>
      method.parameters?.map?.(p =>
        `${p.name}: ${p.type?.text ?? 'unknown'}`).join(', ') ?? '');
  }

  async init() {
    if (this.packagePath) {
      const demoPath = join(this.packagePath, 'demo', `${this.tagName}.html`);
      const docsPath = join(this.packagePath, 'docs', 'index.md');
      const modulePath = join(this.packagePath, `${this.tagName}.js`);
      const scriptPath = join(this.packagePath, 'demo', `${this.tagName}.js`);
      const packageJsonPath = join(this.packagePath, 'package.json');
      const manifestPath = join(this.packagePath, this.packageJson?.customElements ?? 'custom-elements.json');

      this.demo = await ifExists(demoPath);
      this.docsPath = await ifExists(docsPath);
      this.module = await ifExists(modulePath);
      this.script = await ifExists(scriptPath);
      this.packageJson = await readJson(packageJsonPath);
      const manifest = await readJson(manifestPath) as Package;
      if (manifest) {
        this.manifest = new Manifest(manifest);
        this.summary = this.manifest?.getSummary(this.tagName);
        this.description = this.manifest?.getDescription(this.tagName);
      }
    }
  }

  renderBand(content: string, kwargs?: RenderKwargs) {
    return this.templates.render('band.njk', { content, ...kwargs });
  }

  /** Render the overview of a component page */
  renderOverview(content: string, kwargs: RenderKwargs = {}) {
    const description = this.manifest?.getDescription(this.packageTagName(kwargs));
    return this.templates.render('overview.njk', { description, content, ...kwargs });
  }

  /** Render the list of element attributes */
  renderAttributes(content: string, kwargs: RenderKwargs = {}) {
    const _attrs = this.manifest?.getAttributes(this.packageTagName(kwargs)) ?? [];

    const deprecated = _attrs.filter(x => x.deprecated);
    const attributes = _attrs.filter(x => !x.deprecated);

    return this.templates.render('attributes.njk', { content, attributes, deprecated, ...kwargs });
  }

  /** Render the list of element DOM properties */
  renderProperties(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }

    const allProperties = this.manifest.getProperties(this.packageTagName(kwargs)) ?? [];

    const deprecated = allProperties.filter(x => x.deprecated);
    const properties = allProperties.filter(x => !x.deprecated);

    return this.templates.render('properties.njk', { content, properties, deprecated, ...kwargs });
  }

  /** Render a talbe of element CSS Custom Properties */
  renderCssCustomProperties(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const allCssProperties = this.manifest.getCssCustomProperties(this.packageTagName(kwargs)) ?? [];
    const cssProperties = allCssProperties.filter(x => !x.deprecated);
    const deprecated = allCssProperties.filter(x => x.deprecated);

    return this.templates.render('css-custom-properties.njk', { content, cssProperties, deprecated, ...kwargs });
  }

  /** Render the list of element CSS Shadow Parts */
  renderCssParts(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }

    const allParts = this.manifest.getCssParts(this.packageTagName(kwargs)) ?? [];

    const parts = allParts.filter(x => !x.deprecated);
    const deprecated = allParts.filter(x => x.deprecated);

    return this.templates.render('css-shadow-parts.njk', { parts, deprecated, content, ...kwargs, });
  }

  /** Render the list of events for the element */
  renderEvents(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }

    const _events = this.manifest.getEvents(this.packageTagName(kwargs)) ?? [];

    const deprecated = _events.filter(x => x.deprecated);
    const events = _events.filter(x => !x.deprecated);

    return this.templates.render('events.njk', { content, events, deprecated, ...kwargs });
  }

  /** Render the list of element methods */
  renderMethods(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }

    const allMethods = this.manifest.getMethods(this.packageTagName(kwargs)) ?? [];
    const deprecated = allMethods.filter(x => x.deprecated);
    const methods = allMethods.filter(x => !x.deprecated);

    return this.templates.render('methods.njk', { content, methods, deprecated, ...kwargs });
  }

  /** Render the list of the element's slots */
  renderSlots(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }

    const allSlots = this.manifest.getSlots(this.packageTagName(kwargs)) ?? [];
    const slots = allSlots.filter(x => !x.deprecated);
    const deprecated = allSlots.filter(x => x.deprecated);

    return this.templates.render('slots.njk', { content, slots, deprecated, ...kwargs });
  }

  private packageTagName(kwargs: RenderKwargs = {}): string {
    if (kwargs.for && !kwargs.for.match(/@/)) {
      return kwargs.for;
    } else {
      const [, tagName = this.tagName] = (kwargs?.for ?? '').match(/@patternfly\/(.*)/) ?? [];
      return tagName;
    }
  }
}
