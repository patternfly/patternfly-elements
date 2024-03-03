import type { PfTab } from './pf-tab.js';

import { createContext } from '@lit/context';

export const activeTabCtx = createContext<PfTab | undefined>('pf-tabs-active-tab');
export const boxCtx = createContext<'light' | 'dark' | null>('pf-tabs-box');
export const fillCtx = createContext<boolean>('pf-tabs-fill');
export const verticalCtx = createContext<boolean>('pf-tabs-vertical');
export const manualCtx = createContext<boolean>('pf-tabs-manual');
export const borderBottomCtx = createContext<'true' | 'false'>('pf-tabs-border-bottom');
