import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-radio.css';
import { property } from 'lit/decorators/property.js';

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio')
export class PfRadio extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];
  static formAssociated = true;
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({
    type: Boolean,
    attribute: 'checked',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  }) checked = false;

  @property({
    type: Boolean,
    attribute: 'disabled',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  }) disabled = false;

  @property({ attribute: 'name', reflect: true }) name = 'radio-test';
  @property({ attribute: 'label', reflect: true }) label?: string;
  @property({ attribute: 'value', reflect: true }) value = '';
  @property({ attribute: 'id', reflect: true }) id = '';
  @property({ attribute: 'tabindex', reflect: true }) tabIndex = -1;


  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeydown);
    document.addEventListener('keydown', this.#onKeyPress);
  }

  #onRadioButtonClick() {
    if (!this.checked) {
      const root: Node = this.getRootNode();
      let radioGroup: NodeListOf<PfRadio>;
      if (root instanceof Document || root instanceof ShadowRoot) {
        radioGroup = root.querySelectorAll('pf-radio');
        radioGroup.forEach(radio => {
          const element: HTMLElement = radio as HTMLElement;
          element?.removeAttribute('checked');
          element.tabIndex = -1;
        });
        this.checked = true;
        this.tabIndex = 0;
      }
    }
  }

  #onKeyPress = (event: KeyboardEvent) => {
    const root: Node = this.getRootNode();
    let radioGroup: NodeListOf<PfRadio>;
    let isRadioChecked = false;
    if (root instanceof Document || root instanceof ShadowRoot) {
      radioGroup = root.querySelectorAll('pf-radio');
      if (event.key === 'Tab') {
        radioGroup.forEach((radio, index) => {
          radio.tabIndex = -1;
          if (radio.checked === true) {
            radio.tabIndex = 0;
            isRadioChecked = true;
          }
        });
        if (!isRadioChecked) {
          if (event.key === 'Tab') {
            radioGroup.forEach((radio, index) => {
              radio.tabIndex = -1;
              if ( event.shiftKey ) {
                if (index === (radioGroup.length - 1)) {
                  radio.tabIndex = 0;
                } else {
                  radio.tabIndex = -1;
                }
              }
              if (!event.shiftKey) {
                if (index === 0) {
                  radio.tabIndex = 0;
                } else {
                  radio.tabIndex = -1;
                }
              }
            });
          }
        }
      }
    }
  };

  #onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown'
      || event.key === 'ArrowRight'
      || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft') {
      const root: Node = this.getRootNode();
      let radioGroup: NodeListOf<PfRadio>;
      if (root instanceof Document || root instanceof ShadowRoot) {
        radioGroup = root.querySelectorAll('pf-radio');
        radioGroup.forEach((radio, index) => {
          const element: HTMLElement = radio as HTMLElement;
          element?.removeAttribute('checked');
          this.checked = false;
          radio.tabIndex = 0;
          if (radioGroup[index] === event.target ) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
              if ((radioGroup.length - 1) === index) {
                radioGroup[0].focus();
                radioGroup[0].checked = true;
              } else {
                radioGroup[index + 1].focus();
                radioGroup[index + 1].checked = true;
              }
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
              if (index === 0) {
                radioGroup[radioGroup.length - 1].focus();
                radioGroup[radioGroup.length - 1].checked = true;
              } else {
                radioGroup[index - 1].focus();
                radioGroup[index - 1].checked = true;
              }
            }
          }
        });
      }
    }
  };


  // #onKeydown1 = (event: KeyboardEvent) => {
  //   switch (event.key) {
  //     case "ArrowDown":
  //       //this.#onArrowDown(event);
  //       // Do something for "down arrow" key press.
  //       break;
  //     case "ArrowUp":
  //       // Do something for "up arrow" key press.
  //       break;
  //     case "ArrowLeft":
  //       // Do something for "left arrow" key press.
  //       break;
  //     case "ArrowRight":
  //       // Do something for "right arrow" key press.
  //       break;
  //       default:
  //         return; // Quit when this doesn't handle the key event.
  //   }
  // };

  render(): TemplateResult<1> {
    return html`
      <label for='input'>${this.label}</label>
      <input
        @click=${this.#onRadioButtonClick}
        id=${this.id}
        .name=${this.name}
        type='radio'
        tabindex=${this.tabIndex}
        .checked='${this.checked}'
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
