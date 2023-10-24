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
We have created React wrapper for each web component by using [@lit/react](https://github.com/lit/lit/tree/main/packages/react#litreact) library. This library helps us to create the React wrapper for web components and we can use it same as React components. Please check this [example](https://codesandbox.io/p/sandbox/pfe-react-wrappers-3g6x6r?file=%2Fpackage.json%3A1%2C1) for more details. If you are more interested in how we are doing in patternfly element library. Please check this [library](https://www.npmjs.com/package/@lit-labs/gen-wrapper-react).

“Using PatternFly Elements in your React App” is broken down into four sections:

- Initial setup
- Adding PatternFly Elements
- Interacting with our web components API
- Adding icing on the cake

Each section will show you exactly what you need to do with code snippets and an accompanying CodeSandbox that you can edit or fork.
{% endband %}

{% band header="Initial setup" %}
Create a new React project with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) by running this command

```bash
npm create vite@latest
```

This command will ask you to provide project name, framework and variant.

{% endband %}

{% band header="Adding PatternFly Elements" %}
With the setup complete, You need to install @lit-labs/react and @patternfly/elements library.

```bash
npm install @lit-labs/react @patternfly/elements
```

In our `App.tsx` file in the `/src/` directory, let’s import Button component.

```js
import { useState } from "react";
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import "./App.css";
```

Let’s use [Button (pf-button)](https://deploy-preview-2641--patternfly-elements.netlify.app/components/button/) and [Card (pf-card)](https://deploy-preview-2641--patternfly-elements.netlify.app/components/card/) component in the `App` function in the `App.tsx` file to see that our Card and Button is working. Click on the button, we are updating local state and show in the UI.

```js
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <Card id="card" rounded>
        <h1 slot="header">React + PatternFly Elements</h1>
        <div>count is {count}</div>
        <Button slot="footer" onClick={() => setCount((count) => count + 1)}>
          Increment
        </Button>
      </Card>
    </div>
  );
}
```

{% endband %}

{% band header="Add Switch (pf-switch) component" %}
Now we have a card and a button component, let's add [Switch (pf-switch)](https://deploy-preview-2641--patternfly-elements.netlify.app/components/switch/) web component in our app. We will enable/disable button by click on switch button.

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
    <div className="card">
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
    </div>
  );
}

export default App;
```

{% endband %}

{% band header="Add Tooltip (pf-tooltip) component" %}
Now we have a card, button and switch component, let's add [Tooltip (pf-tooltip)](https://deploy-preview-2641--patternfly-elements.netlify.app/components/tooltip/) web component in our app. We will show tooltip text on mouse over.

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
    <div className="card">
      <Card id="card" rounded>
        <h1 slot="header">React + PatternFly Elements</h1>
        <div>count is {count}</div>
        <label>
          Allow decrement?
          <Switch checked={allowDec} onChange={toggle} />
        </label>
        <p>
          <Tooltip
            id="tooltip"
            content={`
            Tooltip text`}
          >
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
    </div>
  );
}

export default App;
```

{% endband %}

{% band header="Interacting with our web components API" %}
React relies on [synthetic events](https://react.dev/reference/react-dom/components/common#react-event-object) and its own event system. Web components use standard DOM events. React cannot listen for DOM events coming from Custom Elements. We need to manually bridge the gap between React's synthetic events and native DOM events to ensure proper event handling. React needs to be aware of these event handlers so that React can easily handle events within the React component tree. We can use React `useRef` hook to reference the Custom Elements and manually attach event listeners with addEventListener.

Now we will add [Popover (pf-popover)](https://deploy-preview-2641--patternfly-elements.netlify.app/components/popover/) web component and open popover on mouse over of the button. We will use `useRef` hook to keep reference of the button.

> 👉 **Note**: [React 18@experimental](https://react.dev/reference/react-dom/components#custom-html-elements) provides support for HTML, so the `useEffect`/`useRef`
> workaround is no longer needed for property setting and event listeners

```js
import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";

import { Button } from "@patternfly/elements/react/pf-button/pf-button.js";
import { Card } from "@patternfly/elements/react/pf-card/pf-card.js";
import { Switch } from "@patternfly/elements/react/pf-switch/pf-switch.js";
import { Popover } from "@patternfly/elements/react/pf-popover/pf-popover.js";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [allowDec, setAllowDec] = useState(false);
  const toggle = () => setAllowDec(!allowDec);
  const reactLogoRef = useRef < HTMLImageElement > null;
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const [anim] = reactLogoRef.current?.getAnimations() ?? [];
    console.log(anim, reactLogoRef.current);
    if (anim) {
      anim.playbackRate = count;
    }
  }, [count]);

  const onMouseover = () => {
    popoverRef.current?.show();
  };

  const onMousehide = () => {
    popoverRef.current?.hide();
  };

  return (
    <div className="card">
      <Button
        ref={buttonRef}
        onMouseOver={onMouseover}
        onMouseLeave={onMousehide}
      >
        Hover to Cite
      </Button>
      <Popover ref={popoverRef}>
        <cite slot="body">Popover body</cite>
        <q>Popover</q>
      </Popover>
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
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img
            src={reactLogo}
            ref={reactLogoRef}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
    </div>
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

{% band %}
I realize that may have been a lot. So let’s recap what we did.

1. Initial Setup: Added the web component polyfills
2. Adding PatternFly Elements (web components): Added the following web components as dependencies in our app: pf-card, and pf-accordion
3. Adding PatternFly Elements (web components): Imported the web components into our `index.js` file
4. Adding PatternFly Elements (web components): Added the markup for our components in `index.js`
5. Interacting with our web components API: Created a reference to the accordion so we could open the first panel after the page loads
   {% endband %}

{% band header="Wrap up" %}
So there you have it. We’ve added web components to our React app and gained the benefits of using portable, pre-made components that can also be used in other frameworks like Angular and Vue. If your app is written in Angular or Vue, check out our other two posts: “Using PatternFly Elements in your Angular App” and “Using PatternFly Elements in your Vue App.”
{% endband %}
