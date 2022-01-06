{% renderOverview for=package, title=title %}
  <pfe-autocomplete id="static" debounce="300">
    <input placeholder="Enter your search term"/>
  </pfe-autocomplete>
{% endrenderOverview %}

{% band header="Usage" %}
  <pfe-autocomplete>
    <input placeholder="Enter your search term" />
  </pfe-autocomplete>

  ```html
  <pfe-autocomplete>
    <input placeholder="Enter your search term" />
  </pfe-autocomplete>
  ```

  ### aria-label
  This is an optional attribute string that you can provide on the input tag in the light DOM of pfe-autocomplete. The aria-label attribute will default to "Search".

  <pfe-autocomplete>
    <input placeholder="Search" aria-label="Buscar" />
  </pfe-autocomplete>

  ```html
  <pfe-autocomplete>
    <input placeholder="Search" aria-label="Buscar" />
  </pfe-autocomplete>
  ```
{% endband %}

{% band header="Setup" %}
  ### autocompleteRequest
  `autocompleteRequest` is a property that is assigned a function. When user types, component calls this function.

  It is called inside component but we define it outside component. First param is the typed phrase by user and second param is a callback function to send api response back to the component.

  In the function, we add loading attribute then send api call.  When result is ready, we remove loading attribute and  pass the result to web component by calling callback function. Here is an example:

  ```javascript
  // autocomplete call
  searchAutocomplete.autocompleteRequest = function (params, callback) {
    searchAutocomplete.loading = true;
    const url = new URL('http://openlibrary.org/search.json');
          url.searchParams.append('title', params.query);
    fetch(url.toString())
      .then(x => x.json())
      .then(({ docs }) => docs.map(x => x.title))
      .then(callback)
      .then(() => searchAutocomplete.loading = false);
  };
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderEvents for='pfe-search-droplist', heading='Events on `pfe-search-droplist`' %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}

<script>
  const staticAutocomplete = document.querySelector("#static");
  const items = [
    "Item 1",
    "Item 2",
    "United States",
    "Chicago Cubs",
    "Red Hat",
    "Purple",
    "Curious George",
    "United Kingdom",
    "Elephant",
    "Baseball",
    "Bingo",
    "Book",
    "Android",
    "iOS",
    "Linux",
    "Red Hat Enterprise Linux"
  ];

  staticAutocomplete.autocompleteRequest = function(params, callback) {
    const regx = new RegExp("\^" + params.query, "i");
    callback(items.filter(function (item) {
      return regx.test(item);
    }));
  };
</script>
