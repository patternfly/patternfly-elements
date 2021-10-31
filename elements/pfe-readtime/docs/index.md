{% renderOverview %}
  <pfe-card border>
    <pfe-readtime word-count="500" hidden>%t-minute readtime</pfe-readtime>
  </pfe-card>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-readtime for="#readtime1" hidden>%t-minute readtime</pfe-readtime>
  <pfe-readtime word-count="1200" hidden>%t-minute readtime</pfe-readtime>
  ```
{% endband %}

{% band header="Accessibility" %}
  This component functions purely as inline-content and does not require any focus state.  Should be read by screen-readers inline with it's contextual content.
{% endband %}

{% band header="Readtime calculation" %}
  Average read time by country is determined using [this research](https://irisreading.com/average-reading-speed-in-various-languages). Korean read time research [can be found here](https://files.osf.io/v1/resources/xynwg/providers/osfstorage/5cb0b53ff2be3c0016ffe637?action=download&version=1&direct&format=pdf).

  ### TLDR
  For Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
