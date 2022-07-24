<style>
  pfe-toast#overview-toast {
    z-index: 999;
  }
</style>

{% renderOverview %}
  Toast is a self-contained alert that is hidden on page load and slides in/out of the view when programmatically opened/closed.

  <pfe-button>
    <button>Trigger toast</button>
  </pfe-button>

  <pfe-toast id="overview-toast">
    <h2 class="no-header-styles">Do you feel toasted?</h2>
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

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
