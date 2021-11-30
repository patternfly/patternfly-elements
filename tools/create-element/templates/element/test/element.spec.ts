import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { <%= className %> } from '<%= scope %><%= tagName %>';

const element = html`
  <<%= tagName %>></<%= tagName %>>
`;

describe('<<%= tagName %>>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<<%= className %>>(element);
    const klass = customElements.get('<%= tagName %>');
    expect(el)
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(<%= className %>);
  });
});
