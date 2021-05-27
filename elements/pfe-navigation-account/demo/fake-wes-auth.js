window.addEventListener("load", function() {
  var PfeNavigationAccount = document.querySelector("pfe-navigation-account");
  if (PfeNavigationAccount) {
    PfeNavigationAccount.userData = {
      realm_access: {
        roles: ["admin:org:all", "portal_manage_subscriptions"]
      },
      REDHAT_LOGIN: "wesruv@wakka-wakka.com",
      lastName: "Ruvalcaba",
      account_number: "123456",
      preferred_username: "wesruv@wakka-wakka.com",
      firstName: "Wes",
      email: "wesruv@wakka-wakka.com",
      username: "wesruv@wakka-wakka.com",
      fullName: "Wes Ruvalcaba"
    };

    if (!PfeNavigationAccount.hasAttribute("login-link")) {
      PfeNavigationAccount.setAttribute("login-link", "#login");
    }
    if (!PfeNavigationAccount.hasAttribute("logout-link")) {
      PfeNavigationAccount.setAttribute("logout-link", "#logout");
    }
  }
});
