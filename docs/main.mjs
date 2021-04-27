import PfeIcon from  "@patternfly/pfe-icon/dist/pfe-icon.min";

PfeIcon.addIconSet(
  "fas",
  "/icons/font-awesome/solid",
  (iconName, setName, path) => {
    const name = iconName.replace("fas-", "");
    return `${path}/${name}.svg`;
  }
);