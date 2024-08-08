import { chai } from '@open-wc/testing';
import { a11ySnapshot as snap } from '@web/test-runner-commands';

export interface A11yTreeSnapshot {
  name: string;
  role: string;
  children?: A11yTreeSnapshot[];
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  expanded?: boolean;
  focused?: boolean;
  haspopup?: string;
  level?: number;
  selected?: boolean;
  value?: number;
  valuetext?: string;
  valuemin?: number;
  valuemax?: number;
}

/**
 * @param payload e.g. { selector: 'pf-select' }
 */
export async function a11ySnapshot(
  payload?: Parameters<typeof snap>[0]
): Promise<A11yTreeSnapshot> {
  let snapshot;
  let tries = -1;
  do {
    await new Promise(requestAnimationFrame);
    snapshot = await snap(payload ?? {}).catch(() => false) as unknown as A11yTreeSnapshot;
    tries++;
  } while (!snapshot && tries < 10);
  return snapshot;
}

type SnapshotQuery = Partial<Record<keyof A11yTreeSnapshot, unknown>>;

function matches(snapshot: A11yTreeSnapshot, query: SnapshotQuery) {
  return Object.entries(query).every(([key, value]) =>
    JSON.stringify(snapshot[key as keyof typeof snapshot]) === JSON.stringify(value));
}

function doQuery(
  snapshot: A11yTreeSnapshot,
  query: SnapshotQuery,
  items?: Set<A11yTreeSnapshot>,
): A11yTreeSnapshot | null {
  if (matches(snapshot, query)) {
    if (items) {
      items.add(snapshot);
    } else {
      return snapshot;
    }
  } else if (!snapshot.children) {
    return null;
  } else {
    for (const kid of snapshot.children) {
      const result = doQuery(kid, query, items);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

/**
 * Deeply search an accessibility tree snapshot for an object matching your query
 * @param snapshot the snapshot root to recurse through
 * @param query object with properties matching the snapshot child you seek
 */
export function querySnapshot(
  snapshot: A11yTreeSnapshot,
  query: SnapshotQuery,
): A11yTreeSnapshot | null {
  return doQuery(snapshot, query);
}

/**
 * Deeply search an accessibility tree snapshot for all objects matching your query
 * @param snapshot the snapshot root to recurse through
 * @param query object with properties matching the snapshot children you seek
 */
export function querySnapshotAll(
  snapshot: A11yTreeSnapshot,
  query: SnapshotQuery,
): A11yTreeSnapshot[] {
  const items = new Set<A11yTreeSnapshot>();
  doQuery(snapshot, query, items);
  return [...items];
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

const internalsMap = new WeakMap();
const attachInternalsOrig = HTMLElement.prototype.attachInternals;
HTMLElement.prototype.attachInternals = function() {
  const internals = attachInternalsOrig.call(this);
  internalsMap.set(this, internals);
  return internals;
};

function getElementLabelText(element: Element): string {
  if (element.ariaLabel) {
    return element.ariaLabel;
  } else {
    const ariaLabelledByElements: Element[] = element.ariaLabelledByElements
                        ?? internalsMap.get(element)?.ariaLabelledByElements;
    return Array.from(ariaLabelledByElements ?? [], x =>
      getElementLabelText(x) || x.textContent || '')
        .join() || element.textContent || '';
  }
}

function isSnapshot(obj: unknown): obj is A11yTreeSnapshot {
  return obj instanceof Object && obj !== null && 'role' in obj;
}

function axTreeFocusOn(
  this: Chai.AssertionPrototype,
  element: Element,
  msg?: string,
) {
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new Error(`axTreeFocusOn can only assert on A11yTreeSnapshots, got ${snapshot}`);
  }
  if (element == null || element === document.body) {
    const focused = querySnapshot(snapshot, { focused: true });
    this.assert(
      focused === null,
      `expected no element to have assistive technology focus`,
      `expected any element to have assistive technology focus`,
      null,
      focused,
    );
  } else if (element instanceof Element) {
    const focused = querySnapshot(snapshot, { focused: true });
    const actualAXName = getElementLabelText(element).trim();
    const [nodeSnapshotItem, ...others] = querySnapshotAll(snapshot, { name: actualAXName });
    if (others.length) {
      throw new Error(`More than one ax tree node has name "${actualAXName}". axTreeFocusOn cannot produce a definitive assertion`);
    }
    const focusedAXName = focused?.name;
    const printable = chai.util.inspect(element);
    this.assert(
      focusedAXName?.trim() === actualAXName,
      `expected ${msg && ' ' || ''}${printable} to have assistive technology focus`,
      `expected ${msg && ' ' || ''}${printable} to not have assistive technology focus`,
      focused,
      nodeSnapshotItem,
    );
  } else {
    this.assert(
      false,
      `expected ${element} to be an Element`,
      `expected ${element} to not have assistive technology focus`,
      element
    );
  }
}

function axTreeNodeWithName(
  this: Chai.AssertionPrototype,
  name: string,
  msg?: string
) {
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new Error(`axTreeFocusOn can only assert on A11yTreeSnapshots, got ${snapshot}`);
  }
  const named = querySnapshot(snapshot, { name });
  this.assert(
    !!named,
    `expected to find element with assistive technology name ${name}${!msg ? '' : `(${msg})`}`,
    `expected to not find element with assistive technology name ${name}${!msg ? '' : `(${msg})`}`,
    name,
    named,
  );
}

chai.use(function(_chai) {
  _chai.Assertion.addMethod('axTreeFocusOn', axTreeFocusOn);
  _chai.Assertion.addMethod('axTreeNodeWithName', axTreeNodeWithName);
});


declare global {
  // That's just the way the chai boils
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      /**
       * Assert that the a11ySnapshot shows that a given element has focus.
       * This assertion ultimately matches on the accessible name of the given element,
       * so test authors must ensure that every element has a unique accessible name
       * (i.e. aria-label or textContent).
       */
      axTreeFocusOn(element?: Element | null, msg?: string): void;
      /**
       * Assert that the a11ySnapshot contains a node with the given name
       */
      axTreeNodeWithName(name: string, msg?: string): void;
    }
  }
}
