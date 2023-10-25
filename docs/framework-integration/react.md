---
layout: layout-basic.njk
title: React
tags:
  - frameworkIntegration
---

<header class="band">
  <h1>{{ title }}</h1>
</header>

{% band header="Using PatternFly Elements in your React app" %}
We created React wrapper for each web component using [@lit/react](https://github.com/lit/lit/tree/main/packages/react#litreact) library. This library helps us make the React wrapper for web components, and we can use it like React components. Please check this [example](https://codesandbox.io/p/sandbox/pfe-react-wrappers-3g6x6r?file=%2Fpackage.json%3A1%2C1) for more details. If you are more interested in how we are doing in the patternfly element library. Please check this [library](https://www.npmjs.com/package/@lit-labs/gen-wrapper-react).

“Using PatternFly Elements in your React App” is broken down into four sections:

- Initial setup
- Adding PatternFly Elements
- Add Switch (pf-switch) component
- Add Tooltip (pf-tooltip) component
- Interacting with our web components API
- Codesandbox example
- Github repo
- Why does React need special treatment?
- Recap

Each section will show you exactly what you need to do with code snippets.
{% endband %}

{% band header="Initial setup" %}
Create a new React project with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) by running this command

```bash
npm create vite@latest
```

This command will ask you to provide the project name, framework, and variant.

{% endband %}

{% band header="Adding PatternFly Elements" %}
With the setup complete, You need to install @lit-labs/react and @patternfly/elements library.

```bash
npm install @lit-labs/react @patternfly/elements
```

Let's import Button and Card components in our `App.tsx` file in the `/src/` directory.

```js
import { useState } from "react";
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import "./App.css";
```

Let’s use [Button (pf-button)](https://patternflyelements.org/components/button/) and [Card (pf-card)](https://patternflyelements.org/components/card/) component in the `App` function in the `App.tsx` file to see that our Card and Button are working. We are updating the local state and showing it in the UI after clicking the button.

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

{% endband %}

{% band header="Add Switch (pf-switch) component" %}
Now we have a card and a button component, let's add [Switch (pf-switch)](https://patternflyelements.org/components/switch/) web component in our app. We will enable/disable the decrement button by clicking on the Switch button.

```js
import { useState } from "react";
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";
import "./App.css";

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

{% endband %}

{% band header="Add Tooltip (pf-tooltip) component" %}
Now we have a card, button, and switch component, let's add [Tooltip (pf-tooltip)](https://patternflyelements.org/components/tooltip/) web component in our app. We will show the tooltip text on mouseover.

```js
import { useState } from "react";
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";
import { Tooltip } from "@patternfly/elements/react/pf-tooltip/pf-tooltip.js";
import "./App.css";

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
}

export default App;
```

{% endband %}

{% band header="Interacting with our web components API" %}
Now we will add the [Popover (pf-popover)](https://patternflyelements.org/components/popover/) web component and open the popover on the mouse over of the button. We will programmatically use the `show()` and `hide()` popover methods to show and hide the popover.

```js
import { useRef, useState } from "react";

import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";
import { Popover } from "@patternfly/elements/react/pf-popover/pf-popover.js";
import { Tooltip } from "@patternfly/elements/react/pf-tooltip/pf-tooltip.js";

import "./App.css";

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

export default App;
```

{% endband %}

{% band header="Codesandbox example" %}

Below is the accompanying CodeSandbox to see that our setup is correct and that we’ve successfully added our web components to our app.

  <iframe src="https://codesandbox.io/p/sandbox/pfe-react-wrappers-3g6x6r?autoresize=1&fontsize=14&hidenavigation=1&moduleview=1&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="PatternFly Elements with React"></iframe>

{% endband %}

{% band header="Github repo" %}

[Github repo](https://github.com/anujsingla/react-patternfly-elements)

{% endband %}

{% band header="Why does react need special treatment?" %}

Web components are a set of web platform APIs that help to create reusable and encapsulated UI elements. They consist of Custom Elements, Shadow DOM, and HTML Templates.
React is a JavaScript library for making user interfaces. React uses a virtual DOM to optimize updates and minimize the number of changes that need to be made to the actual DOM.
React needs special treatment when integrating with web components because of the design philosophies and lifecycles. Multiple libraries are available to fill the gap between React and web components, like [@lit/react](https://github.com/lit/lit/tree/main/packages/react#litreact). This library helps us create the wrapper for web components and use it with React components. [Custom Elements Everywhere](https://custom-elements-everywhere.com/) project runs a suite of tests against each framework to identify interoperability issues and highlight potential fixes already implemented in other frameworks.

Here are some key reasons:

1. **React's Virtual DOM vs. Web Component Shadow DOM**:
   Web component uses shadow DOM to encapsulate styles and functionality within a component.
   React uses a virtual DOM to manage and update the DOM. React is aware of any changes made to the actual DOM.
   These different encapsulation mechanisms can conflict when we use React components with web components. Special care is needed to ensure that styles, state, and event handling work as expected. React must be aware of any changes to the web components to update the virtual DOM accordingly.

2. **Event Handling**:
   React relies on [synthetic events](https://react.dev/reference/react-dom/components/common#react-event-object) and its own event system. Web components use standard DOM events. React cannot listen for DOM events coming from Custom Elements. We need to manually bridge the gap between React's synthetic events and native DOM events to ensure proper event handling. React needs to be aware of these event handlers so that React can easily handle events within the React component tree. We can use React `useRef` hook to reference the Custom Elements and manually attach event listeners with addEventListener.

3. **Lifecycle Methods**:
   Web components have their own [lifecycle method](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) like connectedCallback, disconnectedCallback and React has its own [lifecycle methods](https://legacy.reactjs.org/docs/state-and-lifecycle.html), such as componentDidMount, componentDidUpdate which are used to handle the events when the component is added, updated or removed from the DOM. When we use web components with React, these lifecycle methods are properly handled and integrated into the React component tree.

4. **Data Flow**:
   Web components use properties and attributes to handle the data and custom events to communicate between components. React uses props and states for data flow in the components. When integrating React with web components, We need to establish clear data communication channels between them.

5. **Reactivity**:
   Web components are not automatically reactive, but we can do it manually by listening for property or attribute changes. We can also use libraries like Lit. React automatically updates the UI whenever the props or state changes in the component.
   Bridging this reactivity gap requires additional code and consideration.

{% endband %}

{% band header="Recap" %}
I realize that may have been a lot. So let’s recap what we did.

1. Initial setup: Created React project (TypeScript + Vite).
2. Added PatternFly Elements: Installed @lit-labs/react and @patternfly/elements libraries.
3. Added Switch (pf-switch) component: Enable/disable a button by clicking the switch button.
4. Add Tooltip (pf-tooltip) component: Show tooltip text on mouseover.
5. Interacting with our web components API: Created a reference to the popover to open the popover on the mouse-over of the button.
6. Codesandbox example
7. Github repo

{% endband %}

{% band header="Wrap up" %}
So there you have it. We’ve added web components to our React app and gained the benefits of using portable, pre-made components that can also be used in other frameworks like Angular and Vue. If your app is written in Angular or Vue, check out our other two posts: Using [PatternFly Elements in your Angular App](https://medium.com/patternfly-elements/using-patternfly-elements-web-components-in-your-angular-app-4b18b1c9c363) and Using [PatternFly Elements in your Vue App](https://patternflyelements.org/framework-integration/vue/).
{% endband %}
