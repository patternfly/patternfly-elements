const addButton = document.querySelector('#add');
const removeButton = document.querySelector('#delete');
const tabs = document.querySelector('pf-tabs');

addButton.addEventListener('click', () => {
  const tab = document.createElement('pf-tab');
  tab.textContent = 'Tab';
  tab.setAttribute('slot', 'tab');
  const panel = document.createElement('pf-tab-panel');
  panel.textContent = 'Panel';

  tabs.appendChild(tab);
  tabs.appendChild(panel);
});

removeButton.addEventListener('click', () => {
  const lastTab = tabs.querySelector('pf-tab:last-of-type');
  const lastPanel = tabs.querySelector('pf-tab-panel:last-of-type');

  tabs.removeChild(lastTab);
  tabs.removeChild(lastPanel);
});

