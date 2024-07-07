import { ContextRoot, createContext, type Context } from '@lit/context';
import { isServer } from 'lit';

let root: ContextRoot;

function makeContextRoot() {
  const root = new ContextRoot();
  if (!isServer) {
    root.attach(document.body);
  }
  return root;
}

/**
 * In order to prevent late-upgrading-context-consumers from 'missing'
 * their rightful context providers, we must set up a `ContextRoot` on the body.
 * Always use this function when creating contexts that are shared with child elements.
 * @param args createContext args
 */
export function createContextWithRoot<T>(
  ...args: Parameters<typeof createContext>
): Context<unknown, T> {
  root ??= makeContextRoot();
  return createContext<T>(...args);
}
