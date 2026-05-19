import { html, expect, oneEvent, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6Avatar, PfV6AvatarLoadEvent } from '@patternfly/elements/pf-v6-avatar/pf-v6-avatar.js';

describe('<pf-v6-avatar>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-avatar')).to.be.an.instanceof(PfV6Avatar);
  });

  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-v6-avatar></pf-v6-avatar>`);
    expect(el, 'pf-v6-avatar should be an instance of PfV6Avatar')
        .to.be.an.instanceOf(customElements.get('pf-v6-avatar'))
        .and
        .to.be.an.instanceOf(PfV6Avatar);
  });

  describe('without src attr', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar></pf-v6-avatar>`);
      await nextFrame();
    });

    it('displays a placeholder', function() {
      const { offsetWidth } = element;
      expect(offsetWidth).to.be.greaterThan(0);
    });

    it('has the default size', function() {
      expect(element.offsetWidth).to.equal(36);
      expect(element.offsetHeight).to.equal(36);
    });

    it('hides the placeholder from the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot?.children?.find(
        (child: { role: string }) => child.role === 'img'
      )).to.not.be.ok;
    });
  });

  describe('with a src attr', function() {
    let element: PfV6Avatar;
    let loadEvent: Event | undefined;
    const datauri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB0UlEQVR4Xu3UAQ0AAAyDsM+/6QspcwAh2zXawGj64K8A8AgKoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7ADyAB6SPAIFm19U7AAAAAElFTkSuQmCC';
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar></pf-v6-avatar>`);
      element.addEventListener('load', function(e) {
        loadEvent = e;
      });
      setTimeout(() => element.src = datauri);
      await oneEvent(element, 'load');
    });

    it('should fire a PfV6AvatarLoadEvent', function() {
      expect(loadEvent).to.be.an.instanceOf(PfV6AvatarLoadEvent);
    });

    it('should include the original event', function() {
      expect(loadEvent).to.have.property('originalEvent')
          .that.is.an.instanceOf(Event);
    });
  });

  describe('with alt attr', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`
        <pf-v6-avatar alt="User avatar"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="></pf-v6-avatar>
      `);
      await oneEvent(element, 'load');
    });

    it('passes alt text to the image', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot?.children?.find(
        (child: { name: string }) => child.name === 'User avatar'
      )).to.be.ok;
    });
  });

  describe('with size="md"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="md"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the medium size', function() {
      expect(element.offsetWidth).to.equal(36);
      expect(element.offsetHeight).to.equal(36);
    });
  });

  describe('with size="sm"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="sm"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the small size', function() {
      expect(element.offsetWidth).to.equal(24);
      expect(element.offsetHeight).to.equal(24);
    });
  });

  describe('with size="lg"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="lg"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the large size', function() {
      expect(element.offsetWidth).to.equal(72);
      expect(element.offsetHeight).to.equal(72);
    });
  });

  describe('with size="xl"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="xl"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the extra large size', function() {
      expect(element.offsetWidth).to.equal(128);
      expect(element.offsetHeight).to.equal(128);
    });
  });
});
