{% renderOverview %}
  <pf-table></pf-table>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic

  Simple table using composable components

  {% htmlexample src="../demo/pf-table.html" %}{% endhtmlexample %}

  ### Sortable

  To make a table sortable, add the `sortable` attribute to `<pf-th>` elements
  in the table header (`<pf-thead>`). When the user clicks on a header, the 
  header element fires a `request-sort` event. If you are using a JavaScript 
  framework like Lit or React to manage your table's rows, call the event's 
  `preventDefault()` method so that the table element will not rearrange the
  DOM nodes, then re-render your rows based on the event's `direction` property,
  which is either `'asc'` or `'desc'`.

  {% htmlexample src="../demo/sortable.html" %}{% endhtmlexample %}

  ### Expandable rows

  To make a row expandable, add the `expandable` attribute to it, and slot
  content into the `expansion` slot.

  {% htmlexample src="../demo/expandable-rows.html" %}{% endhtmlexample %}

  ### Compound expandable rows
  To make a row expandable with sections assigned to certain cells, follow these
  three steps:
  1. add the `expandable="compound"` attribute to the row
  2. set the `compound-expand` attribute on each `<pf-td>` in the row to a
     string that's unique to that cell
  3. slot the content for each expandable `<pf-td>` into the row, into the slot
     name you specified in step 2.

  See the HTML code below for an example.

  {% htmlexample src="../demo/expandable-rows-compound.html" %}{% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
