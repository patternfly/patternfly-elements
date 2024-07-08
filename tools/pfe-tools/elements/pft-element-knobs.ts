import type {
  Attribute,
  CustomElementDeclaration,
  Package,
  Slot,
} from 'custom-elements-manifest';

import type {
  AttributeRenderer,
  AttributeKnobInfo,
  ContentKnobInfo,
  ContentRenderer,
} from './lib/knobs.js';

import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  isCustomElementDecl,
  isCheckable,
  isValue,
  isAttributelessProperty,
  dedent,
} from './lib/knobs.js';

import 'zero-md';

import './pft-html-editor.js';

import style from './pft-element-knobs.css';

@customElement('pft-element-knobs')
export class PftElementKnobs<T extends HTMLElement> extends LitElement {
  static styles = [style];

  @property() tag?: string;

  @property({ attribute: false }) manifest?: Package;

  @property({ attribute: false }) element: T | null = null;

  @property({ attribute: false }) renderAttribute: AttributeRenderer<T> = this.#renderAttribute;

  @property({ attribute: false }) renderContent: ContentRenderer<T> = this.#renderContent;

  #mo = new MutationObserver(this.#loadTemplate);

  #node: DocumentFragment | null = null;

  #elementDecl: CustomElementDeclaration | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.#mo.observe(this, { childList: true });
    this.#loadTemplate();
  }

  get #template() {
    return this.querySelector('template');
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('manifest') || changed.has('tag')) {
      for (const mod of this.manifest?.modules ?? []) {
        for (const decl of mod.declarations ?? []) {
          if (isCustomElementDecl(decl) && decl.tagName === this.tag) {
            this.#elementDecl = decl;
          }
        }
      }
    }
  }

  #loadTemplate() {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        this.manifest = JSON.parse(script.textContent ?? '');
      } catch {
        void 0;
      }
    }
    if (this.#template && this.tag) {
      this.#node = this.#template.content.cloneNode(true) as DocumentFragment;
      this.element = this.#node.querySelector(this.tag);
    }
  }

  #getInfoForAttribute(attribute: Attribute, element: T): AttributeKnobInfo<T> {
    // NOTE: we assume typescript types
    const type = attribute?.type?.text ?? '';
    const isUnion = !!type.includes?.('|');
    const types = type.split('|').map(x => x.trim());
    const isNullable = types.includes('null');
    const isOptional = types.includes('undefined');
    const isNumber = types.includes('number');
    const isBoolean = types.every(type => type.match(/null|undefined|boolean/));
    const values = isUnion ? types.filter(x => x !== 'undefined' && x !== 'null') : [];
    const isEnum = isUnion && values.length > 1;
    const knobId = `knob-attribute-${attribute.name}`;
    return {
      knobId,
      element,
      isBoolean,
      isEnum,
      isNullable,
      isNumber,
      isOptional,
      values,
    };
  }

  #renderAttribute(attribute: Attribute, info: AttributeKnobInfo<T>) {
    const { knobId, element, isEnum, isBoolean, isNumber, values } = info;
    const QUOTE_RE = /^['"](.*)['"]$/;
    const attributeValue =
         element?.getAttribute(attribute.name)
      ?? attribute.default?.replace(QUOTE_RE, '$1');
    return html`
      <pf-tooltip>
        <label for="${knobId}"><code>${attribute.name}</code></label>${[attribute.summary, attribute.description].filter(Boolean).map(x => html`
        <zero-md slot="content">
          <template>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown-dark.min.css">
          </template>
          ${this.#renderMarkdown(x)}
        </zero-md>`)}
      </pf-tooltip>
      ${isBoolean ? html`
      <pf-switch id="${knobId}"
                 ?checked="${attribute.default === 'true'}"
                 data-attribute="${attribute.name}"></pf-switch>` : isEnum ? html`
      <pf-select id="${knobId}"
                 placeholder="Select a value"
                 data-attribute="${attribute.name}"
                 value="${ifDefined(attributeValue)}">${values!.map(x => html`
        <pf-option>${x.trim().replace(QUOTE_RE, '$1')}</pf-option>`)}
      </pf-select>` : html`
      <pf-text-input id="${knobId}"
                     value="${ifDefined(attributeValue)}"
                     type="${ifDefined(isNumber ? 'number' : undefined)}"
                     helper-text="${ifDefined(attribute.type?.text)}"
                     data-attribute="${attribute.name}"></pf-text-input>`}
    `;
  }

  #renderMarkdown(md?: string) {
    return !md ? '' : html`
      <script type="text/markdown">${md}</script>
    `;
  }

  #renderContent(slots: Slot[], info: ContentKnobInfo<T>) {
    // todo : change listener is inflexible
    return html`
      <dl id="slot-descriptions">${slots.map(x => html`
        <dt>${x.name ? html`
          <code>${x.name}</code>` : html`
          <strong>Default slot</strong>`}
        </dt>
        <dd>
          <zero-md><script type="text/markdown">${x.summary ?? ''}</script></zero-md>
          <zero-md><script type="text/markdown">${x.description ?? ''}</script></zero-md>
        </dd>`)}
      </dl>
      <pf-code-block>
        <pft-html-editor id="${info.knobId}"
                         @input="${this.#onKnobChangedContent}"
                         .value="${dedent(info.element.innerHTML)}"></pft-html-editor>
      </pf-code-block>
    `;
  }

  #renderKnobs() {
    const decl = this.#elementDecl;
    const { element, tag, manifest } = this;
    if (element && decl && tag && manifest) {
      const {
        summary,
        description,
        attributes,
        members,
        slots,
      } = decl;

      const properties = members?.filter(isAttributelessProperty) ?? [];

      return html`
        <hr>
        <form id="knobs" @submit="${(e: Event) => e.preventDefault()}">
          <h2><code>&lt;${tag}&gt;</code></h2>
          <zero-md>${this.#renderMarkdown(summary)}</zero-md>
          <zero-md>${this.#renderMarkdown(description)}</zero-md>
          ${!attributes ? '' : html`
          <section id="attributes"
                   @change="${this.#onKnobChangeAttribute}"
                   @input="${this.#onKnobChangeAttribute}">
          <h2>Attributes</h2>
          ${attributes.map(x => this.renderAttribute(x, this.#getInfoForAttribute(x, element)))}
          </section>`}
          ${!slots ? '' : html`
          <section>
            <h2>Slots</h2>
            ${this.renderContent(slots, { knobId: 'knob-html-content', element })}
          </section>`}
        </form>
      `;
    }
  }

  #onKnobChangeAttribute(e: Event & { target: HTMLElement }) {
    if (isCheckable(e.target)) {
      this.element?.toggleAttribute(e.target.dataset.attribute!, e.target.checked);
    } else if (isValue(e.target)) {
      this.element?.setAttribute(e.target.dataset.attribute!, e.target.value);
    }
  }

  #onKnobChangedContent(e: Event & { target: HTMLInputElement }) {
    if (this.element) {
      this.element.innerHTML = e.target.value;
    }
  }

  protected override render(): unknown {
    return html`
      <div id="element">${this.#node ?? ''}</div>
      ${this.#renderKnobs() ?? ''}
    `;
  }
}
