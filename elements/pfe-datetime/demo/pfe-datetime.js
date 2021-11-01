import '@patternfly/pfe-band';
import '@patternfly/pfe-datetime';

const root = document.querySelector('[data-demo="pfe-datetime"]')?.shadowRoot ?? document;

const realtime = root.getElementById('realtime');
const relative1 = root.getElementById('minutesago');
const relative2 = root.getElementById('hoursuntil');
const relative3 = root.getElementById('daysuntil');

relative1.setAttribute('datetime', new Date(Date.now() - 600000).toString());
relative2.setAttribute('datetime', new Date(Date.now() + 6000000).toString());
relative3.setAttribute('datetime', new Date(Date.now() + 200000000).toString());

function timer() {
  realtime.setAttribute('datetime', new Date());
  requestAnimationFrame(timer);
}

requestAnimationFrame(timer);
