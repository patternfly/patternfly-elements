# PatternFly Elements Autocomplete

`<pfe-autocomplete>` is a Web Component that provides options in a dropdown list as user types in an input box by showing result from an api call.
     
Read more about Autocomplete in the [PatternFly Elements Autocomplete documentation](https://patternflyelements.org/components/autocomplete)

##  Installation

Load `<pfe-autocomplete>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-autocomplete?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-autocomplete
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-autocomplete';
```

## Usage

```html
<pfe-autocomplete debounce="500" init-value="uni">
  <input placeholder="Enter Your Search Term" />
</pfe-autocomplete>
```

```js
const autocomplete = document.querySelector('autocomplete');
autocomplete.autocompleteRequest = function (params, callback) {
  autocomplete.loading = true;
  const url = new URL('http://openlibrary.org/search.json');
        url.searchParams.append('title', params.query);
  fetch(url.toString())
    .then(x => x.json())
    .then(({ docs }) => docs.map(x => x.title))
    .then(callback)
    .then(() => autocomplete.loading = false);
};
```


