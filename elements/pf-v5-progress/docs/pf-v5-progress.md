{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
    <pf-v5-progress title="Default" value="33"></pf-v5-progress>
{% endrenderOverview %}

{% band header="Usage" %}

   ### Success variant
   {% htmlexample %}
    <pf-v5-progress variant="success" value="50"></pf-v5-progress>
   {% endhtmlexample %}

   ### Inside measurement
   {% htmlexample %}
    <pf-v5-progress value="24" measure-location="inside"></pf-v5-progress>
   {% endhtmlexample %}

   ### Large size
   {% htmlexample %}
    <pf-v5-progress value="24" size="lg"></pf-v5-progress>
   {% endhtmlexample %}

   ### Inside measurement
   {% htmlexample %}
    <pf-v5-progress value="24" measure-location="inside"></pf-v5-progress>
   {% endhtmlexample %}

   ### Truncated Description
   {% htmlexample %}
    <pf-v5-progress
        value="29"
        description-truncated
        description="Very very very very very very very very very very very long description which should be truncated if it does not fit onto one line above the progress bar"
    ></pf-v5-progress>
   {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
