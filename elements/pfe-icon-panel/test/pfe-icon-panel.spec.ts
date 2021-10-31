import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';

import { PfeIcon } from '@patternfly/pfe-icon';
import { PfeIconPanel } from '@patternfly/pfe-icon-panel';

describe('<pfe-icon-panel>', function() {
  let panel: PfeIconPanel;

  before(function() {
    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfeIcon.addIconSet('rh', '', function(name: string) {
      return `/elements/pfe-icon/test/${name.replace('rh', 'rh-icon')}.svg`;
    });
  });

  beforeEach(async function() {
    panel = await createFixture<PfeIconPanel>(html`
      <pfe-icon-panel id="panel" icon="pfe-icon-server">
        <h3 slot="header">This is pfe-icon-panel</h3>
        Lorem ipsum dolor sit amet.
        <pfe-cta slot="footer"><a href="#">Learn more</a></pfe-cta>
      </pfe-icon-panel>
    `);
  });

  it('should upgrade', function() {
    expect(panel, 'pfe-icon-panel should be an instance of PfeIconPanel')
      .to.be.an.instanceOf(customElements.get('pfe-icon-panel'))
      .and
      .to.be.an.instanceOf(PfeIconPanel);
  });

  it('should show an icon', async function() {
    const icon = panel.shadowRoot!.querySelector('pfe-icon')!;
    const image = icon.shadowRoot!.querySelector('svg image')!;
    setTimeout(() => icon.setAttribute('icon', 'rh-bike'));
    await oneEvent(image, 'load');
  });

  it('header, body, and footer are placed into correct slot', async function() {
    // header wound up in the header slot
    expect(panel.querySelector('[slot=header]')!.assignedSlot)
      .to.equal(panel.shadowRoot!
        .querySelector('.pfe-icon-panel__content .pfe-icon-panel__header'));

    const bodyText = panel.shadowRoot!
      .querySelector<HTMLSlotElement>('.pfe-icon-panel__content .pfe-icon-panel__body')!
      .assignedNodes()
      .map(n => n.textContent)
      .join('')
      .trim();

    expect(bodyText).to.equal('Lorem ipsum dolor sit amet.');

    // footer wound up in the footer slot
    expect(panel.querySelector('[slot=footer]')!.assignedSlot)
      .to.equal(panel.shadowRoot!
        .querySelector('.pfe-icon-panel__content .pfe-icon-panel__footer'));
  });
});
