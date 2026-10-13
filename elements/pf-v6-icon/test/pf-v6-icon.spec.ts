import { expect, oneEvent } from '@open-wc/testing';
import { html, render, type TemplateResult } from 'lit';

import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfV6Icon } from '@patternfly/elements/pf-v6-icon/pf-v6-icon.js';
import '@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js';

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

async function expectIconsEqual(element: PfV6Icon, tpl: TemplateResult) {
  await oneEvent(element, 'load');
  const rootNode = render(tpl, document.createDocumentFragment());
  const actual = element.shadowRoot?.querySelector('svg');
  const expected = (rootNode.parentNode as DocumentFragment).querySelector('svg');
  expect(actual?.outerHTML).to.equal(expected?.outerHTML);
}

describe('<pf-v6-icon>', function() {
  afterEach(function() {
    PfV6Icon.reset();
  });

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-icon')).to.be.an.instanceof(PfV6Icon);
  });

  it('should upgrade', async function() {
    const element = await createFixture<PfV6Icon>(html`<pf-v6-icon></pf-v6-icon>`);
    expect(element, 'pf-v6-icon should be an instance of PfV6Icon')
        .to.be.an.instanceOf(customElements.get('pf-v6-icon'))
        .and
        .to.be.an.instanceOf(PfV6Icon);
  });

  describe('addIconSet', function() {
    describe('when 1st argument is not a string', function() {
      beforeEach(function() {
        PfV6Icon.addIconSet(
          // @ts-expect-error: testing bad input
          {},
          () => void 0,
        );
      });
      it('should warn', function() {
        expect(Logger.warn).to.have.been.calledOnceWith(`[PfV6Icon]: the first argument to addIconSet must be a string.`);
      });
    });

    describe('when 2nd argument is not a function', function() {
      beforeEach(function() {
        PfV6Icon.addIconSet(
          'rh',
          // @ts-expect-error: testing bad input
          'haha'
        );
      });
      it('should warn', function() {
        expect(Logger.warn).to.have.been.calledOnceWith(`[PfV6Icon]: the second argument to addIconSet must be a function.`);
      });
    });

    describe('with a good resolve function', function() {
      let element: PfV6Icon;
      beforeEach(async function() {
        // replace the default built-in icon set resolveIconName function
        // with one that loads local icons.  we don't want tests dependent on
        // prod servers.
        PfV6Icon.addIconSet('rh', (_, icon: string) => TEST_ICONS[icon as keyof typeof TEST_ICONS]);
        element = await createFixture<PfV6Icon>(html`<pf-v6-icon set="rh"></pf-v6-icon>`);
      });

      for (const [iconName, icon] of Object.entries(TEST_ICONS)) {
        it('loads icons', async function() {
          element.icon = iconName;
          await expectIconsEqual(element, icon);
        });
      }

      it('should hide the fallback when it successfully upgrades', async function() {
        element.innerHTML = `<p>Icon failed to load.</p>`;
        element.icon = 'bike';
        await oneEvent(element, 'load');
        const snapshot = await a11ySnapshot();
        expect(snapshot.children).to.not.exist;
      });

      it('is accessible', async function() {
        element.icon = 'atom';
        await oneEvent(element, 'load');
        await expect(element).to.be.accessible();
      });
    });
  });

  describe('default state', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`<pf-v6-icon></pf-v6-icon>`);
    });

    it('does not sprout a size attribute by default', function() {
      expect(element.hasAttribute('size')).to.be.false;
    });

    it('does not sprout an icon attribute by default', function() {
      expect(element.hasAttribute('icon')).to.be.false;
    });

    it('renders at the body-default size', function() {
      const { fontSize } = getComputedStyle(document.documentElement);
      const expected = 0.875 * parseFloat(fontSize);
      expect(element.offsetWidth).to.equal(expected);
      expect(element.offsetHeight).to.equal(expected);
    });

    it('is decorative by default', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children).to.not.exist;
    });

    it('hides a loaded decorative icon from assistive technology', async function() {
      const element = await createFixture<PfV6Icon>(html`<pf-v6-icon icon="atom"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
      const snapshot = await a11ySnapshot();
      expect(snapshot.children).to.not.exist;
    });
  });

  describe('accessible-label attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon icon="atom" accessible-label="Atom"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('exposes the icon as a labelled image', async function() {
      const snapshot = await a11ySnapshot();
      const imageNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'image'
      );
      expect(imageNode).to.exist;
      expect(imageNode?.name).to.equal('Atom');
    });

    it('does not expose the icon svg as a nested image', async function() {
      const snapshot = await a11ySnapshot();
      const images = snapshot.children?.filter(
        (child: { role: string }) => child.role === 'image'
      ) ?? [];
      expect(images.length, 'exactly one image node').to.equal(1);
      expect(images[0]?.children, 'no nested nodes under the image').to.not.exist;
    });
  });

  describe('changing size attribute', function() {
    const sizes: PfV6Icon['size'][] = [
      'sm', 'md', 'lg', 'xl', '2xl', '3xl',
      'body-sm', 'body-default', 'body-lg',
      'heading-sm', 'heading-md', 'heading-lg', 'heading-xl', 'heading-2xl', 'heading-3xl',
    ];
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`<pf-v6-icon icon="atom"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('sizes the container and the icon together', async function() {
      const { fontSize } = getComputedStyle(document.documentElement);
      const expected = [
        0.75, 0.875, 1, 1.5, 3.5, 6,
        0.75, 0.875, 1,
        1, 1, 1, 1.125, 1.25, 1.5,
      ].map(px => px * parseFloat(fontSize));
      for (const [i, size] of sizes.entries()) {
        element.size = size;
        await element.updateComplete;
        expect(element.offsetWidth, `size "${size}" container width`)
            .to.equal(expected[i]);
      }
    });
  });

  describe('changing set attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      PfV6Icon.addIconSet('rh', (_, icon: string) => TEST_ICONS[icon as keyof typeof TEST_ICONS]);
      element = await createFixture<PfV6Icon>(html`<pf-v6-icon icon="atom"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('re-resolves the icon when the set changes', async function() {
      element.set = 'rh';
      await expectIconsEqual(element, atom);
    });
  });

  describe('mirror-rtl attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      const container = await createFixture<HTMLElement>(html`
        <div dir="rtl">
          <pf-v6-icon icon="atom" mirror-rtl in-progress>
            <pf-v6-spinner slot="progress"></pf-v6-spinner>
          </pf-v6-icon>
        </div>`);
      element = container.querySelector('pf-v6-icon')!;
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
      await element.updateComplete;
    });

    it('mirrors the icon in rtl direction', async function() {
      const svg = element.shadowRoot!.querySelector('#content svg')!;
      expect(getComputedStyle(svg).scale).to.equal('-1 1');
    });

    it('does not mirror the progress icon', async function() {
      const spinner = element.shadowRoot!.querySelector('pf-v6-spinner')!;
      const svg = spinner.shadowRoot!.querySelector('svg')!;
      expect(getComputedStyle(svg).scale).to.equal('none');
    });

    it('does not mirror the icon in ltr direction', async function() {
      element.parentElement!.setAttribute('dir', 'ltr');
      const svg = element.shadowRoot!.querySelector('#content svg')!;
      expect(getComputedStyle(svg).scale).to.equal('none');
    });
  });

  describe('icon-size attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon icon="atom" size="3xl" icon-size="md"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('sizes the icon without resizing the container', async function() {
      const { fontSize } = getComputedStyle(document.documentElement);
      const rootFontSize = parseFloat(fontSize);
      expect(element.offsetWidth, 'container width').to.equal(6 * rootFontSize);
      const svg = element.shadowRoot!.querySelector('svg')!;
      expect(svg.getBoundingClientRect().width, 'icon width').to.equal(0.875 * rootFontSize);
    });
  });

  describe('status attribute', function() {
    const cases: [PfV6Icon['status'], string][] = [
      ['danger', 'light-dark(#b1380b, #f0561d)'],
      ['warning', 'light-dark(#dca614, #ffcc17)'],
      ['success', 'light-dark(#3d7317, #87bb62)'],
      ['info', 'light-dark(#5e40be, #b6a6e9)'],
      ['custom', 'light-dark(#147878, #63bdbd)'],
    ];

    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`<pf-v6-icon icon="atom"></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    for (const [status, expected] of cases) {
      it(`sets the icon color when status is ${status}`, async function() {
        element.status = status;
        await element.updateComplete;
        const color = getComputedStyle(element)
            .getPropertyValue('--pf-v6-c-icon__content--Color');
        expect(color.trim()).to.equal(expected);
      });
    }
  });

  describe('inline attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon icon="atom" inline></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('sizes the icon relative to the surrounding text', async function() {
      const { fontSize } = getComputedStyle(element);
      expect(element.offsetWidth).to.equal(parseFloat(fontSize));
    });

    it('inherits the surrounding text color', function() {
      const color = getComputedStyle(element)
          .getPropertyValue('--pf-v6-c-icon__content--Color');
      expect(color.trim()).to.equal('');
    });
  });

  describe('in-progress attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon icon="atom" in-progress></pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('replaces the icon with a spinner in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode).to.exist;
      expect(spinnerNode?.valuetext).to.equal('Loading...');
    });

    it('removes the spinner when no longer in progress', async function() {
      element.inProgress = false;
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      expect(snapshot.children).to.not.exist;
    });

    it('announces the spinner instead of the name while in progress', async function() {
      element.accessibleLabel = 'Atom';
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const imageNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'image'
      );
      expect(imageNode, 'image node is hidden while in progress').to.not.exist;
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode?.valuetext).to.equal('Loading...');
    });

    it('restores the accessible name when no longer in progress', async function() {
      element.accessibleLabel = 'Atom';
      element.inProgress = false;
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const imageNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'image'
      );
      expect(imageNode?.name).to.equal('Atom');
    });
  });

  describe('custom progress icon', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon icon="atom" in-progress>
          <pf-v6-spinner slot="progress" accessible-label="Loading results"></pf-v6-spinner>
        </pf-v6-icon>`);
      PfV6Icon.addIconSet('fas', () => atom);
      await oneEvent(element, 'load');
    });

    it('uses the slotted element as the progress indicator', async function() {
      const snapshot = await a11ySnapshot();
      const spinnerNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'progressbar'
      );
      expect(spinnerNode).to.exist;
      expect(spinnerNode?.name).to.equal('Loading results');
    });
  });

  describe('when the icon has a custom set attribute', function() {
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`<pf-v6-icon set="asdfasdf" icon="foo"></pf-v6-icon>`);
    });
    describe('then the icon set is registered', function() {
      beforeEach(async function() {
        PfV6Icon.addIconSet('asdfasdf', () =>
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
    let element: PfV6Icon;
    beforeEach(async function() {
      element = await createFixture<PfV6Icon>(html`
        <pf-v6-icon loading="eager">
          <p>Image failed to load.</p>.
        </pf-v6-icon>`);
    });
    it('should display the fallback', async function() {
      const errorEvent = oneEvent(element, 'error');
      element.icon = 'no-scrubs';
      await errorEvent;
      expect(element.shadowRoot!.querySelector('svg')).to.not.be.ok;
      const fallback = element.shadowRoot!.querySelector('[part=fallback]');
      expect(fallback).to.not.have.attribute('hidden');
    });

    it('exposes fallback text when the icon is decorative', async function() {
      const errorEvent = oneEvent(element, 'error');
      element.icon = 'no-scrubs';
      await errorEvent;
      const snapshot = await a11ySnapshot();
      const text = snapshot.children?.find(
        (child: { role?: string }) => child.role !== 'image'
      );
      expect(text).to.exist;
    });

    it('hides fallback text from the labelled image', async function() {
      element.accessibleLabel = 'Labelled fallback';
      await element.updateComplete;
      const errorEvent = oneEvent(element, 'error');
      element.icon = 'no-scrubs';
      await errorEvent;
      const snapshot = await a11ySnapshot();
      const imageNode = snapshot.children?.find(
        (child: { role: string }) => child.role === 'image'
      );
      expect(imageNode?.name).to.equal('Labelled fallback');
      expect(snapshot.children?.length, 'only the labelled image node').to.equal(1);
    });
  });
});
