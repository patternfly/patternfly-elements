import type { Node } from 'mdast-util-to-markdown/lib/types';
import type {
  Attribute,
  ClassDeclaration,
  ClassField,
  ClassMember,
  ClassMethod,
  CssCustomProperty,
  CssPart,
  CustomElement,
  Declaration,
  Event,
  Export,
  Package,
  Parameter,
  Slot,
  Type,
} from 'custom-elements-manifest/schema';

import dedent from 'dedent';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

import * as M from 'mdast-builder';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTableToMarkdown } from 'mdast-util-gfm-table';
import { toMarkdown } from 'mdast-util-to-markdown';

import { Manifest, isField } from './Manifest.js';

interface PackageJSON {
  customElements?: string;
  name: string;
}

type Deprecable = (
  | Attribute
  | ClassField
  | ClassMember
  | ClassMethod
  | CssCustomProperty
  | CssPart
  | CustomElement
  | Declaration
  | Event
  | Export
  | Slot
);

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

const getParameterName = (p: Parameter) => `${p.name}: ${p.type?.text ?? 'unknown'}`;

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

function stringifyParams(method: ClassMethod) {
  return method.parameters?.map?.(getParameterName).join(', ') ?? '';
}

function ensureArray<T>(x: T|T[]): T[] {
  return Array.isArray(x) ? x : [x];
}

export class DocsPage implements DocsPageRenderer {
  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *   <h2 slot="header">${kwargs.header}</h2>
   *
   *   ${content}
   *
   * </pfe-band>
   */
  private static band(content: string|Node[], kwargs?: RenderKwargs) {
    const l = kwargs?.level ?? 2;
    const children = typeof content === 'string' ? fromMarkdown(content) : content;

    return M.root([
      M.html(dedent`
        <pfe-band size="small" color="lightest" use-grid>
          <h${l} slot="header">`), fromMarkdown(kwargs?.header ?? ''), M.html(dedent`
          </h${l}>`), ...ensureArray(children), M.html(dedent`
        </pfe-band>`),
    ]) as Node;
  }

  private static details(header: string, content: Node[], kwargs: RenderKwargs = {}): Node[] {
    return [
      M.html(`<details><summary>`),
      M.heading((kwargs.level ?? 2) + 1, M.text(header)) as Node,
      M.html(`</summary>`),
      ...content,
      M.html(`</details>`),
    ] as Node[];
  }

  private static incLevel(kwargs: RenderKwargs): RenderKwargs {
    return { ...kwargs, level: (kwargs.level ?? 2) + 2 };
  }

