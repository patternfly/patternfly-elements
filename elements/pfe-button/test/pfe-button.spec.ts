import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeButton } from '@patternfly/pfe-button';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pfe-button>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(html`<pfe-button>Button</pfe-button>`);
    expect(el, 'pfe-button should be an instance of PfeButton')
      .to.be.an.instanceOf(customElements.get('pfe-button'))
      .and
      .to.be.an.instanceOf(PfeButton);
  });
});
