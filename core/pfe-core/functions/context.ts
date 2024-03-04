import { ContextRoot, createContext } from '@lit/context';


let root: ContextRoot;

function makeContextRoot() {
  root = new ContextRoot();
  root.attach(document.body);
  return root;
}

/**
 * In order to prevent late-upgrading-context-consumers from 'missing'
 * their rightful context providers, we must set up a `ContextRoot` on the body.
 * Always use this function when creating contexts that are shared with child elements.
 */
export function createContextWithRoot<T>(...args: Parameters<typeof createContext>) {
  root ??= makeContextRoot();
  return createContext<T>(...args);
}
