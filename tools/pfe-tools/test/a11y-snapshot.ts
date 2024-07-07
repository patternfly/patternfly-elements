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

function doQuery(snapshot: A11yTreeSnapshot, query: SnapshotQuery): A11yTreeSnapshot | null {
  if (matches(snapshot, query)) {
    return snapshot;
  } else if (!snapshot.children) {
    return null;
  } else {
    for (const kid of snapshot.children) {
      const result = doQuery(kid, query);
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
