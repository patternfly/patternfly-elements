import type { PfeConfig } from '../config.js';
import type { ClassMethod } from 'custom-elements-manifest/schema';

import { fileURLToPath } from 'url';

import { Manifest } from '../custom-elements-manifest/lib/Manifest.js';

import slugify from 'slugify';

import nunjucks, { Environment } from 'nunjucks';

interface DocsPageOptions extends PfeConfig {
  docsTemplatePath?: string;
  tagName?: string;
  title?: string;
  /** When true, renders an <h1> with the element's title in the element docs overview */
  renderTitleInOverview?: boolean;
}

export interface RenderKwargs {
  title?: string;
  for?: string;
  header?: string;
  level?: number;
}

export class DocsMethodCounter {
  counts: WeakMap<object, number>;

  constructor() {
    this.counts = new WeakMap();
  }

  increment(method: object) {
    const methodCount = this.counts.get(method) || 0;
    this.counts.set(method, methodCount + 1);
  }

  getCount(method: object) {
    return this.counts.get(method);
  }
}


export declare class DocsPageRenderer {
  public tagName: string;
  public manifest: Manifest;
  renderOverview(content: string, kwargs?: RenderKwargs): string;
  renderAttributes(content: string, kwargs?: RenderKwargs): string;
  renderProperties(content: string, kwargs?: RenderKwargs): string;
  renderCssCustomProperties(content: string, kwargs?: RenderKwargs): string;
  renderEvents(content: string, kwargs?: RenderKwargs): string;
  renderCssParts(content: string, kwargs?: RenderKwargs): string;
  renderMethods(content: string, kwargs?: RenderKwargs): string;
  renderSlots(content: string, kwargs?: RenderKwargs): string;
}

export class DocsPage implements DocsPageRenderer {
  static isDocsPage = true;

  public static renderBand(content: string, kwargs?: RenderKwargs) {
    const page = new DocsPage(Manifest.empty());
    return page.renderBand(content, kwargs);
  }

  static #templatesDir = fileURLToPath(new URL('templates', import.meta.url));

  static #log = (content: string) => (console.log(content), '');

  static #type = (content = '', { lang = 'ts' } = {}) => content.trim() &&
    `\n\n\`\`\`${lang}\n${content.trim()}\n\n\`\`\`\n\n`;

