const { shadowRoot } = document.querySelector('[data-demo="pfe-select"]');

const select = shadowRoot.querySelector('#pfe-select-success');
shadowRoot.querySelector('#selectedOption').textContent = select.children[0].value;
select.addEventListener('pfe-select:change', function(event) {
  shadowRoot.querySelector('#selectedOption').textContent = event.detail.value;
});

const selectWithError = shadowRoot.querySelector('#pfe-select-error');
// setting invalid to true initially to reflect in the demo example
selectWithError.setAttribute('invalid', '');
selectWithError.addEventListener('pfe-select:change', function(event) {
  event.target.toggleAttribute('invalid', event.detail.value === '');
});

// won't destroy select, but will build if it doens't exist
const selectWithJSOptions = shadowRoot.querySelector('#pfe-select-with-js-options');
customElements.whenDefined('pfe-select').then(function() {
  // Default Options
  selectWithJSOptions.pfeOptions = [{
    text: 'Please select an option',
    value: '',
    selected: true,
  },
  {
    text: 'One',
    value: '1',
    selected: false,
  },
  {
    text: 'Two',
    value: '2',
    selected: false,
  },
  {
    text: 'Three',
    value: '3',
    selected: false,
  },
  ];
  // Options passed via addOptions() method
  selectWithJSOptions.addOptions([{
    text: 'Four',
    value: '4',
    selected: false,
  }]);
});

// will create select, and build options passed with pfeOptions
const selectWithJSOptionsOnly = shadowRoot.querySelector('#pfe-select-with-js-options-only');
customElements.whenDefined('pfe-select').then(function() {
  // Default Options
  selectWithJSOptionsOnly.pfeOptions = [{
    text: 'Please select an option',
    value: '',
    selected: true,
  },
  {
    text: 'One',
    value: '1',
    selected: false,
  },
  {
    text: 'Two',
    value: '2',
    selected: false,
  },
  {
    text: 'Three',
    value: '3',
    selected: false,
  },
  ];
});
