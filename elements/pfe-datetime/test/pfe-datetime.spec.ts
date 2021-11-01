import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeDatetime } from '@patternfly/pfe-datetime';

describe('<pfe-datetime>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeDatetime>(`<pfe-datetime></pfe-datetime>`);
    expect(element, 'the <pfe-datetime> should be an instance of PfeDatetime')
      .to.be.an.instanceof(customElements.get('pfe-datetime'))
      .and
      .to.be.an.instanceof(PfeDatetime);
  });

  it('should show a simple date format if just a datetime attribute is provided', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="simple" datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    expect(text, 'should just show a simple date').to.equal('1/2/2006');
  });

  it('should show a formatted date', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="justdate"
          type="local"
          day="numeric"
          month="long"
          year="numeric"
          locale="en-US"
          datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    expect(text, 'should show a formatted date').to.equal('January 2, 2006');
  });

  it('should show a formatted date with time', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="withtime"
          type="local"
          weekday="long"
          month="short"
          day="2-digit"
          year="numeric"
          hour="2-digit"
          minute="2-digit"
          second="2-digit"
          locale="en-US"
          datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const { textContent } = element.shadowRoot!.querySelector('span')!;
    const regex = /.*?, .*?, \d{4}, \d+:\d+:\d+ .{2}/;

    expect(regex.test(textContent!), 'should show a formatted date with time')
      .to.be.true;
  });

  it('should show a relative time since the date', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="yearsago" type="relative" datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    await element.updateComplete;

    expect(text, 'should show a relative time since the date')
      .to.match(/\d+ years ago/);
  });

  it('unix timestamp should convert and display properly', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="simpleUnixtime" timestamp="1136214245">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    expect(text, 'should show a relative time since the date').to.equal('1/2/2006');
  });

  it('should show a formatted date with time for a different locale', async function() {
    const element = await createFixture<PfeDatetime>(html`
      <pfe-datetime id="esLocale"
          type="local"
          weekday="long"
          month="short"
          day="2-digit"
          year="numeric"
          locale="es"
          datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    expect(text, 'should show a (locally) formatted date with time')
      .to.equal('lunes, 02 de ene de 2006');
  });

  it('should show formatted date for a specified time zone', async function() {
    const element = await createFixture<PfeDatetime>(`
      <pfe-datetime
        id="withTimeZone"
        time-zone="UTC"
        time-zone-name="short"
        datetime="Mon Jan 2 15:04:05 EST 2006">
        Mon Jan 2 15:04:05 EST 2006
      </pfe-datetime>`);
    const text = element.shadowRoot!.querySelector('span')!.textContent;

    expect(text, 'should show a formatted date for a specified time zone')
      .to.equal('1/2/2006, UTC');
  });
});
