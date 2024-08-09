import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import type { PfOption } from '../pf-option.js';

async function holdShift() {
  await sendKeys({ down: 'Shift' });
}

async function releaseShift() {
  await sendKeys({ up: 'Shift' });
}

async function holdCtrl() {
  await sendKeys({ down: 'Control' });
}

async function releaseCtrl() {
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

      describe('Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
        });

        it('focuses on the placeholder', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
        });
      });

      describe('Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
        });

        it('focuses on the placeholder', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
        });

        it('focuses on the placeholder', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          beforeEach(updateComplete);
          it('focuses on the last option', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
          });
          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses on the placeholder', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
            });
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('focuses on option 1', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses on the placeholder', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
            });
          });

          describe('Enter', function() {
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

          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.have.axRoleInTree('listbox');
          });

          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox')
                .and.to.have.axName('Choose a number');
          });

          it('does not select anything', async function() {
            // because the placeholder was focused
            expect(getValues(element)).to.deep.equal([]);
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.have.axRoleInTree('listbox');
          });
          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox')
                .and.to.have.axName('Choose a number');
          });
        });

        describe('Shift+Tab', function() {
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
          beforeEach(updateComplete);
          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.have.axRoleInTree('listbox');
          });
          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox')
                .and.to.have.axName('Choose a number');
          });
        });

        describe('Escape', function() {
          beforeEach(press('Escape'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('hides the listbox', async function() {
            expect(element.expanded).to.be.false;
            expect(await a11ySnapshot()).to.not.have.axRoleInTree('listbox');
          });
          it('focuses the button', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox')
                .and.to.have.axName('Choose a number');
          });
        });
      });
    });
  });

  describe('variant="checkbox"', function() {
    let items: NodeListOf<PfOption>;
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="checkbox"
                   placeholder="placeholder"
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
      items = element.querySelectorAll('pf-option');
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
          expect(snapshot).to.have.axRoleInTree('listbox');
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot).to.have.axRoleInTree('listbox');
        });

        it('focuses the placeholder', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot).to.have.axTreeFocusedNode.to.have.axName('placeholder');
        });

        describe('Shift+Tab', function() {
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
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

        describe('Ctrl-A', function() {
          beforeEach(holdCtrl);
          beforeEach(press('A'));
          beforeEach(releaseCtrl);
          beforeEach(updateComplete);
          it('selects all', function() {
            expect(element.selected.length).to.equal(items.length);
          });
          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            const snapshot = await a11ySnapshot();
            expect(snapshot).to.have.axRoleInTree('listbox');
          });

          describe('Ctrl-A', function() {
            beforeEach(holdCtrl);
            beforeEach(press('A'));
            beforeEach(releaseCtrl);
            beforeEach(updateComplete);
            it('deselects all', function() {
              expect(element.selected.length).to.equal(0);
            });
            it('remains expanded', async function() {
              expect(element.expanded).to.be.true;
              expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
            });
          });
        });

        describe('Space', function() {
          it('does not select anything', function() {
            expect(element.selected).to.deep.equal([]);
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
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
              expect(snapshot).to.have.axRoleInTree('listbox');
            });

            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(updateComplete);

              it('focuses option 2', async function() {
                const snapshot = await a11ySnapshot();
                expect(snapshot).to.have.axQuery({
                  focused: true,
                  name: '2',
                });
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
                  expect(snapshot).to.have.axRoleInTree('listbox');
                });
              });
            });

            describe('holding Shift', function() {
              beforeEach(holdShift);
              afterEach(releaseShift);
              describe('ArrowDown', function() {
                beforeEach(press('ArrowDown'));
                beforeEach(nextFrame);
                it('adds option 2 to selection', function() {
                  expect(getValues(element)).to.deep.equal([
                    '1',
                    '2',
                  ]);
                });
                describe('Enter', function() {
                  beforeEach(press('Enter'));
                  beforeEach(updateComplete);
                  it('makes no change', function() {
                    expect(getValues(element)).to.deep.equal([
                      '1',
                      '2',
                    ]);
                  });
                  beforeEach(updateComplete);
                  describe('ArrowDown', function() {
                    beforeEach(press('ArrowDown'));
                    beforeEach(updateComplete);
                    it('adds option 3 to the selected list', function() {
                      expect(getValues(element)).to.deep.equal([
                        '1',
                        '2',
                        '3',
                      ]);
                    });
                    describe('ArrowUp', function() {
                      beforeEach(press('Enter'));
                      beforeEach(updateComplete);
                      it('makes no change to selection', function() {
                        expect(getValues(element)).to.deep.equal([
                          '1',
                          '2',
                          '3',
                        ]);
                      });
                    });
                  });
                });
              });
            });
          });
        });

        describe('clicking the first item', function() {
          beforeEach(() => clickElementAtCenter(items[0]));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            // because the placeholder was focused
            expect(getValues(element)).to.deep.equal(['1']);
          });

          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            const snapshot = await a11ySnapshot();
            expect(snapshot).to.have.axRoleInTree('listbox');
          });

          describe('holding Shift', function() {
            beforeEach(holdShift);
            afterEach(releaseShift);
            describe('clicking the 7th item', function() {
              beforeEach(() => clickElementAtCenter(items[6]));
              it('remains expanded', async function() {
                expect(element.expanded).to.be.true;
                const snapshot = await a11ySnapshot();
                expect(snapshot).to.have.axRoleInTree('listbox');
              });

              it('selects items 1-7', function() {
                expect(getValues(element)).to.deep.equal([
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                ]);
              });

              describe('releasing Shift', function() {
                beforeEach(releaseShift);
                describe('clicking 6th item', function() {
                  beforeEach(() => clickElementAtCenter(items[5]));
                  it('deselects item 6', function() {
                    expect(getValues(element)).to.not.contain('6');
                  });
                  describe('holding Shift', function() {
                    beforeEach(holdShift);
                    describe('clicking 2nd item', function() {
                      beforeEach(() => clickElementAtCenter(items[1]));
                      it('deselects items 2-6', function() {
                        expect(getValues(element)).to.deep.equal(['1', '7']);
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

  describe('variant="typeahead"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="typeahead"
                   placeholder="Select a color"
                   accessible-label="Colors">
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

    describe.skip('custom filtering', function() {
      beforeEach(function() {
        // @ts-expect-error: we intend to implement this in the next release
        element.customFilter = option =>
          // @ts-expect-error: TODO add filter feature
          new RegExp(element.filter).test(option.value);
      });

      beforeEach(focus);

      beforeEach(updateComplete);

      describe('r', function() {
        beforeEach(press('r'));
        beforeEach(updateComplete);
        it('shows options that contain "r"', async function() {
          expect(Array.from(
            document.querySelectorAll<PfOption>('pf-option:not([hidden])'),
            x => x.value
          )).to.deep.equal([
            'Green',
            'Orange',
            'Purple',
          ]);
        });
      });

      describe('typing "R"', function() {
        beforeEach(press('R'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('shows options that start with "r"', async function() {
          expect(Array.from(
            document.querySelectorAll<PfOption>('pf-option:not([hidden])'),
            x => x.value
          )).to.deep.equal([
            'Red',
          ]);
        });
      });
    });

    describe('calling focus()', function() {
      beforeEach(focus);

      beforeEach(updateComplete);

      it('focuses the combobox input', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.deep.equal({
          role: 'combobox',
          name: 'Colors',
          focused: true,
          autocomplete: 'both',
          haspopup: 'listbox',
        });
      });

      describe('typing "r"', function() {
        beforeEach(press('r'));
        beforeEach(updateComplete);

        it('only shows options that start with "r" or "R"', async function() {
          expect(Array.from(
            document.querySelectorAll<PfOption>('pf-option:not([hidden])'),
            x => x.value
          )).to.deep.equal([
            'Red',
          ]);
        });
      });

      describe.skip('setting filter to "*"', function() {
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

      describe('p', function() {
        beforeEach(press('p'));
        beforeEach(updateComplete);

        it('shows the listbox and maintains focus', async function() {
          expect(await a11ySnapshot())
              .to.have.axRoleInTree('listbox')
              .and.axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.have.axProperty('value', 'p');
        });

        it('only shows listbox items starting with the letter p', function() {
          // a11yShapshot does not surface the options
          expect(Array.from(
            document.querySelectorAll<PfOption>('pf-option:not([hidden])'),
            x => x.value
          )).to.deep.equal([
            'Purple',
            'Pink',
          ]);
        });

        describe('Backspace so input value is ""', function() {
          beforeEach(press('Backspace'));
          beforeEach(updateComplete);

          it('shows the listbox and maintains focus', async function() {
            expect(await a11ySnapshot())
                .to.have.axRoleInTree('listbox')
                .and.axTreeFocusedNode
                .to.have.axRole('combobox')
                .and.to.not.have.axProperty('value', 'p');
          });

          it('all options are visible', async function() {
            // a11yShapshot does not surface the options
            expect(Array.from(
              document.querySelectorAll<PfOption>('pf-option:not([hidden])'),
              x => x.value
            )).to.deep.equal([
              'Blue',
              'Green',
              'Magenta',
              'Orange',
              'Purple',
              'Pink',
              'Red',
              'Yellow',
            ]);
          });
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('shows the listbox', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
        });
        it('focuses the first item', async function() {
          expect(await a11ySnapshot()).to.have.axRoleInTree('listbox');
          // a11yShapshot does not surface the options
          expect(Array.from(
            document.querySelectorAll<PfOption>('pf-option[active]'),
            x => x.value
          )).to.deep.equal([
            'Blue',
          ]);
        });
        it('does not move keyboard focus', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
        });
        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('focuses the second option', function() {
            // a11yShapshot does not surface the options
            const active = document.querySelector<PfOption>('pf-option[active]');
            const [, item] = document.querySelectorAll('pf-option');
            expect(active).to.equal(item);
          });
          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the second option', function() {
              expect(getValues(element)).to.deep.equal(['Green']);
            });
            it('sets typeahead input to second option value', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axProperty('value', 'Green');
            });
            it('retains focuses on combobox input', async function() {
              expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
            });
            it('hides the listbox', async function() {
              expect(await a11ySnapshot()).to.not.have.axRoleInTree('listbox');
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
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
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
            beforeEach(holdShift);
            beforeEach(press('Tab'));
            beforeEach(releaseShift);
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
                  beforeEach(holdShift);
                  beforeEach(press('Tab'));
                  beforeEach(releaseShift);
                  beforeEach(updateComplete);
                  it('focuses the toggle button', async function() {
                    const snapshot = await a11ySnapshot();
                    const focused = snapshot.children?.find(x => x.focused);
                    expect(focused?.role).to.equal('button');
                    expect(focused?.haspopup).to.equal('listbox');
                  });
                  describe('then pressing Shift+Tab', function() {
                    beforeEach(holdShift);
                    beforeEach(press('Tab'));
                    beforeEach(releaseShift);
                    beforeEach(updateComplete);
                    it('focuses the combobox input', async function() {
                      const snapshot = await a11ySnapshot();
                      const focused = snapshot.children?.find(x => x.focused);
                      expect(focused?.role).to.equal('combobox');
                    });
                    describe('then pressing Shift+Tab', function() {
                      beforeEach(holdShift);
                      beforeEach(press('Tab'));
                      beforeEach(releaseShift);
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
                          beforeEach(holdShift);
                          beforeEach(press('Tab'));
                          beforeEach(releaseShift);
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
});
