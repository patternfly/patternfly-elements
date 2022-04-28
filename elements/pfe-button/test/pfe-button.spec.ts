import type { ReactiveElement } from 'lit';
import type { ColorTheme } from '@patternfly/pfe-core';

import { ifDefined } from 'lit/directives/if-defined.js';
import { sendMouse } from '@web/test-runner-commands';
import { getElementPosition } from '@patternfly/pfe-tools/test/utils.js';
import { chai, expect, html, oneEvent } from '@open-wc/testing';
import { spy, SinonSpy } from 'sinon';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeButton } from '@patternfly/pfe-button';

import '@patternfly/pfe-band';

const elementTpl = html`
  <pfe-button>
    <button>Button</button>
  </pfe-button>
`;

const badElementTpl = html`
  <pfe-button>
    <div>Bad button</div>
  </pfe-button>
`;

describe('<pfe-button>', function() {
  let element: PfeButton;
  let spyConsole: SinonSpy;

  it('should upgrade', async function() {
    expect(await createFixture(elementTpl), 'pfe-button should be an instance of PfeButton')
      .to.be.an.instanceOf(customElements.get('pfe-button'))
      .and
      .to.be.an.instanceOf(PfeButton);
  });

  describe('with proper light DOM', function() {
    beforeEach(async function() {
      element = await createFixture(elementTpl);
    });
    it('should synchronize disabled attribute to the light DOM button', async function() {
      const lightDomBtn = element.querySelector('button')!;

      element.disabled = true;
      await element.updateComplete;

      expect(lightDomBtn).dom.to.equal('<button disabled>Button</button>');

      element.disabled = false;
      await element.updateComplete;

      expect(lightDomBtn).dom.to.equal('<button>Button</button>');
    });

    it('should synchronize type attribute to the light DOM button', async function() {
      const lightDomBtn = element.querySelector('button')!;

      element.type = 'reset';
      await element.updateComplete;

      expect(element.type).to.equal('reset');
      expect(lightDomBtn).dom.to.equal('<button type="reset">Button</button>');

      element.type = undefined;
      await element.updateComplete;

      expect(lightDomBtn).dom.to.equal('<button>Button</button>');
    });

    it('should send a pfe-button:click event on click', async function() {
      setTimeout(() => element.querySelector('button')!.click());
      const event = await oneEvent(document, 'pfe-button:click');
      expect(event).to.be.ok;
      expect(event.type).to.equal('pfe-button:click');
    });
  });

  describe('with malformed light DOM', function() {
    beforeEach(async function() {
      spyConsole = spy(console, 'warn');
      element = await createFixture(badElementTpl);
    });

    afterEach(function() {
      spyConsole.restore();
    });

    it('should log a console warning if the light dom inside pfe-button is not a button', async function() {
      expect(element).to.exist;
      expect(spyConsole, 'The only child in the light DOM must be a button tag')
        .to.have.been.calledWith('[pfe-button]');
    });
  });

  describe('with color context', function() {
    let button: HTMLButtonElement;
    let style: CSSStyleDeclaration;

    function contextFixture(options?: {
      on?: ColorTheme;
      disabled?: boolean;
      variant?: PfeButton['variant'];
    }) {
      const bandPalette =
          options?.on === 'saturated' ? 'accent'
        : options?.on === 'dark' ? 'darkest'
        : options?.on === 'light' ? 'lightest'
        : options?.on === 'base' ? 'base'
        : undefined;
      return async function() {
        const wrapper = await createFixture<ReactiveElement>(html`
          <pfe-band color-palette=${ifDefined(bandPalette)}>
            <pfe-button ?disabled=${options?.disabled} variant=${ifDefined(options?.variant)}>
              <button>Test</button>
            </pfe-button>
          </pfe-band>
        `);
        element = wrapper.querySelector('pfe-button') as PfeButton;
        button = element.querySelector('button')!;
        style = getComputedStyle(button);
        await wrapper.updateComplete;
        await element.updateComplete;
        // ensure element is not hovered
        await sendMouse({ type: 'move', position: [
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ] });
      };
    }

    async function hoverElement() {
      await sendMouse({ type: 'move', position: getElementPosition(element) });
    }

    function focusElement() {
      element.querySelector('button')!.focus();
    }

    function assertStyles(assertions: {
      on?: ColorTheme;
      backgroundColor: string;
      color: string;
    }) {
      const errors: ( Chai.AssertionError & { key: string, actual: string, expected: string } )[] = [];

      for (const [key, expected] of Object.entries(assertions)) {
        let actual: string;
        try {
          switch (key) {
            case 'on':
              actual = element.on!;
              expect(actual).to.equal(expected, `uses ${expected} color theme`);
              break;
            default:
              actual = style[key as keyof typeof style] as string;
              expect(actual).to.be.colored(expected, key);
          }
        } catch (e) {
          errors.push({ ...e as Chai.AssertionError & { actual: string, expected: string }, key });
        }
      }

      if (errors.length) {
        const e = new chai.AssertionError(`styles did not match\n\t${errors.map(e => e.message).join('\n\t')}`, errors.reduce((acc, e) => ({
          ...acc,
          actual: { ...acc.actual, [e.key]: e.actual, },
          expected: { ...acc.expected, [e.key]: e.expected, }
        }), { actual: {}, expected: {} }));
        e.showDiff = true;
        throw e;
      }

      expect(element).to.be.accessible();
    }

    describe('unspecified', function() {
      const on = undefined;
      describe('variant="primary"', function() {
        beforeEach(contextFixture({ on }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          backgroundColor: '#06c',
          color: 'white',

        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: '#004080',
            color: 'white',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: '#004080',
            color: 'white',
          }));
        });
      });
    });

    describe('saturated', function() {
      const on = 'saturated';
      describe('variant="primary"', function() {
        beforeEach(contextFixture({ on }));
        it('has correct theme values', () => assertStyles({
          on,
          backgroundColor: '#06c',
          color: 'white',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: '#004080',
            color: 'white',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: '#004080',
            color: 'white',
          }));
        });
      });
      describe('variant="secondary"', function() {
        beforeEach(contextFixture({ on, variant: 'secondary' }));
        it('has correct theme values', () => assertStyles({
          on,
          backgroundColor: 'transparent',
          color: '#73bcf7',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: 'transparent',
            color: '#73bcf7',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            backgroundColor: 'transparent',
            color: '#73bcf7',
          }));
        });
      });
    });
  });
});
