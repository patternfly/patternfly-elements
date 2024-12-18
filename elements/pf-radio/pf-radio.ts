import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
// import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { state } from 'lit/decorators/state.js';

import styles from './pf-radio.css';

export class PfRadioChangeEvent extends Event {
  constructor(public event: Event, public value: string) {
    super('change', { bubbles: true });
  }
}

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio')
export class PfRadio extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static formAssociated = true;
  #internals = this.attachInternals();
  // static shadowRootOptions: ShadowRootInit = {
  //   ...LitElement.shadowRootOptions,
  //   delegatesFocus: true,
  // };

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true }) name = '';

  @property({ reflect: true }) label?: string;

  @property({ reflect: true }) value = '';

  @state() private focusable = false;

  /** Radio groups: instances.get(groupName).forEach(pfRadio => { ... }) */
  private static instances = new Map<string, Set<PfRadio>>();
  private static radioInstances = new Map<Node, Map<string, Set<PfRadio>>>();
  private static selected = new Map<Node, Map<string, PfRadio>>();

  static {
    globalThis.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          this.radioInstances.forEach((radioGroup, parentNode) => {
            radioGroup.forEach((radioSet, groupName) => {
              const selectedNode = this.selected.get(parentNode);
              const selected = selectedNode?.get(groupName);
              [...radioSet].forEach((radio: PfRadio, i: number, radios: PfRadio[]) => {
                // the radio group has a selected element
                // it should be the only focusable member of the group
                radio.focusable = false;
                radio.tabIndex = -1;
                if (groupName === radio.name) {
                  if (selected) {
                    radio.focusable = radio === selected;
                    // when Shift-tabbing into a group, only the last member should be selected
                  } else if (e.shiftKey) {
                    radio.focusable = radio === radios.at(-1);
                    // otherwise, the first member must be focusable
                  } else {
                    radio.focusable = i === 0;
                  }
                  radio.tabIndex = radio.focusable ? 0 : -1;
                }
              });
            });
          });
          break;
      }
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeydown);

    // Function to group radios based on parent node and name
    const root: Node = this.getRootNode();
    let radioGroup: NodeListOf<PfRadio>;
    if (root instanceof Document || root instanceof ShadowRoot) {
      radioGroup = root.querySelectorAll('pf-radio');
      radioGroup.forEach((radio: PfRadio) => {
        if (radio.parentNode && radio.parentNode === this.parentNode && radio.name === this.name) {
          let radioGroupMap = PfRadio.radioInstances.get(radio.parentNode);
          if (!radioGroupMap) {
            radioGroupMap = new Map<string, Set<PfRadio>>();
            PfRadio.radioInstances.set(radio.parentNode, radioGroupMap);
          }
          let radioSet: Set<PfRadio> | undefined = radioGroupMap.get(this.name);
          if (!radioSet) {
            radioSet = new Set<PfRadio>();
            radioGroupMap.set(this.name, radioSet);
          }
          radioSet.add(radio);
        }
      });
    }

    PfRadio.radioInstances.forEach((radioGroup, parentNode) => {
      (parentNode as HTMLElement).setAttribute('role', 'radiogroup');
      radioGroup.forEach((radioSet, groupName) => {
        [...radioSet].forEach((radio: PfRadio, i: number, radios: PfRadio[]) => {
          radio.#internals.ariaLabel = radio.label ? radio.label : radio.value;
          radio.#internals.role = 'radio';
          radio.#internals.ariaPosInSet = (i + 1).toString();
          radio.#internals.ariaSetSize = (radios.length).toString();
          radio.#internals.ariaChecked = radio.checked.toString();
          radio.#internals.ariaLabel = radio.label ? radio.label : radio.value;
          radio.setAttribute('tabindex', (i === 0 ? 0 : -1).toString());
          radio.classList.add('pf-radio-input');
        });
      });
    });
  }

  // @observes('checked')
  // protected checkedChanged(): void {
  //   if (this.checked) {
  //     PfRadio.selected.set(this.name, this);
  //   }
  // }

  // @observes('name')
  // protected nameChanged(oldName: string): void {
  //   // reset the map of groupname to selected radio button
  //   if (PfRadio.selected.get(oldName) === this) {
  //     PfRadio.selected.delete(oldName);
  //     PfRadio.selected.set(this.name, this);
  //   }
  //   if (typeof oldName === 'string') {
  //     PfRadio.instances.get(oldName)?.delete(this);
  //   }
  //   if (!PfRadio.instances.has(this.name)) {
  //     PfRadio.instances.set(this.name, new Set());
  //   }
  //   PfRadio.instances.get(this.name)?.add(this);
  // }

  disconnectedCallback(): void {
    PfRadio.instances.get(this.name)?.delete(this);
    if (this.parentNode) {
      const parentNode = PfRadio.radioInstances.get(this.parentNode);
      if (parentNode) {
        PfRadio.radioInstances.delete(this.parentNode);
      }
    }
    super.disconnectedCallback();
  }

  #onChange(event: Event) {
    if (!this.checked) {
      PfRadio.radioInstances.forEach((radioGroup, parentNode) => {
        if (parentNode === this.parentNode) {
          radioGroup.forEach((radioSet, groupName) => {
            if (this.parentNode && groupName === this.name) {
              [...radioSet].forEach((radio: PfRadio) => {
                radio.checked = false;
              });
              this.checked = true;
              this.dispatchEvent(new PfRadioChangeEvent(event, this.value));
              this.#updateSelected(this.parentNode, this, this.name);
            }
          });
        }
      });
    }
  }

  #updateSelected(parentNode: ParentNode, radio: PfRadio, name: string) {
    if (!PfRadio.selected.has(parentNode)) {
      PfRadio.selected.set(parentNode, new Map<string, PfRadio>());
    }
    const nodeMap = PfRadio.selected.get(parentNode);
    if (nodeMap) {
      PfRadio.selected.get(parentNode)?.set(name, radio);
    }
  }

  // Function to handle keyboard navigation
  #onKeydown = (event: KeyboardEvent) => {
    const arrowKeys: string[] = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (arrowKeys.includes(event.key)) {
      PfRadio.radioInstances.forEach((radioGroup, parentNode) => {
        if (parentNode === this.parentNode) {
          radioGroup.forEach((radioSet: Set<PfRadio>, groupName: string) => {
            if (groupName === this.name) {
              this.checked = false;
              [...radioSet].forEach((radio: PfRadio, index: number, radios: PfRadio[]) => {
                if (this.parentNode && radio === event.target) {
                  const isArrowDownOrRight: boolean =
                    ['ArrowDown', 'ArrowRight'].includes(event.key);
                  const isArrowUpOrLeft: boolean = ['ArrowUp', 'ArrowLeft'].includes(event.key);
                  const direction: 1 | 0 | -1 = isArrowDownOrRight ? 1 : isArrowUpOrLeft ? -1 : 0;
                  if (direction === 0) {
                    return;
                  }
                  const nextIndex: number = (index + direction + radios.length) % radios.length;
                  radios[nextIndex].focus();
                  radios[nextIndex].checked = true;
                  // TODO: move this to an @observes
                  // consider the api of this event.
                  // do we add the group to it? do we fire from every element on every change?
                  this.dispatchEvent(new PfRadioChangeEvent(event, radios[nextIndex].value));
                  this.#updateSelected(this.parentNode, radios[nextIndex], radios[nextIndex].name);
                }
              });
            }
          });
        }
      });
    }
  };

  // Add a pf component and check if there is any change with the values.
  render(): TemplateResult<1> {
    return html`
      <div aria-hidden="true" tabindex="-1">
        <input
          id="radio"
          type="radio"
          @change=${this.#onChange}
          .name=${this.name}
          value=${this.value}
          .checked=${this.checked} 
          tabindex="-1"
        >
        <label for="radio">${this.label}</label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
