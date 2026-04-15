import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html, render, type TemplateResult } from 'lit';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfV5Icon } from '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: don't want to include these
import aed from './rh-icon-aed.js';
// @ts-ignore: don't want to include these
import api from './rh-icon-api.js';
// @ts-ignore: don't want to include these
import atom from './rh-icon-atom.js';
// @ts-ignore: don't want to include these
import bike from './rh-icon-bike.js';

/* eslint-enable @typescript-eslint/ban-ts-comment */

const TEST_ICONS = { aed, api, atom, bike };

async function expectIconsEqual(element: PfV5Icon, tpl: TemplateResult) {
  await oneEvent(element, 'load');
  const rootNode = render(tpl, document.createDocumentFragment());
  const actual = element.shadowRoot?.querySelector('svg');
  const expected = (rootNode.parentNode as DocumentFragment).querySelector('svg');
  expect(actual?.outerHTML).to.equal(expected?.outerHTML);
}

describe('<pf-v5-icon>', function() {
  let element: PfV5Icon;

  beforeEach(async function() {
    element = await fixture(html`<pf-v5-icon></pf-v5-icon>`);
  });

  afterEach(function() {
    PfV5Icon.reset();
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-icon')).to.be.an.instanceof(PfV5Icon);
  });

  it('should upgrade', function() {
    expect(element, 'pf-v5-icon should be an instance of PfV5Icon')
        .to.be.an.instanceOf(customElements.get('pf-v5-icon'))
        .and
        .to.be.an.instanceOf(PfV5Icon);
  });

  describe('addIconSet', function() {
    describe('when 1st argument is not a string', function() {
      beforeEach(function() {
        PfV5Icon.addIconSet(
          // @ts-expect-error: testing bad input
          {},
          () => void 0,
        );
      });
      it('should warn', function() {
        expect(Logger.warn).to.have.been.calledOnceWith(`[PfV5Icon]: the first argument to addIconSet must be a string.`);
      });
    });

    describe('when 2nd argument is not a function', function() {
      beforeEach(function() {
        PfV5Icon.addIconSet(
          'rh',
          // @ts-expect-error: testing bad input
          'haha'
        );
      });
      it('should warn', function() {
        expect(Logger.warn).to.have.been.calledOnceWith(`[PfV5Icon]: the second argument to addIconSet must be a function.`);
      });
    });

    describe('with a good resolve function', function() {
      beforeEach(async function() {
        // replace the default built-in icon set resolveIconName function
        // with one that loads local icons.  we don't want tests dependent on
        // prod servers.
        PfV5Icon.addIconSet('rh', (_, icon: string) => TEST_ICONS[icon as keyof typeof TEST_ICONS]);
        element.set = 'rh';
      });

      for (const [iconName, icon] of Object.entries(TEST_ICONS)) {
        it('loads icons', async function() {
          // wait for each test icon to be loaded, then move to the next one
          element.icon = iconName;
          await expectIconsEqual(element, icon);
        });
      }

      it('should hide the fallback when it successfully upgrades', async function() {
        element.innerHTML = `<p>Icon failed to load.</p>`;
        element.icon = 'bike';
        await oneEvent(element, 'load');
        expect(element.shadowRoot?.querySelector('[part=fallback]'))
            .to.have.attribute('hidden');
      });

      it('should change color when pf-v5-icon\'s color CSS property is changed', async function() {
        const newColor = 'rgb(11, 12, 13)';
        element.style.setProperty('color', newColor);
        element.icon = 'atom';
        await oneEvent(element, 'load');
        const color = getComputedStyle(element.shadowRoot!.querySelector('svg')!).getPropertyValue('color');
        expect(color).to.equal(newColor);
      });
    });
  });

  describe('changing size attribute', function() {
    const sizes: PfV5Icon['size'][] = ['sm', 'md', 'lg', 'xl'];
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

  describe('when the icon has a custom set attribute', function() {
    let element: PfV5Icon;
    before(async function() {
      element = await fixture(html`<pf-v5-icon set="asdfasdf" icon="foo"></pf-v5-icon>`);
    });
    describe('then the icon set is registered', function() {
      beforeEach(async function() {
        PfV5Icon.addIconSet('asdfasdf', () =>
          import(`./rh-icon-${'bike'}.js`)
              .then(m => m.default));
        await oneEvent(element, 'load');
      });
      it(`should render the icon`, function() {
        expectIconsEqual(element, bike);
      });
    });
  });

  describe('when the icon has a fallback content', function() {
    let element: PfV5Icon;
    before(async function() {
      element = await fixture(html`
        <pf-v5-icon icon="no-scrubs">
          <p>Image failed to load.</p>.
        </pf-v5-icon>`);
      await oneEvent(element, 'error');
    });
    it('should display the fallback', function() {
      expect(element.shadowRoot!.querySelector('svg')).to.not.be.ok;
      expect(element).shadowDom.to.equal(`
        <div id="container" aria-hidden="true">
          <span part="fallback">
            <slot></slot>
          </span>
        </div>`);
    });
  });
});
