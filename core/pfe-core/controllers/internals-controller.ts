import {
  isServer,
  type ReactiveController,
  type ReactiveControllerHost,
} from 'lit';

function isARIAMixinProp(key: string): key is keyof ARIAMixin {
  return key === 'role' || key.startsWith('aria');
}

type FACE = HTMLElement & {
  formDisabledCallback?(disabled: boolean): void;
};

const protos = new WeakMap();

let constructingAllowed = false;

interface InternalsControllerOptions extends Partial<ARIAMixin> {
  getHTMLElement?(): HTMLElement;
}

/**
 * reactively forward the internals object's aria mixin prototype
 * @param target
 * @param key
 */
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
      const internals = this.attachOrRetrieveInternals();
      return internals[key];
    },
    set(this: InternalsController, value: string | null) {
      // @ts-expect-error: ya know it!
      const internals = this.attachOrRetrieveInternals();
      // @ts-expect-error: shamone!
      internals[key] = value;
      this.host.requestUpdate();
    },
  });
  protos.get(target).add(key);
}

function getLabelText(label: Node) {
  if (!(label instanceof HTMLElement) || label.hidden) {
    return '';
  } else {
    const ariaLabel = label.getAttribute?.('aria-label');
    return ariaLabel ?? label.textContent;
  }
}

type InternalsHost = ReactiveControllerHost & HTMLElement;

export class InternalsController implements ReactiveController, ARIAMixin {
  private static instances = new WeakMap<HTMLElement, InternalsController>();

  declare readonly form: ElementInternals['form'];
  declare readonly shadowRoot: ElementInternals['shadowRoot'];

  // https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/states
  declare readonly states: unknown;
  declare readonly willValidate: ElementInternals['willValidate'];
  declare readonly validationMessage: ElementInternals['validationMessage'];

  public static getLabels(host: InternalsHost): Element[] {
    return Array.from(this.instances.get(host)?.internals.labels ?? []) as Element[];
  }

  /**
   * Sets aria-posinset on a listbox item. Uses ElementInternals when the host has
   * an InternalsController instance; otherwise sets/removes the host attribute.
   * @param host - The listbox item element (option or option-like).
   * @param value - Position in set (1-based), or null to clear.
   */
  public static setAriaPosInSet(host: HTMLElement, value: number | string | null): void {
    const instance = this.instances.get(host);
    if (instance) {
      instance.ariaPosInSet = value != null ? String(value) : null;
    } else if (value != null) {
      host.setAttribute('aria-posinset', String(value));
    } else {
      host.removeAttribute('aria-posinset');
    }
  }

  /**
   * Sets aria-setsize on a listbox item. Uses ElementInternals when the host has
   * an InternalsController instance; otherwise sets/removes the host attribute.
   * @param host - The listbox item element (option or option-like).
   * @param value - Total set size, or null to clear.
   */
  public static setAriaSetSize(host: HTMLElement, value: number | string | null): void {
    const instance = this.instances.get(host);
    if (instance) {
      instance.ariaSetSize = value != null ? String(value) : null;
    } else if (value != null) {
      host.setAttribute('aria-setsize', String(value));
    } else {
      host.removeAttribute('aria-setsize');
    }
  }

  /**
   * Gets aria-posinset from a listbox item (internals or attribute).
   * @param host - The listbox item element.
   */
  public static getAriaPosInSet(host: HTMLElement): string | null {
    const instance = this.instances.get(host);
    return instance != null ?
      instance.ariaPosInSet
      : host.getAttribute('aria-posinset');
  }

  /**
   * Gets aria-setsize from a listbox item (internals or attribute).
   * @param host - The listbox item element.
   */
  public static getAriaSetSize(host: HTMLElement): string | null {
    const instance = this.instances.get(host);
    return instance != null ?
      instance.ariaSetSize
      : host.getAttribute('aria-setsize');
  }

  public static isSafari: boolean =
    !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  public static of(host: InternalsHost, options?: InternalsControllerOptions): InternalsController {
    constructingAllowed = true;
    // implement the singleton pattern
    // using a public static constructor method is much easier to manage,
    // due to the quirks of our typescript config
    const instance: InternalsController =
      InternalsController.instances.get(host)
      ?? new InternalsController(host, options);
    instance.initializeOptions(options);
    constructingAllowed = false;
    return instance;
  }

  @aria role: string | null = null;

