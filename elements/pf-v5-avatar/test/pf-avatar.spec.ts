import { html, expect, oneEvent, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Avatar, PfV5AvatarLoadEvent } from '@patternfly/elements/pf-v5-avatar/pf-v5-avatar.js';

describe('<pf-v5-avatar>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-avatar')).to.be.an.instanceof(PfV5Avatar);
  });

  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-v5-avatar></pf-v5-avatar>`);
    expect(el, 'pf-v5-badge should be an instance of PfV5Avatar')
        .to.be.an.instanceOf(customElements.get('pf-v5-avatar'))
        .and
        .to.be.an.instanceOf(PfV5Avatar);
  });

  describe('without src attr', function() {
    let element: PfV5Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v5-avatar></pf-v5-avatar>`);
      await nextFrame();
    });
    it('loads default avatar', function() {
      const { offsetWidth } = element;
      expect(offsetWidth).to.be.greaterThan(0);
    });
  });

  describe('with a src attr', function() {
    let element: PfV5Avatar;
    let loaded: string | undefined;
    const datauri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB0UlEQVR4Xu3UAQ0AAAyDsM+/6QspcwAh2zXawGj64K8A8AgKoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7ADyAB6SPAIFm19U7AAAAAElFTkSuQmCC';
    const onLoad = (e: PfV5AvatarLoadEvent) => {
      const paths = e.originalEvent.composedPath() as HTMLImageElement[];
      loaded = paths.find(x => x.localName === 'img')?.src;
    };
    beforeEach(async function() {
      element = await createFixture(html`<pf-v5-avatar @load="${onLoad}"></pf-v5-avatar>`);
      setTimeout(() => element.src = datauri);
      await oneEvent(element, 'load');
    });
    it('loads the image', function() {
      expect(loaded).to.equal(datauri);
    });
  });
});
