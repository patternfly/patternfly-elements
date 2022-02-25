{% renderOverview %}
  <pfe-clipboard></pfe-clipboard>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  <pfe-clipboard></pfe-clipboard>
  ```html
  <pfe-clipboard></pfe-clipboard>
  ```

  ### Optionally hide the icon
  <pfe-clipboard no-icon></pfe-clipboard>
  ```html
  <pfe-clipboard no-icon></pfe-clipboard>
  ```

  ### Override the link text
  <pfe-clipboard>
    <span slot="label">You can copy this url</span>
  </pfe-clipboard>

  ```html
  <pfe-clipboard>
    <span slot="label">You can copy this url</span>
  </pfe-clipboard>
  ```

  ### Copying text from element with custom button text
  <pfe-clipboard copy-from="#textToCopy">
    <span slot="label">This will copy the text in the text field below!</span>
  </pfe-clipboard>
  <input type="text" id="textToCopy" value="This text will be copied!"></input>

  ```html
  <pfe-clipboard copy-from="#textToCopy">
    <span slot="label">This will copy the text in the text field below!</span>
  </pfe-clipboard>
  <input type="text" id="textToCopy" value="This text will be copied!"></input>
  ```

  ### Copying text from property
  <pfe-clipboard copy-from="property" id="propertyCopy">
  </pfe-clipboard>
  <script>
    window.addEventListener('load', function() {
      document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard copy-from="#textToCopy">\n      <span slot="label">This will copy the text in the text field below!</span>\n      <span slot="success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!"></input>';
    })
  </script>

  ```html
  <pfe-clipboard copy-from="property" id="propertyCopy">
  </pfe-clipboard>
  <script>
    window.addEventListener('load', function() {
      document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard copy-from="#textToCopy">\n      <span slot="label">This will copy the text in the text field below!</span>\n      <span slot="success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!"></input>';
    })
  </script>
  ```

  ### Override the copied notification text
  <pfe-clipboard>
    <span slot="success">URL Copied to clipboard</span>
  </pfe-clipboard>

  ```html
  <pfe-clipboard>
    <span slot="success">URL Copied to clipboard</span>
  </pfe-clipboard>
  ```

  ### Override the icon
  <pfe-clipboard>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>

  ```html
  <pfe-clipboard>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>
  ```

  ### Override all slots
  <pfe-clipboard>
    <span slot="label">Copy this article URL</span>
    <span slot="success">URL Copied to clipboard</span>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>

  ```html
  <pfe-clipboard>
    <span slot="label">Copy this article URL</span>
    <span slot="success">URL Copied to clipboard</span>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>
  ```

  ### Specify the amount of seconds the copy success text should be visible
  <pfe-clipboard copied-duration="5"></pfe-clipboard>

  ```html
  <pfe-clipboard copied-duration="5"></pfe-clipboard>
  ```
{% endband %}

{% band header="Accessibility" %}
  `<pfe-clipboard>` implements many features of a standard button to provide an accessible
  experience for all users. By default, `role="button"` and `tabindex="0"` are added to
  inform assistive technology that `<pfe-clipboard>` should be treated as a button.  It listens for
  mouse clicks as well as enter and space key presses per the recommendation of
  [w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html).
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
