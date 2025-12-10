{% renderOverview %}
  <pf-hint>
    Welcome to the new documentation experience.
    <a href="#">Learn more about the improved features</a>.
  </pf-hint>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default with no title
  Basic hint without a title, used for simple informational messages.

  {% htmlexample %}
  <pf-hint>
    Welcome to the new documentation experience.
    <a href="#">Learn more about the improved features</a>.
  </pf-hint>
  {% endhtmlexample %}

  ### Hint with title
  Add a title to your hint by using the `title` slot to provide more context.

  {% htmlexample %}
  <pf-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-hint>
  {% endhtmlexample %}

  ### With a footer
  Add action links or buttons to the footer using the `footer` slot.

  {% htmlexample %}
  <pf-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    <pf-button slot="footer" variant="link" inline>
      <a href="#">Try it for 90 days</a>
    </pf-button>
  </pf-hint>
  {% endhtmlexample %}

  ### With actions
  Add an actions menu (like a kebab dropdown) using the `actions` slot.

  {% htmlexample %}
  <pf-hint>
    <pf-dropdown slot="actions">
      <pf-button slot="toggle" plain aria-label="Actions">
        <pf-icon icon="ellipsis-v"></pf-icon>
      </pf-button>
      <pf-dropdown-menu slot="menu">
        <pf-dropdown-item>
          <a href="#">Link</a>
        </pf-dropdown-item>
        <pf-dropdown-item>
          <button type="button">Action</button>
        </pf-dropdown-item>
      </pf-dropdown-menu>
    </pf-dropdown>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-hint>
  {% endhtmlexample %}

  ### Complete example
  A hint with all available slots.

  {% htmlexample %}
  <pf-hint>
    <pf-dropdown slot="actions">
      <pf-button slot="toggle" plain aria-label="Actions">
        <pf-icon icon="ellipsis-v"></pf-icon>
      </pf-button>
      <pf-dropdown-menu slot="menu">
        <pf-dropdown-item>
          <a href="#">Link</a>
        </pf-dropdown-item>
        <pf-dropdown-item>
          <button type="button">Action</button>
        </pf-dropdown-item>
        <pf-dropdown-item disabled>
          <a href="#">Disabled link</a>
        </pf-dropdown-item>
      </pf-dropdown-menu>
    </pf-dropdown>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    <pf-button slot="footer" variant="link" inline>
      <a href="#">Try it for 90 days</a>
    </pf-button>
  </pf-hint>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
