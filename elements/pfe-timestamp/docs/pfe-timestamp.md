{% renderOverview %}
  A timestamp provides consistent formats for displaying date and time values.

  Default: <pfe-timestamp></pfe-timestamp>

  With a locale of es: <pfe-timestamp time-format="medium" date-format="long" locale="es"></pfe-timestamp>
  
  Relative time: <pfe-timestamp relative></pfe-timestamp>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  By default, a timestamp will display the current date and time based on the current locale if the date attribute is not set.
  
  <pfe-timestamp></pfe-timestamp>
  ```html
  <pfe-timestamp></pfe-timestamp>
  ```

  ### Basic formats
  The format of the displayed content can be customized by setting the `date-format` and/or `time-format` attributes. Setting only one of the attributes will display only the date or time, depending on which attribute is set. The possible options are "full", "long", "medium", and "short".

  You can also set the `display-suffix` attribute to display a custom suffix at the end of the displayed content. This will not override a timezone that is already displayed from the applied time format.

  <pfe-timestamp date-format="full" time-format="full"></pfe-timestamp>
  ```html
  <pfe-timestamp date-format="full" time-format="full"></pfe-timestamp>
  ```

  <pfe-timestamp date-format="full"></pfe-timestamp>
  ```html
  <pfe-timestamp date-format="full"></pfe-timestamp>
  ```

  <pfe-timestamp time-format="full"></pfe-timestamp>
  ```html
  <pfe-timestamp time-format="full"></pfe-timestamp>
  ```

  <pfe-timestamp date-format="medium" time-format="short" display-suffix="US Eastern"></pfe-timestamp>
  ```html
  <pfe-timestamp
    date-format="medium"
    time-format="short"
    display-suffix="US Eastern">
  </pfe-timestamp>
  ```

  ### Custom format
  The format of the displayed content can be further customized by setting the custom-format attributes. Read [datetime format options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) for a list of options that can be set.

  <pfe-timestamp id="timestamp-custom-format" date="Sat Jan 01 2022 00:00:00 GMT-0500"></pfe-timestamp>
  <script>
  document.getElementById('timestamp-custom-format').customFormat = {
    year: '2-digit',
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    hour: 'numeric'
  };
  </script>
  ```html
  <pfe-timestamp id="timestamp-custom-format" date="Sat Jan 01 2022 00:00:00 GMT-0500"></pfe-timestamp>
  <script>
  document.getElementById('timestamp-custom-format').customFormat = {
    year: '2-digit',
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    hour: 'numeric'
  };
  </script>
  ```

  ### Adding a tooltip
  To add a tooltip that displays the timestamp content as a UTC time, you can wrap `pfe-timestamp` with `pfe-tooltip` and set the `utc` attribute on an additional `pfe-timestamp`.

  <pfe-tooltip>
    <pfe-timestamp></pfe-timestamp>
    <pfe-timestamp slot="content" utc></pfe-timestamp>
  </pfe-tooltip>

  ```html
  <pfe-tooltip>
    <pfe-timestamp></pfe-timestamp>
    <pfe-timestamp slot="content" utc></pfe-timestamp>
  </pfe-tooltip>
  ```

  <pfe-tooltip>
    <pfe-timestamp></pfe-timestamp>
    <pfe-timestamp slot="content" utc display-suffix="Coordinated Universal Time"></pfe-timestamp>
  </pfe-tooltip>

  ```html
  <pfe-tooltip>
    <pfe-timestamp></pfe-timestamp>
    <pfe-timestamp slot="content" utc display-suffix="Coordinated Universal Time"></pfe-timestamp>
  </pfe-tooltip>
  ```

  ### Relative time
  To display relative time, set the `relative` attribute on `pfe-timestamp`.

  <pfe-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>

  ```html
  <pfe-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
  ```

  <pfe-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>

  ```html
  <pfe-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
  ```

  ### Relative time with a tooltip
  To display relative time, set the `relative` attribute on `pfe-timestamp`.

  <pfe-tooltip>
    <pfe-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
    <pfe-timestamp slot="content" date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"></pfe-timestamp>
  </pfe-tooltip>

  ```html
  <pfe-tooltip>
    <pfe-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
    <pfe-timestamp slot="content" date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"></pfe-timestamp>
  </pfe-tooltip>
  ```

  <pfe-tooltip>
    <pfe-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
    <pfe-timestamp slot="content" date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)"></pfe-timestamp>
  </pfe-tooltip>

  ```html
  <pfe-tooltip>
    <pfe-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pfe-timestamp>
    <pfe-timestamp slot="content" date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)"></pfe-timestamp>
  </pfe-tooltip>
  ```

  ### Set a locale to something other than the default locale
  The default locale is inferred by the browser. To set the locale to something else, set the `locale` attribute.
  
  <pfe-timestamp locale="en-GB" date-format="full" time-format="full"></pfe-timestamp>

  ```html
  <pfe-timestamp locale="en-GB" date-format="full" time-format="full"></pfe-timestamp>
  ```

  <pfe-timestamp locale="es" date-format="full" time-format="full"></pfe-timestamp>

  ```html
  <pfe-timestamp locale="es" date-format="full" time-format="full"></pfe-timestamp>
  ```

  ### As a UTC timestamp
  Set the `utc` attribute.
  
  <pfe-timestamp utc></pfe-timestamp>

  ```html
  <pfe-timestamp utc></pfe-timestamp>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
