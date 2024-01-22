import { a11ySnapshot as snap } from '@web/test-runner-commands';

export interface A11yTreeSnapshot {
  name: string;
  children?: A11yTreeSnapshot[];
  focused?: boolean;
  role: string;
  checked?: boolean;
  disabled?: boolean;
  haspopup?: string;
  level?: number;
  value?: number;
  valuetext?: string;
  valuemin?: number;
  valuemax?: number;
}

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
