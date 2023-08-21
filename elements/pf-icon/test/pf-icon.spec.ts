import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html, render } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pf-icon>', function() {
  let element: PfIcon;

  async function expectIconsEqual(actualIconUrl: URL) {
    await oneEvent(element, 'load');
    const tpl = await import(actualIconUrl.pathname).then(x => x.default);
    const rootNode = render(tpl, document.createDocumentFragment());
    const actual = element.shadowRoot?.querySelector('svg');
    const expected = (rootNode.parentNode as DocumentFragment).querySelector('svg');
    expect(actual?.outerHTML).to.equal(expected?.outerHTML);
  }

  beforeEach(async function() {
    // @ts-expect-error: this is necessary to reset test state
    PfIcon.getters = new Map(); PfIcon.io.disconnect();
    element = await fixture(html`<pf-icon></pf-icon>`);
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-icon')).to.be.an.instanceof(PfIcon);
  });

  it('should upgrade', function() {
    expect(element, 'pf-icon should be an instance of PfIcon')
      .to.be.an.instanceOf(customElements.get('pf-icon'))
      .and
      .to.be.an.instanceOf(PfIcon);
  });

  it('should warn if the 2nd argument to addIconSet is not a function', function() {
    // @ts-expect-error: 3rd input is a string
    PfIcon.addIconSet('test', './', 'rh-icon-aed.svg');
    expect(Logger.warn).to.have.been.calledOnceWith(`[PfIcon.addIconSet(setName, getter)]: getter must be a function`);
  });

  it('should warn if there is no function provided to resolve the icon names', function() {
    // @ts-expect-error: testing bad input
    PfIcon.addIconSet('test', './');

    expect(Logger.warn).to.have.been.calledOnceWith('[PfIcon.addIconSet(setName, getter)]: getter must be a function');
  });

  describe('with a custom icon set', function() {
    const testIcons = ['aed', 'api', 'atom', 'bike'];

    function getter(_: string, icon: string) {
      return new URL(`./rh-icon-${icon}.js`, import.meta.url);
    }

    beforeEach(async function() {
      // replace the default built-in icon set resolveIconName function
      // with one that loads local icons.  we don't want tests dependent on
      // prod servers.
      PfIcon.addIconSet('rh', getter);
      element.set = 'rh';
    });

    for (const iconName of testIcons) {
      it('loads icons', async function() {
        // wait for each test icon to be loaded, then move to the next one
        element.icon = iconName;
        await expectIconsEqual(getter('rh', iconName));
      });
    }

    it('should hide the fallback when it successfully upgrades', async function() {
      element.innerHTML = `<p>Icon failed to load.</p>`;
      // Check that the fallback is hidden when the icon is successfully loaded
      element.icon = 'bike';
      await oneEvent(element, 'load');
      expect(element).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback" hidden>
          <slot></slot>
        </span>
      </div>`);
    });

    it('should change color when pf-icon\'s color CSS property is changed', async function() {
      const newColor = 'rgb(11, 12, 13)';
      element.style.setProperty('color', newColor);
      element.icon = 'atom';
      await oneEvent(element, 'load');
      const color = getComputedStyle(element.shadowRoot!.querySelector('svg')!).getPropertyValue('color');
      expect(color).to.equal(newColor);
    });
  });

  describe('changing size attribute', function() {
    const sizes: PfIcon['size'][] = ['sm', 'md', 'lg', 'xl'];
    let lastSize = { width: 0, height: 0 };

    for (const size of sizes) {
      it('should change size based on the attribute value', async function() {
        element.size = size;
        await element.updateComplete;
        const { width, height } = element.getBoundingClientRect();
        expect(width, `size "${size}" should be wider than the size below`).to.be.greaterThan(lastSize.width);
        expect(height, `size "${size}" should be taller than the size below`).to.be.greaterThan(lastSize.height);
        lastSize = { width, height };
      });
    }
  });

  it(`should fetch an icon even when the icon set is registered after the element upgrades`, async function() {
    const url = new URL('./rh-icon-bike.js', import.meta.url);
    element.set = 'asdfasdf';
    element.icon = 'foo';
    await element.updateComplete;
    PfIcon.addIconSet('asdfasdf', () => url);
    await oneEvent(element, 'load');
    await expectIconsEqual(url);
  });

  it(`should show fallback when given a valid icon set but invalid icon name, fallback provided`, async function() {
    element.innerHTML = '<p>Image failed to load.</p>.';
    element.icon = 'no-scrubs';
    await oneEvent(element, 'error');
    expect(element.shadowRoot!.querySelector('svg')).to.not.be.ok;
    expect(element).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback">
          <slot></slot>
        </span>
      </div>`);
  });

  it('should show fallback when given an invalid icon set, fallback provided', async function() {
    element.innerHTML = '<p>Image failed to load.</p>.';
    element.set = 'choopee-doopee-pie';
    element.icon = 'bike';
    await oneEvent(element, 'error');
    expect(element.shadowRoot!.querySelector('svg')).to.not.be.ok;
    expect(element).shadowDom.to.equal(`
      <div id="container" aria-hidden="true">
        <span part="fallback">
          <slot></slot>
        </span>
      </div>`);
  });
});
