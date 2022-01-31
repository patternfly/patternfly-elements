import '@patternfly/pfe-band';
import '@patternfly/pfe-card';
import '@patternfly/pfe-icon';

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
