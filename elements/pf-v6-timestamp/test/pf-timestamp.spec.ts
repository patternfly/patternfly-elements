import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6Timestamp } from '@patternfly/elements/pf-v6-timestamp/pf-v6-timestamp.js';

describe('<pf-v6-timestamp>', function() {
  let element: PfV6Timestamp;

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-timestamp')).to.be.an.instanceof(PfV6Timestamp);
  });

  describe('with no attributes', function() {
    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp></pf-v6-timestamp>
      `);
    });

    it('should be an instance of PfV6Timestamp', function() {
      expect(element)
          .to.be.an.instanceof(customElements.get('pf-v6-timestamp'))
          .and
          .to.be.an.instanceof(PfV6Timestamp);
    });

    it('shows the current date with default formatting', function() {
      const expected = new Date().toLocaleString();
      expect(element.time).to.equal(expected);
    });

    it('is accessible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.have.property('children');
    });
  });

  describe('with a specific date', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}"></pf-v6-timestamp>
      `);
    });

    it('exposes the correct ISO string', function() {
      const expected = new Date(dateString).toISOString();
      expect(element.isoString).to.equal(expected);
    });

    it('shows the date with default formatting', function() {
      expect(element.time).to.equal(new Date(dateString).toLocaleString());
    });
  });

  describe('with date-format="full" and time-format="short"', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" date-format="full" time-format="short"></pf-v6-timestamp>
      `);
    });

    it('shows custom formatting', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with date-format="full" only', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" date-format="full"></pf-v6-timestamp>
      `);
    });

    it('shows only the date', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { dateStyle: 'full' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with time-format="short" only', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" time-format="short"></pf-v6-timestamp>
      `);
    });

    it('shows only the time', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { timeStyle: 'short' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with customFormat property', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'short',
      weekday: 'short',
      day: 'numeric',
      hour: 'numeric',
    };

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" .customFormat=${options}></pf-v6-timestamp>
      `);
    });

    it('shows custom formatting', function() {
      const expected = new Date(dateString).toLocaleString('en-US', options);
      expect(element.time).to.equal(expected);
    });
  });

  describe('with display-suffix', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';
    const suffix = 'US Eastern';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" display-suffix="${suffix}"></pf-v6-timestamp>
      `);
    });

    it('appends the suffix to the display', function() {
      const expected = `${new Date(dateString).toLocaleString('en-US')} ${suffix}`;
      expect(element.time).to.equal(expected);
    });
  });

  describe('with hour-cycle="h23"', function() {
    const dateString = 'Sat Jan 01 2022 13:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" hour-cycle="h23"></pf-v6-timestamp>
      `);
    });

    it('shows 24-hour time', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { hourCycle: 'h23' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with hour-cycle="h12"', function() {
    const dateString = 'Sat Jan 01 2022 13:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" hour-cycle="h12"></pf-v6-timestamp>
      `);
    });

    it('shows 12-hour time', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { hourCycle: 'h12' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with locale="en-GB"', function() {
    beforeEach(async function() {
      const date = new Date(2022, 1, 1).toString();
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${date}" locale="en-GB"></pf-v6-timestamp>
      `);
    });

    it('formats using the specified locale', function() {
      const date = new Date(2022, 1, 1).toString();
      const expected = new Date(date).toLocaleString('en-GB');
      expect(element.time).to.equal(expected);
    });
  });

  describe('with locale="en-US"', function() {
    beforeEach(async function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${date}" locale="en-US"></pf-v6-timestamp>
      `);
    });

    it('uses locale default hour cycle', function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      const expected = new Date(date).toLocaleString('en-US');
      expect(element.time).to.equal(expected);
    });
  });

  describe('with locale="en-US" and hour-cycle="h23"', function() {
    beforeEach(async function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${date}" locale="en-US" hour-cycle="h23"></pf-v6-timestamp>
      `);
    });

    it('shows 24-hour time', function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      const expected = new Date(date).toLocaleString('en-US', { hourCycle: 'h23' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with locale="en-GB" and hour-cycle="h12"', function() {
    beforeEach(async function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${date}" locale="en-GB" hour-cycle="h12"></pf-v6-timestamp>
      `);
    });

    it('shows 12-hour time for a 24-hour locale', function() {
      const date = new Date(2022, 1, 1, 13, 0).toString();
      const expected = new Date(date).toLocaleString('en-GB', { hourCycle: 'h12' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with relative', function() {
    describe('and a current date', function() {
      beforeEach(async function() {
        const date = new Date();
        element = await createFixture<PfV6Timestamp>(html`
          <pf-v6-timestamp date="${date.toString()}" relative></pf-v6-timestamp>
        `);
      });

      it('shows "just now"', function() {
        expect(element.time).to.match(/just now/);
      });
    });

    describe('and a past date', function() {
      beforeEach(async function() {
        const date = new Date(2015, 7, 9, 14, 57, 0);
        element = await createFixture<PfV6Timestamp>(html`
          <pf-v6-timestamp date="${date.toString()}" relative></pf-v6-timestamp>
        `);
      });

      it('shows relative time in the past', function() {
        expect(element.time).to.match(/\d+ years ago/);
      });
    });

    describe('and a future date', function() {
      beforeEach(async function() {
        const date = new Date(2099, 7, 9, 14, 57, 0);
        element = await createFixture<PfV6Timestamp>(html`
          <pf-v6-timestamp date="${date.toString()}" relative></pf-v6-timestamp>
        `);
      });

      it('shows relative time in the future', function() {
        expect(element.time).to.match(/in \d+ years/);
      });
    });
  });

  describe('with slotted content', function() {
    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="Tue Aug 09 2022 14:57:00 GMT-0400">2 days ago</pf-v6-timestamp>
      `);
    });

    it('displays the slotted content', function() {
      expect(element.textContent).to.include('2 days ago');
    });

    it('still exposes the correct isoString', function() {
      const date = new Date('Tue Aug 09 2022 14:57:00 GMT-0400');
      expect(element.isoString).to.equal(date.toISOString());
    });

    it('is accessible with a time element in the tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.have.property('children');
    });
  });

  describe('with time-zone="UTC"', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" time-zone="UTC"></pf-v6-timestamp>
      `);
    });

    it('displays UTC time', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { timeZone: 'UTC' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('with time-zone="UTC" and display-suffix="UTC"', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" time-zone="UTC" display-suffix="UTC"></pf-v6-timestamp>
      `);
    });

    it('displays UTC time with suffix', function() {
      const expected = `${new Date(dateString).toLocaleString('en-US', { timeZone: 'UTC' })} UTC`;
      expect(element.time).to.equal(expected);
    });
  });

  describe('with time-zone="America/New_York"', function() {
    const dateString = 'Sat Jan 01 2022 12:00:00 GMT+0000';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}" time-zone="America/New_York"></pf-v6-timestamp>
      `);
    });

    it('displays time in the specified timezone', function() {
      const expected = new Date(dateString).toLocaleString('en-US', { timeZone: 'America/New_York' });
      expect(element.time).to.equal(expected);
    });
  });

  describe('date property round-trips as ISO string', function() {
    const dateString = 'Sat Jan 01 2022 00:00:00';

    beforeEach(async function() {
      element = await createFixture<PfV6Timestamp>(html`
        <pf-v6-timestamp date="${dateString}"></pf-v6-timestamp>
      `);
    });

    it('returns ISO string from date getter', function() {
      const expected = new Date(dateString).toISOString();
      expect(element.date).to.equal(expected);
    });

    it('date getter matches isoString', function() {
      expect(element.date).to.equal(element.isoString);
    });
  });
});
