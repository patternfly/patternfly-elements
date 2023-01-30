import { html, expect, oneEvent, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfAvatar } from '@patternfly/elements/pf-avatar/pf-avatar.js';

describe('<pf-avatar>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-avatar name="foobar"></pf-avatar>`);
    expect(el, 'pf-badge should be an instance of PfAvatar')
      .to.be.an.instanceOf(customElements.get('pf-avatar'))
      .and
      .to.be.an.instanceOf(PfAvatar);
  });

  describe('without src attr', function() {
    let element: PfAvatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-avatar name="foobar"></pf-avatar>`);
      await nextFrame();
    });
    it('loads default avatar', function() {
      const { offsetWidth } = element;
      expect(offsetWidth).to.be.greaterThan(0);
    });
  });

  describe('with a src attr', function() {
    let element: PfAvatar;
    let loaded = false;
    const datauri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB0UlEQVR4Xu3UAQ0AAAyDsM+/6QspcwAh2zXawGj64K8A8AgKoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7gALADeD4PUAB4AZw/B6gAHADOH4PUAC4ARy/BygA3ACO3wMUAG4Ax+8BCgA3gOP3AAWAG8Dxe4ACwA3g+D1AAeAGcPweoABwAzh+D1AAuAEcvwcoANwAjt8DFABuAMfvAQoAN4Dj9wAFgBvA8XuAAsAN4Pg9QAHgBnD8HqAAcAM4fg9QALgBHL8HKADcAI7fAxQAbgDH7wEKADeA4/cABYAbwPF7ADyAB6SPAIFm19U7AAAAAElFTkSuQmCC';
    const onLoad = e => loaded = e.originalEvent.composedPath().find(x => x.localName === 'img')?.src;
    beforeEach(async function() {
      element = await createFixture(html`<pf-avatar name="foobar" @load="${onLoad}"></pf-avatar>`);
      setTimeout(() => element.src = datauri);
      await oneEvent(element, 'load');
    });
    it('loads the image', function() {
      expect(loaded).to.equal(datauri);
    });
  });
});
