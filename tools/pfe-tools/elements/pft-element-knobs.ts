import type {
  Attribute,
  CustomElementDeclaration,
  Declaration,
  Package,
} from 'custom-elements-manifest';

import { LitElement, css, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

type KnobRenderer<T> = (
  this: PftElementKnobs<HTMLElement>,
  attribute: T,
  index: number,
  array: T[],
) => unknown;

export type AttributeRenderer = KnobRenderer<Attribute>;

const isCustomElementDecl = (decl: Declaration): decl is CustomElementDeclaration =>
  'customElement' in decl;

@customElement('pft-element-knobs')
export class PftElementKnobs<T extends HTMLElement> extends LitElement {
  static styles = [
    css`
      #element {
        padding: 1em;
      }
      fieldset {
        display: grid;
        gap: 4px;
        grid-template-columns: max-content 1fr;
        align-items: center;
      }
    `,
  ];

  @property() tag?: string;

  @property({ attribute: false }) manifest?: Package;

  @property({ attribute: false }) element: T | null = null;

  @property({ attribute: false }) renderAttribute: AttributeRenderer = this.#renderAttribute;

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
        null;
      }
    }
    if (this.#template && this.tag) {
      this.#node = this.#template.content.cloneNode(true) as DocumentFragment;
      this.element = this.#node.querySelector(this.tag);
    }
  }

  #renderAttribute(attribute: Attribute) {
    const QUOTE_RE = /^['"](.*)['"]$/;
    // TODO: non-typescript types?
    const isBoolean = attribute?.type?.text === 'boolean';
    const isUnion = !!attribute?.type?.text?.includes?.('|');
    let isEnum = false;
    let values: string[];
    if (isUnion) {
      values = attribute?.type?.text
          .split('|')
          .map(x => x.trim())
          .filter(x => x !== 'undefined' && x !== 'null') ?? [];
      if (values.length > 1) {
        isEnum = true;
      }
    }
    const id = `knob-attribute-${attribute.name}`;
    return html`
      <label for="${id}">${attribute.name}</label>${isBoolean ? html`
      <input id="${id}"
          type="checkbox"
          ?checked="${attribute.default === 'true'}"
          data-attribute="${attribute.name}">` : isEnum ? html`
      <pf-select id="${id}"
                 placeholder="Select a value"
                 data-attribute="${attribute.name}"
                 value="${ifDefined(attribute.default?.replace(QUOTE_RE, '$1'))}">${values!.map(x => html`
        <pf-option>${x.trim().replace(QUOTE_RE, '$1')}</pf-option>`)}
      </pf-select>
      ` : html`
      <pf-text-input id="${id}"
                     value="${ifDefined(attribute.default?.replace(QUOTE_RE, '$1'))}"
                     helper-text="${ifDefined(attribute.type?.text)}"
                     data-attribute="${attribute.name}"></pf-text-input>`}
    `;
  }

  #renderKnobs() {
    const decl = this.#elementDecl;
    const { element, tag, manifest } = this;
    if (element && decl && tag && manifest) {
      const { attributes } = decl;

      const onChange = (e: Event & { target: HTMLInputElement }) => {
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
          this.element?.toggleAttribute(e.target.dataset.attribute!, e.target.checked);
        } else {
          this.element?.setAttribute(e.target.dataset.attribute!, e.target.value);
        }
      };

      return html`
        <form @submit="${(e: Event) => e.preventDefault()}">
          ${!attributes ? '' : html`
          <fieldset @change="${onChange}" @input="${onChange}">
            <legend>Attributes</legend>
            ${attributes.map(this.renderAttribute, this)}
          </fieldset>`}
        </form>
      `;
    }
  }

  protected override render(): unknown {
    return html`
      <div id="element">${this.#node ?? ''}</div>
      ${this.#renderKnobs() ?? ''}
    `;
  }
}
