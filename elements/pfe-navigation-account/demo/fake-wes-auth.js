window.addEventListener("load", function() {
  var PfeNavigationAccount = document.querySelector("pfe-navigation-account");
  if (PfeNavigationAccount) {
    PfeNavigationAccount.userData = {
      exp: 9999999999,
      iat: 1611166733,
      auth_time: 1611164262,
      jti: "3299f585-e6b0-4c00-a23d-a71e311fa42f",
      iss: "https://sso.redhat.com/auth/realms/redhat-external",
      aud: "customer-portal",
      sub: "f:528d76ff-f708-43ed-8cd5-fe16f4fe0ce6:wruvalca@redhat.com",
      typ: "Bearer",
      azp: "customer-portal",
      nonce: "9d5657e4-e69c-4337-a6a4-f9efd6aad8d0",
      session_state: "3b981d08-cddc-4e60-a471-6a086f31ef23",
      acr: "1",
      "allowed-origins": ["https://prod.foo.redhat.com:1337", "https://www.redhat.com", "https://access.redhat.com"],
      realm_access: {
        roles: [
          "authenticated",
          "redhat:employees",
          "portal_manage_subscriptions",
          "candlepin_system_access_view_edit_all",
          "offline_access",
          "learning",
          "uma_authorization",
          "portal_manage_cases",
          "portal_system_management",
          "cloud_access_1",
          "portal_download",
          "rhd_access_middleware",
          "nachannel_distributors",
          "admin:org:all"
        ]
      },
      resource_access: {
        "rhd-dm": {
          roles: ["rhuser"]
        },
        account: {
          roles: ["manage-account", "manage-account-links", "view-profile"]
        }
      },
      scope: "openid Legacy_IDP_OpenID",
      REDHAT_LOGIN: "wruvalca@redhat.com",
      lastName: "Ruvalcaba",
      country: "US",
      account_number: "5910538",
      preferred_username: "wruvalca@redhat.com",
      firstName: "James",
      account_id: "11009103",
      user_id: "53256909",
      organization_id: "00Dm0000000116C",
      siteId: "redhat",
      siteID: "redhat",
      portal_id: "06060000000D0af",
      lang: "en_US",
      region: "US",
      email: "wruvalca@redhat.com",
      RHAT_LOGIN: "wruvalca@redhat.com",
      username: "wruvalca@redhat.com",
      fullName: "James Ruvalcaba"
    };

    if (!PfeNavigationAccount.hasAttribute("login-link")) {
      PfeNavigationAccount.setAttribute("login-link", "#login");
    }
    if (!PfeNavigationAccount.hasAttribute("logout-link")) {
      PfeNavigationAccount.setAttribute("logout-link", "#logout");
    }
  }
});