  private static deprecationNotice(item: Deprecable) {
    if (!item.deprecated) {
      return [];
    } else {
      return [
        M.emphasis([
          M.text(`Note: ${item.name} is deprecated. `),
          ...(typeof item.deprecated === 'string') ? [fromMarkdown(item.deprecated)].flat(1) : [],
        ]),
      ];
    }
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *   <h2 slot="header">${kwargs.header}</h2>
   *
   *   ${content}
   *
   * </pfe-band>
   */
  public static renderBand(content: string|Node[], kwargs?: RenderKwargs) {
    return toMarkdown(DocsPage.band(content, kwargs));
  }

  declare demo?: string;
  declare description?: string|null;
  declare docsPath?: string;
  declare module?: string;
  declare script?: string;
  declare summary?: string|null;
  declare manifest?: Manifest;
  declare packageJson?: PackageJSON;
  declare category: 'components'|'core'|'tools';

  declare slug: string;
  declare tagName: string;
  declare title: string;
  declare package: string;

  constructor(
    pkg: string,
    private packagePath: string
  ) {
    this.package = pkg;
    this.tagName = this.package.replace('@patternfly/', '');
    this.slug = this.tagName.replace('pfe-', '');
    this.title = pretty(this.slug);
    const [, category] = this.packagePath.match(/patternfly-elements\/(\w+)/) ?? [];
    this.category = category === 'elements' ? 'components' : category as 'core';
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

  private packageTagName(kwargs: RenderKwargs = {}): string {
    if (kwargs.for && !kwargs.for?.match?.(/@/)) {
      return kwargs.for;
    } else {
      const [, tagName = this.tagName] = (kwargs?.for ?? '').match(/@patternfly\/(.*)/) ?? [];
      return tagName;
    }
  }

  /**
   * <pfe-band class="header" use-grid>
   *   <h1 slot="header">Element Title</h1>
   * </pfe-band>
   *
   * <pfe-band size="small" color="lightest" use-grid>
   *   <h2 slot="header">Overview</h2>
   *
   *   Element description from CEM
   *
   *   <demo-snippet>
   *     <p>shows off features</p>
   *   </demo-snippet>
   * </pfe-band>
   *
   * <pfe-band size="small" color="lightest" use-grid>
   *   <h2 slot="header">Installation</h2>
   *
   *   ```shell
   *   npm install @patternfly/pfe-button
   *   ```
   *
   * </pfe-band>
   */
  renderOverview(content: string, kwargs: RenderKwargs = {}) {
    const description = this.manifest?.getDescription(this.packageTagName(kwargs));

    return toMarkdown(M.root([
      M.html(dedent`
        <pfe-band class="header" use-grid>
          <h1 slot="header">${this.title ?? kwargs?.title}</h1>
        </pfe-band>`),
      DocsPage.band([
        fromMarkdown(description ?? ''),
        fromMarkdown(content ?? ''),
      ], { header: 'Overview' }),
      DocsPage.band([
        M.code('shell', `npm install ${this.package}`) as Node,
      ], { header: 'Installation' }),
    ]) as Node);
  }

  private renderAttribute(attr: Attribute, kwargs: RenderKwargs = {}): Node[] {
    return [
      M.heading((kwargs.level ?? 2) + 1, M.inlineCode(attr.name)),
      ...DocsPage.deprecationNotice(attr),
      M.paragraph([
        M.emphasis(M.text('Type')),
        M.text(': '),
        // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
        M.inlineCode(attr.type?.text ?? 'unknown'),
        M.text(' '),
        ...!attr.fieldName ? [] : [
          M.emphasis(M.text('DOM Property')),
          M.text(': '),
          M.inlineCode(attr.fieldName),
          M.text(' '),
        ],
        M.emphasis(M.text('Default')),
        M.text(': '),
          // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
          attr.default ? M.inlineCode(attr.default) : M.text('none'),
      ]),
      fromMarkdown(attr.description ?? ''),
    ] as Node[];
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## Attributes
   *
   *   Paired shortcode content goes here
   *
   *   ### an-attribute
   *   An element attribute
   *
   * </pfe-band>
   */
  renderAttributes(content: string, kwargs: RenderKwargs = {}) {
    const _attrs = this.manifest?.getAttributes(this.packageTagName(kwargs)) ?? [];

    const deprecated = _attrs.filter(x => x.deprecated);
    const attrs = _attrs.filter(x => !x.deprecated);

    kwargs.header ??= 'Attributes';
    kwargs.level ??= 2;

    return toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ...(!attrs.length && !content) ? [M.text('None') as Node] : attrs.flatMap(attr => this.renderAttribute(attr)),
      ...(!deprecated.length) ? [] : DocsPage.details('Deprecated Attributes', deprecated.flatMap(attr =>
        this.renderAttribute(attr, DocsPage.incLevel(kwargs)))),
    ], kwargs) as Node, );
  }

