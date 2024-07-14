import type {
  Attribute,
  ClassField,
  CustomElementDeclaration,
  Package,
  Slot,
} from 'custom-elements-manifest';

import type {
  AttributeRenderer,
  AttributeKnobInfo,
  PropertyRenderer,
  PropertyKnobInfo,
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
  isSerializable,
  dedent,
} from './lib/knobs.js';

import './pft-html-editor.js';

import style from './pft-element-knobs.css';

@customElement('pft-element-knobs')
export class PftElementKnobs<T extends HTMLElement> extends LitElement {
  static styles: CSSStyleSheet[] = [style];

  @property() tag?: string;

  @property({ attribute: false }) manifest?: Package;

  @property({ attribute: false }) element: T | null = null;

  @property({ attribute: false }) renderAttribute?: AttributeRenderer<T> = this.#renderAttribute;

  @property({ attribute: false }) renderContent?: ContentRenderer<T> = this.#renderContent;

  @property({ attribute: false }) renderProperty?: PropertyRenderer<T> = this.#renderProperty;

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

  #getInfoForProperty(property: ClassField, element: T): PropertyKnobInfo<T> {
    // NOTE: we assume typescript types
    const type = property?.type?.text ?? '';
    const isUnion = !!type.includes?.('|');
    const types = type.split('|').map(x => x.trim());
    const isNullable = types.includes('null');
    const isOptional = types.includes('undefined');
    const isNumber = types.includes('number');
    const isBoolean = types.every(type => type.match(/null|undefined|boolean/));
    const values = isUnion ? types.filter(x => x !== 'undefined' && x !== 'null') : [];
    const isEnum = isUnion && values.length > 1;
    const knobId = `knob-property-${property.name}`;
    return {
      knobId,
      element,
      isBoolean,
      isEnum,
      isNullable,
      isNumber,
      isOptional,
      isSerializable: isSerializable(element[property.name as keyof T]),
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
        <pft-knobs-markdown no-shadow slot="content">${this.#renderMarkdown(x)}</pft-knobs-markdown>`)}
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

  #renderProperty(property: ClassField, info: PropertyKnobInfo<T>) {
    const { knobId, element, isEnum, isBoolean, isNumber, isSerializable, values } = info;
    const QUOTE_RE = /^['"](.*)['"]$/;
    const propertyValue = element[property.name as keyof T]
      ?? property.default?.replace(QUOTE_RE, '$1');
    return html`
      <pf-tooltip>
        <label for="${knobId}"><code>${property.name}</code></label>${[property.summary, property.description].filter(Boolean).map(x => html`
        <pft-knobs-markdown no-shadow slot="content">${this.#renderMarkdown(x)}</pft-knobs-markdown>`)}
      </pf-tooltip>
      ${isBoolean ? html`
      <pf-switch id="${knobId}"
                 ?checked="${property.default === 'true'}"
                 data-attribute="${property.name}"></pf-switch>` : isEnum ? html`
      <pf-select id="${knobId}"
                 placeholder="Select a value"
                 data-attribute="${property.name}"
                 value="${ifDefined(propertyValue)}">${values!.map(x => html`
        <pf-option>${x.trim().replace(QUOTE_RE, '$1')}</pf-option>`)}
      </pf-select>` : isSerializable ? html`
      <pf-text-input id="${knobId}"
                     value="${ifDefined(propertyValue)}"
                     type="${ifDefined(isNumber ? 'number' : undefined)}"
                     helper-text="${ifDefined(property.type?.text)}"
                     data-attribute="${property.name}"></pf-text-input>` : html`
      <code>Unserializable object</code>`}
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
          <pft-knobs-markdown no-shadow><script type="text/markdown">${x.summary ?? ''}</script></pft-knobs-markdown>
          <pft-knobs-markdown no-shadow><script type="text/markdown">${x.description ?? ''}</script></pft-knobs-markdown>
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
          <header>
            <h2><code>&lt;${tag}&gt;</code></h2>
            <pft-knobs-markdown no-shadow>${this.#renderMarkdown(summary)}</pft-knobs-markdown>
          </header>
          <pft-knobs-markdown no-shadow>${this.#renderMarkdown(description)}</pft-knobs-markdown>
          ${!attributes ? '' : html`
          <section id="attributes"
                   @change="${this.#onKnobChangeAttribute}"
                   @input="${this.#onKnobChangeAttribute}">
          <h2>Attributes</h2>
          ${attributes.map(x => this.renderAttribute?.(x, this.#getInfoForAttribute(x, element)))}
          </section>`}${!properties.length ? '' : html`
          <h2>Properties</h2>
          ${properties.map(x => this.renderProperty?.(x, this.#getInfoForProperty(x, element)))}
          `}${!slots ? '' : html`
          <section>
            <h2>Slots</h2>
            ${this.renderContent?.(slots, { knobId: 'knob-html-content', element })}
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
