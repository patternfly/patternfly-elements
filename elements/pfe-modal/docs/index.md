{% renderOverview %}
  <pfe-modal>
    <pfe-button slot="trigger">
      <button>Open modal</button>
    </pfe-button>
    <h2 slot="header">Modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>
{% endrenderOverview %}

{% band header="Usage" %}
  ### With a trigger
  The `trigger` slot can be used with a trigger element, like a button, to provide a mechanism to open a modal without any additional JavaScript.

  ```html
  <pfe-modal>
    <button slot="trigger">Open modal</button>
    <h2 slot="header">Modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>
  ```

  ### Without a trigger
  Using `pfe-modal` without utilizing the `trigger` slot requires additional JavaScript to programmatically open a modal. Uses for this type of modal are meant for scenarios where a modal needs to be programmatically triggered: a user is being logged out, a user needs to accept terms before continuing, etc.

  ```html
  <pfe-modal>
    <h2 slot="header">Modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>
  ```

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}
  <pfe-modal width="small">
    <pfe-button slot="trigger">
      <button>Open a small modal</button>
    </pfe-button>
    <h2 slot="header">Small modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>

  <pfe-modal width="medium">
    <pfe-button slot="trigger">
      <button>Open a medium modal</button>
    </pfe-button>
    <h2 slot="header">Medium modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>

  <pfe-modal width="large">
    <pfe-button slot="trigger">
      <button>Open a large modal</button>
    </pfe-button>
    <h2 slot="header">Large modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <pfe-cta>
      <a href="#bar">Learn more</a>
    </pfe-cta>
  </pfe-modal>
{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
