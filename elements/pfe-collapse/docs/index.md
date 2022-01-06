{% renderOverview for=package, title=title %}
  <pfe-collapse>
    <pfe-collapse-toggle>
      <pfe-cta priority="primary">
        <button>Toggle</button>
      </pfe-cta>
    </pfe-collapse-toggle>
    <pfe-collapse-panel>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </pfe-collapse-panel>
  </pfe-collapse>
{% endrenderOverview %}

{% band header="Usage" %}
  `pfe-collapse` automatically wires up the toggle and panel so when the `pfe-collapse-toggle` is toggled, it will either open or close the `pfe-collapse-panel`.

  ```html
  <pfe-collapse>
    <pfe-collapse-toggle>
      This is the toggle
    </pfe-collapse-toggle>
    <pfe-collapse-panel>
      This is the panel
    </pfe-collapse-panel>
  </pfe-collapse>
  ```

  ### Collapse with a preset ID

  ```html
  <pfe-collapse>
    <pfe-collapse-toggle aria-controls="panel1">
      <h3>Collapse Toggle with preset ID</h3>
    </pfe-collapse-toggle>
    <pfe-collapse-panel id="panel1">
      <p>Panel content</p>
    </pfe-collapse-panel>
  </pfe-collapse>
  ```

  ### Standalone toggle and panel (not wrapped in a pfe-collapse)

  The toggle needs an `aria-controls` attribute that links to the `id` of the
  panel.

  ```html
  <pfe-collapse-toggle aria-controls="panel">
    Toggle the Standalone Panel
  </pfe-collapse-toggle>
  <p>Other content:</p>
  <pfe-collapse-panel id="panel">
    <p>Panel content</p>
  </pfe-collapse-panel>
  ```

  ### Standalone panel

  A standalone panel can be opened by any action or event that toggles the
  `expanded` property on the panel.

  ```html
  <button>Toggle Panel</button>

  <pfe-collapse-panel id="standalone-panel">
    <p>Panel content</p>
  </pfe-collapse-panel>

  <script>
    var collapse = document.querySelector("#standalone-panel");

    document.querySelector("button").addEventListener("click", function() {
      collapse.expanded = !collapse.expanded;
    });
  </script>
  ```
{% endband %}

<!-- FIXME: don't know why this doesn't work -->
<!-- {% renderSlots for=package %}
  {% renderSlots for="pfe-collapse-toggle",
                 level=3,
                 header="Slots on `pfe-collapse-toggle`" %}{% endrenderSlots %}
  {% renderSlots for="pfe-collapse-panel",
                 level=3,
                 header="Slots on `pfe-collapse-panel`" %}{% endrenderSlots %}
{% endrenderSlots %} -->

{% renderSlots for=package %}
{% endrenderSlots %}
{% renderSlots for="pfe-collapse-toggle",
               level=3,
               header="Slots on `pfe-collapse-toggle`" %}{% endrenderSlots %}
{% renderSlots for="pfe-collapse-panel",
               level=3,
               header="Slots on `pfe-collapse-panel`" %}{% endrenderSlots %}

{% renderAttributes for=package %}
  <!-- FIXME: this isn't working either -->
  {% renderAttributes for="pfe-collapse-panel", level=3, header="Attributes on `pfe-collapse-panel`" %}{% endrenderAttributes %}
{% endrenderAttributes %}

{% renderEvents for='pfe-collapse-toggle', header="Events on `pfe-collapse-toggle`" %}{% endrenderEvents %}
{% renderEvents for='pfe-collapse-panel', header="Events on `pfe-collapse-panel`" %}{% endrenderEvents %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
