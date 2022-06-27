import { expect, html, oneEvent } from '@open-wc/testing';
import { spy } from 'sinon';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeButton } from '@patternfly/pfe-button';

// reference the imported value in runtime code so that typescript doesn't strip the import
PfeButton;

const element = html`
  <pfe-button>
    <button>Button</button>
  </pfe-button>
`;

const badElement = html`
  <pfe-button>
    <div>Bad button</div>
  </pfe-button>
`;

describe('<pfe-button>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(element);
    expect(el, 'pfe-button should be an instance of PfeButton')
      .to.be.an.instanceOf(customElements.get('pfe-button'))
      .and
      .to.be.an.instanceOf(PfeButton);
  });

  it('should log a console warning if the light dom inside pfe-button is not a button', async function() {
    const spyConsole = spy(console, 'warn');
    const el = await createFixture(badElement);

    expect(el).to.exist;
    expect(spyConsole, 'The only child in the light DOM must be a button tag')
      .to.have.been.calledWith('[pfe-button]');
    spyConsole.restore();
  });

  it('should synchronize disabled attribute to the light DOM button', async function() {
    const el = await createFixture<PfeButton>(element);
    const lightDomBtn = el.querySelector('button')!;

    el.disabled = true;
    await el.updateComplete;

    expect(lightDomBtn).dom.to.equal('<button disabled tabindex="-1">Button</button>');

    el.disabled = false;
    await el.updateComplete;

    expect(lightDomBtn).dom.to.equal('<button>Button</button>');
  });

  it('should synchronize type attribute to the light DOM button', async function() {
    const el = await createFixture<PfeButton>(element);
    const lightDomBtn = el.querySelector('button')!;

    el.type = 'reset';
    await el.updateComplete;

    expect(el.type).to.equal('reset');
    expect(lightDomBtn).dom.to.equal('<button type="reset">Button</button>');

    el.type = undefined;
    await el.updateComplete;

    expect(lightDomBtn).dom.to.equal('<button>Button</button>');
  });

  it('should send a pfe-button:click event on click', async function() {
    const el = await createFixture<PfeButton>(element);
    setTimeout(() => el.querySelector('button')!.click());
    const event = await oneEvent(document, 'pfe-button:click');
    expect(event).to.be.ok;
    expect(event.type).to.equal('pfe-button:click');
  });
});
