const { shadowRoot } = document.querySelector('[data-demo="pfe-tabs"]');

const contextBand = shadowRoot.querySelector('#context-band');
const contextSelect = shadowRoot.querySelector('pfe-select');

const btn = shadowRoot.querySelector('#addTabAndPanelBtn');
const pfeTabs = shadowRoot.querySelector('#dynamic');

const pfeTabLabels = pfeTabs.querySelectorAll('pfe-tab');
let pfeTabCount = pfeTabLabels.length;

const dynamicTextTab = shadowRoot.querySelector('#dynamicTextTab');
const dynamicTextPanel = shadowRoot.querySelector('#dynamicTextPanel');
const additionalTabTextInput = shadowRoot.querySelector('#additional-tab-text');
const additionalPanelTextInput = shadowRoot.querySelector('#additional-panel-text');

contextSelect.addEventListener('pfe-select:change', function(event) {
  switch (event.detail.value) {
    case 'dark':
      contextBand.setAttribute('color', 'darkest');
      break;
    case 'saturated':
      contextBand.setAttribute('color', 'accent');
      break;
    default:
      contextBand.setAttribute('color', 'lightest');
      break;
  }
});

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
