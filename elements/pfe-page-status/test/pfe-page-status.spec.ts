import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb, getColor } from '@patternfly/pfe-tools/test/hex-to-rgb.js';

import { PfePageStatus } from '@patternfly/pfe-page-status';

const statuses = {
  default: '#4f5255',
  moderate: '#f0ab00',
  warning: '#f0ab00',
  important: '#c9190b',
  critical: '#a30000',
  success: '#3e8635',
  info: '#0066cc',
  normal: '#0066cc',
  accent: '#0066cc',
  complement: '#4f5255',
};

const TEMPLATE = html`
  <pfe-page-status>
    This is the element content.
  </pfe-page-status>
`;

describe('<pfe-page-status>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfePageStatus>(html`<pfe-page-status></pfe-page-status>`);
    expect(element, 'pfe-page-status should be an instance of PfePageStatus')
      .to.be.an.instanceOf(customElements.get('pfe-page-status'))
      .and
      .to.be.an.instanceOf(PfePageStatus);
  });


  // Iterate over the colors object to test expected background color results
  Object.entries(statuses).forEach(([status, color]) => {
    it(`should have a background color of ${color} when pfe-status is ${status}`, async function() {
      const element = await createFixture<PfePageStatus>(TEMPLATE);

      // If this is not the default color, update the variable
      if (status !== 'default') {
        // Update the color attribute
        element.setAttribute('status', status);
        await element.updateComplete;
      }

      // Test that the color is rendering as expected
      expect(getColor(element, 'background-color')).to.deep.equal(hexToRgb(color));
    });
  });
});
