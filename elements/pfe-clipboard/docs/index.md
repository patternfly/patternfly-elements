---
layout: layout-basic.njk
title: Clipboard
description: Gives a preview of information in a small layout
package: pfe-clipboard
packages:
  - pfe-clipboard
  - pfe-cta
  - pfe-icon
tags:
  - component
---

{% renderOverview for=package, title=title %}
  <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
  ```html
  <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
  ```

  ### Optionally hide the icon
  <pfe-clipboard no-icon role="button" tabindex="0"></pfe-clipboard>
  ```html
  <pfe-clipboard no-icon role="button" tabindex="0"></pfe-clipboard>
  ```

  ### Override the link text
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text">You can copy this url</span>
  </pfe-clipboard>

  ```html
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text">You can copy this url</span>
  </pfe-clipboard>
  ```

  ### Copying text from element with custom button text
  <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">
    <span slot="text">This will copy the text in the text field below!</span>
  </pfe-clipboard>
  <input type="text" id="textToCopy" value="This text will be copied!"></input>

  ```html
  <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">
    <span slot="text">This will copy the text in the text field below!</span>
  </pfe-clipboard>
  <input type="text" id="textToCopy" value="This text will be copied!"></input>
  ```

  ### Copying text from property
  <pfe-clipboard role="button" tabindex="0" copy-from="property" id="propertyCopy">
  </pfe-clipboard>
  <script>
    window.addEventListener('load', function() {
      document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">\n      <span slot="text">This will copy the text in the text field below!</span>\n      <span slot="text--success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!11"></input>';
    })
  </script>

  ```html
  <pfe-clipboard role="button" tabindex="0" copy-from="property" id="propertyCopy">
  </pfe-clipboard>
  <script>
    window.addEventListener('load', function() {
      document.getElementById('propertyCopy').contentToCopy = '    <h2>Clipboard: with custom text & copying text from element</h2>\n    <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">\n      <span slot="text">This will copy the text in the text field below!</span>\n      <span slot="text--success">Making some copies!</span>\n    </pfe-clipboard>\n    <input type="text" id="textToCopy" value="This text will be copied!!11"></input>';
    })
  </script>
  ```

  ### Override the copied notification text
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text--success">URL Copied to clipboard</span>
  </pfe-clipboard>

  ```html
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text--success">URL Copied to clipboard</span>
  </pfe-clipboard>
  ```

  ### Override the icon
  <pfe-clipboard role="button" tabindex="0">
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>

  ```html
  <pfe-clipboard role="button" tabindex="0">
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>
  ```

  ### Override all slots
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text">Copy this article URL</span>
    <span slot="text--success">URL Copied to clipboard</span>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>

  ```html
  <pfe-clipboard role="button" tabindex="0">
    <span slot="text">Copy this article URL</span>
    <span slot="text--success">URL Copied to clipboard</span>
    <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
  </pfe-clipboard>
  ```

  ### Specify the amount of seconds the copy success text should be visible
  <pfe-clipboard role="button" tabindex="0" copied-duration="5"></pfe-clipboard>

  ```html
  <pfe-clipboard role="button" tabindex="0" copied-duration="5"></pfe-clipboard>
  ```
{% endband %}

{% band header="Accessibility" %}
  `<pfe-clipboard>` implements many features of a standard button to provide an accessible
  experience for all users. By default, `role="button"` and `tabindex="0"` are added to
  inform assistive technology that `<pfe-clipboard>` should be treated as a button.  It listens for
  mouse clicks as well as enter and space key presses per the recommendation of
  [w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html).
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
