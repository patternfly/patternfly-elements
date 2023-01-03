import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class InternalsController implements ReactiveController, ARIAMixin {
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

  #internals: ElementInternals;

  #formDisabled = false;

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled() {
    return this.#formDisabled;
  }

  set formDisabled(v: boolean) {
    this.#formDisabled = v;
    this.host.requestUpdate();
  }

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
  ) {
    this.#internals = host.attachInternals();
    // wrap the host's form callbacks
    for (const key of ['formDisabledCallback', 'formResetCallback'] as const) {
      const orig = host[key as keyof typeof host] as undefined | ((...args:any[]) => void);
      Object.defineProperty(Object.getPrototypeOf(host), key, {
        configurable: true,
        value: (...args: any[]) => {
          orig?.call(host, ...args);
          this[key as 'formResetCallback'](...args as []);
        }
      });
    }
    // proxy the internals object's aria prototype
    for (const key of Object.keys(Object.getPrototypeOf(this.#internals))) {
      if (key === 'role' || key.startsWith('aria')) {
        Object.defineProperty(this, key, {
          get() {
            return this.#internals[key];
          },
          set(value) {
            this.#internals[key] = value;
            this.host.requestUpdate();
          }
        });
      }
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.formDisabled = disabled;
  }

  formResetCallback() {
    this.hostConnected();
  }

  hostConnected() {
    this.formDisabled = this.host.closest('fieldset')?.disabled ?? false;
  }

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
