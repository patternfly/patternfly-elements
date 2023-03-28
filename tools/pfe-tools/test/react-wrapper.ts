import { elementUpdated, oneEvent } from '@open-wc/testing';
import type { TemplateResult } from 'lit';
import { renderToString } from './render-to-string';

// not worth fighting eslint over babel silliness
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Babel {
    function transform(code: string, opts?: {
      presets?: string[];
    }): { code: string };
  }

  namespace ReactDOM {
    function unmountComponentAtNode(element: Element): void;
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

function camel(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

const cssRuleMangler = (cssInJs: Record<string, string>, propertyText: string) => {
  if (!propertyText.trim()) {
    return cssInJs;
  }
  const [propertyName, propertyValue] = propertyText.split(':');
  return Object.assign(cssInJs, {
    [camel(propertyName.trim())]: propertyValue.trim(),
  });
};

const markupRuiner = (_: unknown, css: string) =>
  `style={${JSON.stringify(css.split(';')
    .reduce(cssRuleMangler, {} as Record<string, string>))}}`;

/**
 * Creates a new React app "wrapper" for a passed in web component.
 *
 * Awaits for React and the web component to be ready.
 *
 * Registers a side effect to clean up the React app and code
 * after each test.
 *
 * @param  code The element code you'd like to inject into React.
 *
 * @returns  Returns the new web component rendered within React.
 */
export async function fixture<T extends Element = HTMLElement>(
  testCase: string | TemplateResult
): Promise<T> {
  const code = (typeof testCase === 'string') ? testCase : renderToString(testCase);
  const appRoot = document.getElementById('root');
  if (!appRoot) {
    throw new Error('#root not found');
  }

  // Add a listener so we know when React is ready.
  const isReactReady = oneEvent(appRoot, 'react-ready');

  // react gonna react
  const intentionallyCorruptedMarkup = (
    code
      .replace(/style="(.*)"/g, markupRuiner)
      .replace(/disabled=""/g, 'disabled={true}')
      .replace(/class="(.*)"/g, 'className="$1"')
      .replace(/<!--(.*)-->/mg, '')
      .replace(/<input(.*)(?!\/)>/g, '<input$1/>')
      .replace(/<img(.*)(?!\/)>/g, '<img$1/>')
  );

  // 0. Wrap the web component in a <div> just in case
  //    there are multiple root elements.
  //    React needs a single element root to render.
  //    We could use a normal <div> but this avoids
  //    littering the DOM with extra divs.
  // 1. Insert web component into JSX string.
  const wrapReact = `ReactDOM.render(
    <div id="react-wrapper">${intentionallyCorruptedMarkup}</div>,
    document.getElementById('root'),
    () => document.getElementById('root').dispatchEvent(new Event("react-ready"))
  );`;

  // 2. Transform JSX string into raw JS string for React.
  const reactifiedElement = Babel.transform(
    wrapReact,
    { presets: ['react'] }
  ).code;

  // 3. Render our mock React component on the page
  const newScript = document.createElement('script');
  newScript.id = 'react-script';
  newScript.innerHTML = reactifiedElement;
  document.body.appendChild(newScript);

  // Make sure React is ready and our component is rendered.
  await isReactReady;

  // Select the newly rendered component and make sure it's finished updating.
  // We use the parent <div id="react-wrapper" /> for the selector. We need everything
  // within that wrapper.
  const newElement = document.querySelector<T>('#react-wrapper > *') as T;
  await elementUpdated(newElement);
  // Return the ready element for testing.
  return newElement;
}

/**
 * This registers the React cleanup as a side effect.
 */
beforeEach(() => {
  const reactScript = document.getElementById('react-script');
  const appRoot = document.getElementById('root');
  if (!appRoot) {
    throw new Error('#root not found');
  }

  if (reactScript) {
    // Unmount the React root component.
    ReactDOM.unmountComponentAtNode(appRoot);

    // Remove the <script> we added to initiate the React app.
    document.getElementById('react-script')?.remove?.();
  }
});
