function createIcon(iconName, color, size, circled) {
  if (typeof circled === "undefined") {
    circled = false;
  }
  var icon = document.createElement("pfe-icon");
  if (/^#/.exec(color)) {
    icon.style.setProperty("--pfe-icon--color", color);
  } else {
    icon.setAttribute("color", color);
  }

  if (size) {
    icon.setAttribute("size", size);
  }

  if (circled) {
    icon.setAttribute("circled", "");
  }

  icon.setAttribute("icon", iconName);
  return icon;
}

function printIcons(setName, colors, subset, size, circled) {
  var fragment = document.createDocumentFragment();
  icons[setName].map(function (iconName, itr, arr) {
    if ((subset > 0 && itr < subset) || subset == 0) {
      const iconEl = createIcon(iconName, getColor(itr, colors), size, circled);
      fragment.appendChild(iconEl);
    }
  });
  return fragment;
}

function getColor(itr, colors) {
  var iterator = itr % colors.length;
  return colors[iterator];
}

const icons = {
  web: [
    "web-icon-alert-danger",
    "web-icon-alert-default",
    "web-icon-alert-info",
    "web-icon-alert-success",
    "web-icon-alert-warning",
    "web-icon-arrow-right",
    "web-icon-call",
    "web-icon-caret-down",
    "web-icon-caret-left",
    "web-icon-caret-right",
    "web-icon-caret-thin-down",
    "web-icon-caret-thin-left",
    "web-icon-caret-thin-right",
    "web-icon-caret-thin-up",
    "web-icon-caret-up",
    "web-icon-cart",
    "web-icon-check",
    "web-icon-chevron",
    "web-icon-close",
    "web-icon-contact",
    "web-icon-contact2",
    "web-icon-copy",
    "web-icon-dashboard",
    "web-icon-envelope",
    "web-icon-facebook",
    "web-icon-fax",
    "web-icon-github",
    "web-icon-globe",
    "web-icon-gplus",
    "web-icon-grid-3x3",
    "web-icon-grid",
    "web-icon-instagram",
    "web-icon-key",
    "web-icon-laptop",
    "web-icon-link",
    "web-icon-linkedin",
    "web-icon-list-form",
    "web-icon-list",
    "web-icon-mobile-menu",
    "web-icon-new-window",
    "web-icon-open-quote",
    "web-icon-open",
    "web-icon-plus",
    "web-icon-print",
    "web-icon-reddit",
    "web-icon-rss",
    "web-icon-search",
    "web-icon-tab-arrow",
    "web-icon-tumblr",
    "web-icon-twitter",
    "web-icon-upload",
    "web-icon-user",
    "web-icon-youtube",
    "web-icon-youtube2",
  ],
  rh: [
    "rh-icon-aed",
    "rh-icon-agile-integration",
    "rh-icon-agile",
    "rh-icon-airplane",
    "rh-icon-alert-downtime",
    "rh-icon-api",
    "rh-icon-app-b",
    "rh-icon-app-containerized",
    "rh-icon-app-mobile",
    "rh-icon-app-on-server",
    "rh-icon-app-secured",
    "rh-icon-app-unsecured",
    "rh-icon-application-alt",
    "rh-icon-application-mobile",
    "rh-icon-application-window",
    "rh-icon-application",
    "rh-icon-apps-multiple-secured",
    "rh-icon-apps-multiple-unsecured",
    "rh-icon-apps-multiple",
    "rh-icon-architect",
    "rh-icon-arrows-directional",
    "rh-icon-arrows-lower-cost",
    "rh-icon-arrows-simplify",
    "rh-icon-atom",
    "rh-icon-automation",
    "rh-icon-award-ribbon",
    "rh-icon-backlog",
    "rh-icon-bar-graph",
    "rh-icon-battery",
    "rh-icon-beaker",
    "rh-icon-beer-glasses",
    "rh-icon-belt",
    "rh-icon-bike",
    "rh-icon-binoculars",
    "rh-icon-bird",
    "rh-icon-blueprint",
    "rh-icon-book",
    "rh-icon-box-open",
    "rh-icon-brain",
    "rh-icon-burndown-chart",
    "rh-icon-bus-front-view",
    "rh-icon-bus-side-view",
    "rh-icon-calculator",
    "rh-icon-calendar",
    "rh-icon-can",
    "rh-icon-capitol-building",
    "rh-icon-car",
    "rh-icon-cardboardrecycling",
    "rh-icon-carrot",
    "rh-icon-catalog-selfservice",
    "rh-icon-cd-disk",
    "rh-icon-ceo-business-leader",
    "rh-icon-check-yes",
    "rh-icon-cheeseburger",
    "rh-icon-cio-itdm",
    "rh-icon-circle-sphere",
    "rh-icon-circuit",
    "rh-icon-city",
    "rh-icon-clock-time-pass",
    "rh-icon-clock",
    "rh-icon-cloud-admin",
    "rh-icon-cloud-deploy",
    "rh-icon-cloud-inspect",
    "rh-icon-cloud-migration",
    "rh-icon-cloud-mobile",
    "rh-icon-cloud-multi",
    "rh-icon-cloud-native-development",
    "rh-icon-cloud-private",
    "rh-icon-cloud-secured",
    "rh-icon-cloud-unsecured",
    "rh-icon-cloud",
    "rh-icon-cluster",
    "rh-icon-code",
    "rh-icon-collaboration",
    "rh-icon-command",
    "rh-icon-compass",
    "rh-icon-competitive-analysis",
    "rh-icon-complexity",
    "rh-icon-compost",
    "rh-icon-construction-hard-hat",
    "rh-icon-container-library",
    "rh-icon-container-microservice",
    "rh-icon-container-private",
    "rh-icon-container-registry",
    "rh-icon-container-secured",
    "rh-icon-container-unsecured",
    "rh-icon-container",
    "rh-icon-containerized-app",
    "rh-icon-control-panel",
    "rh-icon-covered-dish",
    "rh-icon-create-cloud",
    "rh-icon-credit-card",
    "rh-icon-cross-functional-collaboration",
    "rh-icon-cross",
    "rh-icon-cube",
    "rh-icon-cup",
    "rh-icon-customer-snapshot",
    "rh-icon-data",
    "rh-icon-datacenter-alt1",
    "rh-icon-datacenter",
    "rh-icon-desk-chair",
    "rh-icon-desk",
    "rh-icon-desktop",
    "rh-icon-developer",
    "rh-icon-development-model",
    "rh-icon-devops",
    "rh-icon-digital-standup",
    "rh-icon-disruption",
    "rh-icon-dna",
    "rh-icon-dollar-sign",
    "rh-icon-download",
    "rh-icon-eBook",
    "rh-icon-ear",
    "rh-icon-edge",
    "rh-icon-electrical-plug",
    "rh-icon-electrical",
    "rh-icon-elevator-up-down",
    "rh-icon-email",
    "rh-icon-emergency-aed",
    "rh-icon-emergency-use-stairs",
    "rh-icon-enclave",
    "rh-icon-enclave2",
    "rh-icon-envelope-back",
    "rh-icon-envelope-manilla",
    "rh-icon-envelope",
    "rh-icon-erlenmeyer-flask",
    "rh-icon-everything-as-a-service",
    "rh-icon-ewaste-recycling",
    "rh-icon-ex-no",
    "rh-icon-fan",
    "rh-icon-fast-car",
    "rh-icon-fast-jet",
    "rh-icon-feather",
    "rh-icon-finance",
    "rh-icon-fire-extinguisher",
    "rh-icon-flag",
    "rh-icon-folder-open",
    "rh-icon-folder",
    "rh-icon-forklift",
    "rh-icon-frame",
    "rh-icon-funnel",
    "rh-icon-gateway",
    "rh-icon-gear",
    "rh-icon-gears",
    "rh-icon-gift-box",
    "rh-icon-gitops",
    "rh-icon-glass-bottle",
    "rh-icon-glass-recycling",
    "rh-icon-global-ecosystem",
    "rh-icon-globe-abstract",
    "rh-icon-globe-atlantic",
    "rh-icon-globe-pacific",
    "rh-icon-globe",
    "rh-icon-government",
    "rh-icon-gpu",
    "rh-icon-graduation-cap",
    "rh-icon-graph-arrow-up",
    "rh-icon-graph-exponential-down",
    "rh-icon-graph-exponential-up",
    "rh-icon-graph-steady-down",
    "rh-icon-graph-steady-up",
    "rh-icon-grooming",
    "rh-icon-hand-closed",
    "rh-icon-hand-open",
    "rh-icon-hand-pointing",
    "rh-icon-hand-thumbs-up",
    "rh-icon-handicapped-accessible",
    "rh-icon-handshake",
    "rh-icon-health-vertical",
    "rh-icon-heart-monitor",
    "rh-icon-heart",
    "rh-icon-help-desk",
    "rh-icon-home",
    "rh-icon-host",
    "rh-icon-hosting-support",
    "rh-icon-hourglass",
    "rh-icon-hybrid-cloud-infrastructure",
    "rh-icon-hypervisor",
    "rh-icon-icecaps-mountain",
    "rh-icon-increase-productivity",
    "rh-icon-industry",
    "rh-icon-info-alt",
    "rh-icon-info",
    "rh-icon-install",
    "rh-icon-instructor",
    "rh-icon-insurance",
    "rh-icon-interoperable-cross-platform",
    "rh-icon-it-optimization",
    "rh-icon-kanban",
    "rh-icon-key",
    "rh-icon-keyboard",
    "rh-icon-kiosk",
    "rh-icon-kubernetes-pod",
    "rh-icon-lab-flask",
    "rh-icon-lab",
    "rh-icon-laptop-video-call",
    "rh-icon-laptop",
    "rh-icon-leaf",
    "rh-icon-life-vest",
    "rh-icon-lifecycle",
    "rh-icon-lifestyle",
    "rh-icon-lightbulb-energy-efficient",
    "rh-icon-lightbulb-traditional",
    "rh-icon-lock",
    "rh-icon-locked",
    "rh-icon-lower-cost-euro",
    "rh-icon-lower-cost-pound",
    "rh-icon-lower-cost-yen",
    "rh-icon-lower-cost",
    "rh-icon-mail",
    "rh-icon-mainframe",
    "rh-icon-management-and-automation",
    "rh-icon-management-checklist",
    "rh-icon-management",
    "rh-icon-map-treasure",
    "rh-icon-maze",
    "rh-icon-media-clapboard",
    "rh-icon-megaphone",
    "rh-icon-message-oriented-middleware",
    "rh-icon-microphone",
    "rh-icon-microservices",
    "rh-icon-migration",
    "rh-icon-mobile-devices",
    "rh-icon-mobile-user",
    "rh-icon-money-stack",
    "rh-icon-money",
    "rh-icon-monitor",
    "rh-icon-mothers-room",
    "rh-icon-mouse",
    "rh-icon-moving",
    "rh-icon-mug",
    "rh-icon-multiply",
    "rh-icon-music-note",
    "rh-icon-network-community",
    "rh-icon-network-personal",
    "rh-icon-network-switch",
    "rh-icon-network",
    "rh-icon-ninja-star",
    "rh-icon-no-drink",
    "rh-icon-no-food",
    "rh-icon-no-smoking",
    "rh-icon-noise-isolation",
    "rh-icon-noise",
    "rh-icon-notepad",
    "rh-icon-nunchucks",
    "rh-icon-odor",
    "rh-icon-office-building-smb",
    "rh-icon-office-cart",
    "rh-icon-office-chair",
    "rh-icon-office-desk",
    "rh-icon-office-mobility",
    "rh-icon-office-reception",
    "rh-icon-ohc-cloud-apps",
    "rh-icon-ohc-hybrid-cloud",
    "rh-icon-ohc-iaas",
    "rh-icon-ohc-paas",
    "rh-icon-ohc-private-cloud",
    "rh-icon-ohc-public-cloud",
    "rh-icon-open-source",
    "rh-icon-operations",
    "rh-icon-orchestration",
    "rh-icon-organization",
    "rh-icon-packing",
    "rh-icon-paper-case-study",
    "rh-icon-paper-checklist",
    "rh-icon-paper-infographic",
    "rh-icon-paper-lined",
    "rh-icon-paper-report",
    "rh-icon-paper-solution",
    "rh-icon-paper-stack-blank",
    "rh-icon-paper-stack-lined",
    "rh-icon-paper",
    "rh-icon-paperrecycling",
    "rh-icon-parking",
    "rh-icon-partner-map",
    "rh-icon-pen",
    "rh-icon-pencil",
    "rh-icon-phone-land-line",
    "rh-icon-phone-mobile",
    "rh-icon-photo-frame-family",
    "rh-icon-piggy-bank",
    "rh-icon-planning",
    "rh-icon-plastic-bottle",
    "rh-icon-platform",
    "rh-icon-podium-speakers",
    "rh-icon-policy",
    "rh-icon-price-label",
    "rh-icon-printer-3d",
    "rh-icon-printer-copier",
    "rh-icon-process-improvement",
    "rh-icon-process",
    "rh-icon-processor",
    "rh-icon-progression-linear",
    "rh-icon-progression",
    "rh-icon-protected",
    "rh-icon-puzzle-complete",
    "rh-icon-puzzle-piece",
    "rh-icon-pyramid",
    "rh-icon-question-mark",
    "rh-icon-quotemark-close",
    "rh-icon-quotemark-open",
    "rh-icon-radio-podcast",
    "rh-icon-recycle-cans",
    "rh-icon-recycle-default",
    "rh-icon-recycle-plastic",
    "rh-icon-recycle",
    "rh-icon-remote-associate",
    "rh-icon-restrooms",
    "rh-icon-router-load-balancer",
    "rh-icon-safety-goggles",
    "rh-icon-safety-warning-alert",
    "rh-icon-save",
    "rh-icon-scalable",
    "rh-icon-scale-grow",
    "rh-icon-scale-shrink",
    "rh-icon-scales-of-justice",
    "rh-icon-search",
    "rh-icon-secured",
    "rh-icon-security-camera",
    "rh-icon-security",
    "rh-icon-server-alt1",
    "rh-icon-server-alt2",
    "rh-icon-server-deploy",
    "rh-icon-server-secured",
    "rh-icon-server-stack-alt1",
    "rh-icon-server-stack-alt2",
    "rh-icon-server-stack-secured",
    "rh-icon-server-stack-unsecured",
    "rh-icon-server-stack",
    "rh-icon-server-unsecured",
    "rh-icon-server-vintage-alt1",
    "rh-icon-server-vintage",
    "rh-icon-server",
    "rh-icon-shipping-container-rail",
    "rh-icon-shipping-container-ship",
    "rh-icon-shipping-container-truck",
    "rh-icon-shipping-container",
    "rh-icon-shoe",
    "rh-icon-shopping-bag",
    "rh-icon-shopping-cart",
    "rh-icon-shower",
    "rh-icon-smart-phone",
    "rh-icon-smartwatch",
    "rh-icon-software-container",
    "rh-icon-space-capsule",
    "rh-icon-space-rocket",
    "rh-icon-space-satellite",
    "rh-icon-speedometer",
    "rh-icon-sports-play",
    "rh-icon-stairs-step-by-step",
    "rh-icon-standup",
    "rh-icon-star",
    "rh-icon-stopwatch-time-pass",
    "rh-icon-stopwatch",
    "rh-icon-storage-brick",
    "rh-icon-storage-stack",
    "rh-icon-sun",
    "rh-icon-support",
    "rh-icon-sword",
    "rh-icon-sysadmin",
    "rh-icon-tablet",
    "rh-icon-tachometer",
    "rh-icon-talk-bubble-conversation",
    "rh-icon-talk-bubble-lined",
    "rh-icon-talk-bubble",
    "rh-icon-target",
    "rh-icon-telecom-vertical",
    "rh-icon-test-tube",
    "rh-icon-thumbs-up",
    "rh-icon-tool-wrench",
    "rh-icon-toolbox",
    "rh-icon-tools-drafting",
    "rh-icon-tools",
    "rh-icon-traffic-light",
    "rh-icon-train",
    "rh-icon-transportation",
    "rh-icon-trash",
    "rh-icon-trophy",
    "rh-icon-truck",
    "rh-icon-tshirt",
    "rh-icon-unlocked",
    "rh-icon-unsecured",
    "rh-icon-upload",
    "rh-icon-user-1",
    "rh-icon-user-2",
    "rh-icon-user-3",
    "rh-icon-user-4",
    "rh-icon-user-5",
    "rh-icon-user-access",
    "rh-icon-user-checklist",
    "rh-icon-user-schedule",
    "rh-icon-user-story",
    "rh-icon-user",
    "rh-icon-utensils",
    "rh-icon-utility-meter",
    "rh-icon-venn-diagram",
    "rh-icon-video",
    "rh-icon-virtual-datacenter",
    "rh-icon-virtual-router-load-balancer",
    "rh-icon-virtual-server-secured",
    "rh-icon-virtual-server-stack-secure",
    "rh-icon-virtual-server-stack-secured",
    "rh-icon-virtual-server-stack-unsecure",
    "rh-icon-virtual-server-stack-unsecured",
    "rh-icon-virtual-server-stack",
    "rh-icon-virtual-server-unsecured",
    "rh-icon-virtual-server",
    "rh-icon-virtual-stack",
    "rh-icon-virtual-storage-brick",
    "rh-icon-virtual-storage-stack",
    "rh-icon-volume-mute",
    "rh-icon-volume-up",
    "rh-icon-vulnerability",
    "rh-icon-water-droplet",
    "rh-icon-water-faucet",
    "rh-icon-waveform",
    "rh-icon-webinar",
    "rh-icon-website-system",
    "rh-icon-website",
    "rh-icon-workplace-strategy",
    "rh-icon-wrench-mechanical",
  ],
};