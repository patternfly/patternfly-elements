import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfBackgroundImage } from '@patternfly/elements/pf-background-image/pf-background-image.js';
import { setViewport } from '@web/test-runner-commands';

const example = html`
  <pf-background-image filter
    src="/components/background-image/demo/pfbg.jpg"
    src-2x="/components/background-image/demo/pfbg_576.jpg"
    src-sm="/components/background-image/demo/pfbg_768.jpg"
    src-sm-2x="/components/background-image/demo/pfbg_768@2x.jpg"
    src-lg="/components/background-image/demo/pfbg_1200.jpg"
    >
  </pf-background-image>
`;

function isMobile() {
  const matches = !!window.matchMedia('(max-width: 575px)').matches;
  return matches;
}

function isTablet() {
  const matches = !!window.matchMedia('(min-width: 576px)').matches;
  return matches;
}

function isDesktop() {
  const matches = !!window.matchMedia('(min-width: 992px)').matches;
  return matches;
}

describe('<pf-background-image>', function() {
  describe('simply instantiating', function() {
    let element: PfBackgroundImage;

    it('imperatively instantiates', function() {
      expect(document.createElement('pf-background-image')).to.be.an.instanceof(PfBackgroundImage);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfBackgroundImage>(html`<pf-background-image></pf-background-image>`);
      const klass = customElements.get('pf-background-image');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfBackgroundImage);
    });

    describe('adjusting window size', function() {
      describe('when the window is less than 576px wide', function() {
        beforeEach(async function() {
          await setViewport({ width: 320, height: 500 });
          await element.updateComplete;
          expect(isMobile()).to.be.true;
        });

        it('should background image', async function() {
          const element = await createFixture<PfBackgroundImage>(example);
          await element.updateComplete;
          const container = element.shadowRoot!.querySelector('#container')!;
          const afterStyles = getComputedStyle(container, '::after');
          expect(afterStyles.getPropertyValue('background-image')).to.contain('/components/background-image/demo/pfbg.jpg');
        });
      });
    });

    describe('when the window is less greater then 576px wide', function() {
      beforeEach(async function() {
        await setViewport({ width: 576, height: 500 });
        await element.updateComplete;
        expect(isTablet()).to.be.true;
      });

      it('should background image', async function() {
        const element = await createFixture<PfBackgroundImage>(example);
        await element.updateComplete;
        const container = element.shadowRoot!.querySelector('#container')!;
        const afterStyles = getComputedStyle(container, '::after');
        /* the image sizes are not named based off viewport but their own intrinsic size */
        expect(afterStyles.getPropertyValue('background-image')).to.contain('/components/background-image/demo/pfbg_768.jpg');
      });
    });

    describe('when the window is less greater then 992px wide', function() {
      beforeEach(async function() {
        await setViewport({ width: 992, height: 500 });
        await element.updateComplete;
        expect(isDesktop()).to.be.true;
      });

      it('should background image', async function() {
        const element = await createFixture<PfBackgroundImage>(example);
        await element.updateComplete;
        const container = element.shadowRoot!.querySelector('#container')!;
        const afterStyles = getComputedStyle(container, '::after');
        /* the image sizes are not named based off viewport but their own intrinsic size */
        expect(afterStyles.getPropertyValue('background-image')).to.contain('/components/background-image/demo/pfbg_1200.jpg');
      });
    });
  });
});

