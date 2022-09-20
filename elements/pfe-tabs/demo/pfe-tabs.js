import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-jump-links';
import '@patternfly/pfe-select';
import '@patternfly/pfe-tabs';

const root = document.querySelector('[data-demo="pfe-tabs"]')?.shadowRoot ?? document;

const btn = root.querySelector('#addTabAndPanelBtn');
const pfeTabs = root.querySelector('#dynamic');

const pfeTabLabels = pfeTabs.querySelectorAll('pfe-tab');
let pfeTabCount = pfeTabLabels.length;

const dynamicTextTab = root.querySelector('#dynamicTextTab');
const dynamicTextPanel = root.querySelector('#dynamicTextPanel');
const additionalTabTextInput = root.querySelector('#additional-tab-text');
const additionalPanelTextInput = root.querySelector('#additional-panel-text');

btn.addEventListener('click', function() {
  const fragment = document.createDocumentFragment();

  const tab = document.createElement('pfe-tab');
  tab.setAttribute('role', 'heading');
  tab.setAttribute('slot', 'tab');
  tab.textContent = `Tab ${++pfeTabCount} (new)`;

  const panel = document.createElement('pfe-tab-panel');
  panel.setAttribute('role', 'region');
  panel.setAttribute('slot', 'panel');
  panel.innerHTML = `<h3>New tab in panel #${pfeTabCount}</h3><p>New tab panel</p>`;

  fragment.appendChild(tab);
  fragment.appendChild(panel);
  pfeTabs.appendChild(fragment);
});

additionalTabTextInput.addEventListener('change', function(event) {
  dynamicTextTab.innerHTML += ` ${event.target.value}`;
  event.target.value = '';
});

additionalPanelTextInput.addEventListener('change', function(event) {
  dynamicTextPanel.innerHTML += ` <p>${event.target.value}</p>`;
  event.target.value = '';
});
