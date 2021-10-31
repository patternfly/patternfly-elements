import type { LitElement } from 'lit';

import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeJumpLinks, PfeJumpLinksPanel } from '@patternfly/pfe-jump-links';

import { spy, SinonSpy } from 'sinon';

describe('<pfe-jump-links>', function() {
  let element: PfeJumpLinks;
  let consoleSpy: SinonSpy;

  before(function() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        pfe-jump-links {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          margin-bottom: 100px;
          width: 100%;
        }

        pfe-jump-links>pfe-jump-links-nav {
          display: block;
          width: 20%;
        }

        pfe-jump-links>pfe-jump-links-panel {
          display: block;
          width: 70%;
          max-width: 500px;
          margin-right: auto;
        }
      </style>
    `;
    document.head.append(template.content.cloneNode(true));
  });

  beforeEach(async function() {
    consoleSpy = spy(console, 'warn');
    element = await createFixture<PfeJumpLinks>(html`
      <pfe-jump-links>
        <pfe-jump-links-nav id="jumplinks" color="darkest" style="padding: 16px;">
          <h4 class="heading" slot="pfe-jump-links--heading">Jump to section</h4>
          <ul class="pfe-jump-links-nav">
            <li class="pfe-jump-links-nav__item" active>
              <a href="#section1" data-target="section1">Section 1</a>
            </li>
            <li>
              <a href="#section2" data-target="section2">Section 2</a>
            </li>
            <li class="pfe-jump-links-nav__item has-sub-section">
              <a href="#section3" data-target="section3">Section
                3</a>
              <ul class="sub-nav">
                <li class="pfe-jump-links-nav__item sub-section">
                  <a href="#section3.1" data-target="section3.1">Section
                    3.1</a>
                </li>
                <li class="pfe-jump-links-nav__item sub-section">
                  <a href="#section3.2" data-target="section3.2">Section
                    3.2</a>
                </li>
              </ul>
            </li>
            <li class="pfe-jump-links-nav__item"><a href="#section4" data-target="section4">Section 4</a></li>
            <li class="pfe-jump-links-nav__item"><a href="#section5" data-target="section5">Section 5</a></li>
          </ul>
        </pfe-jump-links-nav>
        <pfe-jump-links-panel id="jumplinksPanel" scrolltarget="jumplinks">
          <div>
            <h2 class="pfe-jump-links-panel__section" id="section1">Section 1</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section" id="section2">Section 2</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section has-sub-section" id="section3">Section 3</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section sub-section" id="section3.1">Section 3.1</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section sub-section" id="section3.2">Section 3.2</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section" id="section4">Section 4</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <h2 class="pfe-jump-links-panel__section" id="section5">Section 5</h2>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
            <p>Lorem ipsum dolor amet umami vaporware actually church-key keytar, hell of roof party unicorn helvetica
              lomo
              pop-up fam taxidermy food truck dolore. Crucifix quinoa af eiusmod try-hard velit aesthetic freegan seitan
              readymade vinyl snackwave four dollar toast neutra. In ipsum blog tbh. Authentic la croix bespoke blue
              bottle,
              pour-over palo santo XOXO intelligentsia roof party readymade try-hard DIY kickstarter activated charcoal
              nisi. Vexillologist et ennui distillery snackwave pour-over offal seitan crucifix street art. Roof party
              photo
              booth retro kogi, cardigan ut anim church-key butcher helvetica iPhone microdosing sed. Kitsch fam
              slow-carb
              cronut tote bag tumeric venmo, shoreditch flannel in pinterest godard butcher id. Vexillologist vaporware
              commodo tumeric fugiat. Laborum echo park succulents, celiac yuccie truffaut cliche gentrify brooklyn
              fingerstache hoodie wolf. DIY veniam elit bushwick pok pok. Esse voluptate cillum, cred skateboard ethical
              forage aliqua master cleanse 90's cornhole. Id ut raclette swag ad keytar polaroid synth sunt williamsburg
              butcher woke lorem whatever squid.</p>
          </div>
        </pfe-jump-links-panel>
      </pfe-jump-links>
    `);
  });

  afterEach(function() {
    consoleSpy.restore();
  });

  it('should upgrade', async function() {
    expect(element, 'the <pfe-jump-links> should be an instance of PfeJumpLinks')
      .to.be.an.instanceof(customElements.get('pfe-jump-links'))
      .and
      .to.be.an.instanceof(PfeJumpLinks);
  });

  it('should autobuild the navigation when the autobuild attribute is present', async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;
    const pfeJumpLinksPanel = element.querySelector('pfe-jump-links-panel');

    pfeJumpLinksNav!.setAttribute('autobuild', '');

    await element.updateComplete;
    const headingCount =
      pfeJumpLinksPanel!.querySelectorAll('.pfe-jump-links-panel__section:not(.sub-section)');
    const links = pfeJumpLinksNav!.shadowRoot!.querySelector('#container ul.pfe-jump-links-nav');

    // There should be the same number of nav links as there are headings
    expect(links!.children.length).to.equal(headingCount.length);
  });

  it('should honor the autobuild alias pfe-c-autobuild', async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;
    const pfeJumpLinksPanel = element.querySelector('pfe-jump-links-panel');

    pfeJumpLinksNav!.setAttribute('pfe-c-autobuild', '');

    await element.updateComplete;
    const headingCount =
      pfeJumpLinksPanel!.querySelectorAll('.pfe-jump-links-panel__section:not(.sub-section)');
    const links = pfeJumpLinksNav!.shadowRoot!.querySelector('#container ul.pfe-jump-links-nav');

    // There should be the same number of nav links as there are headings
    expect(links!.children.length).to.equal(headingCount.length);
  });

  it('its active() method should add an active attribute to the target', async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;

    // Make the 3rd item active
    Promise.all([customElements.whenDefined('pfe-jump-links-nav')]).then(async function() {
      pfeJumpLinksNav!.active(3);
    });

    await element.updateComplete;
    const navItems =
      pfeJumpLinksNav!.shadowRoot!.querySelectorAll<LitElement>('.pfe-jump-links-nav__item');

    const testNavItem = navItems.item(3);

    await testNavItem.updateComplete;

    // Test that the nav item is active
    expect(testNavItem.hasAttribute('active')).to.be.true;
  });

  it('its inactive() method should remove the active attribute from the target', async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;

    // Make the 3rd item active
    Promise.all([customElements.whenDefined('pfe-jump-links-nav')]).then(async function() {
      pfeJumpLinksNav.active(3);
    });

    await element.updateComplete;
    const navItems = pfeJumpLinksNav.shadowRoot!.querySelectorAll('.pfe-jump-links-nav__item');
    const testNavItem = navItems.item(3);

    await element.updateComplete;
    // Test that the nav item is active
    expect(testNavItem.hasAttribute('active')).to.be.true;

    pfeJumpLinksNav.inactive(3);

    // Test that the nav item is reset to inactive
    expect(testNavItem.hasAttribute('active')).to.be.false;
  });

  it(`its clearActive() method should remove the active attribute from the target`, async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;

    // Make the 3rd item active
    Promise.all([customElements.whenDefined('pfe-jump-links-nav')]).then(async function() {
      pfeJumpLinksNav.active(3);
    });

    await element.updateComplete;
    const navItems = pfeJumpLinksNav.shadowRoot!.querySelectorAll('.pfe-jump-links-nav__item');
    const testNavItem = navItems.item(3);

    await element.updateComplete;
    // Test that the nav item is active
    expect(testNavItem.hasAttribute('active')).to.be.true;

    pfeJumpLinksNav.clearActive();

    // Test that the nav item is reset to inactive
    expect(testNavItem.hasAttribute('active')).to.be.false;
  });

  it(`its clearActive() method should remove the active attribute from the target`, async function() {
    const pfeJumpLinksNav = element.querySelector('pfe-jump-links-nav')!;

    // Make the 3rd item active
    Promise.all([customElements.whenDefined('pfe-jump-links-nav')]).then(async function() {
      pfeJumpLinksNav.active(3);
    });

    await element.updateComplete;
    const navItems = pfeJumpLinksNav.shadowRoot!.querySelectorAll('.pfe-jump-links-nav__item');
    const testNavItem = navItems.item(3);

    await element.updateComplete;
    // Test that the nav item is active
    expect(testNavItem.hasAttribute('active')).to.be.true;

    // Test that the nav item is reset to inactive
    expect(pfeJumpLinksNav.getActive()).to.not.equal(3);
  });

  it('should default to an offset value of 0', async function() {
    const nav = element.querySelector('pfe-jump-links-nav')!;
    expect(nav.offsetValue).to.equal(0);
  });

  it(`should fire a pfe-jump-links-panel:active-navItem when makeActive() is called`, async function() {
    const el = element.querySelector('pfe-jump-links-nav')!;
    const handlerSpy = spy();

    el.addEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);

    // Make the first item active
    await customElements.whenDefined('pfe-jump-links-nav');

    el.active(1);

    await element.updateComplete;
    const [event] = handlerSpy.getCall(0).args;
    expect(handlerSpy).to.have.been.calledOnce;

    // Assert that the event sends activeNavItem
    expect(event.detail.activeNavItem).to.be.ok;

    // reset
    el.removeEventListener('pfe-jump-links-panel:active-navItem', handlerSpy);
  });

  it('should make the appropriate nav item active when scrolled', async function() {
    const wait = (el: HTMLElement) => setTimeout(async function() {
      expect(el.hasAttribute('active')).to.be.true;
    }, 1000);

    const nav = document.querySelector('pfe-jump-links-nav')!;
    const navItems = nav.shadowRoot!.querySelectorAll('.pfe-jump-links-nav__item');

    const testNavItem = navItems.item(5) as HTMLElement;

    testNavItem.click();

    wait(testNavItem);
  });

  it('should update the offset value when the offset attribute is used', async function() {
    const nav = element.querySelector('pfe-jump-links-nav')!;

    nav.setAttribute('offset', '400');

    await customElements.whenDefined('pfe-jump-links-nav');
    expect(nav.offsetValue).to.equal(400);
  });

  it('should update the offset value when the offset property is updated', async function() {
    const nav = element.querySelector('pfe-jump-links-nav')!;

    nav.offset = 400;

    await customElements.whenDefined('pfe-jump-links-nav');
    await element.updateComplete;
    expect(nav.offsetValue).to.equal(400);
  });

  it(`should update the offset value when the --pfe-jump-links--offset CSS property is used`, async function() {
    const nav = element.querySelector('pfe-jump-links-nav')!;
    await customElements.whenDefined('pfe-jump-links-nav');
    await element.updateComplete;

    nav.setAttribute('style', '--pfe-jump-links--offset: 100');

    await element.updateComplete;
    expect(nav.offsetValue).to.equal(100);
  });

  it(`should use the offset attribute instead of --pfe-jump-links--offset CSS property if they are both used`, async function() {
    const nav = element.querySelector('pfe-jump-links-nav')!;

    nav.setAttribute('style', '--pfe-jump-links-panel--offset: 100');
    nav.setAttribute('offset', '500');

    await element.updateComplete;
    await customElements.whenDefined('pfe-jump-links-nav');
    expect(nav.offsetValue).to.equal(500);
  });

  describe('<pfe-jump-links-panel>', function() {
    it('should upgrade', async function() {
      const panel = element.querySelector('pfe-jump-links-panel');
      expect(panel, 'the <pfe-jump-links-panel> should be an instance of PfeJumpLinksPanel')
        .to.be.an.instanceof(customElements.get('pfe-jump-links-panel'))
        .and
        .to.be.an.instanceof(PfeJumpLinksPanel);
    });
  });
});
