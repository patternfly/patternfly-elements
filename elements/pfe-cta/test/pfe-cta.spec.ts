import type { ReactiveElement } from 'lit';
import type { ColorPalette, ColorTheme } from '@patternfly/pfe-core';

import { ifDefined } from 'lit/directives/if-defined.js';
import { chai, expect, oneEvent, html, nextFrame } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { getElementPosition } from '@patternfly/pfe-tools/test/utils.js';
import { spy } from 'sinon';

// Import the element we're testing.
import { PfeCta } from '@patternfly/pfe-cta';

// Context tests use band
import '@patternfly/pfe-band';

const testElement = html`
  <pfe-cta>
    <a href="#">link</a>
  </pfe-cta>
`;

describe('<pfe-cta>', function() {
  it('should upgrade', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);
    expect(pfeCta, 'pfe-cta should be an instance of PfeCta')
      .to.be.an.instanceof(customElements.get('pfe-cta'))
      .and
      .to.be.an.instanceof(PfeCta);
  });

  it('should log a warning if there are no children in the light DOM', async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`<pfe-cta>This is wrong</pfe-cta>`);

    await pfeCta.updateComplete;

    expect(warnSpy)
      .to.have.been.calledOnceWith(
        '[pfe-cta]',
        'The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)'
      );

    warnSpy.restore();
  });

  it('should log a warning if the first child in the light DOM is not an anchor', async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`
      <pfe-cta>
        <p>Something</p>
        <a href="#">A link</a>
      </pfe-cta>
    `);

    await pfeCta.updateComplete;

    expect(warnSpy).to.have.been.calledOnceWith(
      '[pfe-cta]',
      'The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)'
    );

    warnSpy.restore();
  });

  it(`it should log a warning if the first child in the light DOM is a default style button`, async function() {
    const warnSpy = spy(console, 'warn');
    const pfeCta = await createFixture<PfeCta>(html`
      <pfe-cta>
        <button>A button</button>
      </pfe-cta>
    `);

    await pfeCta.updateComplete;

    expect(warnSpy).to.have.been.calledOnceWith(
      '[pfe-cta]',
      'Button tag is not supported semantically by the default link styles'
    );

    warnSpy.restore();
  });

  it('should properly initialize when the contents of the slot change', async function() {
    const element = await createFixture<PfeCta>(testElement);
    expect(element.data.href, 'before setting innerHTML').to.equal(`${window.location.href}#`);
    element.innerHTML = `<a href="#hi">Customer Portal</a>`;
    await element.updateComplete;
    await nextFrame();
    expect(element.data.href, 'after setting innerHTML').to.equal(`${window.location.href}#hi`);
  });

  it('should register an event when clicked', async function() {
    const element = await createFixture<PfeCta>(html`
      <pfe-cta>
        <a href="#" @click="${(e: Event) => e.preventDefault()}">link</a>
      </pfe-cta>
    `);
    setTimeout(() => element.cta!.click());
    const event = await oneEvent(element, 'select');
    expect(event).to.be.ok;
  });

  it('should fire deprecated pfe-cta:select event when clicked', async function() {
    const element = await createFixture<PfeCta>(testElement);
    setTimeout(() => element.cta!.click());
    const event = await oneEvent(element, 'pfe-cta:select');
    expect(event).to.be.ok;
  });

  it('should register an event when enter key is pressed', async function() {
    const pfeCta = await createFixture<PfeCta>(testElement);

    await pfeCta.updateComplete;

    // prevent navigation
    pfeCta.cta!.addEventListener('keyup', e => e.preventDefault(), { once: true });

    setTimeout(() => {
      pfeCta.cta!.dispatchEvent(new KeyboardEvent('keyup', {
        key: 'Enter',
      }));
    });

    const event = await oneEvent(pfeCta, 'pfe-cta:select');

    expect(event).to.be.ok;
  });

  describe('with color context', function() {
    let element: PfeCta;
    let link: HTMLAnchorElement;
    let elemStyle: CSSStyleDeclaration;
    let linkStyle: CSSStyleDeclaration;

    function contextFixture(options?: {
      on?: ColorTheme;
      disabled?: boolean;
      colorPalette?: ColorPalette;
      priority?: PfeCta['priority'];
      variant?: PfeCta['variant'];
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
            <pfe-cta
                aria-disabled=${ifDefined(options?.disabled)}
                variant=${ifDefined(options?.variant)}
                color-palette=${ifDefined(options?.colorPalette)}
                priority=${ifDefined(options?.priority)}>
              <a href="#">Test</a>
            </pfe-cta>
          </pfe-band>
        `);
        element = wrapper.querySelector('pfe-cta') as PfeCta;
        link = element.querySelector('a')!;
        elemStyle = getComputedStyle(element);
        linkStyle = getComputedStyle(link);
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
      element.querySelector('a')!.focus();
    }

    function assertStyles(assertions: {
      on?: ColorTheme;
      elementBackgroundColor: string;
      linkColor: string;
      linkTextDecorationLine?: 'underline';
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
            case 'elementBackgroundColor':
              actual = elemStyle.backgroundColor;
              expect(actual).to.be.colored(expected, 'background color');
              break;
            case 'linkColor':
              actual = linkStyle.getPropertyValue('color');
              expect(actual).to.be.colored(expected, 'link color');
              break;
            case 'linkTextDecorationLine':
              actual = linkStyle.getPropertyValue('text-decoration-line');
              expect(actual).to.equal(expected, 'link text decoration');
              break;
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

    describe('no specific context', function() {
      const on = undefined;
      describe('without priority', function() {
        beforeEach(contextFixture({ on }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          elementBackgroundColor: 'transparent',
          linkColor: '#06c',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#2897f033',
            linkColor: '#004080',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: 'transparent',
            linkColor: '#004080',
          }));
        });
      });

      describe('priority="primary"', function() {
        beforeEach(contextFixture({ on, priority: 'primary' }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          elementBackgroundColor: '#06c',
          linkColor: '#ffffff',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#06c',
            linkColor: '#ffffff',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#004080',
            linkColor: '#ffffff',
          }));
        });
      });

      describe('priority="secondary"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary' }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          elementBackgroundColor: 'transparent',
          linkColor: '#151515',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#6a6e73',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#151515',
            linkColor: '#ffffff',
          }));
        });
      });

      describe('priority="secondary" variant="wind"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind' }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          elementBackgroundColor: 'transparent',
          linkColor: '#06c',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#004080',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f5f5f5',
            linkColor: '#004080',
            linkTextDecorationLine: 'underline',
          }));
        });
      });

      describe('aria-disabled="true"', function() {
        beforeEach(contextFixture({ on, disabled: true }));
        it('has correct theme values', () => assertStyles({
          on: 'light',
          elementBackgroundColor: '#d2d2d2',
          linkColor: '#6a6e73',
        }));
      });

      describe('color-palette="base"', function() {
        const colorPalette = 'base';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#004080',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, priority: 'primary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: '#6a6e73',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#6a6e73',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#6a6e73',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#6a6e73',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, disabled: true, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });

      describe('color-palette="accent"', function() {
        const colorPalette = 'accent';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#004080',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'primary' }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: '#06c',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#06c',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#004080',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary' }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#06c',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#06c',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary', variant: 'wind' }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, colorPalette, disabled: true }));
          it('has correct theme values', () => assertStyles({
            on: 'light',
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });
    });

    describe('on="dark"', function() {
      const on = 'dark';
      describe('without priority', function() {
        beforeEach(contextFixture({ on }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#73bcf7',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#2897f033',
            linkColor: '#bee1f4',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: 'transparent',
            linkColor: '#bee1f4',
          }));
        });
      });

      describe('priority="primary"', function() {
        beforeEach(contextFixture({ on, priority: 'primary' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: '#ffffff',
          linkColor: '#151515',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#151515',
          }));
        });
      });

      describe('priority="secondary"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#ffffff',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#151515',
          }));
        });
      });

      describe('priority="secondary" variant="wind"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#73bcf7',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#004080',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f5f5f5',
            linkColor: '#004080',
            linkTextDecorationLine: 'underline',
          }));
        });
      });

      describe('aria-disabled="true"', function() {
        beforeEach(contextFixture({ on, disabled: true }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: '#d2d2d2',
          linkColor: '#6a6e73',
        }));
      });

      describe('color-palette="base"', function() {
        const colorPalette = 'base';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#73bcf7',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#bee1f4',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#bee1f4',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, priority: 'primary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#6a6e73',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#6a6e73',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#6a6e73',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#6a6e73',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#73bcf7',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, disabled: true, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });

      describe('color-palette="accent"', function() {
        const colorPalette = 'accent';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#73bcf7',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#bee1f4',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#bee1f4',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'primary' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#ffffff',
              linkColor: '#151515',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#151515',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#06c',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#06c',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary', variant: 'wind' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#73bcf7',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, colorPalette, disabled: true }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });
    });

    describe('on="saturated"', function() {
      const on = 'saturated';
      describe('without priority', function() {
        beforeEach(contextFixture({ on }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#ffffff',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#2897f033',
            linkColor: '#fafafa',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: 'transparent',
            linkColor: '#fafafa',
          }));
        });
      });

      describe('priority="primary"', function() {
        beforeEach(contextFixture({ on, priority: 'primary' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: '#ffffff',
          linkColor: '#151515',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#151515',
          }));
        });
      });

      describe('priority="secondary"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#ffffff',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f0f0f0',
            linkColor: '#151515',
          }));
        });
      });

      describe('priority="secondary" variant="wind"', function() {
        beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind' }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: 'transparent',
          linkColor: '#ffffff',
        }));
        describe('focused', function() {
          beforeEach(focusElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#ffffff',
            linkColor: '#004080',
          }));
        });
        describe('hovered', function() {
          beforeEach(hoverElement);
          it('has correct theme values', () => assertStyles({
            elementBackgroundColor: '#f5f5f5',
            linkColor: '#004080',
            linkTextDecorationLine: 'underline',
          }));
        });
      });

      describe('aria-disabled="true"', function() {
        beforeEach(contextFixture({ on, disabled: true }));
        it('has correct theme values', () => assertStyles({
          on,
          elementBackgroundColor: '#d2d2d2',
          linkColor: '#6a6e73',
        }));
      });

      describe('color-palette="base"', function() {
        const colorPalette = 'base';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#fafafa',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#fafafa',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, priority: 'primary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#6a6e73',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#6a6e73',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#6a6e73',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#6a6e73',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#151515',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, priority: 'secondary', variant: 'wind', colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'rgba(40, 151, 240, 0.2)',
              linkColor: '#ffffff',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, disabled: true, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });

      describe('color-palette="accent"', function() {
        const colorPalette = 'accent';
        describe('without priority', function() {
          beforeEach(contextFixture({ on, colorPalette }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#2897f033',
              linkColor: '#fafafa',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: 'transparent',
              linkColor: '#fafafa',
            }));
          });
        });

        describe('priority="primary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'primary' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#ffffff',
            linkColor: '#151515',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#ffffff',
              linkColor: '#151515',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#151515',
            }));
          });
        });

        describe('priority="secondary"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#06c',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#06c',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#06c',
              linkColor: '#ffffff',
            }));
          });
        });

        describe('priority="secondary" variant="wind"', function() {
          beforeEach(contextFixture({ on, colorPalette, priority: 'secondary', variant: 'wind' }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: 'transparent',
            linkColor: '#ffffff',
          }));
          describe('focused', function() {
            beforeEach(focusElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f0f0f0',
              linkColor: '#004080',
            }));
          });
          describe('hovered', function() {
            beforeEach(hoverElement);
            it('has correct theme values', () => assertStyles({
              elementBackgroundColor: '#f5f5f5',
              linkColor: '#004080',
              linkTextDecorationLine: 'underline',
            }));
          });
        });

        describe('aria-disabled="true"', function() {
          beforeEach(contextFixture({ on, colorPalette, disabled: true }));
          it('has correct theme values', () => assertStyles({
            on,
            elementBackgroundColor: '#d2d2d2',
            linkColor: '#6a6e73',
          }));
        });
      });
    });
  });
});
