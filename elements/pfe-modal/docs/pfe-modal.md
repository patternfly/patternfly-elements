{% renderOverview %}
  <pfe-modal trigger="overview-trigger">
    <h2 slot="header">Modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <a href="#bar">Learn more</a>
  </pfe-modal>
  <pfe-button id="overview-trigger"> Open modal </pfe-button>
{% endrenderOverview %}

{% band header="Usage" %}

  ```html
  <pfe-modal trigger="usage-trigger">
    <h2 slot="header">Modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <a href="#bar">Learn more</a>
  </pfe-modal>
  <button id="usage-trigger">Open modal</button>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}
  <pfe-modal width="small" trigger="rendered-slot-small">
    <h2 slot="header">Small modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <a href="#bar">Learn more</a>
  </pfe-modal>
  <pfe-button id="rendered-slot-small"> Open a small modal </pfe-button>

  <pfe-modal width="medium" trigger="rendered-slot-medium">
    <h2 slot="header">Medium modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <a href="#bar">Learn more</a>
  </pfe-modal>
  <pfe-button id="rendered-slot-medium"> Open a medium modal </pfe-button>

  <pfe-modal width="large" trigger="rendered-slot-large">
    <h2 slot="header">Large modal with a header</h2>
    <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <a href="#bar">Learn more</a>
  </pfe-modal>
  <pfe-button id="rendered-slot-large"> Open a large modal </pfe-button>
{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
