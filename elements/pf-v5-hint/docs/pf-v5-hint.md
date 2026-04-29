{% renderOverview %}
  <pf-v5-hint>
    Welcome to the new documentation experience.
    <a href="#">Learn more about the improved features</a>.
  </pf-v5-hint>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default with no title
  Basic hint without a title, used for simple informational messages.

  {% htmlexample %}
  <pf-v5-hint>
    Welcome to the new documentation experience.
    <a href="#">Learn more about the improved features</a>.
  </pf-v5-hint>
  {% endhtmlexample %}

  ### Hint with title
  Add a title to your hint by using the `title` slot to provide more context.

  {% htmlexample %}
  <pf-v5-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-v5-hint>
  {% endhtmlexample %}

  ### With a footer
  Add action links or buttons to the footer using the `footer` slot.

  {% htmlexample %}
  <pf-v5-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    <pf-v5-button slot="footer" variant="link" inline>
      <a href="#">Try it for 90 days</a>
    </pf-v5-button>
  </pf-v5-hint>
  {% endhtmlexample %}

  ### With actions
  Add an actions menu (like a kebab dropdown) using the `actions` slot.

  {% htmlexample %}
  <pf-v5-hint>
    <pf-v5-dropdown slot="actions">
      <pf-v5-button slot="toggle" plain icon="ellipsis-v" aria-label="Actions"></pf-v5-button>
      <pf-v5-dropdown-menu slot="menu">
        <pf-v5-dropdown-item>
          <a href="#">Link</a>
        </pf-v5-dropdown-item>
        <pf-v5-dropdown-item>
          <button type="button">Action</button>
        </pf-v5-dropdown-item>
      </pf-v5-dropdown-menu>
    </pf-v5-dropdown>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-v5-hint>
  {% endhtmlexample %}

  ### Complete example
  A hint with all available slots.

  {% htmlexample %}
  <pf-v5-hint>
    <pf-v5-dropdown slot="actions">
      <pf-v5-button slot="toggle" plain icon="ellipsis-v" aria-label="Actions"></pf-v5-button>
      <pf-v5-dropdown-menu slot="menu">
        <pf-v5-dropdown-item>
          <a href="#">Link</a>
        </pf-v5-dropdown-item>
        <pf-v5-dropdown-item>
          <button type="button">Action</button>
        </pf-v5-dropdown-item>
        <pf-v5-dropdown-item disabled>
          <a href="#">Disabled link</a>
        </pf-v5-dropdown-item>
      </pf-v5-dropdown-menu>
    </pf-v5-dropdown>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    <pf-v5-button slot="footer" variant="link" inline>
      <a href="#">Try it for 90 days</a>
    </pf-v5-button>
  </pf-v5-hint>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
