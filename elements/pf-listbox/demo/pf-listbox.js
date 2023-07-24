import '@patternfly/elements/pf-listbox/pf-listbox.js';

/**
 * pf-listbox in a combox box
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/|WAI ARIA Examples: Combobox with ARIAutocomplete}
 */
const input = document.querySelector('#text');
const listbox = document.querySelector('#listbox');
if (listbox && input) {
  listbox.filter = input.value;
  input.addEventListener('input', () => {
    if (input.value !== listbox.value) {
      listbox.filter = input.value;
    }
  });
  listbox.addEventListener('change', () => {
    const val = (listbox.value || '');
    if (val.length > 0) {
      input.value = val;
      input.focus();
      input.setSelectionRange(
        listbox.filter.length,
        val.length
      );
    }
  });
}
