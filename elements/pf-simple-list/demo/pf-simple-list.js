import '@patternfly/elements/pf-simple-list/pf-simple-list.js';

/**
 * pf-simple-list in a combox box
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/|WAI ARIA Examples: Combobox with ARIAutocomplete}
 */
const input = document.querySelector('#text');
const listbox = document.querySelector('#listbox');
let filter = '';
if (listbox && input) {
  input.addEventListener('input', () => {
    if (input.value !== listbox.value && filter !== input.value) {
      listbox.filter = input.value;
    }
  });
  listbox.addEventListener('change', () => {
    const val = (listbox.value || '');
    if (val.length > 0 && input.value !== val) {
      filter = val.slice(0, input.value.length);
      input.value = val;
      input.focus();
      input.setSelectionRange(
        listbox.filter.length,
        val.length
      );
    }
  });
}
