import '@patternfly/pfe-autocomplete';
import '@patternfly/pfe-select';

const root = document.querySelector('[data-demo="pfe-autocomplete"]')?.shadowRoot ?? document;

const searchAutocomplete = root.querySelector('#search-lazy-loading');

const items = [
  'Item 1',
  'Item 2',
  'United States',
  'Chicago Cubs',
  'Red Hat',
  'Purple',
  'Curious George',
  'United Kingdom',
  'Elephant',
  'Baseball',
  'Bingo',
  'Book',
  'Android',
  'iOS',
  'Linux',
  'Red Hat Enterprise Linux',
];

function staticCallback(params, callback) {
  const regx = new RegExp(`^${params.query}`, 'i');
  callback(items.filter(x => regx.test(x)));
}

function ajaxCallback(params, callback) {
  searchAutocomplete.loading = true;
  const url = new URL('http://openlibrary.org/search.json');
  url.searchParams.append('title', params.query);
  fetch(url.toString())
    .then(x => x.json())
    .then(({ docs }) => docs.map(x => x.title))
    .then(callback)
    .then(() => searchAutocomplete.loading = false);
}

function onSearch(event) {
  const output = event.target.closest('section').querySelector('output');
  if (output) {
    output.textContent = event.value;
  }
}

for (const element of root.querySelectorAll('pfe-autocomplete')) {
  element.addEventListener('search', onSearch);
}

for (const element of root.querySelectorAll('.static')) {
  element.autocompleteRequest = staticCallback;
}

// autocomplete call
searchAutocomplete.autocompleteRequest = ajaxCallback;