  private renderProperty(prop: ClassField, kwargs: RenderKwargs = {}): Node[] {
    return [
      M.heading((kwargs.level ?? 2) + 1, M.inlineCode(prop.name)),
      ...DocsPage.deprecationNotice(prop),
      M.paragraph([
        M.emphasis(M.text('Type')),
        M.text(': '),
        // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
        M.inlineCode(prop.type?.text ?? 'unknown'),
        M.text(' '),
        M.emphasis(M.text('Default')),
        M.text(': '),
        ...DocsPage.deprecationNotice(prop),
            // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
            prop.default ? M.inlineCode(prop.default) : M.text('none'),
      ]),
      fromMarkdown(prop.description ?? ''),
    ] as Node[];
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## Properties
   *
   *   Paired shortcode content goes here
   *
   *   ### classProperty
   *   A class property that has no attribute
   *
   * </pfe-band>
   */
  renderProperties(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const _properties = this.manifest.getProperties(this.packageTagName(kwargs)) ?? [];

    const deprecated = _properties.filter(x => x.deprecated);
    const properties = _properties.filter(x => !x.deprecated);

    kwargs.header ??= 'DOM Properties';
    kwargs.level ??= 2;

    return !properties.length ? '' : toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ...properties.flatMap(prop => this.renderProperty(prop, kwargs)),
      ...(!deprecated.length) ? [] : DocsPage.details('Deprecated Properties', deprecated.flatMap(attr =>
        this.renderProperty(attr, DocsPage.incLevel(kwargs)))),
    ], kwargs));
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   <a id="styling-hooks"></a>
   *   ## CSS Custom Properties
   *
   *   Paired shortcode content goes here
   *
   *   | CSS Property   | Description    | Default         |
   *   | -------------- | -------------- | --------------- |
   *   | `--a-property` | A CSS Property | `rebeccapurple` |
   *
   * </pfe-band>
   */
  renderCssCustomProperties(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const props = this.manifest.getCssCustomProperties(this.packageTagName(kwargs)) ?? [];

    kwargs.header ??= 'CSS Custom Properties';
    kwargs.level ??= 2;

    return toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ( !props.length ? M.text(content.length ? '' : 'None')
      : M.table(['left', 'left', 'left'], [
        M.tableRow([
          M.tableCell(M.text('CSS Property')),
          M.tableCell(M.text('Description')),
          M.tableCell(M.text('Default')),
        ]),
        ...props.flatMap(prop => M.tableRow([
          M.tableCell([
            // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
            M.inlineCode(prop.name),
            ...DocsPage.deprecationNotice(prop),
          ]),
          M.tableCell(fromMarkdown(prop.description ?? '')),
          M.tableCell(
              !prop.default ? M.text('-')
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
            : M.inlineCode(prop.default.replace(/^`|`$/g, ''))
          ),
        ])),
      ])) as Node,
    ], kwargs) as Node, { extensions: [gfmTableToMarkdown()] });
  }

  private renderCssPart(part: CssPart): Node {
    return M.paragraph([
      M.strong(M.inlineCode(part.name)),
      ...DocsPage.deprecationNotice(part),
      M.text(' '),
      fromMarkdown(part.description ?? ''),
    ]) as Node;
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## CSS Shadow Parts
   *
   *   Paired shortcode content goes here
   *
   *   **`a-part`** targets an element shadow part
   *
   * </pfe-band>
   */
  renderCssParts(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const _parts = this.manifest.getCssParts(this.packageTagName(kwargs)) ?? [];
    const parts = _parts.filter(x => !x.deprecated);
    const deprecated = _parts.filter(x => x.deprecated);

    kwargs.header ??= 'CSS Shadow Parts';
    kwargs.level ??= 2;

    return !parts.length ? '' : toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ...parts.map(part => this.renderCssPart(part)),
      ...(!deprecated.length) ? [] : DocsPage.details('Deprecated CSS Shadow Parts', deprecated.flatMap(part =>
        this.renderCssPart(part), DocsPage.incLevel(kwargs)), DocsPage.incLevel(kwargs)),
    ], kwargs));
  }

  private renderEvent(event: Event, kwargs: RenderKwargs = {}): Node[] {
    return [
      M.heading((kwargs.level ?? 2) + 1, M.inlineCode(event.name)),
      fromMarkdown(event.description ?? ''),
      ...DocsPage.deprecationNotice(event),
      ...this.maybeType(event, { header: 'Event Type:' }) as Node[],
    ] as Node[];
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## Events
   *
   *   Paired shortcode content goes here
   *
   *   ### event
   *   Fired when an event occurs
   *
   * </pfe-band>
   */
  renderEvents(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const _events = this.manifest.getEvents(this.packageTagName(kwargs)) ?? [];

    kwargs.header ??= 'Events';
    kwargs.level ??= 2;

    const deprecated = _events.filter(x => x.deprecated);
    const events = _events.filter(x => !x.deprecated);

    return toMarkdown(DocsPage.band([

      fromMarkdown(content ?? ''),

      ...(!events.length ? [M.text('None') as Node]
      : events.flatMap(event => this.renderEvent(event, kwargs))),

      ...(!deprecated.length ? []
      : DocsPage.details('Deprecated Events', [
        ...deprecated.flatMap(event => this.renderEvent(event, DocsPage.incLevel(kwargs))),
      ], kwargs)) as Node[],
    ], kwargs));
  }

  private renderMethod(method: ClassMethod, kwargs: RenderKwargs = {}): Node[] {
    return [
      // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
      M.heading((kwargs.level ?? 2) + 1, M.inlineCode(`${method.name}(${stringifyParams(method)})`)),
      ...DocsPage.deprecationNotice(method),
      fromMarkdown(method.description ?? ''),
    ] as Node[];
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## Methods
   *
   *   Paired shortcode content goes here
   *
    *   ### method(param: type, param: type)
   *   A class method
   *
   * </pfe-band>
   */
  renderMethods(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const _methods = this.manifest.getMethods(this.packageTagName(kwargs)) ?? [];

    const deprecated = _methods.filter(x => x.deprecated);
    const methods = _methods.filter(x => !x.deprecated);

    kwargs.header ??= 'Methods';
    kwargs.level ??= 2;

    return toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ...!methods.length ? [M.text('None') as Node] : methods.flatMap(method => this.renderMethod(method, kwargs)),
      ...!deprecated.length ? [] : DocsPage.details('Deprecated Methods', deprecated.flatMap(method =>
        this.renderMethod(method, DocsPage.incLevel(kwargs)), DocsPage.incLevel(kwargs))),
    ], kwargs));
  }

  private renderSlot(slot: Slot, kwargs: RenderKwargs = {}): Node[] {
    return [
      M.heading(
        (kwargs.level ?? 2) + 1,
        slot.name ? M.inlineCode(slot.name) : M.text('Default Slot')
      ),
      ...DocsPage.deprecationNotice(slot),
      fromMarkdown(slot.description ?? ''),
    ] as Node[];
  }

  /**
   * <pfe-band size="small" color="lightest" use-grid>
   *
   *   ## Slots
   *
   *   Paired shortcode content goes here
   *
   *   ### Default Slot
   *   Element content
   *
   *   ### `named-slot`
   *   Specific content
   *
   * </pfe-band>
   */
  renderSlots(content: string, kwargs: RenderKwargs = {}) {
    if (!this.manifest) {
      return '';
    }
    const _slots = this.manifest.getSlots(this.packageTagName(kwargs)) ?? [];
    const slots = _slots.filter(x => !x.deprecated);
    const deprecated = _slots.filter(x => x.deprecated);

    kwargs.header ??= 'Slots';
    kwargs.level ??= 2;

    return toMarkdown(DocsPage.band([
      fromMarkdown(content ?? ''),
      ...!slots.length ? [M.text('None') as Node] : slots.flatMap(slot => this.renderSlot(slot, kwargs)),
      ...!deprecated.length ? [] : DocsPage.details('Deprecated Slots', deprecated.flatMap(slot =>
        this.renderSlot(slot, DocsPage.incLevel(kwargs)), DocsPage.incLevel(kwargs))),
    ], kwargs));
  }

  private maybeType(item: Deprecable & { type: Type }, { header }: RenderKwargs) {
    // TODO: Better caching and matching
    if (!this.manifest) {
      return '';
    }
    const decl = item.type && this.manifest.manifest.modules
      .flatMap(x => x.declarations ?? [])
      .find(x => x.name === item.type.text);

    return !item.type ? [] : [
      M.paragraph([
        M.emphasis(M.text(header ?? 'Type:')),
        M.text(' '),
        M.inlineCode(item.type.text),
      ]),
      ...!(decl as ClassDeclaration)?.members ? [] : [
        M.list('unordered',
          (decl as ClassDeclaration).members?.filter?.(isField).map(member => M.listItem([
            M.paragraph([
              M.text(`${member.name}: `),
              // TODO: inline code highlighting: render the markdown to html and extract the `<code>` from the `<pre>`
              M.inlineCode((member as ClassField).type?.text ?? 'unknown'),
              ...[M.text(' '), fromMarkdown(member.summary ?? '')].flat(1),
            ]),
            ...!member.description ? [] : [fromMarkdown(member.description)].flat(1),
          ]),
          ) as Node[]),
      ],
      // ...decl ? [M.code('json', JSON.stringify(decl, null, 2))] : [],
      // TODO: fetch types from manifest and render
    ];
  }
}
