import { elementUpdated, oneEvent } from '@open-wc/testing';

/**
 * Creates a new React app "wrapper" for a passed in web component.
 *
 * Awaits for React and the web component to be ready.
 *
 * Registers a side effect to clean up the React app and code
 * after each test.
 *
 * @param {string} code The element code you'd like to inject into React.
 *
 * @returns {Promise} Returns the new web component rendered within React.
 */
export async function fixture(code) {

  // Add a listener so we know when React is ready.
  const isReactReady = oneEvent(document.getElementById('root'), 'react-ready');

  // 0. Wrap the web component in a <div> just in case
  //    there are multiple root elements.
  //    React needs a single element root to render.
  //    We could use a normal <div> but this is avoids
  //    littering the DOM with extra divs.
  // 1. Insert web component into JSX string.
  const wrapReact = `ReactDOM.render(
    <div id="react-wrapper">${code}</div>,
    document.getElementById('root'),
    () => document.getElementById('root').dispatchEvent(new Event("react-ready"))
  );`;

  // 2. Transform JSX string into raw JS string for React.
  const reactifiedElement = Babel.transform(
    wrapReact,
    { presets: ['react'] }
  ).code;

  // 3. Render our mock React component on the page
  const newScript = document.createElement("script");
  newScript.id = "react-script";
  newScript.innerHTML = reactifiedElement;
  document.body.appendChild(newScript);

  // Make sure React is ready and our component is rendered.
  await isReactReady;

  // Select the newly rendered component and make sure it's finished updating.
  // We use the parent <div id="react-wrapper" /> for the selector. We need everything
  // within that wrapper.
  const newElement = document.querySelector("#react-wrapper > *");
  await elementUpdated(newElement);
  // Return the ready element for testing.
  return newElement;
}

/**
 * This registers the React cleanup as a side effect.
 */
beforeEach(() => {
  const reactScript = document.getElementById("react-script");

  if (reactScript) {
    // Unmount the React root component.
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));

    //Remove the <script> we added to initiate the React app.
    document.getElementById("react-script").remove();
  }
});
