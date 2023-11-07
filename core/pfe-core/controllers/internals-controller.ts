import type { ReactiveController, ReactiveControllerHost } from 'lit';

function isARIAMixinProp(key: string): key is keyof ARIAMixin {
  return key === 'role' || key.startsWith('aria');
}

const protos = new WeakMap();

let constructingAllowed = false;

interface InternalsControllerOptions extends Partial<ARIAMixin> {
  getHTMLElement?(): HTMLElement;
}

/** reactively forward the internals object's aria mixin prototype */
function aria(
  target: InternalsController,
  key: keyof InternalsController,
) {
  if (!protos.has(target)) {
    protos.set(target, new Set());
  }
  if (protos.get(target).has(key)) {
    return;
  }
  if (!isARIAMixinProp(key)) {
    throw new Error('@aria can only be called on ARIAMixin properties');
  }
  // typescript experimental decorator
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get(this: InternalsController) {
      // @ts-expect-error: because i'm bad, i'm bad
      return this.attach()[key];
    },
    set(this: InternalsController, value: string | null) {
      // @ts-expect-error: shamone!
      this.attach()[key] = value;
      this.host.requestUpdate();
    }
  });
  protos.get(target).add(key);
}

export class InternalsController implements ReactiveController, ARIAMixin {
  private static instances = new WeakMap<ReactiveControllerHost, InternalsController>();

  public static for(host: ReactiveControllerHost, options?: InternalsControllerOptions): InternalsController {
    constructingAllowed = true;
    // implement the singleton pattern
    // using a public static constructor method is much easier to manage,
    // due to the quirks of our typescript config
    const instance: InternalsController =
      InternalsController.instances.get(host) ?? new InternalsController(host, options);
    instance.initializeAriaOptions(options);
    constructingAllowed = false;
    return instance;
  }

  @aria role: string | null = null;
  @aria ariaActivedescendant: string | null = null;
  @aria ariaAtomic: string | null = null;
  @aria ariaAutoComplete: string | null = null;
  @aria ariaBusy: string | null = null;
  @aria ariaChecked: string | null = null;
  @aria ariaColCount: string | null = null;
  @aria ariaColIndex: string | null = null;
  @aria ariaColIndexText: string | null = null;
  @aria ariaColSpan: string | null = null;
  @aria ariaCurrent: string | null = null;
  @aria ariaDisabled: string | null = null;
  @aria ariaExpanded: string | null = null;
  @aria ariaHasPopup: string | null = null;
  @aria ariaHidden: string | null = null;
  @aria ariaInvalid: string | null = null;
  @aria ariaKeyShortcuts: string | null = null;
  @aria ariaLabel: string | null = null;
  @aria ariaLevel: string | null = null;
  @aria ariaLive: string | null = null;
  @aria ariaModal: string | null = null;
  @aria ariaMultiLine: string | null = null;
  @aria ariaMultiSelectable: string | null = null;
  @aria ariaOrientation: string | null = null;
  @aria ariaPlaceholder: string | null = null;
  @aria ariaPosInSet: string | null = null;
  @aria ariaPressed: string | null = null;
  @aria ariaReadOnly: string | null = null;
  @aria ariaRequired: string | null = null;
  @aria ariaRoleDescription: string | null = null;
  @aria ariaRowCount: string | null = null;
  @aria ariaRowIndex: string | null = null;
  @aria ariaRowIndexText: string | null = null;
  @aria ariaRowSpan: string | null = null;
  @aria ariaSelected: string | null = null;
  @aria ariaSetSize: string | null = null;
  @aria ariaSort: string | null = null;
  @aria ariaValueMax: string | null = null;
  @aria ariaValueMin: string | null = null;
  @aria ariaValueNow: string | null = null;
  @aria ariaValueText: string | null = null;

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled() {
    return this.element?.matches(':disabled') || this._formDisabled;
  }

  get labels() {
    return this.internals.labels;
  }

  get validity() {
    return this.internals.validity;
  }

  private get element() {
    return this.host instanceof HTMLElement ? this.host : this.options?.getHTMLElement?.();
  }

  private internals!: ElementInternals;

  private _formDisabled = false;

  private constructor(
    public host: ReactiveControllerHost,
    private options?: InternalsControllerOptions
  ) {
    if (!constructingAllowed) {
      throw new Error('InternalsController must be constructed with `InternalsController.for()`');
    }
    if (!this.element) {
      throw new Error('InternalsController must be instantiated with an HTMLElement or a `getHTMLElement` function');
    }
    this.attach();
    this.initializeAriaOptions(options);
    InternalsController.instances.set(host, this);
    // START polyfill-disabled
    // We need to polyfill :disabled
    // see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
    const orig = (this.element as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback;
    (this.element as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback = disabled => {
      this._formDisabled = disabled;
      orig?.call(host, disabled);
    };
    // END polyfill-disabled
  }

  /**
   * Typescript (with experimental decorators) will compile the class
   * such that the order of operations is:
   * 1. set up constructor parameter fields
   * 2. run decorated field setters with initializers as the value
   * 3. run the rest of the constructor
   * Because of that, `this.internals` may not be available in the decorator setter
   * so we cheat here with nullish coalescing assignment operator `??=`;
   */
  private attach() {
    this.internals ??= this.element!.attachInternals();
    return this.internals;
  }

  private initializeAriaOptions(options?: Partial<ARIAMixin>) {
    for (const [key, val] of Object.entries(options ?? {})) {
      if (isARIAMixinProp(key)) {
        this[key] = val;
      }
    }
  }

  hostConnected?(): void

  setFormValue(...args: Parameters<ElementInternals['setFormValue']>) {
    return this.internals.setFormValue(...args);
  }

  setValidity(...args: Parameters<ElementInternals['setValidity']>) {
    return this.internals.setValidity(...args);
  }

  checkValidity(...args: Parameters<ElementInternals['checkValidity']>) {
    return this.internals.checkValidity(...args);
  }

  reportValidity(...args: Parameters<ElementInternals['reportValidity']>) {
    return this.internals.reportValidity(...args);
  }

  submit() {
    this.internals.form?.requestSubmit();
  }

  reset() {
    this.internals.form?.reset();
  }
}
