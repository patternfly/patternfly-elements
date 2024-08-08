import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

async function shiftHold() {
  await sendKeys({ down: 'Shift' });
}

async function shiftRelease() {
  await sendKeys({ up: 'Shift' });
}

async function ctrlA() {
  await sendKeys({ down: 'Control' });
  await sendKeys({ down: 'a' });
  await sendKeys({ up: 'a' });
  await sendKeys({ up: 'Control' });
}

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

function getValues(element: PfSelect): string[] {
  return element.selected.filter(x => !!x).map(x => x!.value);
}

describe('<pf-select>', function() {
  let element: PfSelect;

  const updateComplete = () => element.updateComplete;

  const focus = () => element.focus();

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-select')).to.be.an.instanceof(PfSelect);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSelect>(html`<pf-select></pf-select>`);
      const klass = customElements.get('pf-select');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfSelect);
    });
  });

  describe('variant="single"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="single"
                   accessible-label="Choose a number"
                   placeholder="Choose a number">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
          <pf-option value="4">4</pf-option>
          <pf-option value="5">5</pf-option>
          <pf-option value="6">6</pf-option>
          <pf-option value="7">7</pf-option>
          <pf-option value="8">8</pf-option>
        </pf-select>`);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('without accessible label', function() {
      beforeEach(function() {
        element.accessibleLabel = undefined;
      });
      beforeEach(updateComplete);
      it('fails accessibility audit', async function() {
        await expect(element).to.not.be.accessible();
      });
    });

    describe('calling focus())', function() {
      beforeEach(function() {
        element.focus();
      });

      beforeEach(updateComplete);

      describe('pressing Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox).to.be.ok;
        });

        it('focuses on the placeholder', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          const focused = listbox?.children?.find(x => x.focused);
          expect(focused?.name).to.equal('Choose a number');
        });
      });

      describe('pressing Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('focuses on the placeholder', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          const focused = listbox?.children?.find(x => x.focused);
          expect(focused?.name).to.equal('Choose a number');
        });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox).to.be.ok;
        });

        it('focuses on option 1', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          const focused = listbox?.children?.find(x => x.focused);
          expect(focused?.name).to.equal('Choose a number');
        });

        describe('then pressing ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          beforeEach(updateComplete);
          it('focuses on the last option', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            const focused = listbox?.children?.find(x => x.focused);
            expect(focused?.name).to.equal('8');
          });
          describe('then pressing ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses on the placeholder', async function() {
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              const focused = listbox?.children?.find(x => x.focused);
              expect(focused?.name).to.equal('Choose a number');
            });
          });
        });

        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('focuses on option 1', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            const focused = listbox?.children?.find(x => x.focused);
            expect(focused?.name).to.equal('1');
          });

          describe('then pressing ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses on the placeholder', async function() {
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              const focused = listbox?.children?.find(x => x.focused);
              expect(focused?.name).to.equal('Choose a number');
            });
          });

          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('selects option 1', function() {
              expect(getValues(element)).to.deep.equal(['1']);
            });
          });
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('closes', function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(querySnapshot(snapshot, { role: 'listbox' })).to.not.be.ok;
          });

          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = querySnapshot(snapshot, {
              focused: true,
              role: 'combobox',
            });
            expect(focused).to.be.ok;
          });

          it('does not select anything', async function() {
            // because the placeholder was focused
            expect(getValues(element)).to.deep.equal([]);
          });
        });

        describe('then pressing Tab', function() {
          beforeEach(press('Tab'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });
          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = snapshot.children?.find(x => x.focused);
            expect(focused?.role).to.equal('combobox');
            expect(focused?.haspopup).to.equal('listbox');
          });
        });

        describe('then pressing Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            expect(listbox).to.be.undefined;
          });
          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = snapshot.children?.find(x => x.focused);
            expect(focused?.role).to.equal('combobox');
            expect(focused?.haspopup).to.equal('listbox');
          });
        });

        describe('then pressing Escape', function() {
          beforeEach(press('Escape'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });
          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = snapshot.children?.find(x => x.focused);
            expect(focused?.role).to.equal('combobox');
            expect(focused?.haspopup).to.equal('listbox');
          });
        });
      });
    });
  });

  describe('variant="checkbox"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="checkbox"
                   accessible-label="Check it out">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
          <pf-option value="4">4</pf-option>
          <pf-option value="5">5</pf-option>
          <pf-option value="6">6</pf-option>
          <pf-option value="7">7</pf-option>
          <pf-option value="8">8</pf-option>
        </pf-select>`);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('focus()', function() {
      beforeEach(function() {
        element.focus();
      });

      beforeEach(updateComplete);
      describe('Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('should NOT use checkbox role for options', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.filter(x => x.role === 'checkbox')?.length)
              .to.equal(0);
        });
      });

      describe('Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        describe('Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
          beforeEach(updateComplete);

          it('closes', async function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });

          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(0)?.role).to.equal('combobox');
            expect(snapshot.children?.at(0)?.focused).to.be.true;
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          // a little extra sleep to de-flake this test
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            expect(listbox).to.be.undefined;
          });
        });

        describe('Escape', function() {
          beforeEach(press('Escape'));
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });
          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = querySnapshot(snapshot, { focused: true });
            expect(focused?.role).to.equal('combobox');
          });
        });

        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            // because the placeholder was focused
            expect(getValues(element)).to.deep.equal(['1']);
          });

          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            const snapshot = await a11ySnapshot();
            expect(snapshot).to.have.axRole('listbox');
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses option 1', async function() {
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              const focused = listbox?.children?.find(x => x.focused);
              expect(focused?.name).to.equal('2');
            });
            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds option 2 to selection', function() {
                expect(getValues(element)).to.deep.equal([
                  '1',
                  '2',
                ]);
              });

              it('remains expanded', async function() {
                expect(element.expanded).to.be.true;
                const snapshot = await a11ySnapshot();
                expect(snapshot).to.have.axRole('listbox');
              });

              describe('Shift+ArrowDown, Shift+Enter, Shift+ArrowDown, Shift+Enter', function() {
                beforeEach(shiftHold);
                beforeEach(press('ArrowDown'));
                beforeEach(press('Enter'));
                beforeEach(press('ArrowDown'));
                beforeEach(press('Enter'));
                beforeEach(shiftRelease);
                beforeEach(updateComplete);

                it('adds options 2 and 3 to the selected list', function() {
                  expect(getValues(element)).to.deep.equal([
                    '1',
                    '2',
                    '3',
                    '4',
                  ]);
                });

                describe('then pressing ArrowUp and Enter', function() {
                  beforeEach(press('ArrowUp'));
                  beforeEach(press('Enter'));
                  beforeEach(updateComplete);

                  it('deselects option 3', function() {
                    expect(getValues(element)).to.deep.equal([
                      '1',
                      '2',
                      '4',
                    ]);
                  });

                  describe('then holding down Shift and pressing arrow up / enter twice in a row', function() {
                    beforeEach(press('ArrowUp'));
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    beforeEach(press('ArrowUp'));
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    beforeEach(shiftRelease);
                    beforeEach(updateComplete);

                    it('deselects options 1 and 2', function() {
                      expect(getValues(element)).to.deep.equal([
                        '4',
                      ]);
                    });

                    describe('then pressing Ctrl+A', function() {
                      beforeEach(ctrlA);
                      beforeEach(updateComplete);

                      it('selects all options', function() {
                        expect(getValues(element)).to.deep.equal([
                          '1',
                          '2',
                          '3',
                          '4',
                          '5',
                          '6',
                          '7',
                          '8',
                        ]);
                      });

                      describe('then pressing Ctrl+A again', function() {
                        beforeEach(ctrlA);
                        beforeEach(updateComplete);
                        it('deselects all options', function() {
                          expect(getValues(element)).to.deep.equal([]);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('in a deep shadow root', function() {
    let element: PfSelect;
    const focus = () => element.focus();
    const updateComplete = () => element.updateComplete;
    beforeEach(async function() {
      const fixture = await createFixture(html`
        <shadow-root>
          <template shadowrootmode="open">
            <shadow-root>
              <template shadowrootmode="open">
                <pf-select variant="single"
                  accessible-label="Choose a number"
                  placeholder="Choose a number">
                  <pf-option value="1">1</pf-option>
                  <pf-option value="2">2</pf-option>
                  <pf-option value="3">3</pf-option>
                  <pf-option value="4">4</pf-option>
                  <pf-option value="5">5</pf-option>
                  <pf-option value="6">6</pf-option>
                  <pf-option value="7">7</pf-option>
                  <pf-option value="8">8</pf-option>
                </pf-select>
              </template>
            </shadow-root>
          </template>
        </shadow-root>`);

      function attachShadowRoots(root?: Document | ShadowRoot) {
        root?.querySelectorAll<HTMLTemplateElement>('template[shadowrootmode]').forEach(template => {
          const mode = template.getAttribute('shadowrootmode') as 'open' | 'closed';
          const shadowRoot = template.parentElement?.attachShadow?.({ mode });
          shadowRoot?.appendChild(template.content);
          template.remove();
          attachShadowRoots(shadowRoot);
        });
      }
      attachShadowRoots(document);

      const select = fixture.shadowRoot?.firstElementChild?.shadowRoot?.querySelector('pf-select');
      if (select) {
        element = select;
        await element?.updateComplete;
      } else {
        throw new Error('no element!');
      }
    });
    describe('expanding', function() {
      beforeEach(focus);
      beforeEach(press('Enter'));
      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('remains expanded', function() {
          expect(element.expanded).to.be.true;
        });
        describe('pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('remains expanded', function() {
            expect(element.expanded).to.be.true;
          });
          describe('pressing Space', function() {
            beforeEach(press(' '));
            beforeEach(updateComplete);
            it('closes', function() {
              expect(element.expanded).to.be.false;
            });
            it('sets value', function() {
              expect(element.value).to.equal('2');
            });
          });
        });
      });
    });
  });

  // try again when we implement activedescendant
  describe.skip('variant="typeahead"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="${'typeahead' as 'single'}">
          <pf-option value="Blue">Blue</pf-option>
          <pf-option value="Green">Green</pf-option>
          <pf-option value="Magenta">Magenta</pf-option>
          <pf-option value="Orange">Orange</pf-option>
          <pf-option value="Purple">Purple</pf-option>
          <pf-option value="Pink">Pink</pf-option>
          <pf-option value="Red">Red</pf-option>
          <pf-option value="Yellow">Yellow</pf-option>
        </pf-select>`);
    });

    describe('custom filtering', function() {
      beforeEach(function() {
        // @ts-expect-error: we intend to implement this in the next release
        element.customFilter = option =>
          // @ts-expect-error: TODO add filter feature
          new RegExp(element.filter).test(option.value);
      });

      beforeEach(focus);

      beforeEach(updateComplete);

      describe('typing "r"', function() {
        beforeEach(press('r'));
        beforeEach(updateComplete);
        it('shows options with "r" anywhere in them', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox?.children?.length).to.equal(3);
          expect(listbox?.children?.at(0)?.name).to.equal('Green');
          expect(listbox?.children?.at(1)?.name).to.equal('Orange');
          expect(listbox?.children?.at(2)?.name).to.equal('Purple');
        });
      });

      describe('typing "R"', function() {
        beforeEach(press('R'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('shows options that contain "R"', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox?.children?.length).to.equal(1);
          expect(listbox?.children?.at(0)?.name).to.equal('Red');
        });
      });
    });

    describe('calling focus()', function() {
      beforeEach(focus);

      beforeEach(updateComplete);

      it('has a text input for typeahead', async function() {
        const snapshot = await a11ySnapshot();
        const [typeahead] = snapshot.children ?? [];
        expect(typeahead).to.deep.equal({
          role: 'combobox',
          name: 'Options',
          focused: true,
          autocomplete: 'both',
          haspopup: 'listbox',
        });
      });

      describe('typing "r"', function() {
        beforeEach(press('r'));
        beforeEach(updateComplete);

        it('only shows options that start with "r" or "R"', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox?.children?.every(x => x.name.toLowerCase().startsWith('r'))).to.be.true;
        });
      });

      describe('setting filter to "*"', function() {
        beforeEach(function() {
          // @ts-expect-error: todo: add filter feature
          element.filter = '*';
        });
        beforeEach(updateComplete);
        it('does not error', async function() {
          const snapshot = await a11ySnapshot();
          const [, , listbox] = snapshot.children ?? [];
          expect(listbox?.children).to.not.be.ok;
        });
      });

      describe('changing input value to "p"', function() {
        beforeEach(press('p'));
        beforeEach(updateComplete);

        it('only shows listbox items starting with the letter p', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox?.children?.length).to.equal(2);
          expect(listbox?.children?.at(0)?.name).to.equal('Purple');
          expect(listbox?.children?.at(1)?.name).to.equal('Pink');
        });

        it('maintains focus on the input', async function() {
          const snapshot = await a11ySnapshot();
          const focused = snapshot.children?.find(x => x.focused);
          expect(focused?.role).to.equal('combobox');
        });

        describe('pressing Backspace so input value is ""', function() {
          beforeEach(press('Backspace'));
          beforeEach(updateComplete);

          it('all options are visible', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            expect(listbox?.children?.length).to.equal(8);
            expect(listbox?.children?.at(0)?.name).to.equal('Blue');
            expect(listbox?.children?.at(1)?.name).to.equal('Green');
            expect(listbox?.children?.at(2)?.name).to.equal('Magenta');
            expect(listbox?.children?.at(3)?.name).to.equal('Orange');
            expect(listbox?.children?.at(4)?.name).to.equal('Purple');
            expect(listbox?.children?.at(5)?.name).to.equal('Pink');
            expect(listbox?.children?.at(6)?.name).to.equal('Red');
            expect(listbox?.children?.at(7)?.name).to.equal('Yellow');
          });
        });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox).to.be.ok;
        });
        it('selects the first item', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          const focused = listbox?.children?.find(x => x.focused);
          expect(focused).to.not.be.ok;
          const selected = listbox?.children?.find(x => x.selected);
          expect(selected).to.be.ok;
          expect(listbox?.children?.at(0)).to.equal(selected);
        });
        it('does not move keyboard focus', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          const focused = listbox?.children?.find(x => x.focused);
          expect(focused).to.not.be.ok;
        });
        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('focuses the first option', async function() {
            const snapshot = await a11ySnapshot();
            const listbox = snapshot.children?.find(x => x.role === 'listbox');
            const focused = listbox?.children?.find(x => x.focused);
            expect(focused).to.be.ok;
            expect(listbox?.children?.indexOf(focused!)).to.equal(0);
          });
          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the second option', function() {
              expect(getValues(element)).to.deep.equal(['Green']);
            });
            it('sets typeahead input to second option value', async function() {
              const snapshot = await a11ySnapshot();
              const [combobox] = snapshot.children ?? [];
              expect(combobox?.value).to.equal('Green');
            });
            it('focuses on toggle button', async function() {
              const snapshot = await a11ySnapshot();
              const focused = snapshot.children?.find(x => x.focused);
              expect(focused?.role).to.equal('button');
              expect(focused?.haspopup).to.equal('listbox');
            });
            it('closes', async function() {
              expect(element.expanded).to.be.false;
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              expect(listbox).to.be.undefined;
            });
          });
        });
      });
    });
  });

  // try again when we implement activedescendant
  describe.skip('variant="typeaheadmulti"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="typeaheadmulti">
          <pf-option value="Amethyst">Amethyst</pf-option>
          <pf-option value="Beryl">Beryl</pf-option>
          <pf-option value="Chalcedony">Chalcedony</pf-option>
          <pf-option value="Diamond">Diamond</pf-option>
          <pf-option value="Emerald">Emerald</pf-option>
          <pf-option value="Fool's Gold">Fool's Gold</pf-option>
          <pf-option value="Garnet">Garnet</pf-option>
          <pf-option value="Halite">Halite</pf-option>
          <pf-option value="Iris">Iris</pf-option>
        </pf-select>`);
    });

    describe('calling focus()', function() {
      beforeEach(function() {
        element.focus();
      });
      beforeEach(updateComplete);

      it('focuses the typeahead input', async function() {
        const snapshot = await a11ySnapshot();
        const [input] = snapshot.children ?? [];
        expect(input.focused).to.be.true;
        expect(input.role).to.equal('combobox');
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands', function() {
          expect(element.expanded).to.be.true;
        });

        it('shows the listbox', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.find(x => x.role === 'listbox')).to.be.ok;
        });

        it('focuses the first option', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox?.children?.find(x => x.focused)?.name).to.equal('Amethyst');
        });

        describe('then pressing Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.find(x => x.role === 'listbox')).to.be.undefined;
          });

          it('focuses the toggle button', async function() {
            const snapshot = await a11ySnapshot();
            const focused = snapshot?.children?.find(x => x.focused);
            expect(focused?.role).to.equal('button');
            expect(focused?.haspopup).to.equal('listbox');
          });

          describe('then pressing Shift+Tab', function() {
            beforeEach(shiftHold);
            beforeEach(press('Tab'));
            beforeEach(shiftRelease);
            beforeEach(updateComplete);
            it('focuses the combobox input', async function() {
              const snapshot = await a11ySnapshot();
              const focused = snapshot?.children?.find(x => x.focused);
              expect(focused?.role).to.equal('combobox');
              expect(focused?.haspopup).to.equal('listbox');
            });
          });
        });

        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the second option', function() {
              expect(getValues(element)).to.deep.equal(['Beryl']);
            });
            it('focuses on second option', async function() {
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              expect(listbox?.children?.find(x => x.focused)?.name).to.equal('Beryl');
            });
            it('remains expanded', async function() {
              expect(element.expanded).to.be.true;
              const snapshot = await a11ySnapshot();
              const listbox = snapshot.children?.find(x => x.role === 'listbox');
              expect(listbox).to.be.ok;
            });
            it('shows 1 chip', async function() {
              const snapshot = await a11ySnapshot();
              const [, chip1close] = snapshot.children ?? [];
              expect(chip1close?.role).to.equal('button');
              expect(chip1close?.name).to.equal('Close');
              expect(chip1close?.description).to.equal('Beryl');
            });
            describe('then pressing ArrowUp', function() {
              beforeEach(press('ArrowUp'));
              beforeEach(updateComplete);
              it('focuses the first option', async function() {
                const snapshot = await a11ySnapshot();
                const listbox = snapshot.children?.find(x => x.role === 'listbox');
                const focused = listbox?.children?.find(x => x.focused);
                expect(focused?.name).to.equal('Amethyst');
              });
              describe('then pressing Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);
                it('adds second option to selected values', function() {
                  expect(getValues(element)).to.deep.equal(['Amethyst', 'Beryl']);
                });
                it('accessible combo button label should be "2 items selected"', async function() {
                  const snapshot = await a11ySnapshot();
                  const button = snapshot.children?.find(x => x.role === 'combobox');
                  expect(button?.name).to.equal('2 items selected');
                });
                it('shows 2 chips', async function() {
                  const snapshot = await a11ySnapshot();
                  const [, chip1close, , chip2close] = snapshot.children ?? [];
                  expect(chip1close?.role).to.equal('button');
                  expect(chip1close?.name).to.equal('Close');
                  expect(chip1close?.description).to.equal('Amethyst');
                  expect(chip2close?.role).to.equal('button');
                  expect(chip2close?.name).to.equal('Close');
                  expect(chip2close?.description).to.equal('Beryl');
                });
                describe('then pressing Shift+Tab', function() {
                  beforeEach(shiftHold);
                  beforeEach(press('Tab'));
                  beforeEach(shiftRelease);
                  beforeEach(updateComplete);
                  it('focuses the toggle button', async function() {
                    const snapshot = await a11ySnapshot();
                    const focused = snapshot.children?.find(x => x.focused);
                    expect(focused?.role).to.equal('button');
                    expect(focused?.haspopup).to.equal('listbox');
                  });
                  describe('then pressing Shift+Tab', function() {
                    beforeEach(shiftHold);
                    beforeEach(press('Tab'));
                    beforeEach(shiftRelease);
                    beforeEach(updateComplete);
                    it('focuses the combobox input', async function() {
                      const snapshot = await a11ySnapshot();
                      const focused = snapshot.children?.find(x => x.focused);
                      expect(focused?.role).to.equal('combobox');
                    });
                    describe('then pressing Shift+Tab', function() {
                      beforeEach(shiftHold);
                      beforeEach(press('Tab'));
                      beforeEach(shiftRelease);
                      beforeEach(updateComplete);
                      it('focuses the last chip\'s close button', async function() {
                        const snapshot = await a11ySnapshot();
                        const focused = snapshot.children?.find(x => x.focused);
                        expect(focused?.role).to.equal('button');
                        expect(focused?.name).to.equal('Close');
                        expect(focused?.description).to.equal('Beryl');
                      });
                      describe('then pressing Space', function() {
                        beforeEach(updateComplete);
                        beforeEach(press(' '));
                        beforeEach(updateComplete);
                        beforeEach(updateComplete);
                        it('removes the second chip', async function() {
                          const snapshot = await a11ySnapshot();
                          const [, chip1close, ...rest] = snapshot.children ?? [];
                          expect(chip1close?.role).to.equal('button');
                          expect(chip1close?.name).to.equal('Close');
                          expect(chip1close?.description).to.equal('Amethyst');
                          expect(rest.filter(x => 'description' in x)?.length).to.equal(0);
                        });
                        it('removes the second option from the selected values', function() {
                          expect(getValues(element)).to.deep.equal(['Amethyst']);
                        });
                        it('focuses the combobox', async function() {
                          const snapshot = await a11ySnapshot();
                          const focused = snapshot.children?.find(x => x.focused);
                          expect(focused?.role).to.equal('combobox');
                        });
                        describe('then pressing Shift+Tab', function() {
                          beforeEach(shiftHold);
                          beforeEach(press('Tab'));
                          beforeEach(shiftRelease);
                          beforeEach(updateComplete);
                          it('focuses the first chip', async function() {
                            const snapshot = await a11ySnapshot();
                            const focused = snapshot.children?.find(x => x.focused);
                            expect(focused?.role).to.equal('button');
                            expect(focused?.description).to.equal('Amethyst');
                          });
                          describe('then pressing Space', function() {
                            beforeEach(press(' '));
                            beforeEach(updateComplete);
                            it('removes all chips', async function() {
                              const snapshot = await a11ySnapshot();
                              expect(snapshot.children?.find(x => x.role === 'button' && x.name === 'Close'))
                                  .to.be.undefined;
                            });
                            it('focuses the typeahead input', async function() {
                              const snapshot = await a11ySnapshot();
                              const focused = snapshot.children?.find(x => x.focused);
                              expect(focused?.role).to.equal('combobox');
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
