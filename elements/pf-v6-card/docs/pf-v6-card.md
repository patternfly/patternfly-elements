{% renderOverview %}
  A **card** is a square or rectangular container that can contain any kind of
  content. Cards symbolize units of information, and each one acts as an entry
  point for users to access more details.

  <pf-v6-card>
    <h2 slot="title">Title</h2>
    <pf-v6-card-body>Body</pf-v6-card-body>
    <span slot="footer">Footer</span>
  </pf-v6-card>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  A card typically contains a title, body, and footer. Any of these sections may
  be omitted, but a body is recommended.

  {% htmlexample %}
  <pf-v6-card>
    <h2 slot="title">Title</h2>
    <pf-v6-card-body>Body</pf-v6-card-body>
    <span slot="footer">Footer</span>
  </pf-v6-card>
  {% endhtmlexample %}

  ### Header with actions
  Place header images in the `header` slot, the title in the `title` slot, and
  actions in the `actions` slot.

  <!-- TODO: replace native <button> with <pf-v6-button> once it ships (PR #3157). -->

  {% htmlexample %}
  <pf-v6-card>
    <img slot="header" src="/brand/logo/svg/pfe-icon-blue.svg" alt="PatternFly">
    <button slot="actions" type="button" aria-label="Actions">Actions</button>
    <h2 slot="title">Title</h2>
    <span slot="subtitle">Subtitle</span>
    <pf-v6-card-body>Body</pf-v6-card-body>
  </pf-v6-card>
  {% endhtmlexample %}

  ### Selectable
  A selectable card can be selected by clicking anywhere within it. Give each
  control an accessible name with `accessible-label`.

  {% htmlexample %}
  <pf-v6-card selectable accessible-label="First card">
    <h2 slot="header">First card</h2>
    <pf-v6-card-body>This card is selectable.</pf-v6-card-body>
  </pf-v6-card>
  {% endhtmlexample %}

  ### Actionable
  An actionable card performs an action or navigates to a link when clicked.
  Set `href` to render a link.

  {% htmlexample %}
  <pf-v6-card clickable href="#" accessible-label="View details">
    <h2 slot="header">View details</h2>
    <pf-v6-card-body>This card is a link.</pf-v6-card-body>
  </pf-v6-card>
  {% endhtmlexample %}

  ### Expandable
  An expandable card shows a toggle in the header. Content in the
  `expandable-content` slot is hidden until the card is expanded.

  {% htmlexample %}
  <pf-v6-card expandable accessible-label="Title">
    <h2 slot="header">Title</h2>
    <div slot="expandable-content">
      <pf-v6-card-body>Body</pf-v6-card-body>
    </div>
  </pf-v6-card>
  {% endhtmlexample %}

  ### Multiple body sections
  Use `pf-v6-card-body` for each body section. Set `no-fill` to prevent a
  section from growing to fill the card.

  {% htmlexample %}
  <pf-v6-card>
    <h2 slot="title">Title</h2>
    <pf-v6-card-body>Body</pf-v6-card-body>
    <pf-v6-card-body no-fill>Secondary body</pf-v6-card-body>
  </pf-v6-card>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssParts %}{% endrenderCssParts %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
