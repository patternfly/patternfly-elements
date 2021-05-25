var docHead = document.querySelector("head");
var modernizrScript = document.createElement("script");
modernizrScript.setAttribute(
  "src",
  "https://web-dev-drupal-webux1.dev.a1.vary.redhat.com/profiles/rh/themes/redhatdotcom/js/modernizr.min.js?qr9b8w"
);
docHead.prepend(modernizrScript);

document.addEventListener("DOMContentLoaded", function() {
  var linkTag = document.createElement("link");
  linkTag.setAttribute("rel", "stylesheet");
  linkTag.setAttribute("media", "all");
  linkTag.setAttribute(
    "href",
    "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-navigation/dist/pfe-navigation--lightdom.css"
  );
  docHead.append(linkTag);

  var scriptTag = document.createElement("script");
  // scriptTag.setAttribute('type', 'module');
  scriptTag.setAttribute(
    "src",
    "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-navigation/dist/pfe-navigation.umd.js"
  );
  docHead.append(scriptTag);
});
