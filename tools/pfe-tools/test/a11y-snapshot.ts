import { chai } from '@open-wc/testing';
import { a11ySnapshot as snap } from '@web/test-runner-commands';

const {
  Assertion,
  AssertionError,
  util,
} = chai;

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

type SnapshotQuery = Partial<Record<keyof A11yTreeSnapshot, string | boolean | number | RegExp>>;

function matches(snapshot: A11yTreeSnapshot, query: SnapshotQuery) {
  return Object.entries(query).every(([key, value]) =>
      value instanceof RegExp ? value.test(snapshot[key as keyof typeof snapshot] as string)
    : JSON.stringify(snapshot[key as keyof typeof snapshot]) === JSON.stringify(value));
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
  util.flag(this, 'message', msg);
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new AssertionError(`axTreeFocusOn can only assert on A11yTreeSnapshots`,
                             undefined,
                             util.flag(this, 'ssfi'));
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
      throw new AssertionError(
        `More than one ax tree node has name "${actualAXName}". axTreeFocusOn cannot produce a definitive assertion`,
        undefined,
        util.flag(this, 'ssfi')
      );
    }
    const focusedAXName = focused?.name;
    const printable = util.inspect(element);
    this.assert(
      focusedAXName?.trim() === actualAXName,
      `expected ${printable} to have assistive technology focus`,
      `expected ${printable} to not have assistive technology focus`,
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

function axTreeFocusedNode(
  this: Chai.AssertionPrototype,
  msg?: string,
) {
  util.flag(this, 'message', msg);
  const snapshot = util.flag(this, 'object') as A11yTreeSnapshot;
  const focused = querySnapshot(snapshot, { focused: true });
  this.assert(
    focused != null,
    `expected an element to have focus`,
    `expected no element to have focus`,
    null,
    focused,
  );
  util.flag(this, 'object', focused);
}

function makeAxPropCallback(
  propName: keyof A11yTreeSnapshot,
  testName: `ax${string}`,
) {
  return function(
    this: Chai.AssertionPrototype,
    value: A11yTreeSnapshot[keyof A11yTreeSnapshot],
    msg?: string,
  ) {
    util.flag(this, 'message', msg);
    const snapshot = this._obj as A11yTreeSnapshot;
    if (!isSnapshot(snapshot)) {
      throw new AssertionError(`${testName} can only assert on A11yTreeSnapshots`,
                               undefined,
                               util.flag(this, 'ssfi'));
    }
    this.assert(snapshot[propName] === value,
                `expected element to have ${propName} "${value}"`,
                `expected element to not have ${propName} "${value}"`,
                value,
                snapshot[propName],
    );
  };
}

function axProperty(
  this: Chai.AssertionPrototype,
  propName: keyof A11yTreeSnapshot,
  value: A11yTreeSnapshot[keyof A11yTreeSnapshot],
  msg?: string
) {
  makeAxPropCallback(propName, 'axProperty').call(this, value, msg);
}

function axContainName(
  this: Chai.AssertionPrototype,
  name: string,
  msg?: string
) {
  util.flag(this, 'message', msg);
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new AssertionError(`axContainName can only assert on A11yTreeSnapshots`,
                             undefined,
                             util.flag(this, 'ssfi'));
  }
  const named = querySnapshot(snapshot, { name });
  this.assert(
    !!named,
    `expected to find element with assistive technology name ${name}`,
    `expected to not find element with assistive technology name ${name}`,
    name,
    named,
  );
}

function axContainRole(
  this: Chai.AssertionPrototype,
  role: string,
  msg?: string
) {
  util.flag(this, 'message', msg);
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new AssertionError(`axRoleInTree can only assert on A11yTreeSnapshots`,
                             undefined,
                             util.flag(this, 'ssfi'));
  }
  const needle = querySnapshot(snapshot, { role });
  this.assert(!!needle,
              `expected to find element with role "${role}"`,
              `expected to not find element with role "${role}"`,
              role, needle);
}

function axContainQuery(
  this: Chai.AssertionPrototype,
  query: SnapshotQuery,
  msg?: string
) {
  util.flag(this, 'message', msg);
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new AssertionError(`axContainQuery can only assert on A11yTreeSnapshots`,
                             undefined,
                             util.flag(this, 'ssfi'));
  }
  const needle = querySnapshot(snapshot, query);
  this.assert(!!needle,
              `expected to find element matching query "${util.inspect(query)}"`,
              `expected to not find element matching query "${util.inspect(query)}"`,
              query, needle);
}

function axQuery(
  this: Chai.AssertionPrototype,
  query: SnapshotQuery,
  msg?: string
) {
  util.flag(this, 'message', msg);
  const snapshot = this._obj as A11yTreeSnapshot;
  if (!isSnapshot(snapshot)) {
    throw new AssertionError(`axQuery can only assert on A11yTreeSnapshots`,
                             undefined,
                             util.flag(this, 'ssfi'));
  }
  const needle = querySnapshot(snapshot, query);
  this.assert(!!needle,
              `expected to find element matching ${util.inspect(query)}`,
              `expected to not find element with role ${util.inspect(query)}`,
              query, needle);
}

chai.use(function() {
  Assertion.addMethod('axContainName', axContainName);
  Assertion.addMethod('axContainRole', axContainRole);
  Assertion.addMethod('axContainQuery', axContainQuery);
  Assertion.addMethod('axDescription', makeAxPropCallback('name', 'axDescription'));
  Assertion.addMethod('axName', makeAxPropCallback('name', 'axName'));
  Assertion.addMethod('axProperty', axProperty);
  Assertion.addMethod('axQuery', axQuery);
  Assertion.addMethod('axRole', makeAxPropCallback('role', 'axRole'));
  Assertion.addMethod('axTreeFocusOn', axTreeFocusOn);
  Assertion.addProperty('axTreeFocusedNode', axTreeFocusedNode);
});


declare global {
  // That's just the way the chai boils
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      /** Assert that the a11ySnapshot contains a node with the given name */
      axContainName(name: string, msg?: string): Assertion;
      /** Assert that a given role exists in the ax tree */
      axContainRole(role: string, msg?: string): Assertion;
      /** Assert that a node matching a given query object exists in the ax tree */
      axContainQuery(query: SnapshotQuery, msg?: string): Assertion;
      /**
       * Assert that an AX Tree node that matches the query object exists in the tre
       */
      axQuery(query: SnapshotQuery, msg?: string): Assertion;
      /**
       * Assert that the a11ySnapshot shows that a given element has focus.
       * This assertion ultimately matches on the accessible name of the given element,
       * so test authors must ensure that every element has a unique accessible name
       * (i.e. aria-label or textContent).
       */
      axTreeFocusOn(element?: Element | null, msg?: string): Assertion;
      /**
       * Assert that the a11ySnapshot shows that a given element has focus.
       * This assertion ultimately matches on the accessible name of the given element,
       * so test authors must ensure that every element has a unique accessible name
       * (i.e. aria-label or textContent).
       */
      axTreeFocusedNode: Assertion;
      /** Assert that an AX Tree node has a given role */
      axRole(role: string, msg?: string): Assertion;
      /** Assert that an AX Tree node has a given name */
      axName(role: string, msg?: string): Assertion;
      /** Assert that an AX Tree node has a given description */
      axDescription(description: string, msg?: string): Assertion;
      /** Assert that an AX Tree node has a given property with a given value */
      axProperty(
        propName: keyof A11yTreeSnapshot,
        value: A11yTreeSnapshot[keyof A11yTreeSnapshot],
        msg?: string,
      ): Assertion;
    }
  }
}
