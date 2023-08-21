{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  A timestamp provides consistent formats for displaying date and time values.

  Default: <pf-timestamp></pf-timestamp>

  With a locale of es: <pf-timestamp time-format="medium" date-format="long" locale="es"></pf-timestamp>

  Relative time: <pf-timestamp relative></pf-timestamp>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  By default, a timestamp will display the current date and time based on the current locale if the date attribute is not set.

  {% htmlexample %}
  <pf-timestamp></pf-timestamp>
  {% endhtmlexample %}

  ### Basic formats
  The format of the displayed content can be customized by setting the `date-format` and/or `time-format` attributes. Setting only one of the attributes will display only the date or time, depending on which attribute is set. The possible options are "full", "long", "medium", and "short".

  You can also set the `display-suffix` attribute to display a custom suffix at the end of the displayed content. This will not override a timezone that is already displayed from the applied time format.

  {% htmlexample %}
  <pf-timestamp date-format="full" time-format="full"></pf-timestamp>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-timestamp date-format="full"></pf-timestamp>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-timestamp time-format="full"></pf-timestamp>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-timestamp
    date-format="medium"
    time-format="short"
    display-suffix="US Eastern">
  </pf-timestamp>
  {% endhtmlexample %}

  ### Custom format
  The format of the displayed content can be further customized by setting the custom-format attributes. Read [datetime format options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) for a list of options that can be set.

  {% htmlexample %}
  <pf-timestamp id="timestamp-custom-format"
                date="Sat Jan 01 2022 00:00:00 GMT-0500"></pf-timestamp>
  <script>
    document.getElementById('timestamp-custom-format').customFormat = {
      year: '2-digit',
      month: 'short',
      weekday: 'short',
      day: 'numeric',
      hour: 'numeric'
    };
  </script>
  {% endhtmlexample %}

  ### Adding a tooltip
  To add a tooltip that displays the timestamp content as a UTC time, you can wrap `pf-timestamp` with `pf-tooltip` and set the `utc` attribute on an additional `pf-timestamp`.

  {% htmlexample %}
  <pf-tooltip>
    <pf-timestamp></pf-timestamp>
    <pf-timestamp slot="content" utc></pf-timestamp>
  </pf-tooltip>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-tooltip>
    <pf-timestamp></pf-timestamp>
    <pf-timestamp slot="content" utc display-suffix="Coordinated Universal Time"></pf-timestamp>
  </pf-tooltip>
  {% endhtmlexample %}

  ### Relative time
  To display relative time, set the `relative` attribute on `pf-timestamp`.

  {% htmlexample %}
  <pf-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pf-timestamp>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pf-timestamp>
  {% endhtmlexample %}

  ### Relative time with a tooltip
  To display relative time, set the `relative` attribute on `pf-timestamp`.

  {% htmlexample %}
  <pf-tooltip>
    <pf-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pf-timestamp>
    <pf-timestamp slot="content" date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"></pf-timestamp>
  </pf-tooltip>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-tooltip>
    <pf-timestamp date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)" relative></pf-timestamp>
    <pf-timestamp slot="content" date="Aug 09 2024 14:57:00 GMT-0400 (Eastern Daylight Time)"></pf-timestamp>
  </pf-tooltip>
  {% endhtmlexample %}

  ### Set a locale to something other than the default locale
  The default locale is inferred by the browser. To set the locale to something else, set the `locale` attribute.

  {% htmlexample %}
  <pf-timestamp locale="en-GB" date-format="full" time-format="full"></pf-timestamp>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-timestamp locale="es" date-format="full" time-format="full"></pf-timestamp>
  {% endhtmlexample %}

  ### As a UTC timestamp
  Set the `utc` attribute.

  {% htmlexample %}
  <pf-timestamp utc></pf-timestamp>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
