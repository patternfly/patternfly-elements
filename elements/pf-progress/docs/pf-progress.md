{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
    <pf-progress title="Default" value="33"></pf-progress>
{% endrenderOverview %}

{% band header="Usage" %}

   ### Success variant
   {% htmlexample %}
    <pf-progress variant="success" value="50"></pf-progress>
   {% endhtmlexample %}

   ### Inside measurement
   {% htmlexample %}
    <pf-progress value="24" measure-location="inside"></pf-progress>
   {% endhtmlexample %}

   ### Large size
   {% htmlexample %}
    <pf-progress value="24" size="lg"></pf-progress>
   {% endhtmlexample %}

   ### Inside measurement
   {% htmlexample %}
    <pf-progress value="24" measure-location="inside"></pf-progress>
   {% endhtmlexample %}

   ### Truncated Description
   {% htmlexample %}
    <pf-progress
        value="29"
        description-truncated
        description="Very very very very very very very very very very very long description which should be truncated if it does not fit onto one line above the progress bar"
    ></pf-progress>
   {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
