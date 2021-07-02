import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAvatar from "../../pfe-avatar/dist/pfe-avatar.js";

// @todo Allow links in 1rst and 2nd column from loaded site
// @todo Missing some account information
// @todo Need pencil icon

class PfeNavigationAccount extends PFElement {
  static get tag() {
    return "pfe-navigation-account";
  }

  static get meta() {
    return {
      title: "Navigation account",
      description: "Be awesome."
    };
  }

  static get observedAttributes() {
    return ["lang"];
  }

  get templateUrl() {
    return "pfe-navigation-account.html";
  }

  get styleUrl() {
    return "pfe-navigation-account.scss";
  }

  get userData() {
    return this.userData;
  }

  set userData(userData) {
    this._processUserData(userData);
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get properties() {
  //   return {
  //     loginLink: {
  //       title: "Login link",
  //       attribute: "login-link",
  //       type: String
  //     },
  //     logoutLink: {
  //       title: "Logout link",
  //       attribute: "logout-link",
  //       type: String
  //     },
  //     avatarUrl: {
  //       title: "Avatar URL",
  //       attribute: "avatar-url",
  //       type: String
  //     },
  //     fullName: {
  //       title: "Full name",
  //       attribute: "full-name",
  //       type: String
  //     }
  //   };
  // }

  static get properties() {
    return {
      environment: {
        title: "Site environment",
        attribute: "environement",
        type: String
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeNavigationAccount, { type: PfeNavigationAccount.PfeType });

    // Setup vars
    this._userData = null;
    this._avatars = [];

    // set default language, overridden by check in connected callback
    this._lang = "en";

    // Translations
    this._navTranslations = {
      en: {
        accountDetails: "Account details",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      ja: {
        accountDetails: "Account details JA",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      ko: {
        accountDetails: "Account details KO",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      zh: {
        accountDetails: "Account details zh",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      de: {
        accountDetails: "Account details de",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      fr: {
        accountDetails: "Account details fr",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      it: {
        accountDetails: "Account details it",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      es: {
        accountDetails: "Account details es",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      },
      pt: {
        accountDetails: "Account details pt",
        accountDetailsDesc: "Edit your contact info, password, location preferences, and errata notifications.",
        accountNumber: "Account number",
        accountTeam: "Account team",
        accountTeamDesc: "Get help from your Red Hat account team.",
        login: "Login",
        orgAdmin: "Organization administrator",
        profile: "Community Profile",
        profileDesc: "Fill out your public profile and control what content you follow.",
        subscriptions: "Subscriptions",
        subscriptionsDesc: "Manage your subscriptions.",
        support: "Support",
        supportDesc: "Get support for your Red Hat products.",
        training: "Training & certification",
        trainingDesc: "Access your Red Hat Learning Subscription, courses, and exams.",
        userManagement: "User management",
        userManagementDesc: "Manage users in your organization."
      }
    };

    // Ensure 'this' is tied to the component object in these member functions
    this._updateAvatarSrc = this._updateAvatarSrc.bind(this);
    this._createAccountDropdown = this._createAccountDropdown.bind(this);
    this._processUserReady = this._processUserReady.bind(this);
    this._processUserData = this._processUserData.bind(this);

    // Watch for user info events
    const bodyTag = document.querySelector("body");
    bodyTag.addEventListener("user-ready", this._processUserReady);

    bodyTag.addEventListener("user-update", this._processUserReady);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasAttribute("lang")) {
      this._lang = this.getAttribute("lang");
    }
  }

  disconnectedCallback() {
    const bodyTag = document.querySelector("body");
    bodyTag.removeEventListener("user-ready", this._processUserReady);
    bodyTag.removeEventListener("user-update", this._processUserReady);
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  /**
   * Creates Avatar Markup
   * @param {string} name User's Name
   * @param {string} src Optional, Path to avatar image
   */
  _createPfeAvatar(name, src) {
    let prefix = "";
    if (typeof this.hasSlot === "undefined") {
      prefix = `pfe-`;
    }
    const pfeAvatar = document.createElement(`pfe-avatar`);
    pfeAvatar.setAttribute(`${prefix}name`, name);
    pfeAvatar.setAttribute(`${prefix}shape`, "circle");

    if (typeof src === "string") {
      pfeAvatar.setAttribute(`${prefix}src`, src);
    }

    return pfeAvatar;
  }

  /**
   * Get a user's full name
   * @param {object} userData
   * @return {string} User's full name
   */
  _getFullName(userData) {
    if (typeof userData.fullName === "string") {
      return userData.fullName;
    }
    let fullName = "";
    // Create Name based on first and last name
    if (typeof userData.firstName === "string") {
      fullName = userData.firstName;
    }
    if (typeof userData.lastName === "string") {
      if (fullName.length) {
        fullName = `${fullName} ${userData.lastName}`;
      } else {
        fullName = userData.lastName;
      }
    }
    if (!fullName.length) {
      this.error("Couldn't get full name");
    }
    this.setAttribute("full-name", fullName);
    return fullName;
  }

  /**
   * Fetch avatar image from API and update all avatar elements
   * @param {string} REDHAT_LOGIN The value of REDHAT_LOGIN from userData
   */
  _updateAvatarSrc(REDHAT_LOGIN) {
    // If REDHAT_LOGIN exists and hasn't changed, there's no reason to fetch a new avatar
    if (
      this._userData === null ||
      (typeof this._userData.REDHAT_LOGIN === "string" && REDHAT_LOGIN !== this._userData.REDHAT_LOGIN)
    ) {
      let avatarEndpoint = "//access.redhat.com/api/users/avatar/";
      if (document.domain.includes("access.") || document.domain.includes(".foo.")) {
        avatarEndpoint = "/api/users/avatar/";
      }

      fetch(`${avatarEndpoint}${REDHAT_LOGIN}`)
        .then(response => {
          if (typeof response === "object" && typeof response.status === "number" && response.status === 200) {
            if (typeof response.url === "string" && !response.url.includes("blank.png")) {
              // Update the component attribute
              this.setAttribute("avatar-url", response.url);
              // We have a valid avatar src, update all avatars
              for (let index = 0; index < this._avatars.length; index++) {
                this._avatars[index].setAttribute("src", response.url);
              }
            }
          }
        })
        .catch(error => console.error(error));
    }
  }

  /**
   * Creates HTML for icon in a secondary link
   * @param {string} icon Name of icon from pfe-icon
   * @return {object} DOM Object for pfe-icon
   */
  _createPfeIcon(icon) {
    let prefix = "";
    if (typeof this.hasSlot === "undefined") {
      prefix = `pfe-`;
    }
    const iconElement = document.createElement("pfe-icon");
    iconElement.setAttribute("icon", icon);
    iconElement.setAttribute(`${prefix}size`, "sm");
    iconElement.setAttribute("aria-hidden", "true");
    return iconElement;
  }

  /**
   * Create Account menu button
   * @param {string} fullName Full name of the user
   * @return {object} Reference to toggle
   */
  _createAccountMenuToggle(fullName) {
    const logInLink = this.shadowRoot.querySelector(".pfe-navigation__log-in-link");
    const newLoginLink = document.createElement("button");
    newLoginLink.classList.add("pfe-navigation__log-in-link", "pfe-navigation__log-in-link--logged-in");
    // @todo probably needs more a11y thought
    // @todo Translate aria-label if we keep
    newLoginLink.setAttribute("aria-label", "Open user menu");

    const pfeAvatar = this._createPfeAvatar(fullName);
    newLoginLink.append(pfeAvatar);
    newLoginLink.id = "account__toggle";
    logInLink.replaceWith(newLoginLink);

    this._avatars.push(pfeAvatar);

    return newLoginLink;
  }

  /**
   * Creates Account Dropdown markup
   * @param {object} userData
   * @return {object} Reference to the dropdownOuterWrapper
   */
  _createAccountDropdown(userData) {
    const dropdownWrapper = document.createElement("div");
    dropdownWrapper.id = "wrapper";
    dropdownWrapper.classList.add("pfe-navigation__dropdown");

    // Create basic info
    const basicInfoWrapper = document.createElement("h3");
    const fullName = this._getFullName(userData);
    const basicInfoAvatar = this._createPfeAvatar(fullName);

    basicInfoWrapper.classList.add("user-info");

    this._avatars.push(basicInfoAvatar);
    basicInfoAvatar.classList.add("user-info__avatar");

    const basicInfoName = document.createElement("div");
    basicInfoName.classList.add("user-info__full-name");
    basicInfoName.innerText = fullName;

    const editAvatarLink = document.createElement("a");
    // @todo Respect pre-prod envs
    editAvatarLink.setAttribute(
      "href",
      `https://access${this.environment === null ? "" : "." + this.environment}.redhat.com/user/edit`
    );
    editAvatarLink.classList.add("user-info__edit-avatar");
    // @todo make translateable
    editAvatarLink.innerText = "Edit avatar";
    // @todo need pencil icon
    editAvatarLink.prepend(this._createPfeIcon("web-caret-right"));

    basicInfoWrapper.append(basicInfoAvatar);
    basicInfoWrapper.append(basicInfoName);
    basicInfoWrapper.append(editAvatarLink);

    // Create linklist
    // @todo Translate
    // @todo Respect preprod envs with links
    // @link https://docs.google.com/spreadsheets/d/1CK6s_-SWBkRIKyDJHoqPL7ygfrVxKEiOM3oZ-UswgIE/edit#gid=0
    // @link https://docs.google.com/document/d/1JkgrzU1dXQxh28EFKfwtGH2dNwVJEGvDzQGG4nUGiDs/edit#
    const defaultLinks = [
      // Column 1
      [
        {
          text: this._navTranslations[this._lang].accountDetails,
          url: `https://www${
            this.environment === null ? "" : "." + this.environment
          }.redhat.com/wapps/ugc/protected/personalInfo.html`,
          description: this._navTranslations[this._lang].accountDetailsDesc
        },
        {
          text: this._navTranslations[this._lang].profile,
          url: `https://access${this.environment === null ? "" : "." + this.environment}.redhat.com/user`,
          description: this._navTranslations[this._lang].profileDesc
        },
        {
          text: this._navTranslations[this._lang].training,
          url: `https://rol${this.environment === null ? "" : "." + this.environment}.redhat.com/rol/app/`,
          description: this._navTranslations[this._lang].trainingDesc
        }
      ],
      // Column 2
      [
        {
          text: this._navTranslations[this._lang].subscriptions,
          url: `https://access${this.environment === null ? "" : "." + this.environment}.redhat.com/management`,
          description: this._navTranslations[this._lang].subscriptionsDesc,
          // Should respect "Manage subs permission"
          requiresRole: "portal_manage_subscriptions"
        },
        {
          text: this._navTranslations[this._lang].accountTeam,
          url: `https://access${this.environment === null ? "" : "." + this.environment}.redhat.com/account-team`,
          description: this._navTranslations[this._lang].accountTeamDesc
        },
        {
          text: this._navTranslations[this._lang].userManagement,
          url: `https://www${
            this.environment === null ? "" : "." + this.environment
          }.redhat.com/wapps/ugc/protected/usermgt/userList.html`,
          description: this._navTranslations[this._lang].userManagementDesc,
          // Should respect "is Org Admin"
          requiresRole: "admin:org:all"
        },
        {
          text: this._navTranslations[this._lang].support,
          url: `https://access${
            this.environment === null ? "" : "." + this.environment
          }.redhat.com/support/cases/#/troubleshoot/`,
          description: this._navTranslations[this._lang].supportDesc
        }
        // {
        //   text: '',
        //   url: '',
        //   description: '',
        // },
      ]
    ];

    const accountLinksWrapper = document.createElement("div");
    accountLinksWrapper.classList.add("account-links");
    // @todo a11y check
    // @todo translate (if we keep the label)
    accountLinksWrapper.setAttribute("aria-label", "Account managemement links");

    for (let index = 0; index < defaultLinks.length; index++) {
      const column = defaultLinks[index];
      const accountLinksColumn = document.createElement("ul");
      accountLinksColumn.classList.add("account-links__column");

      for (let j = 0; j < column.length; j++) {
        const linkData = column[j];
        const linkWrapper = document.createElement("li");
        const link = document.createElement("a");

        let hasAccess = true;
        if (typeof linkData.requiresRole !== "undefined") {
          if (!userData.realm_access.roles.includes(linkData.requiresRole)) {
            hasAccess = false;
          }
        }

        if (hasAccess) {
          link.setAttribute("href", linkData.url);
          link.innerHTML = `
            <div class="account-link__title">
              ${linkData.text}
            </div>`;

          if (linkData.description) {
            link.innerHTML = `${link.innerHTML}
              <div class="account-link__description">
                ${linkData.description}
              </div>`;
          }

          linkWrapper.append(link);
          accountLinksColumn.append(linkWrapper);
        }
      }
      accountLinksWrapper.append(accountLinksColumn);
    }

    // Create account metadata
    const accountMetadataWrapper = document.createElement("div");
    accountMetadataWrapper.classList.add("account-metadata");

    const accountLoginNameWrapper = document.createElement("h3");
    accountLoginNameWrapper.classList.add("account-metadata__login-name");
    // @todo Translate
    accountLoginNameWrapper.innerText = `${this._navTranslations[this._lang].login}: ${userData.REDHAT_LOGIN}`;

    // @todo Company name?

    const accountNumberWrapper = document.createElement("div");
    accountNumberWrapper.classList.add("account-metadata__account-number");
    // @todo Translate
    // @todo There's account_number and account_id? Hoping number is the one I want
    accountNumberWrapper.innerText = `Account number: ${userData.account_number}`;

    const accountEmailWrapper = document.createElement("div");
    accountEmailWrapper.classList.add("account-metadata__email");
    accountEmailWrapper.innerText = userData.email;

    const logOutWrapper = document.createElement("div");
    logOutWrapper.classList.add("account-metadata__logout-wrapper");
    const logOutLink = document.createElement("a");
    if (this.hasAttribute("logout-link")) {
      logOutLink.setAttribute("href", this.getAttribute("logout-link"));
      logOutLink.classList.add("a11y-logout-link");
    }
    // @todo Get logout link for keycloak method
    else {
      this.error("Couldn't get logout link");
    }

    if (logOutLink.hasAttribute("href")) {
      // @todo Translate
      logOutLink.innerText = "Log out";
      logOutWrapper.append(logOutLink);
    }

    // Add account metadata content to wrapper
    accountMetadataWrapper.append(accountLoginNameWrapper);
    // Add org admin if they are one
    if (userData.realm_access.roles.includes("admin:org:all")) {
      const orgAdmin = document.createElement("div");
      orgAdmin.classList.add("account-metadata__org-admin");
      // @todo Translate
      orgAdmin.innerText = this._navTranslations[this._lang].orgAdmin;
      accountMetadataWrapper.classList.add("account-metadata--org-admin");
      accountMetadataWrapper.append(orgAdmin);
    }
    accountMetadataWrapper.append(accountNumberWrapper);
    accountMetadataWrapper.append(accountEmailWrapper);

    // Duplicate account metadata for mobile layout, without logout button
    const mobileAccountMetadataWrapper = accountMetadataWrapper.cloneNode(true);
    mobileAccountMetadataWrapper.classList.add("account-metadata--mobile");

    // Add logout button
    accountMetadataWrapper.append(logOutWrapper);

    // Add account dropdown content
    dropdownWrapper.append(basicInfoWrapper);
    dropdownWrapper.append(mobileAccountMetadataWrapper);
    dropdownWrapper.append(accountLinksWrapper);
    dropdownWrapper.append(accountMetadataWrapper);

    // Replace dropdown contents
    this.shadowRoot.getElementById("wrapper").replaceWith(dropdownWrapper);
    return dropdownWrapper;
  }

  /**
   * Parse User Data an make updates to appropriate bits
   * @param {object} userData Keycloak token as an object
   */
  _processUserData(userData) {
    userData.fullName = this._getFullName(userData);
    if (this.getAttribute("full-name") !== userData.fullName) {
      this.setAttribute("full-name", userData.fullName);
    }

    // Initialize Account Dropdown if we don't have old userData
    if (this._userData === null) {
      this._createAccountDropdown(userData);
    }
    // @todo Update existing elements where necessary
    // else {
    // }

    if (typeof userData.REDHAT_LOGIN === "string") {
      this._updateAvatarSrc(userData.REDHAT_LOGIN);
    } else {
      this.error("Could not find Redhat Login");
    }

    // Keep user data to diff against on update
    this._userData = userData;
  }

  /**
   * Process data from user-ready or user-update from cpx-user
   * @param {object} event Event's object
   */
  _processUserReady(event) {
    const cpxUser = event.target;
    const userData = cpxUser.user;

    if (typeof userData === "object") {
      this._processUserData(userData);
    }
  }
}

PFElement.create(PfeNavigationAccount);

export default PfeNavigationAccount;
