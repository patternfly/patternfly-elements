import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class InternalsController implements ReactiveController, ARIAMixin {
  #internals: ElementInternals;

  disabled = false;

  declare role: ARIAMixin['role'];
  declare ariaAtomic: ARIAMixin['ariaAtomic'];
  declare ariaAutoComplete: ARIAMixin['ariaAutoComplete'];
  declare ariaBusy: ARIAMixin['ariaBusy'];
  declare ariaChecked: ARIAMixin['ariaChecked'];
  declare ariaColCount: ARIAMixin['ariaColCount'];
  declare ariaColIndex: ARIAMixin['ariaColIndex'];
  declare ariaColIndexText: ARIAMixin['ariaColIndexText'];
  declare ariaColSpan: ARIAMixin['ariaColSpan'];
  declare ariaCurrent: ARIAMixin['ariaCurrent'];
  declare ariaDisabled: ARIAMixin['ariaDisabled'];
  declare ariaExpanded: ARIAMixin['ariaExpanded'];
  declare ariaHasPopup: ARIAMixin['ariaHasPopup'];
  declare ariaHidden: ARIAMixin['ariaHidden'];
  declare ariaInvalid: ARIAMixin['ariaInvalid'];
  declare ariaKeyShortcuts: ARIAMixin['ariaKeyShortcuts'];
  declare ariaLabel: ARIAMixin['ariaLabel'];
  declare ariaLevel: ARIAMixin['ariaLevel'];
  declare ariaLive: ARIAMixin['ariaLive'];
  declare ariaModal: ARIAMixin['ariaModal'];
  declare ariaMultiLine: ARIAMixin['ariaMultiLine'];
  declare ariaMultiSelectable: ARIAMixin['ariaMultiSelectable'];
  declare ariaOrientation: ARIAMixin['ariaOrientation'];
  declare ariaPlaceholder: ARIAMixin['ariaPlaceholder'];
  declare ariaPosInSet: ARIAMixin['ariaPosInSet'];
  declare ariaPressed: ARIAMixin['ariaPressed'];
  declare ariaReadOnly: ARIAMixin['ariaReadOnly'];
  declare ariaRequired: ARIAMixin['ariaRequired'];
  declare ariaRoleDescription: ARIAMixin['ariaRoleDescription'];
  declare ariaRowCount: ARIAMixin['ariaRowCount'];
  declare ariaRowIndex: ARIAMixin['ariaRowIndex'];
  declare ariaRowIndexText: ARIAMixin['ariaRowIndexText'];
  declare ariaRowSpan: ARIAMixin['ariaRowSpan'];
  declare ariaSelected: ARIAMixin['ariaSelected'];
  declare ariaSetSize: ARIAMixin['ariaSetSize'];
  declare ariaSort: ARIAMixin['ariaSort'];
  declare ariaValueMax: ARIAMixin['ariaValueMax'];
  declare ariaValueMin: ARIAMixin['ariaValueMin'];
  declare ariaValueNow: ARIAMixin['ariaValueNow'];
  declare ariaValueText: ARIAMixin['ariaValueText'];

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
  ) {
    this.#internals = host.attachInternals();
    const { formDisabledCallback } = host;
    Object.defineProperty(Object.getPrototypeOf(host), 'formDisabledCallback', {
      configurable: true,
      value: (disabled: boolean) => {
        formDisabledCallback?.call(host, disabled);
        this.formDisabledCallback(disabled);
      }
    });
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.host.requestUpdate();
    for (const key of Object.keys(Object.getPrototypeOf(this.#internals))) {
      Object.defineProperty(this, key, {
        get() {
          return this.#internals[key];
        },
        set(value) {
          this.#internals[key] = value;
        }
      });
    }
  }

  hostConnected?(): void

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
