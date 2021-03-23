import { html } from '@open-wc/testing';

import '../dist/pfe-select';

export default html`
    <pfe-select id="pfe-select-with-error">
      <select id="example2">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
    </pfe-select>
`;