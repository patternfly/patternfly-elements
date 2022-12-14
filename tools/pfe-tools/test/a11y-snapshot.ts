import { a11ySnapshot as _a11ySnapshot } from '@web/test-runner-commands';

export interface A11yTreeSnapshot {
  name: string;
  children: A11yTreeSnapshot[];
  role: string;
  checked?: boolean;
}

export async function a11ySnapshot(
  payload: Parameters<typeof _a11ySnapshot>[0]
): Promise<A11yTreeSnapshot> {
  return _a11ySnapshot(payload) as unknown as A11yTreeSnapshot;
}

