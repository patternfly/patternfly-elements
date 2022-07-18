{% renderOverview %}
  <pfe-dropdown label="Dropdown">
    <pfe-dropdown-item item-type="link">
      <a href="https://patternflyelements.org">PatternFly Elements</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="link">
       <a href="https://patternfly.org">PatternFly</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="link" disabled>
       <a href="https://redhat.com">Disabled link</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
    <pfe-dropdown-item item-type="action">
       <button>Action 1</button>
    </pfe-dropdown-item>
  </pfe-dropdown>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-dropdown label="Dropdown">
    <pfe-dropdown-item item-type="link">
      <a href="https://patternflyelements.org">PatternFly Elements</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="link">
       <a href="https://patternfly.org">PatternFly</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="link" disabled>
       <a href="https://redhat.com">Disabled link</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
    <pfe-dropdown-item item-type="action">
       <button>Action 1</button>
    </pfe-dropdown-item>
  </pfe-dropdown>
  ```

  ### Provide dropdown items dynamically

  ```javascript
  let dropdown = document.querySelector("pfe-dropdown");
  ```

  When `pfe-dropdown` is defined, via the `whenDefined` method. Pass an array of `pfe-dropdown-item` objects to `options`.

  ```javascript
  await customElements.whenDefined("pfe-dropdown");
  dropdown.options = [
    {
      href: "https://patternflyelements.org",
      text: "Link 1",
      type: "link",
      disabled: false
    },
    {
      href: "https://patternflyelements.org",
      text: "Link 2",
      type: "link",
      disabled: false
    },
    {
      href: "https://patternflyelements.org",
      text: "Link 3",
      type: "link",
      disabled: true
    },
    {
      type: "separator"
    },
    {
      text: "Action 1",
      type: "action",
      disabled: false
    },
    {
      text: "Action 2",
      type: "action",
      disabled: true
    }
  ];
  ```

  ### Add dropdown items dynamically

  Add individual dropdown items with the `addDropdownOptions` method. Pass an array of `pfe-dropdown-item` objects to `addDropdownOptions`.

  ``` js
  customElements.whenDefined("pfe-dropdown").then(function() {
    dropdown.addDropdownOptions(
      [
        {
          href: "https://patternflyelements.org",
          text: "Link 4",
          type: "link",
          disabled: false
        }
      ]
    );
  });
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pfe-dropdown-item", level=3, header="Slots on `pfe-dropdown-item`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}
{% renderAttributes for="pfe-dropdown-item", level=3, header="Attributes on `pfe-dropdown-item`" %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}
{% renderProperties for="pfe-dropdown-item", level=3, header="Properties on `pfe-dropdown-item`" %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