  @aria ariaActivedescendant: string | null = null;
  @aria ariaAtomic: string | null = null;
  @aria ariaAutoComplete: string | null = null;
  @aria ariaBusy: string | null = null;
  @aria ariaBrailleLabel: string | null = null;
  @aria ariaBrailleRoleDescription: string | null = null;
  @aria ariaChecked: string | null = null;
  @aria ariaColCount: string | null = null;
  @aria ariaColIndex: string | null = null;
  @aria ariaColIndexText: string | null = null;
  @aria ariaColSpan: string | null = null;
  @aria ariaCurrent: string | null = null;
  @aria ariaDescription: string | null = null;
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
  @aria ariaRelevant: string | null = null;
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

  /** As of April 2025, the following are considered Baseline supported in evergreen browsers */
  @aria ariaActiveDescendantElement: Element | null = null;
  @aria ariaControlsElements: Element[] | null = null;
  @aria ariaDescribedByElements: Element[] | null = null;
  @aria ariaDetailsElements: Element[] | null = null;
  @aria ariaErrorMessageElements: Element[] | null = null;
  @aria ariaFlowToElements: Element[] | null = null;
  @aria ariaLabelledByElements: Element[] | null = null;

  /** As of February 2026, this is not supported in Chromium browsers */
  @aria ariaOwnsElements: Element[] | null = null;

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled(): boolean {
    if (isServer) {
      return this._formDisabled;
    } else {
      return this.element?.matches(':disabled') || this._formDisabled;
    }
  }

  get labels(): NodeList {
    return this.internals.labels;
  }

  get validity(): ValidityState {
    return this.internals.validity;
  }

  /** A best-attempt based on observed behaviour in FireFox 115 on fedora 38 */
  get computedLabelText(): string {
    return this.internals.ariaLabel
      || Array.from(this.internals.labels)
          .reduce((acc, label) =>
            `${acc}${getLabelText(label)}`, '');
  }

  private get element() {
    if (isServer) {
      return this.host;
    } else {
      return this.host instanceof HTMLElement ? this.host : this.options?.getHTMLElement?.();
    }
  }

  private internals!: ElementInternals;

  private _formDisabled = false;

  private constructor(public host: InternalsHost, private options?: InternalsControllerOptions) {
    if (!constructingAllowed) {
      throw new Error('InternalsController must be constructed with `InternalsController.for()`');
    }
    if (!this.element) {
      throw new Error(
        `InternalsController must be instantiated with an HTMLElement or a \`getHTMLElement\` function`,
      );
    }
    this.attachOrRetrieveInternals();
    this.initializeOptions(options);
    InternalsController.instances.set(host, this);
    this.#polyfillDisabledPseudo();
  }

  /**
   * We need to polyfill :disabled
   * see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
   */
  #polyfillDisabledPseudo() {
    // START polyfill-disabled
    // We need to polyfill :disabled
    // see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
    const orig = (this.element as FACE).formDisabledCallback;
    (this.element as FACE).formDisabledCallback = disabled => {
      this._formDisabled = disabled;
      orig?.call(this.host, disabled);
    // END polyfill-disabled
    };
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
  private attachOrRetrieveInternals() {
    this.internals ??= this.element!.attachInternals();
    return this.internals;
  }

  private initializeOptions(options?: Partial<ARIAMixin>) {
    this.options ??= options ?? {};
    const { getHTMLElement, ...aria } = this.options;
    this.options.getHTMLElement ??= getHTMLElement;
    for (const [key, val] of Object.entries(aria)) {
      if (isARIAMixinProp(key)) {
        this[key as keyof this] = val as this[keyof this];
      }
    }
  }

  hostConnected?(): void;

  setFormValue(...args: Parameters<ElementInternals['setFormValue']>): void {
    return this.internals.setFormValue(...args);
  }

  setValidity(...args: Parameters<ElementInternals['setValidity']>): void {
    return this.internals.setValidity(...args);
  }

  checkValidity(...args: Parameters<ElementInternals['checkValidity']>): boolean {
    return this.internals.checkValidity(...args);
  }

  reportValidity(...args: Parameters<ElementInternals['reportValidity']>): boolean {
    return this.internals.reportValidity(...args);
  }

  submit(): void {
    this.internals.form?.requestSubmit();
  }

  reset(): void {
    this.internals.form?.reset();
  }
}

/** @see https://w3c.github.io/aria/#ref-for-dom-ariamixin-ariaactivedescendantelement-1 */
declare global {
  interface ARIAMixin {
    ariaActiveDescendantElement: Element | null;
    ariaControlsElements: readonly Element[] | null;
    ariaDescribedByElements: readonly Element[] | null;
    ariaDetailsElements: readonly Element[] | null;
    ariaErrorMessageElements: readonly Element[] | null;
    ariaFlowToElements: readonly Element[] | null;
    ariaLabelledByElements: readonly Element[] | null;
    ariaOwnsElements: readonly Element[] | null;
  }
}
