import PfeIcon from "../dist/pfe-icon";

Promise.all([customElements.whenDefined("pfe-icon")]).then(function() {
  PfeIcon.addIconSet(
    "rh",
    "https://static.redhat.com/libs/redhat/rh-iconfont/latest/svg",
    function resolveIconName(name, iconSetName, iconSetPath) {
      var regex = new RegExp("^" + iconSetName + "-((rh|web)-(.+))");
      var match = regex.exec(name);
      var iconId = match[2] + "-icon-" + match[3].replace("icon-", "");
      return iconSetPath + "/" + iconId + ".svg";
    }
  );
});
