import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { <%= className %> } from '<%= importSpecifier %>';

describe('<<%= tagName %>>', function() {
  describe('simply instantiating', function() {
    let element: <%= className %>;
    it('should upgrade', async function() {
      element = await createFixture<<%= className %>>(html`<<%= tagName %>></<%= tagName %>>`);
      const klass = customElements.get('<%= tagName %>');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(<%= className %>);
    });
  })
});
