import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-radio-group.css';

export class PFRadioGroupChangeEvent extends Event {
  constructor(public event: Event, public value: string) {
    super('change', { bubbles: true });
  }
}

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio-group')
export class PFRadioGroup extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static formAssociated = true;
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true }) name = '';

  @property({ reflect: true }) label?: string;

  @property({ reflect: true }) value = '';

  @property({ attribute: 'radio-group', reflect: true }) radioGroup: any = {};
  // = {
  //   name: 'title',
  //   radios: [{
  //     value: 'mr',
  //     label: 'Mr'
  //   }, {
  //     value: 'miss',
  //     label: 'Miss'
  //   }, {
  //     value: 'mrs',
  //     label: 'Mrs'
  //   },{
  //     value: 'dr',
  //     label: 'Dr'
  //   }]
  // };


  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  #onClick(event: MouseEvent) {
    this.dispatchEvent(new PFRadioGroupChangeEvent(event, this.value));
  }

  render(): TemplateResult<1> {
    const radioGroupDetails: JSON[] = JSON.parse(this.radioGroup);
    return html`
      <div>
        ${radioGroupDetails.map((radio: any) =>{
          const radioId = `radio${Math.random().toString(36).substring(2, 15)}`;
          return html`
          <input type="radio" id=${radioId} value=${radio.value} name=${radio.name}>
          <label for=${radioId}>${radio.label}</label>
          `;
        }
  )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio-group': PFRadioGroup;
  }
}
