---
layout: layout-basic.njk
title: Toast
description: An alert hidden on page load and slides in/out of the view
package: pfe-toast
packages:
  - pfe-toast
  - pfe-button
tags:
  - component
---

<style>
  pfe-toast#overview-toast {
    z-index: 999;
  }
</style>

{% renderOverview for=package, title=title %}
  <pfe-button>
    <button>Trigger toast</button>
  </pfe-button>

  <pfe-toast id="overview-toast">
    <h2>Do you feel toasted?</h2>
    <p>Biodiesel wolf franzen, jean shorts pabst lomo cloud bread gentrify cronut af migas vinyl four dollar toast scenester twee. Twee synth hammock hella activated charcoal keffiyeh, farm-to-table cray try-hard tofu fixie truffaut leggings actually. Tote bag poutine kale chips intelligentsia health goth, thundercats affogato tofu literally vegan umami slow-carb VHS chillwave.</p>
  </pfe-toast>

  <script>
    const button = document.querySelector("pfe-button button");
    const toast = document.querySelector("pfe-toast#overview-toast");
    button.addEventListener("click", (e) => { toast.toggle()});
  </script>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-toast>
    <p>You've been successfully toasted!</p>
  </pfe-toast>
  ```

  ```javascript
  const toast = document.querySelector("pfe-toast");
  toast.open(); // open pfe-toast
  toast.close(); // close pfe-toast
  toast.toggle(); // toggle pfe-toast
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}
  - Max width: Allows you to specify the maximum width of the component. **Variable name:** `--pfe-toast--MaxWidth`.
  - Min width: Allows you to specify the minimum width of the component. **Variable name:** `--pfe-toast--MinWidth`.
  - Top: Allows you to customize the distance between the component and the top of its container. **Variable name:** `--pfe-toast--Top`.
  - Right: Allows you to customize the distance between the component and the right of its container. **Variable name:** ` --pfe-toast--Right`.
{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
