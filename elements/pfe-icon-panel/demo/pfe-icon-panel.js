import '@patternfly/pfe-band';
import '@patternfly/pfe-icon-panel';
import '@patternfly/pfe-cta';

const PfeIcon = customElements.get('pfe-icon');

PfeIcon.addIconSet(
  'local',
  '/elements/pfe-icon/demo/',
  function(name, iconSetName, iconSetPath) {
    const regex = new RegExp(`^${iconSetName}-(.*)`);
    const [, match] = regex.exec(name);
    return `${iconSetPath}${match}.svg`;
  }
);
