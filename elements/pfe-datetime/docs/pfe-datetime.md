{% renderOverview %}
  Datetime enables developers to get a lot of the features from the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) just by using attributes to set the format of the date and time they'd like to display.

  <dl>
    <dt>Current date:</dt>
    <dd>
      <pfe-datetime
        class="overview-datetime"
        type="local"
        day="numeric"
        month="long"
        year="numeric">
      </pfe-datetime>
    </dd>
    <dt>With a Spanish language code of es:</dt>
    <dd>
      <pfe-datetime
        class="overview-datetime"
        type="local"
        day="numeric"
        month="long"
        year="numeric"
        locale="es">
      </pfe-datetime>
    </dd>
    <dt>Time adverbial:</dt>
    <dd>
      <pfe-datetime
        id="minutesago"
        type="relative">
      </pfe-datetime>
    </dd>
  </dl>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Just the date
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    day="numeric"
    month="long"
    year="numeric">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>
  ```html
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    day="numeric"
    month="long"
    year="numeric">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>
  ```

  ### With time
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>
  ```html
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>
  ```

  ### With an en-GB locale
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit"
    locale="en-GB">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>

  ```html
  <pfe-datetime
    datetime="Mon Jan 1 15:04:05 EST 2021"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit"
    locale="en-GB">
    Mon Jan 1 15:04:05 EST 2021
  </pfe-datetime>
  ```

  ### As UTC
  <pfe-datetime
    datetime="2021-10-20T00:00:00.000Z"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit"
    time-zone="UTC">
    2021-10-20T00:00:00.000Z
  </pfe-datetime>

  ```html
  <pfe-datetime
    datetime="2021-10-20T00:00:00.000Z"
    type="local"
    weekday="long"
    month="short"
    day="2-digit"
    year="numeric"
    hour="2-digit"
    minute="2-digit"
    second="2-digit"
    time-zone="UTC">
    2021-10-20T00:00:00.000Z
  </pfe-datetime>
  ```

  ### Time adverbial
  <pfe-datetime
    type="relative"
    datetime="Mon Jan 2 15:04:05 EST 2010">
    Mon Jan 2 15:04:05 EST 2010
  </pfe-datetime>

  ```html
  <pfe-datetime
    type="relative"
    datetime="Mon Jan 2 15:04:05 EST 2010">
    Mon Jan 2 15:04:05 EST 2010
  </pfe-datetime>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

<script>
  const datetimeComponents = [...document.querySelectorAll(".overview-datetime")];
  const minutesAgo = document.querySelector("#minutesago");
  const date = new Date();
  datetimeComponents.forEach(component => {
    component.setAttribute("datetime", date);
    component.textContent = date;
  });
  minutesAgo.setAttribute('datetime', new Date(Date.now() - 600000).toString());
</script>
