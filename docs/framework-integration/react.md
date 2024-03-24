---
layout: layout-basic.njk
title: React
tags:
  - frameworkIntegration
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{%- band header="Using PatternFly Elements in your React app" -%}
  PatternFly Elements ships with React wrappers for each web component. These 
  wrappers make working with web components
  withing react JSX files more convenient. In this post, we'll create a simple 
  React app using PatternFly elements, and demonstrate how state can be shared
  between react components and custom elements.

  If you'd like to skip right to the code, you can check out the finished app on 
  [Codesandbox][codesandbox]. For a more advanced example, take a look at [Anuj 
  Singla's example repo on Github][repo], which demonstrates commit-by-commit 
  how you can migrate a react app to all web-components.
{% endband %}

{% band header="Why Does React Need Special Treatment?" %}
  PatternFly elements are Web components: they're based on a set of web platform 
  APIs that help to create reusable and encapsulated UI elements. Those standards 
  consist of Custom Elements, Shadow DOM, and HTML Templates.

  React is a JavaScript framework that uses a virtual DOM to optimize updates and 
  minimize the number of changes that need to be made to the actual DOM. This 
  virtual DOM is only a conceptual representation of what the react app does in 
  the browser, it doesn't and can't line up perfectly with the real DOM. In 
  practically all cases, React applications are written using the non-standard JSX 
  language, which must be compiled to JavaScript in order to run on the user's 
  browser. Although JSX looks superficially similar to HTML, it is in fact a 
  completely separate language. This visual similarity often leads to confusion 
  among developers who may not be familiar with the many subtle differences 
  between JSX and HTML and the many "gotchas" which arise from react's use of a 
  virtual DOM.

  React needs special treatment when integrating with web components because of 
  it's reliance on virtual DOM and JSX. Of all the major JavaScript frameworks, 
  react is currently the only one without proper support for HTML and the DOM 
  standards, as documented at the [Custom Elements Everywhere][cee] project, which 
  runs a suite of tests against each framework to identify interoperability issues 
  and highlight potential fixes already implemented in other frameworks.

  Multiple libraries are available to fill the gap between React and web 
  components, like [@lit/react][llr]. PatternFly Elements uses this library to 
  create the react wrapper components.

  ### Comparing React and Web Components
  There are some important differences between React and HTML which developers 
  should be aware of when working with web components in react apps:

  #### Virtual DOM vs. Shadow DOM
  Web components use shadow DOM to encapsulate styles and functionality within 
  the private rendering context of a custom element. Without shadow DOM, special 
  care is needed to ensure that styles and DOM IDs do not conflict.

  React uses a virtual DOM to batch and diff changes to the real DOM. Because 
  the virtual DOM is separate from the browser's true representation of the 
  document, React requires developers to work with the virtual DOM concepts 
  *props* and [*synthetic events*][synthevent], rather than DOM properties, HTML 
  attributes, and JavaScript events.

  Web components use these standard DOM and HTML APIs to manage their own state 
  and communicate with other components. Because of React's special virtual DOM 
  and JSX syntax, developers need to employ workarounds to listen for events 
  from web components and set DOM properties or HTML attributes on them. This is 
  the primary purpose of [`@lit/react`][llr].

  #### Component Lifecycle
  React components can implement [lifecycle methods][react-lifecycle]
  like `componentDidMount`, `componentDidUpdate`, etc., or use "hooks" to manage 
  their lifecycle. Custom elements have a set of standard [lifecycle 
  callbacks][ce-lifecycle] like `connectedCallback` and `disconnectedCallback`. 
  Depending on the library used to write the web component, there may be 
  additional lifecycle methods, for example `LitElement` has an `updated` 
  callback.

  #### Reactivity
  Not every DOM property or HTML attribute change causes a web component 
  re-render, it depends on whether the authors of that web component wrote it 
  that way. For example, a web component author can choose to add a reactive 
  attribute/property called `disabled` which causes a rerender every time it 
  changes, or they can choose not to re-render when it changes. It's important 
  to read the documentation for elements that you use in order to understand 
  which public APIs the authors intended you to use.

{% endband %}

{% band header="Initial setup" %}
  We'll bootstrap our react app using [Vite][vite]. It's possible to use other 
  tools for this, but that is out of the scope of this tutorial.

  ```bash
  npm create vite@latest
  ```
  This command will ask you to provide the project name, framework, and variant.
{% endband %}

{% band header="Adding PatternFly Elements" %}
  With the setup complete, You need to install `@patternfly/elements` and the 
  `@lit/react` library.

  ```bash
  npm install @lit-labs/react @patternfly/elements
  ```

  ### Button and Card

  Let's import the various components we'll use in our `App.tsx` file in the 
  `/src/` directory.

  ```js
  import { useState } from "react";

  import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
  import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
  import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";
  import { Popover } from "@patternfly/elements/react/pf-popover/pf-popover.js";
  import { Tooltip } from "@patternfly/elements/react/pf-tooltip/pf-tooltip.js";

  import "./App.css";
  ```

  Let’s use [`pf-button`][pf-button] and [`pf-card`][pf-card] component in the 
  `App` function in the `App.tsx` file to see that our Card and Button are 
  working. We are updating the local state and showing it in the UI after 
  clicking the button.

  ```js
  function App() {
    const [count, setCount] = useState(0);

    return (
      <Card id="card" rounded>
        <h1 slot="header">React + PatternFly Elements</h1>
        <div>count is {count}</div>
        <Button slot="footer" onClick={() => setCount((count) => count + 1)}>
          Increment
        </Button>
      </Card>
    );
  }
  ```

  ### Switch

  Now we have a card and a button component, let's add [`pf-switch`][pf-switch] 
  web component in our app. We will enable/disable the decrement button by 
  clicking on the Switch button.

  ```js
  function App() {
    const [count, setCount] = useState(0);
    const [allowDec, setAllowDec] = useState(false);
    const toggle = () => setAllowDec(!allowDec);

    return (
      <Card id="card" rounded>
        <h1 slot="header">React + PatternFly Elements</h1>
        <div>count is {count}</div>
        <label>
          Allow decrement?
          <Switch checked={allowDec} onChange={toggle} />
        </label>
        <Button slot="footer" onClick={() => setCount((count) => count + 1)}>
          Increment
        </Button>
        <Button
          slot="footer"
          danger={allowDec}
          disabled={!allowDec}
          onClick={() => setCount((count) => count - 1)}
        >
          Decrement
        </Button>
      </Card>
    );
  }

  export default App;
  ```

  Notice that the state of our application is passing back and forth from web 
  components to react:

  1. Flipping the switch updates the `allowDec` variable
  1. Changing the `allowDec` variable toggles the `disabled` attribute on the 
  button
  1. Clicking the button sets the count
  1. Setting the count updates the react component

  ### Tooltip

  Now we have a card, button, and switch component, let's add 
  [`pf-tooltip`][pf-tooltip] web component in our app. We will show the tooltip 
  text on mouseover.

  ```js
  return (
    <Card id="card" rounded>
      <h1 slot="header">React + PatternFly Elements</h1>
      <div>count is {count}</div>
      <label>
        Allow decrement?
        <Switch checked={allowDec} onChange={toggle} />
      </label>
      <p>
        <Tooltip id="tooltip" content="Tooltip text">
          <span>show tooltip on mouse over</span>
        </Tooltip>
      </p>
      <Button slot="footer" onClick={() => setCount((count) => count + 1)}>
        Increment
      </Button>
      <Button
        slot="footer"
        danger={allowDec}
        disabled={!allowDec}
        onClick={() => setCount((count) => count - 1)}
      >
        Decrement
      </Button>
    </Card>
  );
  ```
{% endband %}

{% band header="Interacting with web components' APIs" %}
  Now we will add the [`pf-popover`][pf-popover] web component and open the 
  popover on the mouse over of the button. We will programmatically use the 
  `show()` and `hide()` popover methods to show and hide the popover. **Note**
  that these are methods on the `<pf-popover>` DOM object. Because React apps do
  not interact directly with the DOM, we will need to store a ref for the popover 
  element, and call our methods on it's current element.

  ```js
  function App() {
    const [count, setCount] = useState(0);
    const [allowDec, setAllowDec] = useState(false);
    const toggle = () => setAllowDec(!allowDec);
    const popoverRef = useRef(null);

    const onMouseover = () => {
      popoverRef.current?.show();
    };

    const onMousehide = () => {
      popoverRef.current?.hide();
    };

    return (
      <Card id="card" rounded>
        <h1 slot="header">React + PatternFly Elements</h1>
        <div>count is {count}</div>
        <label>
          Allow decrement?
          <Switch checked={allowDec} onChange={toggle} />
        </label>
        <p>
          <Tooltip id="tooltip" content="Tooltip text">
            <span>show tooltip on mouse over</span>
          </Tooltip>
        </p>
        <p>
          <Button onMouseOver={onMouseover} onMouseLeave={onMousehide}>
            Open Popover
          </Button>
          <Popover ref={popoverRef} body="Popover body" heading="Heading">
            <span>popover</span>
          </Popover>
        </p>

        <Button slot="footer" onClick={() => setCount((count) => count + 1)}>
          Increment
        </Button>
        <Button
          slot="footer"
          danger={allowDec}
          disabled={!allowDec}
          onClick={() => setCount((count) => count - 1)}
        >
          Decrement
        </Button>
      </Card>
    );
  }
  ```
{% endband %}

{% band header="Codesandbox example" %}
  <iframe src="https://codesandbox.io/p/sandbox/pfe-react-wrappers-3g6x6r?autoresize=1&fontsize=14&hidenavigation=1&moduleview=1&theme=dark"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="PatternFly Elements with React"></iframe>
{% endband %}

{% band header="Recap" %}
Let’s recap what we did.

1. Initial setup: Created React project (TypeScript + Vite).
2. Added PatternFly Elements: Installed @lit-labs/react and @patternfly/elements libraries.
3. Added Button, Switch, Card, Tooltip, and Popover components:
  - Enable/disable a button by clicking the switch button.
  - Show tooltip text on mouseover.
  - Created a reference to the popover to open the popover on the mouse-over of the button.
{% endband %}

{% band header="Wrap up" %}
  So there you have it. We’ve added web components to our React app and gained 
  the benefits of using portable, pre-made components that can also be used in 
  other frameworks like Angular and Vue. If your app is written in Angular or Vue, 
  check out our other two posts: Using [PatternFly Elements in your Angular 
  App][inng] and Using [PatternFly Elements in your Vue App][invue].
{% endband %}

[codesandbox]: https://codesandbox.io/p/devbox/pfe-react-wrappers-3g6x6r?file=%2Fsrc%2FApp.tsx
[repo]: https://github.com/anujsingla/react-patternfly-elements
[cee]: https://custom-elements-everywhere.com/ 
[llr]: https://github.com/lit/lit/tree/main/packages/react#litreact
[synthevent]: https://react.dev/reference/react-dom/components/common#react-event-object
[ce-lifecycle]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
[react-lifecycle]: https://legacy.reactjs.org/docs/state-and-lifecycle.html
[vite]: https://vitejs.dev/guide/#scaffolding-your-first-vite-project
[pf-button]: https://patternflyelements.org/components/button/
[pf-card]: https://patternflyelements.org/components/card/
[pf-switch]: https://patternflyelements.org/components/switch/
[pf-tooltip]: https://patternflyelements.org/components/tooltip/
[pf-popover]: https://patternflyelements.org/components/popover/
[inng]: https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363
[invue]: https://patternflyelements.org/framework-integration/vue/
