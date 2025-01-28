import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-radio-group.css';

export class PfRadioGroupChangeEvent extends Event {
  constructor(public event: Event, public value: string) {
    super('change', { bubbles: true });
  }
}

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio-group')
export class PfRadioGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];
  static formAssociated = true;
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static radioGroup: any = [];

  @property({ reflect: true }) name = '';
  @property({ reflect: true }) label?: string;
  @property({ reflect: true }) value = '';
  @property({ reflect: true }) groupNode = '';
  @property({ reflect: true }) checked = '';
  @property({ reflect: true }) disabled = '';

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
    this.addEventListener('render-radio', this.#renderRadioInput);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  #onClick(event: MouseEvent) {
    // this.dispatchEvent(new PfRadioGroupChangeEvent(event, this.value));
  }

  #renderRadioInput(event: any): void {
    this.value = event.detail.value;
    this.label = event.detail.label;
    this.groupNode = event.detail.node;
    this.checked = event.detail.checked;
    // this.disabled = event.detail.disabled;

    const group = PfRadioGroup.radioGroup.find((item: any) =>
      (item.name === this.name && item.node === this.groupNode));
    if (group) {
      // If found, just push the new radio input to the existing radio group
      group.value.push({ value: this.value, label: this.label });
    } else {
      // If not found, create a new radio group with the current input
      PfRadioGroup.radioGroup.push({
        name: this.name, node: this.groupNode,
        value: [{ value: this.value, label: this.label, checked: this.checked }],
      });
    }
  }

  render(): TemplateResult<1> | void {
    const radioGroupId = `radioGroup${Math.random().toString(36).substring(2, 15)}`;

    return html`
      <slot name="title"></slot>
      ${PfRadioGroup.radioGroup.map((group: any) => {
      if (group.name === this.name && group.node === this) {
        return html`
          <div>
            ${group.value.map((radio: any) => {
          return html`
                <input type="radio" id=${radioGroupId} name=${group.name} 
                  value=${radio.value} checked=${radio.checked}/>
                <label for=${radioGroupId}>${radio.label}</label>
              `;
        })}
          </div>
        `;
      }
    })}
    <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio-group': PfRadioGroup;
  }
}
