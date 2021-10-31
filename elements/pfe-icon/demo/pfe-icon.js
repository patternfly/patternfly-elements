import { printIcons } from './icon-sets.js';

const PfeIcon = customElements.get('pfe-icon');

const { shadowRoot: root } = document.querySelector('[data-demo="pfe-icon"]');

const colors = {
  standard: [
     'accent'
    , 'base'
    , 'complement'
    , 'critical'
    , 'darker'
    , 'darkest'
    , 'important'
    , 'info'
    , 'lightest'
    , 'moderate'
    , 'success'
  ],
  custom: ["#7551a6", "#820000", "#004080", "#75a117"],
};

PfeIcon.addIconSet(
  'local',
  '/elements/pfe-icon/demo/',
  function (name, iconSetName, iconSetPath) {
    const regex = new RegExp(`^${iconSetName}-(.*)`);
    const [, match] = regex.exec(name);
    return `${iconSetPath}${match}.svg`;
  }
);

colors.standard = colors.standard.filter(function (c) {
  return !["lightest", "base"].includes(c);
});

root.querySelector("#rh-icons").appendChild(printIcons("rh", colors.standard.concat(colors.custom),
  0,
  "3x"), false);

root.querySelector("#web-icons").appendChild(printIcons("web", colors.standard.concat(colors
    .custom), 0,
  "2x", false));

for (const section of root.querySelectorAll(".circled-icons") )
  section.appendChild(printIcons("rh", colors.standard, 12, "lg", true));
