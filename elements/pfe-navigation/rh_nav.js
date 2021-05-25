(function($, Drupal) {
  "use strict";
  Drupal.behaviors.redhat_www_menu = {
    attach: function(context, settings) {
      console.log("woot!!");
      function getCookie(name) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
          var cookieKeyValue = cookies[i].split("=");

          if (name === cookieKeyValue[0].trim()) {
            return decodeURIComponent(cookieKeyValue[1]);
          }
        }
        return null;
      }

      function setCookie(name, value, options) {
        if (typeof document === "undefined") {
          return;
        }

        if (typeof options.expires === "number") {
          options.expires = new Date(new Date() * 1 + options.expires * 864e5);
        }

        // Using "expires" because "max-age" is not supported by IE
        options.expires = options.expires ? options.expires.toUTCString() : "";

        var optionsString = "";

        for (var optionKey in options) {
          if (options.hasOwnProperty(optionKey)) {
            if (!options[optionKey]) {
              continue;
            }
            optionsString += "; " + optionKey;

            if (options[optionKey] === true) {
              continue;
            }

            optionsString += "=" + options[optionKey];
          }
        }

        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + optionsString;
      }

      function languageCookieHandler() {
        var languageCode = Drupal.settings.pathPrefix.replace(/\//, "").trim();

        if (languageCode.length === 0) {
          languageCode = "en";
        }

        var options = {
          domain: ".redhat.com",
          path: "/",
          hostOnly: false,
          httpOnly: false,
          secure: false
        };

        var cookieName = "rh_locale";
        var cookieValue = getCookie("rh_locale");

        // If there is not a value for the cookie.
        if (cookieValue === null || cookieValue !== languageCode) {
          cookieValue = encodeURIComponent(languageCode);
          setCookie(cookieName, cookieValue, options);
        }
      }

      //Ensure that this behaviour is only attached once to the window.
      $(document.body, context).once("redhat_www_menu", function() {
        var $subnav = $("#main-menu .pfe-navigation__menu pfe-navigation-item .pfe-navigation__dropdown", context),
          $window = $(window),
          urlBase =
            window.location.protocol +
            "//" +
            window.location.hostname +
            Drupal.settings.basePath +
            Drupal.settings.pathPrefix;

        // Handle the language cookie
        languageCookieHandler();

        var ranAjaxForMainMenu = false;
        var ranAjaxForLanguage = false;

        // Handle click event for main menu.
        function loadNavDropdowns(event) {
          // If subnav container is empty, make ajax call
          console.log($subnav.children(), ranAjaxForMainMenu);
          if ($subnav.children().length < 1 && !ranAjaxForMainMenu) {
            $.ajax({
              url: "/wakka/menus-nav2",
              method: "GET",
              dataType: "html",
              success: function(data) {
                if (!data || typeof data === "undefined") {
                  return;
                }

                // Insert each subnav into the appropriate tray.
                console.log("success!", $data, $subnav);

                // Convert AJAX response to HTML element.
                var $data = $("<div>" + data + "</div>");
                // Insert each subnav into the appropriate tray.
                $subnav.each(function() {
                  var $this = $(this),
                    column = $this.data("column"),
                    $content = $('div.pfe-navigation-item__tray--container[data-column="' + column + '"]', $data);
                  if ($content.length > 0) {
                    // Remove column IDs from markup.
                    $content.removeAttr("data-column");
                    $this.removeAttr("data-column").append($content);
                  }
                });
              }
            });
            ranAjaxForMainMenu = true;
          }
        }

        $('#pfe-navigation__menu a[slot="trigger"]').click(loadNavDropdowns);

        // Ensure modal opens when language trigger is clicked on
        //   $('#pfe-modal--trigger').click(function(event) {
        //     event.stopPropagation();
        //     // TODO - hidden attribute will be removed automatically once PFE PR #924 is merged
        //     $('#language-picker').removeAttr('hidden').get( 0 ).open();
        //   }).keyup(function(event) {
        //       let key = event.key || event.keyCode;
        //       switch (key) {
        //         case 'Enter':
        //         case 13:
        //         case ' ':
        //         case 32:
        //           event.stopPropagation();
        //           $('#language-picker').removeAttr('hidden').get( 0 ).open();
        //       }
        // });

        // -- Set up the utilities
        var helper = {
          //--- Global utility variables
          lg: function() {
            return $window.width() >= 1200;
          },
          md: function() {
            return $window.width() >= 992 && $window.width() < 1200;
          },
          sm: function() {
            return $window.width() >= 768 && $window.width() < 992;
          },
          xs: function() {
            return $window.width() >= 480 && $window.width() < 768;
          },
          xxs: function() {
            return $window.width() < 480;
          },
          getHeight: function() {
            return $window.height();
          },
          getWidth: function() {
            return $window.width();
          },
          getElHeight: function(element) {
            var height = 0;
            if ($(element).length > 0) {
              height = $(element).outerHeight();
            }
            return height;
          },
          breakpoints: ["xxs", "xs", "sm", "md", "lg"],
          isAtBreakpoint: function(bpString) {
            // This function tests to see the current breakpoint exists in the allowed bp strings provided as input
            var atBreakpoint = true;
            // If the breakpoint string exists and is not empty
            if (bpString) {
              // Test that our current breakpoint is in this list of support breakpoints
              var bps = bpString.split(" ");
              atBreakpoint = false;
              // If the first array value is not empty
              $.each(bps, function(idx, bp) {
                // Check that the bp value is one of the supported breakpoints
                if ($.inArray(bp, helper.breakpoints) >= 0 && helper[bp]()) {
                  atBreakpoint = true;
                }
              });
            }
            return atBreakpoint;
          },
          url: {
            root: window.location.hostname,
            path: window.location.pathname.split("/")
          }
        };

        // -- Set up the toggle functionality
        var toggle = {
          attr: {
            toggleID: "data-rc-toggle-id",
            toggleTarget: "data-rc-toggle-target",
            state: "data-rc-state",
            expanded: "aria-expanded"
          },
          get: {
            target: function($trigger) {
              var $target,
                bps,
                toggleID = $trigger.attr(toggle.attr.toggleID);
              // If the elements are connected using a shared ID, use that first
              if (typeof toggleID !== "undefined" && toggleID !== "") {
                $target = $("#" + toggleID, context);
                if ($target.length < 1) {
                  $target = undefined;
                }
              }
              // Else, look for a sibling element that has the toggle-target attribute
              if (typeof $target === "undefined") {
                $target = $trigger.siblings("[" + toggle.attr.toggleTarget + "]");
                if ($target.length < 1) {
                  $target = undefined;
                }
              }
              // Else, look for a child element that has the toggle-target attribute
              if (typeof $target === "undefined") {
                $target = $trigger.children("[" + toggle.attr.toggleTarget + "]");
                if ($target.length < 1) {
                  $target = undefined;
                }
              }
              if (typeof $target !== "undefined") {
                bps = $target.attr(toggle.attr.toggleTarget);
              }
              return {
                trigger: $trigger,
                target: $target,
                breakpoints: bps
              };
            },
            state: function($el) {
              var state = $el.attr(toggle.attr.state);
              if (typeof state === "undefined") {
                state = $el.attr("aria-expanded") ? "open" : "closed";
              }
              return state;
            }
          },
          state: {
            set: function($els, state) {
              $.each($els, function(idx, $el) {
                if (state === "open") {
                  $el.attr(toggle.attr.state, "open").attr("aria-expanded", true);
                } else {
                  $el.attr(toggle.attr.state, "closed").attr("aria-expanded", false);
                }
              });
            },
            check: function($el) {
              var status = $el.attr(toggle.attr.state);
              if (status === "") {
                status = $el.attr(toggle.attr.expanded) ? "open" : "closed";
              }
              return status;
            }
          },
          event: {
            reveal: function(props) {
              toggle.state.set([props.target, props.trigger], "open");
            },
            hide: function(props) {
              toggle.state.set([props.target, props.trigger], "closed");
            },
            change: function(props, change) {
              var state = toggle.get.state(props.target);
              // If we are approved to toggle
              if (helper.isAtBreakpoint(props.breakpoints)) {
                if (state === "closed") {
                  // If the state is closed, reveal
                  change ? this.reveal(props) : this.hide(props);
                } else if (state === "open") {
                  // If the state is open, hide
                  change ? this.hide(props) : this.reveal(props);
                } else {
                  // If state is an empty string or undefined, always opt to reveal content
                  this.reveal(props);
                }
              } else {
                // Make sure it's visible if not at a supported breakpoints
                this.reveal(props);
              }
            }
          }
        };

        // On load, trigger the closing of any open accordions that have a state of closed set and attach click event
        $("[" + toggle.attr.state + "]", context).each(function(idx, val) {
          var props = toggle.get.target($(val));
          // If the target element exists
          if (typeof props.target !== "undefined") {
            // Activate reset
            toggle.event.change(props, false);

            // On click change current state and data attribute
            props.trigger.click(function() {
              toggle.event.change(props, true);
            });
            // On keyboard event change current state and data attribute.
            // This event is triggered by two keys, Enter (13) and spacebar (32).
            props.trigger.keydown(function(event) {
              if (event.which === 13 || event.which === 32) {
                toggle.event.change(props, true);
              }
            });
          }
        });

        // Create debounce function to only trigger calls one time after it finishes resizing,
        // instead of hundreds of times while it is updated
        var resizeTimer;
        $window.on("resize", function() {
          resizeTimer && clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            // Reset any element that have been triggered before resizing and need to be reset.
            $("[" + toggle.attr.state + "]", context).each(function(idx, val) {
              var props = toggle.get.target($(val));
              if (typeof props.target !== "undefined") {
                helper.isAtBreakpoint(props.breakpoints)
                  ? toggle.event.change(props, false)
                  : toggle.event.reveal(props);
              }
            });
          }, 250);
        });
      });
    }
  };
})(jQuery, Drupal);