  static #innerMD = (content = '') => {
    const trimmed = content.trim();
    return trimmed && `\n\n\n${trimmed}\n\n\n`;
  };

  static #stringifyParams = (method: ClassMethod) =>
    method.parameters?.map?.(p =>
      `${p.name}: ${p.type?.text ?? 'unknown'}`).join(', ') ?? '';

  tagName: string;
  title: string;
  slug: string;
  templates: Environment;
  description?: string | null;
  summary?: string | null;
  docsTemplatePath?: string;
  counter: DocsMethodCounter;

  constructor(
    public manifest: Manifest,
    private options?: DocsPageOptions) {
    this.tagName = options?.tagName ?? '';
    this.title = options?.title ?? Manifest.prettyTag(this.tagName);
    this.slug = slugify(options?.aliases?.[this.tagName] ?? this.tagName.replace(/^\w+-/, ''), { strict: true, lower: true });
    this.summary = this.manifest.getSummary(this.tagName);
    this.description = this.manifest.getDescription(this.tagName);
    this.templates = nunjucks.configure(DocsPage.#templatesDir);
    this.templates.addGlobal('package', this.manifest.packageJson);
    this.templates.addGlobal('tagName', this.tagName);
    this.templates.addGlobal('slug', this.slug);
    this.templates.addGlobal('title', this.title);
    this.templates.addFilter('log', DocsPage.#log);
    this.templates.addFilter('type', DocsPage.#type);
    this.templates.addFilter('innerMD', DocsPage.#innerMD);
    this.templates.addFilter('mdHeading', (header, length = 2) =>
      DocsPage.#innerMD(`${Array.from({ length }, () => '#').join('')} ${header}`));
    this.templates.addFilter('stringifyParams', DocsPage.#stringifyParams);
    this.docsTemplatePath = options?.docsTemplatePath;
    this.counter = new DocsMethodCounter();
  }

  #packageTagName(kwargs: RenderKwargs = {}): string {
    if (kwargs.for && !kwargs.for.match(/@/)) {
      return kwargs.for;
    } else {
      const [, tagName = this.tagName] = (kwargs?.for ?? '').match(/@[-\w]+\/(.*)/) ?? [];
      return tagName;
    }
  }

  renderBand(content: string, kwargs?: RenderKwargs) {
    return this.templates.render('band.njk', { content, ...kwargs });
  }

  /** Render the overview of a component page */
  renderOverview(content: string, kwargs: RenderKwargs = {}) {
    const description = this.manifest.getDescription(this.#packageTagName(kwargs));
    const header = kwargs.title ?? this.title;
    // TODO: switch to false in next major
    const { renderTitleInOverview = true } = this.options ?? {};
    const renderedTitle =
        !renderTitleInOverview ? ''
      : this.renderBand('', { level: 1, header });
    return `${renderedTitle}\n${this.templates.render('overview.njk', { description, content, ...kwargs })}`;
  }

  /** Render the list of element attributes */
  renderAttributes(content: string, kwargs: RenderKwargs = {}) {
    const _attrs = this.manifest.getAttributes(this.#packageTagName(kwargs)) ?? [];

    const deprecated = _attrs.filter(x => x.deprecated);
    const attributes = _attrs.filter(x => !x.deprecated);

    return this.templates.render('attributes.njk', { content, attributes, deprecated, ...kwargs });
  }

  /** Render the list of element DOM properties */
  renderProperties(content: string, kwargs: RenderKwargs = {}) {
    const allProperties = this.manifest.getProperties(this.#packageTagName(kwargs)) ?? [];

    const deprecated = allProperties.filter(x => x.deprecated);
    const properties = allProperties.filter(x => !x.deprecated);

    return this.templates.render('properties.njk', { content, properties, deprecated, ...kwargs });
  }

  /** Render a table of element CSS Custom Properties */
  renderCssCustomProperties(content: string, kwargs: RenderKwargs = {}) {
    this.counter.increment(this.renderCssCustomProperties);
    const count = this.counter.getCount(this.renderCssCustomProperties);
    const allCssProperties = this.manifest.getCssCustomProperties(this.#packageTagName(kwargs)) ?? [];
    const cssProperties = allCssProperties.filter(x => !x.deprecated);
    const deprecated = allCssProperties.filter(x => x.deprecated);

    return this.templates.render('css-custom-properties.njk', { content, cssProperties, deprecated, count, ...kwargs });
  }

  /** Render the list of element CSS Shadow Parts */
  renderCssParts(content: string, kwargs: RenderKwargs = {}) {
    const allParts = this.manifest.getCssParts(this.#packageTagName(kwargs)) ?? [];

    const parts = allParts.filter(x => !x.deprecated);
    const deprecated = allParts.filter(x => x.deprecated);

    return this.templates.render('css-shadow-parts.njk', { parts, deprecated, content, ...kwargs });
  }

  /** Render the list of events for the element */
  renderEvents(content: string, kwargs: RenderKwargs = {}) {
    const _events = this.manifest.getEvents(this.#packageTagName(kwargs)) ?? [];

    const deprecated = _events.filter(x => x.deprecated);
    const events = _events.filter(x => !x.deprecated);

    return this.templates.render('events.njk', { content, events, deprecated, ...kwargs });
  }

  /** Render the list of element methods */
  renderMethods(content: string, kwargs: RenderKwargs = {}) {
    const allMethods = this.manifest.getMethods(this.#packageTagName(kwargs)) ?? [];
    const deprecated = allMethods.filter(x => x.deprecated);
    const methods = allMethods.filter(x => !x.deprecated);

    return this.templates.render('methods.njk', { content, methods, deprecated, ...kwargs });
  }

  /** Render the list of the element's slots */
  renderSlots(content: string, kwargs: RenderKwargs = {}) {
    const allSlots = this.manifest.getSlots(this.#packageTagName(kwargs)) ?? [];
    const slots = allSlots.filter(x => !x.deprecated);
    const deprecated = allSlots.filter(x => x.deprecated);

    return this.templates.render('slots.njk', { content, slots, deprecated, ...kwargs });
  }
}
