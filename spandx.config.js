module.exports = {
  host: {
    local: "local.foo.redhat.com",
    qa: "qa.foo.redhat.com",
    dev: "dev.foo.redhat.com",
    stage: "stage.foo.redhat.com",
    prod: "prod.foo.redhat.com",
    devApi: "api.dev.foo.redhat.com",
    qaApi: "api.qa.foo.redhat.com",
    stageApi: "api.stage.foo.redhat.com",
    prodApi: "api.prod.foo.redhat.com"
  },
  proxy: {
    host: "http://squid.corp.redhat.com:3128",
    pattern: "^https://(.*?).redhat.com"
  },
  port: 1337,
  verbose: false,
  bs: {
    https: true
  },
  routes: {
    // "/webassets/avalon/j/includes/ieSVGfix.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@cpelements/rh-site-switcher/dist/site-switcher.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-icon/dist/pfe-icon.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-card/dist/pfe-card.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-cta/dist/pfe-cta.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-progress-indicator/dist/pfe-progress-indicator.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-primary-detail/dist/pfe-primary-detail.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-avatar/dist/pfe-avatar.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@cpelements/cp-search-autocomplete/dist/cp-search-autocomplete.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-button/dist/pfe-button.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/public_modules/node_modules/@patternfly/pfe-autocomplete/dist/pfe-autocomplete.umd.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/lib/introjs.min.js": "./thingstuff.js",
    // "/webassets/avalon/j/bower_components/moment/moment.js": "./thingstuff.js",
    // "/webassets/avalon/j/includes/rhn-modal.js": "./thingstuff.js",
    // "/webassets/avalon/j/includes/status-widget.js": "./thingstuff.js",
    // "/webassets/avalon/j/includes/avatars.js": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",
    // "": "./thingstuff.js",

    // "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation/dist/pfe-navigation.umd.min.js": "./thingstuff.js",
    "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation": "./elements/pfe-navigation",

    // "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation-account/dist/pfe-navigation-account.umd.min.js": "./thingstuff.js",
    "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation-account": "./elements/pfe-navigation-account",
    // "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation-account/dist/pfe-navigation-account.umd.min.js": "./elements/pfe-navigation-account/dist/pfe-navigation-account.umd.js",

    "/webassets/avalon/j/public_modules/node_modules/@cpelements/pfe-navigation/dist/ie-polyfills.js": "./elements/pfe-navigation/dist/ie-polyfills.js",

    // "/webassets/avalon/j/data.json": "./data.json",
    "/api": {
      host: "https://access.redhat.com"
    },
    "/sites/default/files": {
      host: "https://access.redhat.com"
    },
    // "/api/assembly": {
    //   host: "https://pantheon.corp.qa.redhat.com"
    // },
    // "/webassets": {
    //   host: "https://access.redhat.com"
    // },
    // "/chrome_themes": {
    //   host: "https://access.redhat.com"
    // },
    // "/imageassets": {
    //   host: "https://pantheon.corp.qa.redhat.com"
    // },

    // Route a URL path to an app server.
    // This is most useful for testing local files (esp JS and CSS) against
    // a remote QA or production server.
    "/": {
      host: {
        local: "http://access.local.redhat.com",
        dev: "https://access.devgssci.devlab.phx1.redhat.com",
        devApi: "https://api.access.devgssci.devlab.phx1.redhat.com",
        qa: "https://access.qa.redhat.com",
        qaApi: "https://api.access.qa.redhat.com",
        stage: "https://access.stage.redhat.com",
        stageApi: "https://api.access.stage.redhat.com",
        prod: "https://access.redhat.com",
        prodApi: "https://api.access.redhat.com"
      }
    }
  }
};
