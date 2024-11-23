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
    // attribute: 'inline-filter',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  })
  checked = false;

  @property({ reflect: true }) name = 'radio-test';
  @property({ reflect: true }) label?: string;
  @property({ reflect: true }) value = '';
  @property({ reflect: true }) id = '';

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
        });
        this.checked = true;
      }
    }
  }

  #onKeyPress = (event: KeyboardEvent) => {
    const root: Node = this.getRootNode();
    let radioGroup: NodeListOf<PfRadio>;
    if (root instanceof Document || root instanceof ShadowRoot) {
      radioGroup = root.querySelectorAll('pf-radio');
      if (!event.shiftKey && event.key === 'Tab') {
        radioGroup.forEach((radio, index) => {
          const input = radio.shadowRoot?.querySelector('input') as HTMLInputElement;
          // input.tabIndex = -1;
          // if(radio.id === this.shadowRoot?.activeElement?.id){
          //   //input.tabIndex = -1;
          //   //event.preventDefault();
          //   //root.focusOut()
          // }else{
          //   //input.tabIndex = 0;
          // }
          if (radio.checked === true) {
            input.tabIndex = 0;
          } else if (index === 0) {
            input.tabIndex = 0;
          } else {
            input.tabIndex = -1;
          }
        });
      }

      if (event.shiftKey && event.key === 'Tab') {
        radioGroup.forEach((radio, index) => {
          const input = radio.shadowRoot?.querySelector('input') as HTMLInputElement;
          // input.tabIndex = 0;
          // input.tabIndex = 0;
          // if(radio.id === this.shadowRoot?.activeElement?.id){
          //   input.tabIndex = 0;
          //   //event.preventDefault();
          //   //root.focusOut()
          // }else{
          //   //input.tabIndex = 0;
          // }
          if (radio.checked === true) {
            input.tabIndex = 0;
            input.focus();
          } else if (index === (radioGroup.length - 1)) {
            input.tabIndex = 0;
          } else {
            input.tabIndex = -1;
          }
        });
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
