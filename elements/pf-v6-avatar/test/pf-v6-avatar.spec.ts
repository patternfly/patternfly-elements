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
  });

  describe('with a src attr', function() {
    let element: PfV6Avatar;
    let loaded: string | undefined;
    const datauri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB0UlEQVR4Xu3UAQ0AAAyDsM+/6QspcwAh2zXawGj64K8A8AgKoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7ADyAB6SPAIFm19U7AAAAAElFTkSuQmCC';
    const onLoad = (e: PfV6AvatarLoadEvent) => {
      const paths = e.originalEvent.composedPath() as HTMLImageElement[];
      loaded = paths.find(x => x.localName === 'img')?.src;
    };
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar @load="${onLoad}"></pf-v6-avatar>`);
      setTimeout(() => element.src = datauri);
      await oneEvent(element, 'load');
    });

    it('loads the image', function() {
      expect(loaded).to.equal(datauri);
    });

    it('fires a PfV6AvatarLoadEvent', function() {
      expect(loaded).to.be.ok;
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

  describe('with bordered', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar bordered></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders with a visible border', function() {
      // The element should still render with a size larger than 0
      expect(element.offsetWidth).to.be.greaterThan(0);
    });
  });
});
