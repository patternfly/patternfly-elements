{% renderOverview for=package, title=title %}
  <pfe-select>
    <select>
      <option disabled>Please select an option</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </pfe-select>
{% endrenderOverview %}

{% band header="Usage" %}
  There are 3 ways of providing options to your component:

  - Users can pass custom options as an array of objects to the `options` setter function
  - Users can append more options by using an `addOptions()` API

  Note: pfe-select component can also be used in places where dropdowns are needed but its more suitable for forms.

  ### Using the `<select>` tag

  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-select class="pfe-l-grid__item pfe-m-3-col">
      <select>
        <option disabled>Please select an option</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </pfe-select>
  </div>

  ```html
  <pfe-select>
    <select>
      <option disabled>Please select an option</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </pfe-select>
  ```

  ### By passing options

  For custom options, use the `options` setter function to set the options as shown in snippet below:

  <div class="pfe-l-grid pfe-m-gutters">
    <pfe-select id="options-select" class="pfe-l-grid__item pfe-m-3-col"></pfe-select>
  </div>

  ```html
  <pfe-select></pfe-select>
  ```

  ```javascript
  const pfeSelect = document.querySelector("pfe-select#options-select");
  pfeSelect.options = [
    { text: "Please select an option", value: "", selected: true },
    { text: 'One', value: '1', selected: false },
    { text: 'Two', value: '2', selected: false },
    { text: 'Three', value: '3', selected: false}
  ];
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}

<script>
const pfeSelect = document.querySelector("pfe-select#options-select");
pfeSelect.options = [
  { text: "Please select an option", value: "", selected: true },
  { text: 'One', value: '1', selected: false },
  { text: 'Two', value: '2', selected: false },
  { text: 'Three', value: '3', selected: false}
];
</script>
