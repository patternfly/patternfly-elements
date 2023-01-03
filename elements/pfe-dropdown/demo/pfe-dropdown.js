import '@patternfly/pfe-card';
import '@patternfly/pfe-dropdown';

const root = document.querySelector('[data-demo="pfe-dropdown"')?.shadowRoot ?? document;
const dropdown = root.querySelector('pfe-dropdown');

root.querySelector('#example-dropdown-1').style.display = 'none';

dropdown.addEventListener('pfe-dropdown:change', function(event) {
  root.querySelector('#example-action-1').textContent =
    event.detail.action;
  root.querySelector('#example-dropdown-1').style.display = 'block';
});

const dropdownWithCustomOptions = root.querySelector('#dropdown-with-custom-options');

customElements.whenDefined('pfe-dropdown').then(function() {
  // Default Options
  dropdownWithCustomOptions.options = [{
    href: 'https://bit.ly/3b9wvWg',
    text: 'Link 1',
    type: 'link',
    disabled: false
  },
  {
    href: 'https://bit.ly/3b9wvWg',
    text: 'Link 2',
    type: 'link',
    disabled: false
  },
  {
    href: 'https://bit.ly/3b9wvWg',
    text: 'Link 3',
    type: 'link',
    disabled: true
  },
  {
    type: 'separator'
  },
  {
    text: 'Action 1',
    type: 'action',
    disabled: false
  },
  {
    text: 'Action 2',
    type: 'action',
    disabled: true
  }
  ];
  // Options passed via addDropdownOptions() method
  dropdownWithCustomOptions.addDropdownOptions(
    [{
      href: 'https://bit.ly/3b9wvWg',
      text: 'Link 4',
      type: 'link',
      disabled: false
    }]
  );
});

root.querySelector('#example-dropdown-2').style.display = 'none';

dropdownWithCustomOptions.addEventListener('pfe-dropdown:change', function(event) {
  root.querySelector('#example-action-2').textContent =
    event.detail.action;
  root.querySelector('#example-dropdown-2').style.display = 'block';
});
