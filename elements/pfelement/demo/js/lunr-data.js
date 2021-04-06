window.lunrData = {
  index: {
    version: "1.0.0",
    fields: [
      {
        name: "longname",
        boost: 1000
      },
      {
        name: "name",
        boost: 500
      },
      {
        name: "tags",
        boost: 300
      },
      {
        name: "kind",
        boost: 110
      },
      {
        name: "title",
        boost: 100
      },
      {
        name: "summary",
        boost: 70
      },
      {
        name: "description",
        boost: 50
      },
      {
        name: "body",
        boost: 1
      }
    ],
    ref: "id",
    tokenizer: "default",
    documentStore: {
      store: {
        "index.html": [
          "base",
          "commun",
          "compon",
          "creat",
          "design",
          "element",
          "index",
          "patternfli",
          "readm",
          "set",
          "web"
        ],
        "global.html": ["document", "global"],
        "list_class.html": ["class", "document", "list", "list:class"],
        "PFElement.html": ["baselin", "class", "compon", "element", "patternfli", "pfelement", "serv"],
        "PFElement.html#.PfeTypes": [
          "compon",
          "defin",
          "definit",
          "gener",
          "global",
          "lt;static&gt",
          "member",
          "pfelement.pfetyp",
          "pfetyp",
          "purpos",
          "put",
          "togeth",
          "type",
          "way"
        ],
        "PFElement.html#.version": [
          "compil",
          "compon",
          "current",
          "data",
          "lt;static&gt",
          "member",
          "package.json",
          "pfelement.vers",
          "set",
          "us",
          "version"
        ],
        "PFElement.html#version": [
          "alia",
          "be",
          "consol",
          "load",
          "local",
          "member",
          "pfelement#vers",
          "static",
          "us",
          "valid",
          "version"
        ],
        "PFElement.html#.properties": [
          "appli",
          "base",
          "class",
          "compon",
          "definit",
          "global",
          "lt;static&gt",
          "manag",
          "member",
          "pfelement.properti",
          "properti"
        ],
        "PFElement.html#randomId": [
          "_note:_",
          "automat",
          "ensur",
          "fetch",
          "id",
          "member",
          "pfe",
          "pfelement#randomid",
          "prefix",
          "quick",
          "random",
          "randomid",
          "return",
          "safe",
          "valu",
          "way"
        ],
        "PFElement.html#contextVariable": [
          "compon",
          "context",
          "contextvari",
          "current",
          "member",
          "pfelement#contextvari",
          "valu",
          "variabl"
        ],
        "PFElement.html#.allProperties": [
          "allproperti",
          "case",
          "compon",
          "component'",
          "conflict",
          "contain",
          "descend",
          "etc",
          "global",
          "lt;static&gt",
          "member",
          "merg",
          "name",
          "object",
          "overrid",
          "pfecard",
          "pfelement'",
          "pfelement.allproperti",
          "properti",
          "return",
          "such",
          "togeth",
          "two"
        ],
        "PFElement.html#.cascadingProperties": [
          "cascadingproperti",
          "case",
          "compon",
          "component'",
          "conflict",
          "contain",
          "descend",
          "etc",
          "global",
          "lt;static&gt",
          "member",
          "merg",
          "name",
          "object",
          "overrid",
          "pfecard",
          "pfelement'",
          "pfelement.cascadingproperti",
          "properti",
          "return",
          "such",
          "togeth",
          "two"
        ],
        "PFElement.html#.debugLog": [
          "ad",
          "boolean",
          "compon",
          "consol",
          "constructor",
          "debug",
          "debuglog",
          "develop",
          "dure",
          "file",
          "function",
          "indic",
          "js",
          "log",
          "lt;static&gt",
          "pfelement.debuglog",
          "print",
          "script",
          "tag",
          "us",
          "valu"
        ],
        "PFElement.html#.trackPerformance": [
          "ad",
          "boolean",
          "compon",
          "constructor",
          "develop",
          "dure",
          "file",
          "function",
          "indic",
          "js",
          "lt;static&gt",
          "perform",
          "pfelement.trackperform",
          "script",
          "tag",
          "track",
          "trackperform",
          "us",
          "valu"
        ],
        "PFElement.html#.log": [
          "boolean",
          "check",
          "consol",
          "debuglog",
          "function",
          "log",
          "lt;static&gt",
          "pfelement.log",
          "print",
          "true",
          "wrapper"
        ],
        "PFElement.html#log": [
          "automat",
          "function",
          "local",
          "log",
          "name",
          "output",
          "pfelement#log",
          "prefix",
          "tag"
        ],
        "PFElement.html#.warn": [
          "consol",
          "debug",
          "format",
          "function",
          "inform",
          "lt;static&gt",
          "output",
          "pfelement.warn",
          "us",
          "warn",
          "wrapper"
        ],
        "PFElement.html#warn": [
          "automat",
          "component'",
          "function",
          "insid",
          "local",
          "name",
          "output",
          "pfelement#warn",
          "prefix",
          "tag",
          "us",
          "warn",
          "wrapper"
        ],
        "PFElement.html#.error": [
          "component'",
          "consol",
          "debug",
          "error",
          "format",
          "function",
          "inform",
          "insid",
          "lt;static&gt",
          "output",
          "pfelement.error",
          "us",
          "wrapper"
        ],
        "PFElement.html#error": [
          "automat",
          "component'",
          "error",
          "function",
          "insid",
          "local",
          "name",
          "output",
          "pfelement#error",
          "prefix",
          "tag",
          "us",
          "wrapper"
        ],
        "PFElement.html#hasLightDOM": [
          "boolean",
          "compon",
          "contain",
          "dom",
          "function",
          "haslightdom",
          "light",
          "pfelement#haslightdom",
          "return",
          "statement",
          "whether"
        ],
        "PFElement.html#hasSlot": [
          "boolean",
          "dom",
          "exist",
          "function",
          "hasslot",
          "light",
          "pfelement#hasslot",
          "return",
          "slot",
          "statement",
          "whether"
        ],
        "PFElement.html#getSlot": [
          "array",
          "defin",
          "dom",
          "function",
          "getslot",
          "i.",
          "light",
          "name",
          "pfelement#getslot",
          "provid",
          "return",
          "slot",
          "this.getslot",
          "unassign",
          "valu"
        ],
        "PFElement.html#contextUpdate": [
          "alert",
          "chang",
          "compon",
          "context",
          "contextupd",
          "function",
          "nest",
          "pfelement#contextupd"
        ],
        "PFElement.html#connectedCallback": [
          "ad",
          "callback",
          "compon",
          "connect",
          "connectedcallback",
          "dom",
          "fire",
          "function",
          "pfelement#connectedcallback",
          "standard"
        ],
        "PFElement.html#disconnectedCallback": [
          "add",
          "callback",
          "componet",
          "disconnect",
          "disconnectedcallback",
          "dom",
          "fire",
          "function",
          "here",
          "pfelement#disconnectedcallback",
          "remov",
          "removeeventlisten",
          "standard"
        ],
        "PFElement.html#attributeChangedCallback": [
          "attribut",
          "attributechangedcallback",
          "callback",
          "chang",
          "combin",
          "compon",
          "fire",
          "function",
          "global",
          "logic",
          "pfelement#attributechangedcallback",
          "specif",
          "updat"
        ],
        "PFElement.html#render": ["function", "pfelement#rend", "render", "standard"],
        "PFElement.html#emitEvent": [
          "around",
          "dispatch",
          "emitev",
          "event",
          "format",
          "function",
          "pfelement#emitev",
          "standard",
          "wrapper"
        ],
        "PFElement.html#cascadeProperties": [
          "ad",
          "attribut",
          "callback",
          "cascad",
          "cascadeproperti",
          "compon",
          "element",
          "function",
          "handl",
          "nest",
          "new",
          "pfelement#cascadeproperti",
          "properti",
          "updates/addit"
        ],
        "PFElement.html#_upgradeObserver": [
          "_upgradeobserv",
          "attribut",
          "chang",
          "compon",
          "function",
          "indic",
          "pfelement",
          "pfelement#_upgradeobserv",
          "respond",
          "upgrad"
        ],
        "PFElement.html#_contextObserver": [
          "_contextobserv",
          "attribut",
          "chang",
          "context",
          "function",
          "manual",
          "overrid",
          "pfelement#_contextobserv",
          "respond",
          "tool"
        ],
        "PFElement.html#_onObserver": [
          "_onobserv",
          "chang",
          "compon",
          "context",
          "function",
          "pfelement#_onobserv",
          "respond",
          "sourc",
          "truth"
        ],
        "PFElement.html#_inlineStyleObserver": [
          "_inlinestyleobserv",
          "chang",
          "context",
          "function",
          "grep",
          "inlin",
          "pfelement#_inlinestyleobserv",
          "respond",
          "style",
          "theme",
          "updat"
        ],
        "PFElement.html#_parseObserver": [
          "_parseobserv",
          "cascad",
          "connect",
          "dom",
          "down",
          "function",
          "light",
          "mutat",
          "observ",
          "pfelement#_parseobserv",
          "push",
          "updat",
          "valu",
          "watch"
        ],
        "PFElement.html#._validateProperties": [
          "_validateproperti",
          "function",
          "lt;static&gt",
          "meet",
          "name",
          "pfelement._validateproperti",
          "properti",
          "requir",
          "type",
          "valid"
        ],
        "PFElement.html#_castPropertyValue": [
          "_castpropertyvalu",
          "convert",
          "correct",
          "defin",
          "function",
          "method",
          "pfelement#_castpropertyvalu",
          "properti",
          "provid",
          "type",
          "valu"
        ],
        "PFElement.html#_assignValueToAttribute": [
          "_assignvaluetoattribut",
          "attribut",
          "compon",
          "function",
          "map",
          "name",
          "pfelement#_assignvaluetoattribut",
          "provid",
          "valu"
        ],
        "PFElement.html#_initializeSlots": [
          "_initializeslot",
          "defin",
          "easier",
          "function",
          "map",
          "object",
          "pfelement#_initializeslot",
          "queri",
          "slot"
        ],
        "PFElement.html#_initializeProperties": [
          "_initializeproperti",
          "base",
          "definit",
          "function",
          "method",
          "pfelement#_initializeproperti",
          "properti",
          "set",
          "up"
        ],
        "PFElement.html#_initializeAttributeDefaults": [
          "_initializeattributedefault",
          "attribut",
          "default",
          "function",
          "intial",
          "pfelement#_initializeattributedefault",
          "valu"
        ],
        "PFElement.html#_validateAttributeValue": [
          "_validateattributevalu",
          "against",
          "function",
          "pfelement#_validateattributevalu",
          "provid",
          "valid",
          "valu"
        ],
        "PFElement.html#._prop2attr": [
          "_prop2attr",
          "attribut",
          "function",
          "given",
          "link",
          "look",
          "lt;static&gt",
          "name",
          "pfelement._prop2attr",
          "properti",
          "up"
        ],
        "PFElement.html#._attr2prop": [
          "_attr2prop",
          "attribut",
          "function",
          "given",
          "link",
          "look",
          "lt;static&gt",
          "name",
          "pfelement._attr2prop",
          "properti",
          "up"
        ],
        "PFElement.html#._convertPropNameToAttrName": [
          "_convertpropnametoattrnam",
          "attribut",
          "convert",
          "function",
          "lt;static&gt",
          "name",
          "pfelement._convertpropnametoattrnam",
          "properti"
        ],
        "PFElement.html#._convertAttrNameToPropName": [
          "_convertattrnametopropnam",
          "attribut",
          "convert",
          "function",
          "lt;static&gt",
          "name",
          "pfelement._convertattrnametopropnam",
          "properti"
        ],
        "PFElement.html#.create": [
          "attribut",
          "cach",
          "creat",
          "data",
          "effici",
          "function",
          "lt;static&gt",
          "pfelement.cr",
          "properti"
        ],
        "PFElement.html#._setCache": [
          "_setcach",
          "alreadi",
          "anyth",
          "cach",
          "function",
          "given",
          "lt;static&gt",
          "namespac",
          "object",
          "overwrit",
          "pfelement._setcach"
        ],
        "PFElement.html#._getCache": [
          "_getcach",
          "cach",
          "function",
          "lt;static&gt",
          "namespac",
          "object",
          "pfelement._getcach"
        ],
        "PFElement.html#._populateCache": [
          "_populatecach",
          "cach",
          "function",
          "initi",
          "lt;static&gt",
          "pfelement._populatecach",
          "popul",
          "properti",
          "valu"
        ]
      },
      length: 50
    },
    tokenStore: {
      root: {
        docs: {},
        b: {
          docs: {},
          a: {
            docs: {},
            s: {
              docs: {},
              e: {
                docs: {
                  "index.html": {
                    ref: "index.html",
                    tf: 8.75
                  },
                  "PFElement.html#.properties": {
                    ref: "PFElement.html#.properties",
                    tf: 5.555555555555555
                  },
                  "PFElement.html#_initializeProperties": {
                    ref: "PFElement.html#_initializeProperties",
                    tf: 7.142857142857142
                  }
                },
                l: {
                  docs: {},
                  i: {
                    docs: {},
                    n: {
                      docs: {
                        "PFElement.html": {
                          ref: "PFElement.html",
                          tf: 10
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          e: {
            docs: {
              "PFElement.html#version": {
                ref: "PFElement.html#version",
                tf: 5
              }
            }
          },
          o: {
            docs: {},
            o: {
              docs: {},
              l: {
                docs: {},
                e: {
                  docs: {},
                  a: {
                    docs: {},
                    n: {
                      docs: {
                        "PFElement.html#.debugLog": {
                          ref: "PFElement.html#.debugLog",
                          tf: 2.7777777777777777
                        },
                        "PFElement.html#.trackPerformance": {
                          ref: "PFElement.html#.trackPerformance",
                          tf: 3.3333333333333335
                        },
                        "PFElement.html#.log": {
                          ref: "PFElement.html#.log",
                          tf: 6.25
                        },
                        "PFElement.html#hasLightDOM": {
                          ref: "PFElement.html#hasLightDOM",
                          tf: 56.25
                        },
                        "PFElement.html#hasSlot": {
                          ref: "PFElement.html#hasSlot",
                          tf: 6.25
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        c: {
          docs: {},
          o: {
            docs: {},
            m: {
              docs: {},
              m: {
                docs: {},
                u: {
                  docs: {},
                  n: {
                    docs: {
                      "index.html": {
                        ref: "index.html",
                        tf: 8.75
                      }
                    }
                  }
                }
              },
              p: {
                docs: {},
                o: {
                  docs: {},
                  n: {
                    docs: {
                      "index.html": {
                        ref: "index.html",
                        tf: 8.75
                      },
                      "PFElement.html": {
                        ref: "PFElement.html",
                        tf: 10
                      },
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 9.090909090909092
                      },
                      "PFElement.html#.version": {
                        ref: "PFElement.html#.version",
                        tf: 6.25
                      },
                      "PFElement.html#.properties": {
                        ref: "PFElement.html#.properties",
                        tf: 5.555555555555555
                      },
                      "PFElement.html#contextVariable": {
                        ref: "PFElement.html#contextVariable",
                        tf: 10
                      },
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#.debugLog": {
                        ref: "PFElement.html#.debugLog",
                        tf: 2.7777777777777777
                      },
                      "PFElement.html#.trackPerformance": {
                        ref: "PFElement.html#.trackPerformance",
                        tf: 3.3333333333333335
                      },
                      "PFElement.html#hasLightDOM": {
                        ref: "PFElement.html#hasLightDOM",
                        tf: 6.25
                      },
                      "PFElement.html#contextUpdate": {
                        ref: "PFElement.html#contextUpdate",
                        tf: 10
                      },
                      "PFElement.html#connectedCallback": {
                        ref: "PFElement.html#connectedCallback",
                        tf: 7.142857142857142
                      },
                      "PFElement.html#attributeChangedCallback": {
                        ref: "PFElement.html#attributeChangedCallback",
                        tf: 4.545454545454546
                      },
                      "PFElement.html#cascadeProperties": {
                        ref: "PFElement.html#cascadeProperties",
                        tf: 3.8461538461538463
                      },
                      "PFElement.html#_upgradeObserver": {
                        ref: "PFElement.html#_upgradeObserver",
                        tf: 7.142857142857142
                      },
                      "PFElement.html#_onObserver": {
                        ref: "PFElement.html#_onObserver",
                        tf: 8.333333333333332
                      },
                      "PFElement.html#_assignValueToAttribute": {
                        ref: "PFElement.html#_assignValueToAttribute",
                        tf: 8.333333333333332
                      }
                    },
                    e: {
                      docs: {},
                      n: {
                        docs: {},
                        t: {
                          docs: {},
                          "'": {
                            docs: {
                              "PFElement.html#.allProperties": {
                                ref: "PFElement.html#.allProperties",
                                tf: 1.9230769230769231
                              },
                              "PFElement.html#.cascadingProperties": {
                                ref: "PFElement.html#.cascadingProperties",
                                tf: 1.9230769230769231
                              },
                              "PFElement.html#warn": {
                                ref: "PFElement.html#warn",
                                tf: 4.166666666666666
                              },
                              "PFElement.html#.error": {
                                ref: "PFElement.html#.error",
                                tf: 4.166666666666666
                              },
                              "PFElement.html#error": {
                                ref: "PFElement.html#error",
                                tf: 4.166666666666666
                              }
                            }
                          }
                        }
                      },
                      t: {
                        docs: {
                          "PFElement.html#disconnectedCallback": {
                            ref: "PFElement.html#disconnectedCallback",
                            tf: 5
                          }
                        }
                      }
                    }
                  }
                },
                i: {
                  docs: {},
                  l: {
                    docs: {
                      "PFElement.html#.version": {
                        ref: "PFElement.html#.version",
                        tf: 6.25
                      }
                    }
                  }
                }
              },
              b: {
                docs: {},
                i: {
                  docs: {},
                  n: {
                    docs: {
                      "PFElement.html#attributeChangedCallback": {
                        ref: "PFElement.html#attributeChangedCallback",
                        tf: 4.545454545454546
                      }
                    }
                  }
                }
              }
            },
            n: {
              docs: {},
              s: {
                docs: {},
                o: {
                  docs: {},
                  l: {
                    docs: {
                      "PFElement.html#version": {
                        ref: "PFElement.html#version",
                        tf: 5
                      },
                      "PFElement.html#.debugLog": {
                        ref: "PFElement.html#.debugLog",
                        tf: 2.7777777777777777
                      },
                      "PFElement.html#.log": {
                        ref: "PFElement.html#.log",
                        tf: 6.25
                      },
                      "PFElement.html#.warn": {
                        ref: "PFElement.html#.warn",
                        tf: 6.25
                      },
                      "PFElement.html#.error": {
                        ref: "PFElement.html#.error",
                        tf: 4.166666666666666
                      }
                    }
                  }
                },
                t: {
                  docs: {},
                  r: {
                    docs: {},
                    u: {
                      docs: {},
                      c: {
                        docs: {},
                        t: {
                          docs: {},
                          o: {
                            docs: {},
                            r: {
                              docs: {
                                "PFElement.html#.debugLog": {
                                  ref: "PFElement.html#.debugLog",
                                  tf: 2.7777777777777777
                                },
                                "PFElement.html#.trackPerformance": {
                                  ref: "PFElement.html#.trackPerformance",
                                  tf: 3.3333333333333335
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              t: {
                docs: {},
                e: {
                  docs: {},
                  x: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#contextVariable": {
                          ref: "PFElement.html#contextVariable",
                          tf: 10
                        },
                        "PFElement.html#contextUpdate": {
                          ref: "PFElement.html#contextUpdate",
                          tf: 10
                        },
                        "PFElement.html#_contextObserver": {
                          ref: "PFElement.html#_contextObserver",
                          tf: 7.142857142857142
                        },
                        "PFElement.html#_onObserver": {
                          ref: "PFElement.html#_onObserver",
                          tf: 8.333333333333332
                        },
                        "PFElement.html#_inlineStyleObserver": {
                          ref: "PFElement.html#_inlineStyleObserver",
                          tf: 6.25
                        }
                      },
                      v: {
                        docs: {},
                        a: {
                          docs: {},
                          r: {
                            docs: {},
                            i: {
                              docs: {
                                "PFElement.html#contextVariable": {
                                  ref: "PFElement.html#contextVariable",
                                  tf: 750
                                }
                              }
                            }
                          }
                        }
                      },
                      u: {
                        docs: {},
                        p: {
                          docs: {},
                          d: {
                            docs: {
                              "PFElement.html#contextUpdate": {
                                ref: "PFElement.html#contextUpdate",
                                tf: 750
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                a: {
                  docs: {},
                  i: {
                    docs: {},
                    n: {
                      docs: {
                        "PFElement.html#.allProperties": {
                          ref: "PFElement.html#.allProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#.cascadingProperties": {
                          ref: "PFElement.html#.cascadingProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#hasLightDOM": {
                          ref: "PFElement.html#hasLightDOM",
                          tf: 6.25
                        }
                      }
                    }
                  }
                }
              },
              f: {
                docs: {},
                l: {
                  docs: {},
                  i: {
                    docs: {},
                    c: {
                      docs: {},
                      t: {
                        docs: {
                          "PFElement.html#.allProperties": {
                            ref: "PFElement.html#.allProperties",
                            tf: 1.9230769230769231
                          },
                          "PFElement.html#.cascadingProperties": {
                            ref: "PFElement.html#.cascadingProperties",
                            tf: 1.9230769230769231
                          }
                        }
                      }
                    }
                  }
                }
              },
              n: {
                docs: {},
                e: {
                  docs: {},
                  c: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#connectedCallback": {
                          ref: "PFElement.html#connectedCallback",
                          tf: 7.142857142857142
                        },
                        "PFElement.html#_parseObserver": {
                          ref: "PFElement.html#_parseObserver",
                          tf: 4.545454545454546
                        }
                      },
                      e: {
                        docs: {},
                        d: {
                          docs: {},
                          c: {
                            docs: {},
                            a: {
                              docs: {},
                              l: {
                                docs: {},
                                l: {
                                  docs: {},
                                  b: {
                                    docs: {},
                                    a: {
                                      docs: {},
                                      c: {
                                        docs: {},
                                        k: {
                                          docs: {
                                            "PFElement.html#connectedCallback": {
                                              ref: "PFElement.html#connectedCallback",
                                              tf: 750
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              v: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#_castPropertyValue": {
                          ref: "PFElement.html#_castPropertyValue",
                          tf: 5.555555555555555
                        },
                        "PFElement.html#._convertPropNameToAttrName": {
                          ref: "PFElement.html#._convertPropNameToAttrName",
                          tf: 10
                        },
                        "PFElement.html#._convertAttrNameToPropName": {
                          ref: "PFElement.html#._convertAttrNameToPropName",
                          tf: 10
                        }
                      }
                    }
                  }
                }
              }
            },
            r: {
              docs: {},
              r: {
                docs: {},
                e: {
                  docs: {},
                  c: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#_castPropertyValue": {
                          ref: "PFElement.html#_castPropertyValue",
                          tf: 5.555555555555555
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          r: {
            docs: {},
            e: {
              docs: {},
              a: {
                docs: {},
                t: {
                  docs: {
                    "index.html": {
                      ref: "index.html",
                      tf: 8.75
                    },
                    "PFElement.html#.create": {
                      ref: "PFElement.html#.create",
                      tf: 700
                    }
                  }
                }
              }
            }
          },
          l: {
            docs: {},
            a: {
              docs: {},
              s: {
                docs: {},
                s: {
                  docs: {
                    "list_class.html": {
                      ref: "list_class.html",
                      tf: 635
                    },
                    "PFElement.html": {
                      ref: "PFElement.html",
                      tf: 110
                    },
                    "PFElement.html#.properties": {
                      ref: "PFElement.html#.properties",
                      tf: 5.555555555555555
                    }
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            r: {
              docs: {},
              r: {
                docs: {},
                e: {
                  docs: {},
                  n: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#.version": {
                          ref: "PFElement.html#.version",
                          tf: 6.25
                        },
                        "PFElement.html#contextVariable": {
                          ref: "PFElement.html#contextVariable",
                          tf: 10
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            s: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.allProperties": {
                    ref: "PFElement.html#.allProperties",
                    tf: 1.9230769230769231
                  },
                  "PFElement.html#.cascadingProperties": {
                    ref: "PFElement.html#.cascadingProperties",
                    tf: 1.9230769230769231
                  }
                }
              },
              c: {
                docs: {},
                a: {
                  docs: {},
                  d: {
                    docs: {
                      "PFElement.html#cascadeProperties": {
                        ref: "PFElement.html#cascadeProperties",
                        tf: 3.8461538461538463
                      },
                      "PFElement.html#_parseObserver": {
                        ref: "PFElement.html#_parseObserver",
                        tf: 4.545454545454546
                      }
                    },
                    i: {
                      docs: {},
                      n: {
                        docs: {},
                        g: {
                          docs: {},
                          p: {
                            docs: {},
                            r: {
                              docs: {},
                              o: {
                                docs: {},
                                p: {
                                  docs: {},
                                  e: {
                                    docs: {},
                                    r: {
                                      docs: {},
                                      t: {
                                        docs: {},
                                        i: {
                                          docs: {
                                            "PFElement.html#.cascadingProperties": {
                                              ref: "PFElement.html#.cascadingProperties",
                                              tf: 701.9230769230769
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    e: {
                      docs: {},
                      p: {
                        docs: {},
                        r: {
                          docs: {},
                          o: {
                            docs: {},
                            p: {
                              docs: {},
                              e: {
                                docs: {},
                                r: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    i: {
                                      docs: {
                                        "PFElement.html#cascadeProperties": {
                                          ref: "PFElement.html#cascadeProperties",
                                          tf: 750
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            l: {
              docs: {},
              l: {
                docs: {},
                b: {
                  docs: {},
                  a: {
                    docs: {},
                    c: {
                      docs: {},
                      k: {
                        docs: {
                          "PFElement.html#connectedCallback": {
                            ref: "PFElement.html#connectedCallback",
                            tf: 7.142857142857142
                          },
                          "PFElement.html#disconnectedCallback": {
                            ref: "PFElement.html#disconnectedCallback",
                            tf: 5
                          },
                          "PFElement.html#attributeChangedCallback": {
                            ref: "PFElement.html#attributeChangedCallback",
                            tf: 4.545454545454546
                          },
                          "PFElement.html#cascadeProperties": {
                            ref: "PFElement.html#cascadeProperties",
                            tf: 3.8461538461538463
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            c: {
              docs: {},
              h: {
                docs: {
                  "PFElement.html#.create": {
                    ref: "PFElement.html#.create",
                    tf: 10
                  },
                  "PFElement.html#._setCache": {
                    ref: "PFElement.html#._setCache",
                    tf: 11.11111111111111
                  },
                  "PFElement.html#._getCache": {
                    ref: "PFElement.html#._getCache",
                    tf: 20
                  },
                  "PFElement.html#._populateCache": {
                    ref: "PFElement.html#._populateCache",
                    tf: 10
                  }
                }
              }
            }
          },
          h: {
            docs: {},
            e: {
              docs: {},
              c: {
                docs: {},
                k: {
                  docs: {
                    "PFElement.html#.log": {
                      ref: "PFElement.html#.log",
                      tf: 6.25
                    }
                  }
                }
              }
            },
            a: {
              docs: {},
              n: {
                docs: {},
                g: {
                  docs: {
                    "PFElement.html#contextUpdate": {
                      ref: "PFElement.html#contextUpdate",
                      tf: 10
                    },
                    "PFElement.html#attributeChangedCallback": {
                      ref: "PFElement.html#attributeChangedCallback",
                      tf: 4.545454545454546
                    },
                    "PFElement.html#_upgradeObserver": {
                      ref: "PFElement.html#_upgradeObserver",
                      tf: 7.142857142857142
                    },
                    "PFElement.html#_contextObserver": {
                      ref: "PFElement.html#_contextObserver",
                      tf: 7.142857142857142
                    },
                    "PFElement.html#_onObserver": {
                      ref: "PFElement.html#_onObserver",
                      tf: 8.333333333333332
                    },
                    "PFElement.html#_inlineStyleObserver": {
                      ref: "PFElement.html#_inlineStyleObserver",
                      tf: 6.25
                    }
                  }
                }
              }
            }
          }
        },
        d: {
          docs: {},
          e: {
            docs: {},
            s: {
              docs: {},
              i: {
                docs: {},
                g: {
                  docs: {},
                  n: {
                    docs: {
                      "index.html": {
                        ref: "index.html",
                        tf: 8.75
                      }
                    }
                  }
                }
              },
              c: {
                docs: {},
                e: {
                  docs: {},
                  n: {
                    docs: {},
                    d: {
                      docs: {
                        "PFElement.html#.allProperties": {
                          ref: "PFElement.html#.allProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#.cascadingProperties": {
                          ref: "PFElement.html#.cascadingProperties",
                          tf: 1.9230769230769231
                        }
                      }
                    }
                  }
                }
              }
            },
            f: {
              docs: {},
              i: {
                docs: {},
                n: {
                  docs: {
                    "PFElement.html#.PfeTypes": {
                      ref: "PFElement.html#.PfeTypes",
                      tf: 4.545454545454546
                    },
                    "PFElement.html#getSlot": {
                      ref: "PFElement.html#getSlot",
                      tf: 3.3333333333333335
                    },
                    "PFElement.html#_castPropertyValue": {
                      ref: "PFElement.html#_castPropertyValue",
                      tf: 5.555555555555555
                    },
                    "PFElement.html#_initializeSlots": {
                      ref: "PFElement.html#_initializeSlots",
                      tf: 8.333333333333332
                    }
                  },
                  i: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#.PfeTypes": {
                          ref: "PFElement.html#.PfeTypes",
                          tf: 4.545454545454546
                        },
                        "PFElement.html#.properties": {
                          ref: "PFElement.html#.properties",
                          tf: 5.555555555555555
                        },
                        "PFElement.html#_initializeProperties": {
                          ref: "PFElement.html#_initializeProperties",
                          tf: 7.142857142857142
                        }
                      }
                    }
                  }
                }
              },
              a: {
                docs: {},
                u: {
                  docs: {},
                  l: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#_initializeAttributeDefaults": {
                          ref: "PFElement.html#_initializeAttributeDefaults",
                          tf: 12.5
                        }
                      }
                    }
                  }
                }
              }
            },
            b: {
              docs: {},
              u: {
                docs: {},
                g: {
                  docs: {
                    "PFElement.html#.debugLog": {
                      ref: "PFElement.html#.debugLog",
                      tf: 2.7777777777777777
                    },
                    "PFElement.html#.warn": {
                      ref: "PFElement.html#.warn",
                      tf: 6.25
                    },
                    "PFElement.html#.error": {
                      ref: "PFElement.html#.error",
                      tf: 4.166666666666666
                    }
                  },
                  l: {
                    docs: {},
                    o: {
                      docs: {},
                      g: {
                        docs: {
                          "PFElement.html#.debugLog": {
                            ref: "PFElement.html#.debugLog",
                            tf: 700
                          },
                          "PFElement.html#.log": {
                            ref: "PFElement.html#.log",
                            tf: 6.25
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            v: {
              docs: {},
              e: {
                docs: {},
                l: {
                  docs: {},
                  o: {
                    docs: {},
                    p: {
                      docs: {
                        "PFElement.html#.debugLog": {
                          ref: "PFElement.html#.debugLog",
                          tf: 2.7777777777777777
                        },
                        "PFElement.html#.trackPerformance": {
                          ref: "PFElement.html#.trackPerformance",
                          tf: 3.3333333333333335
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            c: {
              docs: {},
              u: {
                docs: {},
                m: {
                  docs: {},
                  e: {
                    docs: {},
                    n: {
                      docs: {},
                      t: {
                        docs: {
                          "global.html": {
                            ref: "global.html",
                            tf: 35
                          },
                          "list_class.html": {
                            ref: "list_class.html",
                            tf: 35
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            m: {
              docs: {
                "PFElement.html#hasLightDOM": {
                  ref: "PFElement.html#hasLightDOM",
                  tf: 6.25
                },
                "PFElement.html#hasSlot": {
                  ref: "PFElement.html#hasSlot",
                  tf: 6.25
                },
                "PFElement.html#getSlot": {
                  ref: "PFElement.html#getSlot",
                  tf: 3.3333333333333335
                },
                "PFElement.html#connectedCallback": {
                  ref: "PFElement.html#connectedCallback",
                  tf: 7.142857142857142
                },
                "PFElement.html#disconnectedCallback": {
                  ref: "PFElement.html#disconnectedCallback",
                  tf: 5
                },
                "PFElement.html#_parseObserver": {
                  ref: "PFElement.html#_parseObserver",
                  tf: 4.545454545454546
                }
              }
            },
            w: {
              docs: {},
              n: {
                docs: {
                  "PFElement.html#_parseObserver": {
                    ref: "PFElement.html#_parseObserver",
                    tf: 4.545454545454546
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            t: {
              docs: {},
              a: {
                docs: {
                  "PFElement.html#.version": {
                    ref: "PFElement.html#.version",
                    tf: 6.25
                  },
                  "PFElement.html#.create": {
                    ref: "PFElement.html#.create",
                    tf: 10
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            r: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.debugLog": {
                    ref: "PFElement.html#.debugLog",
                    tf: 2.7777777777777777
                  },
                  "PFElement.html#.trackPerformance": {
                    ref: "PFElement.html#.trackPerformance",
                    tf: 3.3333333333333335
                  }
                }
              }
            }
          },
          i: {
            docs: {},
            s: {
              docs: {},
              c: {
                docs: {},
                o: {
                  docs: {},
                  n: {
                    docs: {},
                    n: {
                      docs: {},
                      e: {
                        docs: {},
                        c: {
                          docs: {},
                          t: {
                            docs: {
                              "PFElement.html#disconnectedCallback": {
                                ref: "PFElement.html#disconnectedCallback",
                                tf: 5
                              }
                            },
                            e: {
                              docs: {},
                              d: {
                                docs: {},
                                c: {
                                  docs: {},
                                  a: {
                                    docs: {},
                                    l: {
                                      docs: {},
                                      l: {
                                        docs: {},
                                        b: {
                                          docs: {},
                                          a: {
                                            docs: {},
                                            c: {
                                              docs: {},
                                              k: {
                                                docs: {
                                                  "PFElement.html#disconnectedCallback": {
                                                    ref: "PFElement.html#disconnectedCallback",
                                                    tf: 750
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              p: {
                docs: {},
                a: {
                  docs: {},
                  t: {
                    docs: {},
                    c: {
                      docs: {},
                      h: {
                        docs: {
                          "PFElement.html#emitEvent": {
                            ref: "PFElement.html#emitEvent",
                            tf: 8.333333333333332
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        e: {
          docs: {},
          l: {
            docs: {},
            e: {
              docs: {},
              m: {
                docs: {},
                e: {
                  docs: {},
                  n: {
                    docs: {},
                    t: {
                      docs: {
                        "index.html": {
                          ref: "index.html",
                          tf: 300
                        },
                        "PFElement.html": {
                          ref: "PFElement.html",
                          tf: 10
                        },
                        "PFElement.html#cascadeProperties": {
                          ref: "PFElement.html#cascadeProperties",
                          tf: 3.8461538461538463
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          n: {
            docs: {},
            s: {
              docs: {},
              u: {
                docs: {},
                r: {
                  docs: {
                    "PFElement.html#randomId": {
                      ref: "PFElement.html#randomId",
                      tf: 3.125
                    }
                  }
                }
              }
            }
          },
          t: {
            docs: {},
            c: {
              docs: {
                "PFElement.html#.allProperties": {
                  ref: "PFElement.html#.allProperties",
                  tf: 1.9230769230769231
                },
                "PFElement.html#.cascadingProperties": {
                  ref: "PFElement.html#.cascadingProperties",
                  tf: 1.9230769230769231
                }
              }
            }
          },
          r: {
            docs: {},
            r: {
              docs: {},
              o: {
                docs: {},
                r: {
                  docs: {
                    "PFElement.html#.error": {
                      ref: "PFElement.html#.error",
                      tf: 704.1666666666666
                    },
                    "PFElement.html#error": {
                      ref: "PFElement.html#error",
                      tf: 754.1666666666666
                    }
                  }
                }
              }
            }
          },
          x: {
            docs: {},
            i: {
              docs: {},
              s: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#hasSlot": {
                      ref: "PFElement.html#hasSlot",
                      tf: 6.25
                    }
                  }
                }
              }
            }
          },
          m: {
            docs: {},
            i: {
              docs: {},
              t: {
                docs: {},
                e: {
                  docs: {},
                  v: {
                    docs: {
                      "PFElement.html#emitEvent": {
                        ref: "PFElement.html#emitEvent",
                        tf: 750
                      }
                    }
                  }
                }
              }
            }
          },
          v: {
            docs: {},
            e: {
              docs: {},
              n: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#emitEvent": {
                      ref: "PFElement.html#emitEvent",
                      tf: 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            s: {
              docs: {},
              i: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {
                      "PFElement.html#_initializeSlots": {
                        ref: "PFElement.html#_initializeSlots",
                        tf: 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          f: {
            docs: {},
            f: {
              docs: {},
              i: {
                docs: {},
                c: {
                  docs: {},
                  i: {
                    docs: {
                      "PFElement.html#.create": {
                        ref: "PFElement.html#.create",
                        tf: 10
                      }
                    }
                  }
                }
              }
            }
          }
        },
        i: {
          docs: {},
          n: {
            docs: {},
            d: {
              docs: {},
              e: {
                docs: {},
                x: {
                  docs: {
                    "index.html": {
                      ref: "index.html",
                      tf: 1300
                    }
                  }
                }
              },
              i: {
                docs: {},
                c: {
                  docs: {
                    "PFElement.html#.debugLog": {
                      ref: "PFElement.html#.debugLog",
                      tf: 2.7777777777777777
                    },
                    "PFElement.html#.trackPerformance": {
                      ref: "PFElement.html#.trackPerformance",
                      tf: 3.3333333333333335
                    },
                    "PFElement.html#_upgradeObserver": {
                      ref: "PFElement.html#_upgradeObserver",
                      tf: 7.142857142857142
                    }
                  }
                }
              }
            },
            f: {
              docs: {},
              o: {
                docs: {},
                r: {
                  docs: {},
                  m: {
                    docs: {
                      "PFElement.html#.warn": {
                        ref: "PFElement.html#.warn",
                        tf: 6.25
                      },
                      "PFElement.html#.error": {
                        ref: "PFElement.html#.error",
                        tf: 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            s: {
              docs: {},
              i: {
                docs: {},
                d: {
                  docs: {
                    "PFElement.html#warn": {
                      ref: "PFElement.html#warn",
                      tf: 4.166666666666666
                    },
                    "PFElement.html#.error": {
                      ref: "PFElement.html#.error",
                      tf: 4.166666666666666
                    },
                    "PFElement.html#error": {
                      ref: "PFElement.html#error",
                      tf: 4.166666666666666
                    }
                  }
                }
              }
            },
            l: {
              docs: {},
              i: {
                docs: {},
                n: {
                  docs: {
                    "PFElement.html#_inlineStyleObserver": {
                      ref: "PFElement.html#_inlineStyleObserver",
                      tf: 6.25
                    }
                  }
                }
              }
            },
            t: {
              docs: {},
              i: {
                docs: {},
                a: {
                  docs: {},
                  l: {
                    docs: {
                      "PFElement.html#_initializeAttributeDefaults": {
                        ref: "PFElement.html#_initializeAttributeDefaults",
                        tf: 12.5
                      }
                    }
                  }
                }
              }
            },
            i: {
              docs: {},
              t: {
                docs: {},
                i: {
                  docs: {
                    "PFElement.html#._populateCache": {
                      ref: "PFElement.html#._populateCache",
                      tf: 10
                    }
                  }
                }
              }
            }
          },
          d: {
            docs: {
              "PFElement.html#randomId": {
                ref: "PFElement.html#randomId",
                tf: 6.25
              }
            }
          },
          ".": {
            docs: {
              "PFElement.html#getSlot": {
                ref: "PFElement.html#getSlot",
                tf: 3.3333333333333335
              }
            }
          }
        },
        p: {
          docs: {},
          a: {
            docs: {},
            t: {
              docs: {},
              t: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {},
                    n: {
                      docs: {},
                      f: {
                        docs: {},
                        l: {
                          docs: {},
                          i: {
                            docs: {
                              "index.html": {
                                ref: "index.html",
                                tf: 308.75
                              },
                              "PFElement.html": {
                                ref: "PFElement.html",
                                tf: 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            c: {
              docs: {},
              k: {
                docs: {},
                a: {
                  docs: {},
                  g: {
                    docs: {},
                    e: {
                      docs: {},
                      ".": {
                        docs: {},
                        j: {
                          docs: {},
                          s: {
                            docs: {},
                            o: {
                              docs: {},
                              n: {
                                docs: {
                                  "PFElement.html#.version": {
                                    ref: "PFElement.html#.version",
                                    tf: 6.25
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          f: {
            docs: {},
            e: {
              docs: {
                "PFElement.html#randomId": {
                  ref: "PFElement.html#randomId",
                  tf: 3.125
                }
              },
              l: {
                docs: {},
                e: {
                  docs: {},
                  m: {
                    docs: {},
                    e: {
                      docs: {},
                      n: {
                        docs: {},
                        t: {
                          docs: {
                            "PFElement.html": {
                              ref: "PFElement.html",
                              tf: 1900
                            },
                            "PFElement.html#_upgradeObserver": {
                              ref: "PFElement.html#_upgradeObserver",
                              tf: 7.142857142857142
                            }
                          },
                          ".": {
                            docs: {},
                            p: {
                              docs: {},
                              f: {
                                docs: {},
                                e: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    y: {
                                      docs: {},
                                      p: {
                                        docs: {
                                          "PFElement.html#.PfeTypes": {
                                            ref: "PFElement.html#.PfeTypes",
                                            tf: 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              r: {
                                docs: {},
                                o: {
                                  docs: {},
                                  p: {
                                    docs: {},
                                    e: {
                                      docs: {},
                                      r: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          i: {
                                            docs: {
                                              "PFElement.html#.properties": {
                                                ref: "PFElement.html#.properties",
                                                tf: 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            v: {
                              docs: {},
                              e: {
                                docs: {},
                                r: {
                                  docs: {},
                                  s: {
                                    docs: {
                                      "PFElement.html#.version": {
                                        ref: "PFElement.html#.version",
                                        tf: 1150
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            a: {
                              docs: {},
                              l: {
                                docs: {},
                                l: {
                                  docs: {},
                                  p: {
                                    docs: {},
                                    r: {
                                      docs: {},
                                      o: {
                                        docs: {},
                                        p: {
                                          docs: {},
                                          e: {
                                            docs: {},
                                            r: {
                                              docs: {},
                                              t: {
                                                docs: {},
                                                i: {
                                                  docs: {
                                                    "PFElement.html#.allProperties": {
                                                      ref: "PFElement.html#.allProperties",
                                                      tf: 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            c: {
                              docs: {},
                              a: {
                                docs: {},
                                s: {
                                  docs: {},
                                  c: {
                                    docs: {},
                                    a: {
                                      docs: {},
                                      d: {
                                        docs: {},
                                        i: {
                                          docs: {},
                                          n: {
                                            docs: {},
                                            g: {
                                              docs: {},
                                              p: {
                                                docs: {},
                                                r: {
                                                  docs: {},
                                                  o: {
                                                    docs: {},
                                                    p: {
                                                      docs: {},
                                                      e: {
                                                        docs: {},
                                                        r: {
                                                          docs: {},
                                                          t: {
                                                            docs: {},
                                                            i: {
                                                              docs: {
                                                                "PFElement.html#.cascadingProperties": {
                                                                  ref: "PFElement.html#.cascadingProperties",
                                                                  tf: 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              r: {
                                docs: {
                                  "PFElement.html#.create": {
                                    ref: "PFElement.html#.create",
                                    tf: 1150
                                  }
                                }
                              }
                            },
                            d: {
                              docs: {},
                              e: {
                                docs: {},
                                b: {
                                  docs: {},
                                  u: {
                                    docs: {},
                                    g: {
                                      docs: {},
                                      l: {
                                        docs: {},
                                        o: {
                                          docs: {},
                                          g: {
                                            docs: {
                                              "PFElement.html#.debugLog": {
                                                ref: "PFElement.html#.debugLog",
                                                tf: 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            t: {
                              docs: {},
                              r: {
                                docs: {},
                                a: {
                                  docs: {},
                                  c: {
                                    docs: {},
                                    k: {
                                      docs: {},
                                      p: {
                                        docs: {},
                                        e: {
                                          docs: {},
                                          r: {
                                            docs: {},
                                            f: {
                                              docs: {},
                                              o: {
                                                docs: {},
                                                r: {
                                                  docs: {},
                                                  m: {
                                                    docs: {
                                                      "PFElement.html#.trackPerformance": {
                                                        ref: "PFElement.html#.trackPerformance",
                                                        tf: 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            l: {
                              docs: {},
                              o: {
                                docs: {},
                                g: {
                                  docs: {
                                    "PFElement.html#.log": {
                                      ref: "PFElement.html#.log",
                                      tf: 1150
                                    }
                                  }
                                }
                              }
                            },
                            w: {
                              docs: {},
                              a: {
                                docs: {},
                                r: {
                                  docs: {},
                                  n: {
                                    docs: {
                                      "PFElement.html#.warn": {
                                        ref: "PFElement.html#.warn",
                                        tf: 1150
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            e: {
                              docs: {},
                              r: {
                                docs: {},
                                r: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    r: {
                                      docs: {
                                        "PFElement.html#.error": {
                                          ref: "PFElement.html#.error",
                                          tf: 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            _: {
                              docs: {},
                              v: {
                                docs: {},
                                a: {
                                  docs: {},
                                  l: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      d: {
                                        docs: {},
                                        a: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            e: {
                                              docs: {},
                                              p: {
                                                docs: {},
                                                r: {
                                                  docs: {},
                                                  o: {
                                                    docs: {},
                                                    p: {
                                                      docs: {},
                                                      e: {
                                                        docs: {},
                                                        r: {
                                                          docs: {},
                                                          t: {
                                                            docs: {},
                                                            i: {
                                                              docs: {
                                                                "PFElement.html#._validateProperties": {
                                                                  ref: "PFElement.html#._validateProperties",
                                                                  tf: 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              p: {
                                docs: {},
                                r: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    p: {
                                      "2": {
                                        docs: {},
                                        a: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            t: {
                                              docs: {},
                                              r: {
                                                docs: {
                                                  "PFElement.html#._prop2attr": {
                                                    ref: "PFElement.html#._prop2attr",
                                                    tf: 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      docs: {}
                                    }
                                  }
                                },
                                o: {
                                  docs: {},
                                  p: {
                                    docs: {},
                                    u: {
                                      docs: {},
                                      l: {
                                        docs: {},
                                        a: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            e: {
                                              docs: {},
                                              c: {
                                                docs: {},
                                                a: {
                                                  docs: {},
                                                  c: {
                                                    docs: {},
                                                    h: {
                                                      docs: {
                                                        "PFElement.html#._populateCache": {
                                                          ref: "PFElement.html#._populateCache",
                                                          tf: 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              a: {
                                docs: {},
                                t: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    r: {
                                      "2": {
                                        docs: {},
                                        p: {
                                          docs: {},
                                          r: {
                                            docs: {},
                                            o: {
                                              docs: {},
                                              p: {
                                                docs: {
                                                  "PFElement.html#._attr2prop": {
                                                    ref: "PFElement.html#._attr2prop",
                                                    tf: 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      docs: {}
                                    }
                                  }
                                }
                              },
                              c: {
                                docs: {},
                                o: {
                                  docs: {},
                                  n: {
                                    docs: {},
                                    v: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        r: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            p: {
                                              docs: {},
                                              r: {
                                                docs: {},
                                                o: {
                                                  docs: {},
                                                  p: {
                                                    docs: {},
                                                    n: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        m: {
                                                          docs: {},
                                                          e: {
                                                            docs: {},
                                                            t: {
                                                              docs: {},
                                                              o: {
                                                                docs: {},
                                                                a: {
                                                                  docs: {},
                                                                  t: {
                                                                    docs: {},
                                                                    t: {
                                                                      docs: {},
                                                                      r: {
                                                                        docs: {},
                                                                        n: {
                                                                          docs: {},
                                                                          a: {
                                                                            docs: {},
                                                                            m: {
                                                                              docs: {
                                                                                "PFElement.html#._convertPropNameToAttrName": {
                                                                                  ref:
                                                                                    "PFElement.html#._convertPropNameToAttrName",
                                                                                  tf: 1150
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            a: {
                                              docs: {},
                                              t: {
                                                docs: {},
                                                t: {
                                                  docs: {},
                                                  r: {
                                                    docs: {},
                                                    n: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        m: {
                                                          docs: {},
                                                          e: {
                                                            docs: {},
                                                            t: {
                                                              docs: {},
                                                              o: {
                                                                docs: {},
                                                                p: {
                                                                  docs: {},
                                                                  r: {
                                                                    docs: {},
                                                                    o: {
                                                                      docs: {},
                                                                      p: {
                                                                        docs: {},
                                                                        n: {
                                                                          docs: {},
                                                                          a: {
                                                                            docs: {},
                                                                            m: {
                                                                              docs: {
                                                                                "PFElement.html#._convertAttrNameToPropName": {
                                                                                  ref:
                                                                                    "PFElement.html#._convertAttrNameToPropName",
                                                                                  tf: 1150
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              s: {
                                docs: {},
                                e: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    c: {
                                      docs: {},
                                      a: {
                                        docs: {},
                                        c: {
                                          docs: {},
                                          h: {
                                            docs: {
                                              "PFElement.html#._setCache": {
                                                ref: "PFElement.html#._setCache",
                                                tf: 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              g: {
                                docs: {},
                                e: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    c: {
                                      docs: {},
                                      a: {
                                        docs: {},
                                        c: {
                                          docs: {},
                                          h: {
                                            docs: {
                                              "PFElement.html#._getCache": {
                                                ref: "PFElement.html#._getCache",
                                                tf: 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "#": {
                            docs: {},
                            v: {
                              docs: {},
                              e: {
                                docs: {},
                                r: {
                                  docs: {},
                                  s: {
                                    docs: {
                                      "PFElement.html#version": {
                                        ref: "PFElement.html#version",
                                        tf: 1150
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            r: {
                              docs: {},
                              a: {
                                docs: {},
                                n: {
                                  docs: {},
                                  d: {
                                    docs: {},
                                    o: {
                                      docs: {},
                                      m: {
                                        docs: {},
                                        i: {
                                          docs: {},
                                          d: {
                                            docs: {
                                              "PFElement.html#randomId": {
                                                ref: "PFElement.html#randomId",
                                                tf: 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              e: {
                                docs: {},
                                n: {
                                  docs: {},
                                  d: {
                                    docs: {
                                      "PFElement.html#render": {
                                        ref: "PFElement.html#render",
                                        tf: 1150
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            c: {
                              docs: {},
                              o: {
                                docs: {},
                                n: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    e: {
                                      docs: {},
                                      x: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          v: {
                                            docs: {},
                                            a: {
                                              docs: {},
                                              r: {
                                                docs: {},
                                                i: {
                                                  docs: {
                                                    "PFElement.html#contextVariable": {
                                                      ref: "PFElement.html#contextVariable",
                                                      tf: 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          u: {
                                            docs: {},
                                            p: {
                                              docs: {},
                                              d: {
                                                docs: {
                                                  "PFElement.html#contextUpdate": {
                                                    ref: "PFElement.html#contextUpdate",
                                                    tf: 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  n: {
                                    docs: {},
                                    e: {
                                      docs: {},
                                      c: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          e: {
                                            docs: {},
                                            d: {
                                              docs: {},
                                              c: {
                                                docs: {},
                                                a: {
                                                  docs: {},
                                                  l: {
                                                    docs: {},
                                                    l: {
                                                      docs: {},
                                                      b: {
                                                        docs: {},
                                                        a: {
                                                          docs: {},
                                                          c: {
                                                            docs: {},
                                                            k: {
                                                              docs: {
                                                                "PFElement.html#connectedCallback": {
                                                                  ref: "PFElement.html#connectedCallback",
                                                                  tf: 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              a: {
                                docs: {},
                                s: {
                                  docs: {},
                                  c: {
                                    docs: {},
                                    a: {
                                      docs: {},
                                      d: {
                                        docs: {},
                                        e: {
                                          docs: {},
                                          p: {
                                            docs: {},
                                            r: {
                                              docs: {},
                                              o: {
                                                docs: {},
                                                p: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    r: {
                                                      docs: {},
                                                      t: {
                                                        docs: {},
                                                        i: {
                                                          docs: {
                                                            "PFElement.html#cascadeProperties": {
                                                              ref: "PFElement.html#cascadeProperties",
                                                              tf: 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            l: {
                              docs: {},
                              o: {
                                docs: {},
                                g: {
                                  docs: {
                                    "PFElement.html#log": {
                                      ref: "PFElement.html#log",
                                      tf: 1150
                                    }
                                  }
                                }
                              }
                            },
                            w: {
                              docs: {},
                              a: {
                                docs: {},
                                r: {
                                  docs: {},
                                  n: {
                                    docs: {
                                      "PFElement.html#warn": {
                                        ref: "PFElement.html#warn",
                                        tf: 1150
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            e: {
                              docs: {},
                              r: {
                                docs: {},
                                r: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    r: {
                                      docs: {
                                        "PFElement.html#error": {
                                          ref: "PFElement.html#error",
                                          tf: 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              m: {
                                docs: {},
                                i: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    e: {
                                      docs: {},
                                      v: {
                                        docs: {
                                          "PFElement.html#emitEvent": {
                                            ref: "PFElement.html#emitEvent",
                                            tf: 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            h: {
                              docs: {},
                              a: {
                                docs: {},
                                s: {
                                  docs: {},
                                  l: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      g: {
                                        docs: {},
                                        h: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            d: {
                                              docs: {},
                                              o: {
                                                docs: {},
                                                m: {
                                                  docs: {
                                                    "PFElement.html#hasLightDOM": {
                                                      ref: "PFElement.html#hasLightDOM",
                                                      tf: 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  s: {
                                    docs: {},
                                    l: {
                                      docs: {},
                                      o: {
                                        docs: {},
                                        t: {
                                          docs: {
                                            "PFElement.html#hasSlot": {
                                              ref: "PFElement.html#hasSlot",
                                              tf: 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            g: {
                              docs: {},
                              e: {
                                docs: {},
                                t: {
                                  docs: {},
                                  s: {
                                    docs: {},
                                    l: {
                                      docs: {},
                                      o: {
                                        docs: {},
                                        t: {
                                          docs: {
                                            "PFElement.html#getSlot": {
                                              ref: "PFElement.html#getSlot",
                                              tf: 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            d: {
                              docs: {},
                              i: {
                                docs: {},
                                s: {
                                  docs: {},
                                  c: {
                                    docs: {},
                                    o: {
                                      docs: {},
                                      n: {
                                        docs: {},
                                        n: {
                                          docs: {},
                                          e: {
                                            docs: {},
                                            c: {
                                              docs: {},
                                              t: {
                                                docs: {},
                                                e: {
                                                  docs: {},
                                                  d: {
                                                    docs: {},
                                                    c: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        l: {
                                                          docs: {},
                                                          l: {
                                                            docs: {},
                                                            b: {
                                                              docs: {},
                                                              a: {
                                                                docs: {},
                                                                c: {
                                                                  docs: {},
                                                                  k: {
                                                                    docs: {
                                                                      "PFElement.html#disconnectedCallback": {
                                                                        ref: "PFElement.html#disconnectedCallback",
                                                                        tf: 1150
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            a: {
                              docs: {},
                              t: {
                                docs: {},
                                t: {
                                  docs: {},
                                  r: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      b: {
                                        docs: {},
                                        u: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            e: {
                                              docs: {},
                                              c: {
                                                docs: {},
                                                h: {
                                                  docs: {},
                                                  a: {
                                                    docs: {},
                                                    n: {
                                                      docs: {},
                                                      g: {
                                                        docs: {},
                                                        e: {
                                                          docs: {},
                                                          d: {
                                                            docs: {},
                                                            c: {
                                                              docs: {},
                                                              a: {
                                                                docs: {},
                                                                l: {
                                                                  docs: {},
                                                                  l: {
                                                                    docs: {},
                                                                    b: {
                                                                      docs: {},
                                                                      a: {
                                                                        docs: {},
                                                                        c: {
                                                                          docs: {},
                                                                          k: {
                                                                            docs: {
                                                                              "PFElement.html#attributeChangedCallback": {
                                                                                ref:
                                                                                  "PFElement.html#attributeChangedCallback",
                                                                                tf: 1150
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            _: {
                              docs: {},
                              u: {
                                docs: {},
                                p: {
                                  docs: {},
                                  g: {
                                    docs: {},
                                    r: {
                                      docs: {},
                                      a: {
                                        docs: {},
                                        d: {
                                          docs: {},
                                          e: {
                                            docs: {},
                                            o: {
                                              docs: {},
                                              b: {
                                                docs: {},
                                                s: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    r: {
                                                      docs: {},
                                                      v: {
                                                        docs: {
                                                          "PFElement.html#_upgradeObserver": {
                                                            ref: "PFElement.html#_upgradeObserver",
                                                            tf: 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              c: {
                                docs: {},
                                o: {
                                  docs: {},
                                  n: {
                                    docs: {},
                                    t: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        x: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            o: {
                                              docs: {},
                                              b: {
                                                docs: {},
                                                s: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    r: {
                                                      docs: {},
                                                      v: {
                                                        docs: {
                                                          "PFElement.html#_contextObserver": {
                                                            ref: "PFElement.html#_contextObserver",
                                                            tf: 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                a: {
                                  docs: {},
                                  s: {
                                    docs: {},
                                    t: {
                                      docs: {},
                                      p: {
                                        docs: {},
                                        r: {
                                          docs: {},
                                          o: {
                                            docs: {},
                                            p: {
                                              docs: {},
                                              e: {
                                                docs: {},
                                                r: {
                                                  docs: {},
                                                  t: {
                                                    docs: {},
                                                    y: {
                                                      docs: {},
                                                      v: {
                                                        docs: {},
                                                        a: {
                                                          docs: {},
                                                          l: {
                                                            docs: {},
                                                            u: {
                                                              docs: {
                                                                "PFElement.html#_castPropertyValue": {
                                                                  ref: "PFElement.html#_castPropertyValue",
                                                                  tf: 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              o: {
                                docs: {},
                                n: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    b: {
                                      docs: {},
                                      s: {
                                        docs: {},
                                        e: {
                                          docs: {},
                                          r: {
                                            docs: {},
                                            v: {
                                              docs: {
                                                "PFElement.html#_onObserver": {
                                                  ref: "PFElement.html#_onObserver",
                                                  tf: 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              i: {
                                docs: {},
                                n: {
                                  docs: {},
                                  l: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      n: {
                                        docs: {},
                                        e: {
                                          docs: {},
                                          s: {
                                            docs: {},
                                            t: {
                                              docs: {},
                                              y: {
                                                docs: {},
                                                l: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    o: {
                                                      docs: {},
                                                      b: {
                                                        docs: {},
                                                        s: {
                                                          docs: {},
                                                          e: {
                                                            docs: {},
                                                            r: {
                                                              docs: {},
                                                              v: {
                                                                docs: {
                                                                  "PFElement.html#_inlineStyleObserver": {
                                                                    ref: "PFElement.html#_inlineStyleObserver",
                                                                    tf: 1150
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  i: {
                                    docs: {},
                                    t: {
                                      docs: {},
                                      i: {
                                        docs: {},
                                        a: {
                                          docs: {},
                                          l: {
                                            docs: {},
                                            i: {
                                              docs: {},
                                              z: {
                                                docs: {},
                                                e: {
                                                  docs: {},
                                                  s: {
                                                    docs: {},
                                                    l: {
                                                      docs: {},
                                                      o: {
                                                        docs: {},
                                                        t: {
                                                          docs: {
                                                            "PFElement.html#_initializeSlots": {
                                                              ref: "PFElement.html#_initializeSlots",
                                                              tf: 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  },
                                                  p: {
                                                    docs: {},
                                                    r: {
                                                      docs: {},
                                                      o: {
                                                        docs: {},
                                                        p: {
                                                          docs: {},
                                                          e: {
                                                            docs: {},
                                                            r: {
                                                              docs: {},
                                                              t: {
                                                                docs: {},
                                                                i: {
                                                                  docs: {
                                                                    "PFElement.html#_initializeProperties": {
                                                                      ref: "PFElement.html#_initializeProperties",
                                                                      tf: 1150
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  },
                                                  a: {
                                                    docs: {},
                                                    t: {
                                                      docs: {},
                                                      t: {
                                                        docs: {},
                                                        r: {
                                                          docs: {},
                                                          i: {
                                                            docs: {},
                                                            b: {
                                                              docs: {},
                                                              u: {
                                                                docs: {},
                                                                t: {
                                                                  docs: {},
                                                                  e: {
                                                                    docs: {},
                                                                    d: {
                                                                      docs: {},
                                                                      e: {
                                                                        docs: {},
                                                                        f: {
                                                                          docs: {},
                                                                          a: {
                                                                            docs: {},
                                                                            u: {
                                                                              docs: {},
                                                                              l: {
                                                                                docs: {},
                                                                                t: {
                                                                                  docs: {
                                                                                    "PFElement.html#_initializeAttributeDefaults": {
                                                                                      ref:
                                                                                        "PFElement.html#_initializeAttributeDefaults",
                                                                                      tf: 1150
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              p: {
                                docs: {},
                                a: {
                                  docs: {},
                                  r: {
                                    docs: {},
                                    s: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        o: {
                                          docs: {},
                                          b: {
                                            docs: {},
                                            s: {
                                              docs: {},
                                              e: {
                                                docs: {},
                                                r: {
                                                  docs: {},
                                                  v: {
                                                    docs: {
                                                      "PFElement.html#_parseObserver": {
                                                        ref: "PFElement.html#_parseObserver",
                                                        tf: 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              a: {
                                docs: {},
                                s: {
                                  docs: {},
                                  s: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      g: {
                                        docs: {},
                                        n: {
                                          docs: {},
                                          v: {
                                            docs: {},
                                            a: {
                                              docs: {},
                                              l: {
                                                docs: {},
                                                u: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    t: {
                                                      docs: {},
                                                      o: {
                                                        docs: {},
                                                        a: {
                                                          docs: {},
                                                          t: {
                                                            docs: {},
                                                            t: {
                                                              docs: {},
                                                              r: {
                                                                docs: {},
                                                                i: {
                                                                  docs: {},
                                                                  b: {
                                                                    docs: {},
                                                                    u: {
                                                                      docs: {},
                                                                      t: {
                                                                        docs: {
                                                                          "PFElement.html#_assignValueToAttribute": {
                                                                            ref:
                                                                              "PFElement.html#_assignValueToAttribute",
                                                                            tf: 1150
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              v: {
                                docs: {},
                                a: {
                                  docs: {},
                                  l: {
                                    docs: {},
                                    i: {
                                      docs: {},
                                      d: {
                                        docs: {},
                                        a: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            e: {
                                              docs: {},
                                              a: {
                                                docs: {},
                                                t: {
                                                  docs: {},
                                                  t: {
                                                    docs: {},
                                                    r: {
                                                      docs: {},
                                                      i: {
                                                        docs: {},
                                                        b: {
                                                          docs: {},
                                                          u: {
                                                            docs: {},
                                                            t: {
                                                              docs: {},
                                                              e: {
                                                                docs: {},
                                                                v: {
                                                                  docs: {},
                                                                  a: {
                                                                    docs: {},
                                                                    l: {
                                                                      docs: {},
                                                                      u: {
                                                                        docs: {
                                                                          "PFElement.html#_validateAttributeValue": {
                                                                            ref:
                                                                              "PFElement.html#_validateAttributeValue",
                                                                            tf: 1150
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "'": {
                            docs: {
                              "PFElement.html#.allProperties": {
                                ref: "PFElement.html#.allProperties",
                                tf: 3.8461538461538463
                              },
                              "PFElement.html#.cascadingProperties": {
                                ref: "PFElement.html#.cascadingProperties",
                                tf: 3.8461538461538463
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              t: {
                docs: {},
                y: {
                  docs: {},
                  p: {
                    docs: {
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 700
                      }
                    }
                  }
                }
              },
              c: {
                docs: {},
                a: {
                  docs: {},
                  r: {
                    docs: {},
                    d: {
                      docs: {
                        "PFElement.html#.allProperties": {
                          ref: "PFElement.html#.allProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#.cascadingProperties": {
                          ref: "PFElement.html#.cascadingProperties",
                          tf: 1.9230769230769231
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            r: {
              docs: {},
              p: {
                docs: {},
                o: {
                  docs: {},
                  s: {
                    docs: {
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 4.545454545454546
                      }
                    }
                  }
                }
              }
            },
            t: {
              docs: {
                "PFElement.html#.PfeTypes": {
                  ref: "PFElement.html#.PfeTypes",
                  tf: 4.545454545454546
                }
              }
            },
            s: {
              docs: {},
              h: {
                docs: {
                  "PFElement.html#_parseObserver": {
                    ref: "PFElement.html#_parseObserver",
                    tf: 4.545454545454546
                  }
                }
              }
            }
          },
          r: {
            docs: {},
            o: {
              docs: {},
              p: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {},
                    t: {
                      docs: {},
                      i: {
                        docs: {
                          "PFElement.html#.properties": {
                            ref: "PFElement.html#.properties",
                            tf: 711.1111111111111
                          },
                          "PFElement.html#.allProperties": {
                            ref: "PFElement.html#.allProperties",
                            tf: 9.615384615384617
                          },
                          "PFElement.html#.cascadingProperties": {
                            ref: "PFElement.html#.cascadingProperties",
                            tf: 9.615384615384617
                          },
                          "PFElement.html#cascadeProperties": {
                            ref: "PFElement.html#cascadeProperties",
                            tf: 3.8461538461538463
                          },
                          "PFElement.html#._validateProperties": {
                            ref: "PFElement.html#._validateProperties",
                            tf: 8.333333333333332
                          },
                          "PFElement.html#_castPropertyValue": {
                            ref: "PFElement.html#_castPropertyValue",
                            tf: 11.11111111111111
                          },
                          "PFElement.html#_initializeProperties": {
                            ref: "PFElement.html#_initializeProperties",
                            tf: 14.285714285714285
                          },
                          "PFElement.html#._prop2attr": {
                            ref: "PFElement.html#._prop2attr",
                            tf: 6.25
                          },
                          "PFElement.html#._attr2prop": {
                            ref: "PFElement.html#._attr2prop",
                            tf: 6.25
                          },
                          "PFElement.html#._convertPropNameToAttrName": {
                            ref: "PFElement.html#._convertPropNameToAttrName",
                            tf: 10
                          },
                          "PFElement.html#._convertAttrNameToPropName": {
                            ref: "PFElement.html#._convertAttrNameToPropName",
                            tf: 10
                          },
                          "PFElement.html#.create": {
                            ref: "PFElement.html#.create",
                            tf: 10
                          },
                          "PFElement.html#._populateCache": {
                            ref: "PFElement.html#._populateCache",
                            tf: 10
                          }
                        }
                      }
                    }
                  }
                }
              },
              v: {
                docs: {},
                i: {
                  docs: {},
                  d: {
                    docs: {
                      "PFElement.html#contextVariable": {
                        ref: "PFElement.html#contextVariable",
                        tf: 8.333333333333332
                      },
                      "PFElement.html#getSlot": {
                        ref: "PFElement.html#getSlot",
                        tf: 6.666666666666667
                      },
                      "PFElement.html#_castPropertyValue": {
                        ref: "PFElement.html#_castPropertyValue",
                        tf: 5.555555555555555
                      },
                      "PFElement.html#_assignValueToAttribute": {
                        ref: "PFElement.html#_assignValueToAttribute",
                        tf: 8.333333333333332
                      },
                      "PFElement.html#_validateAttributeValue": {
                        ref: "PFElement.html#_validateAttributeValue",
                        tf: 10
                      }
                    }
                  }
                }
              }
            },
            e: {
              docs: {},
              f: {
                docs: {},
                i: {
                  docs: {},
                  x: {
                    docs: {
                      "PFElement.html#randomId": {
                        ref: "PFElement.html#randomId",
                        tf: 3.125
                      },
                      "PFElement.html#log": {
                        ref: "PFElement.html#log",
                        tf: 7.142857142857142
                      },
                      "PFElement.html#warn": {
                        ref: "PFElement.html#warn",
                        tf: 4.166666666666666
                      },
                      "PFElement.html#error": {
                        ref: "PFElement.html#error",
                        tf: 4.166666666666666
                      }
                    }
                  }
                }
              }
            },
            i: {
              docs: {},
              n: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#.debugLog": {
                      ref: "PFElement.html#.debugLog",
                      tf: 2.7777777777777777
                    },
                    "PFElement.html#.log": {
                      ref: "PFElement.html#.log",
                      tf: 6.25
                    }
                  }
                }
              }
            }
          },
          e: {
            docs: {},
            r: {
              docs: {},
              f: {
                docs: {},
                o: {
                  docs: {},
                  r: {
                    docs: {},
                    m: {
                      docs: {
                        "PFElement.html#.trackPerformance": {
                          ref: "PFElement.html#.trackPerformance",
                          tf: 3.3333333333333335
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            p: {
              docs: {},
              u: {
                docs: {},
                l: {
                  docs: {
                    "PFElement.html#._populateCache": {
                      ref: "PFElement.html#._populateCache",
                      tf: 10
                    }
                  }
                }
              }
            }
          }
        },
        r: {
          docs: {},
          e: {
            docs: {},
            a: {
              docs: {},
              d: {
                docs: {},
                m: {
                  docs: {
                    "index.html": {
                      ref: "index.html",
                      tf: 110
                    }
                  }
                }
              }
            },
            t: {
              docs: {},
              u: {
                docs: {},
                r: {
                  docs: {},
                  n: {
                    docs: {
                      "PFElement.html#randomId": {
                        ref: "PFElement.html#randomId",
                        tf: 3.125
                      },
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#hasLightDOM": {
                        ref: "PFElement.html#hasLightDOM",
                        tf: 6.25
                      },
                      "PFElement.html#hasSlot": {
                        ref: "PFElement.html#hasSlot",
                        tf: 6.25
                      },
                      "PFElement.html#getSlot": {
                        ref: "PFElement.html#getSlot",
                        tf: 6.666666666666667
                      }
                    }
                  }
                }
              }
            },
            m: {
              docs: {},
              o: {
                docs: {},
                v: {
                  docs: {
                    "PFElement.html#disconnectedCallback": {
                      ref: "PFElement.html#disconnectedCallback",
                      tf: 5
                    }
                  },
                  e: {
                    docs: {},
                    e: {
                      docs: {},
                      v: {
                        docs: {},
                        e: {
                          docs: {},
                          n: {
                            docs: {},
                            t: {
                              docs: {},
                              l: {
                                docs: {},
                                i: {
                                  docs: {},
                                  s: {
                                    docs: {},
                                    t: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        n: {
                                          docs: {
                                            "PFElement.html#disconnectedCallback": {
                                              ref: "PFElement.html#disconnectedCallback",
                                              tf: 5
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            n: {
              docs: {},
              d: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {
                      "PFElement.html#render": {
                        ref: "PFElement.html#render",
                        tf: 766.6666666666666
                      }
                    }
                  }
                }
              }
            },
            s: {
              docs: {},
              p: {
                docs: {},
                o: {
                  docs: {},
                  n: {
                    docs: {},
                    d: {
                      docs: {
                        "PFElement.html#_upgradeObserver": {
                          ref: "PFElement.html#_upgradeObserver",
                          tf: 7.142857142857142
                        },
                        "PFElement.html#_contextObserver": {
                          ref: "PFElement.html#_contextObserver",
                          tf: 7.142857142857142
                        },
                        "PFElement.html#_onObserver": {
                          ref: "PFElement.html#_onObserver",
                          tf: 8.333333333333332
                        },
                        "PFElement.html#_inlineStyleObserver": {
                          ref: "PFElement.html#_inlineStyleObserver",
                          tf: 6.25
                        }
                      }
                    }
                  }
                }
              }
            },
            q: {
              docs: {},
              u: {
                docs: {},
                i: {
                  docs: {},
                  r: {
                    docs: {
                      "PFElement.html#._validateProperties": {
                        ref: "PFElement.html#._validateProperties",
                        tf: 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            n: {
              docs: {},
              d: {
                docs: {},
                o: {
                  docs: {},
                  m: {
                    docs: {
                      "PFElement.html#randomId": {
                        ref: "PFElement.html#randomId",
                        tf: 3.125
                      }
                    },
                    i: {
                      docs: {},
                      d: {
                        docs: {
                          "PFElement.html#randomId": {
                            ref: "PFElement.html#randomId",
                            tf: 750
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        s: {
          docs: {},
          e: {
            docs: {},
            t: {
              docs: {
                "index.html": {
                  ref: "index.html",
                  tf: 8.75
                },
                "PFElement.html#.version": {
                  ref: "PFElement.html#.version",
                  tf: 6.25
                },
                "PFElement.html#contextVariable": {
                  ref: "PFElement.html#contextVariable",
                  tf: 8.333333333333332
                },
                "PFElement.html#_initializeProperties": {
                  ref: "PFElement.html#_initializeProperties",
                  tf: 7.142857142857142
                }
              }
            },
            r: {
              docs: {},
              v: {
                docs: {
                  "PFElement.html": {
                    ref: "PFElement.html",
                    tf: 10
                  }
                }
              }
            }
          },
          t: {
            docs: {},
            a: {
              docs: {},
              t: {
                docs: {},
                i: {
                  docs: {},
                  c: {
                    docs: {
                      "PFElement.html#version": {
                        ref: "PFElement.html#version",
                        tf: 5
                      }
                    }
                  }
                },
                e: {
                  docs: {},
                  m: {
                    docs: {},
                    e: {
                      docs: {},
                      n: {
                        docs: {},
                        t: {
                          docs: {
                            "PFElement.html#hasLightDOM": {
                              ref: "PFElement.html#hasLightDOM",
                              tf: 6.25
                            },
                            "PFElement.html#hasSlot": {
                              ref: "PFElement.html#hasSlot",
                              tf: 6.25
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              n: {
                docs: {},
                d: {
                  docs: {},
                  a: {
                    docs: {},
                    r: {
                      docs: {},
                      d: {
                        docs: {
                          "PFElement.html#connectedCallback": {
                            ref: "PFElement.html#connectedCallback",
                            tf: 7.142857142857142
                          },
                          "PFElement.html#disconnectedCallback": {
                            ref: "PFElement.html#disconnectedCallback",
                            tf: 5
                          },
                          "PFElement.html#render": {
                            ref: "PFElement.html#render",
                            tf: 16.666666666666664
                          },
                          "PFElement.html#emitEvent": {
                            ref: "PFElement.html#emitEvent",
                            tf: 8.333333333333332
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            y: {
              docs: {},
              l: {
                docs: {},
                e: {
                  docs: {
                    "PFElement.html#_inlineStyleObserver": {
                      ref: "PFElement.html#_inlineStyleObserver",
                      tf: 6.25
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            f: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#randomId": {
                    ref: "PFElement.html#randomId",
                    tf: 3.125
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            c: {
              docs: {},
              h: {
                docs: {
                  "PFElement.html#.allProperties": {
                    ref: "PFElement.html#.allProperties",
                    tf: 1.9230769230769231
                  },
                  "PFElement.html#.cascadingProperties": {
                    ref: "PFElement.html#.cascadingProperties",
                    tf: 1.9230769230769231
                  }
                }
              }
            }
          },
          c: {
            docs: {},
            r: {
              docs: {},
              i: {
                docs: {},
                p: {
                  docs: {},
                  t: {
                    docs: {
                      "PFElement.html#.debugLog": {
                        ref: "PFElement.html#.debugLog",
                        tf: 2.7777777777777777
                      },
                      "PFElement.html#.trackPerformance": {
                        ref: "PFElement.html#.trackPerformance",
                        tf: 3.3333333333333335
                      }
                    }
                  }
                }
              }
            }
          },
          l: {
            docs: {},
            o: {
              docs: {},
              t: {
                docs: {
                  "PFElement.html#hasSlot": {
                    ref: "PFElement.html#hasSlot",
                    tf: 6.25
                  },
                  "PFElement.html#getSlot": {
                    ref: "PFElement.html#getSlot",
                    tf: 6.666666666666667
                  },
                  "PFElement.html#_initializeSlots": {
                    ref: "PFElement.html#_initializeSlots",
                    tf: 8.333333333333332
                  }
                }
              }
            }
          },
          p: {
            docs: {},
            e: {
              docs: {},
              c: {
                docs: {},
                i: {
                  docs: {},
                  f: {
                    docs: {
                      "PFElement.html#attributeChangedCallback": {
                        ref: "PFElement.html#attributeChangedCallback",
                        tf: 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            u: {
              docs: {},
              r: {
                docs: {},
                c: {
                  docs: {
                    "PFElement.html#_onObserver": {
                      ref: "PFElement.html#_onObserver",
                      tf: 8.333333333333332
                    }
                  }
                }
              }
            }
          }
        },
        w: {
          docs: {},
          e: {
            docs: {},
            b: {
              docs: {
                "index.html": {
                  ref: "index.html",
                  tf: 8.75
                }
              }
            }
          },
          a: {
            docs: {},
            y: {
              docs: {
                "PFElement.html#.PfeTypes": {
                  ref: "PFElement.html#.PfeTypes",
                  tf: 4.545454545454546
                },
                "PFElement.html#randomId": {
                  ref: "PFElement.html#randomId",
                  tf: 3.125
                }
              }
            },
            r: {
              docs: {},
              n: {
                docs: {
                  "PFElement.html#.warn": {
                    ref: "PFElement.html#.warn",
                    tf: 706.25
                  },
                  "PFElement.html#warn": {
                    ref: "PFElement.html#warn",
                    tf: 754.1666666666666
                  }
                }
              }
            },
            t: {
              docs: {},
              c: {
                docs: {},
                h: {
                  docs: {
                    "PFElement.html#_parseObserver": {
                      ref: "PFElement.html#_parseObserver",
                      tf: 4.545454545454546
                    }
                  }
                }
              }
            }
          },
          r: {
            docs: {},
            a: {
              docs: {},
              p: {
                docs: {},
                p: {
                  docs: {},
                  e: {
                    docs: {},
                    r: {
                      docs: {
                        "PFElement.html#.log": {
                          ref: "PFElement.html#.log",
                          tf: 6.25
                        },
                        "PFElement.html#.warn": {
                          ref: "PFElement.html#.warn",
                          tf: 6.25
                        },
                        "PFElement.html#warn": {
                          ref: "PFElement.html#warn",
                          tf: 4.166666666666666
                        },
                        "PFElement.html#.error": {
                          ref: "PFElement.html#.error",
                          tf: 4.166666666666666
                        },
                        "PFElement.html#error": {
                          ref: "PFElement.html#error",
                          tf: 4.166666666666666
                        },
                        "PFElement.html#emitEvent": {
                          ref: "PFElement.html#emitEvent",
                          tf: 8.333333333333332
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          h: {
            docs: {},
            e: {
              docs: {},
              t: {
                docs: {},
                h: {
                  docs: {},
                  e: {
                    docs: {},
                    r: {
                      docs: {
                        "PFElement.html#hasLightDOM": {
                          ref: "PFElement.html#hasLightDOM",
                          tf: 6.25
                        },
                        "PFElement.html#hasSlot": {
                          ref: "PFElement.html#hasSlot",
                          tf: 6.25
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        g: {
          docs: {},
          l: {
            docs: {},
            o: {
              docs: {},
              b: {
                docs: {},
                a: {
                  docs: {},
                  l: {
                    docs: {
                      "global.html": {
                        ref: "global.html",
                        tf: 2045
                      },
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 4.545454545454546
                      },
                      "PFElement.html#.properties": {
                        ref: "PFElement.html#.properties",
                        tf: 5.555555555555555
                      },
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#attributeChangedCallback": {
                        ref: "PFElement.html#attributeChangedCallback",
                        tf: 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          },
          e: {
            docs: {},
            n: {
              docs: {},
              e: {
                docs: {},
                r: {
                  docs: {
                    "PFElement.html#.PfeTypes": {
                      ref: "PFElement.html#.PfeTypes",
                      tf: 4.545454545454546
                    }
                  }
                }
              }
            },
            t: {
              docs: {},
              s: {
                docs: {},
                l: {
                  docs: {},
                  o: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#getSlot": {
                          ref: "PFElement.html#getSlot",
                          tf: 750
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          r: {
            docs: {},
            e: {
              docs: {},
              p: {
                docs: {
                  "PFElement.html#_inlineStyleObserver": {
                    ref: "PFElement.html#_inlineStyleObserver",
                    tf: 6.25
                  }
                }
              }
            }
          },
          i: {
            docs: {},
            v: {
              docs: {},
              e: {
                docs: {},
                n: {
                  docs: {
                    "PFElement.html#._prop2attr": {
                      ref: "PFElement.html#._prop2attr",
                      tf: 6.25
                    },
                    "PFElement.html#._attr2prop": {
                      ref: "PFElement.html#._attr2prop",
                      tf: 6.25
                    },
                    "PFElement.html#._setCache": {
                      ref: "PFElement.html#._setCache",
                      tf: 5.555555555555555
                    }
                  }
                }
              }
            }
          }
        },
        l: {
          docs: {},
          i: {
            docs: {},
            s: {
              docs: {},
              t: {
                docs: {
                  "list_class.html": {
                    ref: "list_class.html",
                    tf: 110
                  }
                },
                ":": {
                  docs: {},
                  c: {
                    docs: {},
                    l: {
                      docs: {},
                      a: {
                        docs: {},
                        s: {
                          docs: {},
                          s: {
                            docs: {
                              "list_class.html": {
                                ref: "list_class.html",
                                tf: 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            g: {
              docs: {},
              h: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#hasLightDOM": {
                      ref: "PFElement.html#hasLightDOM",
                      tf: 6.25
                    },
                    "PFElement.html#hasSlot": {
                      ref: "PFElement.html#hasSlot",
                      tf: 6.25
                    },
                    "PFElement.html#getSlot": {
                      ref: "PFElement.html#getSlot",
                      tf: 3.3333333333333335
                    },
                    "PFElement.html#_parseObserver": {
                      ref: "PFElement.html#_parseObserver",
                      tf: 4.545454545454546
                    }
                  }
                }
              }
            },
            n: {
              docs: {},
              k: {
                docs: {
                  "PFElement.html#._prop2attr": {
                    ref: "PFElement.html#._prop2attr",
                    tf: 6.25
                  },
                  "PFElement.html#._attr2prop": {
                    ref: "PFElement.html#._attr2prop",
                    tf: 6.25
                  }
                }
              }
            }
          },
          t: {
            docs: {},
            ";": {
              docs: {},
              s: {
                docs: {},
                t: {
                  docs: {},
                  a: {
                    docs: {},
                    t: {
                      docs: {},
                      i: {
                        docs: {},
                        c: {
                          docs: {},
                          "&": {
                            docs: {},
                            g: {
                              docs: {},
                              t: {
                                docs: {
                                  "PFElement.html#.PfeTypes": {
                                    ref: "PFElement.html#.PfeTypes",
                                    tf: 50
                                  },
                                  "PFElement.html#.version": {
                                    ref: "PFElement.html#.version",
                                    tf: 50
                                  },
                                  "PFElement.html#.properties": {
                                    ref: "PFElement.html#.properties",
                                    tf: 50
                                  },
                                  "PFElement.html#.allProperties": {
                                    ref: "PFElement.html#.allProperties",
                                    tf: 50
                                  },
                                  "PFElement.html#.cascadingProperties": {
                                    ref: "PFElement.html#.cascadingProperties",
                                    tf: 50
                                  },
                                  "PFElement.html#.debugLog": {
                                    ref: "PFElement.html#.debugLog",
                                    tf: 50
                                  },
                                  "PFElement.html#.trackPerformance": {
                                    ref: "PFElement.html#.trackPerformance",
                                    tf: 50
                                  },
                                  "PFElement.html#.log": {
                                    ref: "PFElement.html#.log",
                                    tf: 50
                                  },
                                  "PFElement.html#.warn": {
                                    ref: "PFElement.html#.warn",
                                    tf: 50
                                  },
                                  "PFElement.html#.error": {
                                    ref: "PFElement.html#.error",
                                    tf: 50
                                  },
                                  "PFElement.html#._validateProperties": {
                                    ref: "PFElement.html#._validateProperties",
                                    tf: 50
                                  },
                                  "PFElement.html#._prop2attr": {
                                    ref: "PFElement.html#._prop2attr",
                                    tf: 50
                                  },
                                  "PFElement.html#._attr2prop": {
                                    ref: "PFElement.html#._attr2prop",
                                    tf: 50
                                  },
                                  "PFElement.html#._convertPropNameToAttrName": {
                                    ref: "PFElement.html#._convertPropNameToAttrName",
                                    tf: 50
                                  },
                                  "PFElement.html#._convertAttrNameToPropName": {
                                    ref: "PFElement.html#._convertAttrNameToPropName",
                                    tf: 50
                                  },
                                  "PFElement.html#.create": {
                                    ref: "PFElement.html#.create",
                                    tf: 50
                                  },
                                  "PFElement.html#._setCache": {
                                    ref: "PFElement.html#._setCache",
                                    tf: 50
                                  },
                                  "PFElement.html#._getCache": {
                                    ref: "PFElement.html#._getCache",
                                    tf: 50
                                  },
                                  "PFElement.html#._populateCache": {
                                    ref: "PFElement.html#._populateCache",
                                    tf: 50
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            a: {
              docs: {},
              d: {
                docs: {
                  "PFElement.html#version": {
                    ref: "PFElement.html#version",
                    tf: 5
                  }
                }
              }
            },
            c: {
              docs: {},
              a: {
                docs: {},
                l: {
                  docs: {
                    "PFElement.html#version": {
                      ref: "PFElement.html#version",
                      tf: 5
                    },
                    "PFElement.html#log": {
                      ref: "PFElement.html#log",
                      tf: 7.142857142857142
                    },
                    "PFElement.html#warn": {
                      ref: "PFElement.html#warn",
                      tf: 4.166666666666666
                    },
                    "PFElement.html#error": {
                      ref: "PFElement.html#error",
                      tf: 4.166666666666666
                    }
                  }
                }
              }
            },
            g: {
              docs: {
                "PFElement.html#.debugLog": {
                  ref: "PFElement.html#.debugLog",
                  tf: 2.7777777777777777
                },
                "PFElement.html#.log": {
                  ref: "PFElement.html#.log",
                  tf: 706.25
                },
                "PFElement.html#log": {
                  ref: "PFElement.html#log",
                  tf: 757.1428571428571
                }
              },
              i: {
                docs: {},
                c: {
                  docs: {
                    "PFElement.html#attributeChangedCallback": {
                      ref: "PFElement.html#attributeChangedCallback",
                      tf: 4.545454545454546
                    }
                  }
                }
              }
            },
            o: {
              docs: {},
              k: {
                docs: {
                  "PFElement.html#._prop2attr": {
                    ref: "PFElement.html#._prop2attr",
                    tf: 6.25
                  },
                  "PFElement.html#._attr2prop": {
                    ref: "PFElement.html#._attr2prop",
                    tf: 6.25
                  }
                }
              }
            }
          }
        },
        m: {
          docs: {},
          e: {
            docs: {},
            m: {
              docs: {},
              b: {
                docs: {},
                e: {
                  docs: {},
                  r: {
                    docs: {
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 110
                      },
                      "PFElement.html#.version": {
                        ref: "PFElement.html#.version",
                        tf: 110
                      },
                      "PFElement.html#version": {
                        ref: "PFElement.html#version",
                        tf: 110
                      },
                      "PFElement.html#.properties": {
                        ref: "PFElement.html#.properties",
                        tf: 110
                      },
                      "PFElement.html#randomId": {
                        ref: "PFElement.html#randomId",
                        tf: 110
                      },
                      "PFElement.html#contextVariable": {
                        ref: "PFElement.html#contextVariable",
                        tf: 110
                      },
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 110
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 110
                      }
                    }
                  }
                }
              }
            },
            r: {
              docs: {},
              g: {
                docs: {
                  "PFElement.html#.allProperties": {
                    ref: "PFElement.html#.allProperties",
                    tf: 1.9230769230769231
                  },
                  "PFElement.html#.cascadingProperties": {
                    ref: "PFElement.html#.cascadingProperties",
                    tf: 1.9230769230769231
                  }
                }
              }
            },
            e: {
              docs: {},
              t: {
                docs: {
                  "PFElement.html#._validateProperties": {
                    ref: "PFElement.html#._validateProperties",
                    tf: 8.333333333333332
                  }
                }
              }
            },
            t: {
              docs: {},
              h: {
                docs: {},
                o: {
                  docs: {},
                  d: {
                    docs: {
                      "PFElement.html#_castPropertyValue": {
                        ref: "PFElement.html#_castPropertyValue",
                        tf: 5.555555555555555
                      },
                      "PFElement.html#_initializeProperties": {
                        ref: "PFElement.html#_initializeProperties",
                        tf: 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            n: {
              docs: {},
              a: {
                docs: {},
                g: {
                  docs: {
                    "PFElement.html#.properties": {
                      ref: "PFElement.html#.properties",
                      tf: 5.555555555555555
                    }
                  }
                }
              },
              u: {
                docs: {},
                a: {
                  docs: {},
                  l: {
                    docs: {
                      "PFElement.html#_contextObserver": {
                        ref: "PFElement.html#_contextObserver",
                        tf: 7.142857142857142
                      }
                    }
                  }
                }
              }
            },
            p: {
              docs: {
                "PFElement.html#_assignValueToAttribute": {
                  ref: "PFElement.html#_assignValueToAttribute",
                  tf: 8.333333333333332
                },
                "PFElement.html#_initializeSlots": {
                  ref: "PFElement.html#_initializeSlots",
                  tf: 8.333333333333332
                }
              }
            }
          },
          u: {
            docs: {},
            t: {
              docs: {},
              a: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#_parseObserver": {
                      ref: "PFElement.html#_parseObserver",
                      tf: 4.545454545454546
                    }
                  }
                }
              }
            }
          }
        },
        t: {
          docs: {},
          o: {
            docs: {},
            g: {
              docs: {},
              e: {
                docs: {},
                t: {
                  docs: {},
                  h: {
                    docs: {
                      "PFElement.html#.PfeTypes": {
                        ref: "PFElement.html#.PfeTypes",
                        tf: 4.545454545454546
                      },
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 1.9230769230769231
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 1.9230769230769231
                      }
                    }
                  }
                }
              }
            },
            o: {
              docs: {},
              l: {
                docs: {
                  "PFElement.html#_contextObserver": {
                    ref: "PFElement.html#_contextObserver",
                    tf: 7.142857142857142
                  }
                }
              }
            }
          },
          y: {
            docs: {},
            p: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.PfeTypes": {
                    ref: "PFElement.html#.PfeTypes",
                    tf: 4.545454545454546
                  },
                  "PFElement.html#._validateProperties": {
                    ref: "PFElement.html#._validateProperties",
                    tf: 8.333333333333332
                  },
                  "PFElement.html#_castPropertyValue": {
                    ref: "PFElement.html#_castPropertyValue",
                    tf: 5.555555555555555
                  }
                }
              }
            }
          },
          w: {
            docs: {},
            o: {
              docs: {
                "PFElement.html#.allProperties": {
                  ref: "PFElement.html#.allProperties",
                  tf: 1.9230769230769231
                },
                "PFElement.html#.cascadingProperties": {
                  ref: "PFElement.html#.cascadingProperties",
                  tf: 1.9230769230769231
                }
              }
            }
          },
          a: {
            docs: {},
            g: {
              docs: {
                "PFElement.html#.debugLog": {
                  ref: "PFElement.html#.debugLog",
                  tf: 2.7777777777777777
                },
                "PFElement.html#.trackPerformance": {
                  ref: "PFElement.html#.trackPerformance",
                  tf: 3.3333333333333335
                },
                "PFElement.html#log": {
                  ref: "PFElement.html#log",
                  tf: 7.142857142857142
                },
                "PFElement.html#warn": {
                  ref: "PFElement.html#warn",
                  tf: 4.166666666666666
                },
                "PFElement.html#error": {
                  ref: "PFElement.html#error",
                  tf: 4.166666666666666
                }
              }
            }
          },
          r: {
            docs: {},
            a: {
              docs: {},
              c: {
                docs: {},
                k: {
                  docs: {
                    "PFElement.html#.trackPerformance": {
                      ref: "PFElement.html#.trackPerformance",
                      tf: 3.3333333333333335
                    }
                  },
                  p: {
                    docs: {},
                    e: {
                      docs: {},
                      r: {
                        docs: {},
                        f: {
                          docs: {},
                          o: {
                            docs: {},
                            r: {
                              docs: {},
                              m: {
                                docs: {
                                  "PFElement.html#.trackPerformance": {
                                    ref: "PFElement.html#.trackPerformance",
                                    tf: 700
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            u: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.log": {
                    ref: "PFElement.html#.log",
                    tf: 6.25
                  }
                }
              },
              t: {
                docs: {},
                h: {
                  docs: {
                    "PFElement.html#_onObserver": {
                      ref: "PFElement.html#_onObserver",
                      tf: 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          h: {
            docs: {},
            i: {
              docs: {},
              s: {
                docs: {},
                ".": {
                  docs: {},
                  g: {
                    docs: {},
                    e: {
                      docs: {},
                      t: {
                        docs: {},
                        s: {
                          docs: {},
                          l: {
                            docs: {},
                            o: {
                              docs: {},
                              t: {
                                docs: {
                                  "PFElement.html#getSlot": {
                                    ref: "PFElement.html#getSlot",
                                    tf: 3.3333333333333335
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            e: {
              docs: {},
              m: {
                docs: {},
                e: {
                  docs: {
                    "PFElement.html#_inlineStyleObserver": {
                      ref: "PFElement.html#_inlineStyleObserver",
                      tf: 6.25
                    }
                  }
                }
              }
            }
          }
        },
        u: {
          docs: {},
          s: {
            docs: {
              "PFElement.html#.version": {
                ref: "PFElement.html#.version",
                tf: 6.25
              },
              "PFElement.html#version": {
                ref: "PFElement.html#version",
                tf: 5
              },
              "PFElement.html#.debugLog": {
                ref: "PFElement.html#.debugLog",
                tf: 5.555555555555555
              },
              "PFElement.html#.trackPerformance": {
                ref: "PFElement.html#.trackPerformance",
                tf: 3.3333333333333335
              },
              "PFElement.html#.warn": {
                ref: "PFElement.html#.warn",
                tf: 6.25
              },
              "PFElement.html#warn": {
                ref: "PFElement.html#warn",
                tf: 4.166666666666666
              },
              "PFElement.html#.error": {
                ref: "PFElement.html#.error",
                tf: 8.333333333333332
              },
              "PFElement.html#error": {
                ref: "PFElement.html#error",
                tf: 4.166666666666666
              }
            }
          },
          n: {
            docs: {},
            a: {
              docs: {},
              s: {
                docs: {},
                s: {
                  docs: {},
                  i: {
                    docs: {},
                    g: {
                      docs: {},
                      n: {
                        docs: {
                          "PFElement.html#getSlot": {
                            ref: "PFElement.html#getSlot",
                            tf: 3.3333333333333335
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          p: {
            docs: {
              "PFElement.html#_initializeProperties": {
                ref: "PFElement.html#_initializeProperties",
                tf: 7.142857142857142
              },
              "PFElement.html#._prop2attr": {
                ref: "PFElement.html#._prop2attr",
                tf: 6.25
              },
              "PFElement.html#._attr2prop": {
                ref: "PFElement.html#._attr2prop",
                tf: 6.25
              }
            },
            d: {
              docs: {},
              a: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#attributeChangedCallback": {
                      ref: "PFElement.html#attributeChangedCallback",
                      tf: 4.545454545454546
                    },
                    "PFElement.html#_inlineStyleObserver": {
                      ref: "PFElement.html#_inlineStyleObserver",
                      tf: 6.25
                    },
                    "PFElement.html#_parseObserver": {
                      ref: "PFElement.html#_parseObserver",
                      tf: 4.545454545454546
                    }
                  },
                  e: {
                    docs: {},
                    s: {
                      docs: {},
                      "/": {
                        docs: {},
                        a: {
                          docs: {},
                          d: {
                            docs: {},
                            d: {
                              docs: {},
                              i: {
                                docs: {},
                                t: {
                                  docs: {
                                    "PFElement.html#cascadeProperties": {
                                      ref: "PFElement.html#cascadeProperties",
                                      tf: 3.8461538461538463
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            g: {
              docs: {},
              r: {
                docs: {},
                a: {
                  docs: {},
                  d: {
                    docs: {
                      "PFElement.html#_upgradeObserver": {
                        ref: "PFElement.html#_upgradeObserver",
                        tf: 7.142857142857142
                      }
                    }
                  }
                }
              }
            }
          }
        },
        v: {
          docs: {},
          e: {
            docs: {},
            r: {
              docs: {},
              s: {
                docs: {},
                i: {
                  docs: {},
                  o: {
                    docs: {},
                    n: {
                      docs: {
                        "PFElement.html#.version": {
                          ref: "PFElement.html#.version",
                          tf: 706.25
                        },
                        "PFElement.html#version": {
                          ref: "PFElement.html#version",
                          tf: 760
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            l: {
              docs: {},
              i: {
                docs: {},
                d: {
                  docs: {
                    "PFElement.html#version": {
                      ref: "PFElement.html#version",
                      tf: 5
                    },
                    "PFElement.html#._validateProperties": {
                      ref: "PFElement.html#._validateProperties",
                      tf: 8.333333333333332
                    },
                    "PFElement.html#_validateAttributeValue": {
                      ref: "PFElement.html#_validateAttributeValue",
                      tf: 10
                    }
                  }
                }
              },
              u: {
                docs: {
                  "PFElement.html#randomId": {
                    ref: "PFElement.html#randomId",
                    tf: 9.375
                  },
                  "PFElement.html#contextVariable": {
                    ref: "PFElement.html#contextVariable",
                    tf: 10
                  },
                  "PFElement.html#.debugLog": {
                    ref: "PFElement.html#.debugLog",
                    tf: 2.7777777777777777
                  },
                  "PFElement.html#.trackPerformance": {
                    ref: "PFElement.html#.trackPerformance",
                    tf: 3.3333333333333335
                  },
                  "PFElement.html#getSlot": {
                    ref: "PFElement.html#getSlot",
                    tf: 3.3333333333333335
                  },
                  "PFElement.html#_parseObserver": {
                    ref: "PFElement.html#_parseObserver",
                    tf: 4.545454545454546
                  },
                  "PFElement.html#_castPropertyValue": {
                    ref: "PFElement.html#_castPropertyValue",
                    tf: 5.555555555555555
                  },
                  "PFElement.html#_assignValueToAttribute": {
                    ref: "PFElement.html#_assignValueToAttribute",
                    tf: 8.333333333333332
                  },
                  "PFElement.html#_initializeAttributeDefaults": {
                    ref: "PFElement.html#_initializeAttributeDefaults",
                    tf: 12.5
                  },
                  "PFElement.html#_validateAttributeValue": {
                    ref: "PFElement.html#_validateAttributeValue",
                    tf: 20
                  },
                  "PFElement.html#._populateCache": {
                    ref: "PFElement.html#._populateCache",
                    tf: 10
                  }
                }
              }
            },
            r: {
              docs: {},
              i: {
                docs: {},
                a: {
                  docs: {},
                  b: {
                    docs: {},
                    l: {
                      docs: {
                        "PFElement.html#contextVariable": {
                          ref: "PFElement.html#contextVariable",
                          tf: 10
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        a: {
          docs: {},
          l: {
            docs: {},
            i: {
              docs: {},
              a: {
                docs: {
                  "PFElement.html#version": {
                    ref: "PFElement.html#version",
                    tf: 5
                  }
                }
              }
            },
            l: {
              docs: {},
              p: {
                docs: {},
                r: {
                  docs: {},
                  o: {
                    docs: {},
                    p: {
                      docs: {},
                      e: {
                        docs: {},
                        r: {
                          docs: {},
                          t: {
                            docs: {},
                            i: {
                              docs: {
                                "PFElement.html#.allProperties": {
                                  ref: "PFElement.html#.allProperties",
                                  tf: 701.9230769230769
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            e: {
              docs: {},
              r: {
                docs: {},
                t: {
                  docs: {
                    "PFElement.html#contextUpdate": {
                      ref: "PFElement.html#contextUpdate",
                      tf: 10
                    }
                  }
                }
              }
            },
            r: {
              docs: {},
              e: {
                docs: {},
                a: {
                  docs: {},
                  d: {
                    docs: {},
                    i: {
                      docs: {
                        "PFElement.html#._setCache": {
                          ref: "PFElement.html#._setCache",
                          tf: 5.555555555555555
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          p: {
            docs: {},
            p: {
              docs: {},
              l: {
                docs: {},
                i: {
                  docs: {
                    "PFElement.html#.properties": {
                      ref: "PFElement.html#.properties",
                      tf: 5.555555555555555
                    }
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            t: {
              docs: {},
              o: {
                docs: {},
                m: {
                  docs: {},
                  a: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#randomId": {
                          ref: "PFElement.html#randomId",
                          tf: 3.125
                        },
                        "PFElement.html#log": {
                          ref: "PFElement.html#log",
                          tf: 7.142857142857142
                        },
                        "PFElement.html#warn": {
                          ref: "PFElement.html#warn",
                          tf: 4.166666666666666
                        },
                        "PFElement.html#error": {
                          ref: "PFElement.html#error",
                          tf: 4.166666666666666
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          d: {
            docs: {
              "PFElement.html#.debugLog": {
                ref: "PFElement.html#.debugLog",
                tf: 2.7777777777777777
              },
              "PFElement.html#.trackPerformance": {
                ref: "PFElement.html#.trackPerformance",
                tf: 3.3333333333333335
              },
              "PFElement.html#connectedCallback": {
                ref: "PFElement.html#connectedCallback",
                tf: 7.142857142857142
              },
              "PFElement.html#cascadeProperties": {
                ref: "PFElement.html#cascadeProperties",
                tf: 3.8461538461538463
              }
            },
            d: {
              docs: {
                "PFElement.html#disconnectedCallback": {
                  ref: "PFElement.html#disconnectedCallback",
                  tf: 5
                }
              }
            }
          },
          r: {
            docs: {},
            r: {
              docs: {},
              a: {
                docs: {},
                y: {
                  docs: {
                    "PFElement.html#getSlot": {
                      ref: "PFElement.html#getSlot",
                      tf: 3.3333333333333335
                    }
                  }
                }
              }
            },
            o: {
              docs: {},
              u: {
                docs: {},
                n: {
                  docs: {},
                  d: {
                    docs: {
                      "PFElement.html#emitEvent": {
                        ref: "PFElement.html#emitEvent",
                        tf: 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          t: {
            docs: {},
            t: {
              docs: {},
              r: {
                docs: {},
                i: {
                  docs: {},
                  b: {
                    docs: {},
                    u: {
                      docs: {},
                      t: {
                        docs: {
                          "PFElement.html#attributeChangedCallback": {
                            ref: "PFElement.html#attributeChangedCallback",
                            tf: 9.090909090909092
                          },
                          "PFElement.html#cascadeProperties": {
                            ref: "PFElement.html#cascadeProperties",
                            tf: 7.6923076923076925
                          },
                          "PFElement.html#_upgradeObserver": {
                            ref: "PFElement.html#_upgradeObserver",
                            tf: 7.142857142857142
                          },
                          "PFElement.html#_contextObserver": {
                            ref: "PFElement.html#_contextObserver",
                            tf: 7.142857142857142
                          },
                          "PFElement.html#_assignValueToAttribute": {
                            ref: "PFElement.html#_assignValueToAttribute",
                            tf: 8.333333333333332
                          },
                          "PFElement.html#_initializeAttributeDefaults": {
                            ref: "PFElement.html#_initializeAttributeDefaults",
                            tf: 12.5
                          },
                          "PFElement.html#._prop2attr": {
                            ref: "PFElement.html#._prop2attr",
                            tf: 6.25
                          },
                          "PFElement.html#._attr2prop": {
                            ref: "PFElement.html#._attr2prop",
                            tf: 6.25
                          },
                          "PFElement.html#._convertPropNameToAttrName": {
                            ref: "PFElement.html#._convertPropNameToAttrName",
                            tf: 10
                          },
                          "PFElement.html#._convertAttrNameToPropName": {
                            ref: "PFElement.html#._convertAttrNameToPropName",
                            tf: 10
                          },
                          "PFElement.html#.create": {
                            ref: "PFElement.html#.create",
                            tf: 10
                          }
                        },
                        e: {
                          docs: {},
                          c: {
                            docs: {},
                            h: {
                              docs: {},
                              a: {
                                docs: {},
                                n: {
                                  docs: {},
                                  g: {
                                    docs: {},
                                    e: {
                                      docs: {},
                                      d: {
                                        docs: {},
                                        c: {
                                          docs: {},
                                          a: {
                                            docs: {},
                                            l: {
                                              docs: {},
                                              l: {
                                                docs: {},
                                                b: {
                                                  docs: {},
                                                  a: {
                                                    docs: {},
                                                    c: {
                                                      docs: {},
                                                      k: {
                                                        docs: {
                                                          "PFElement.html#attributeChangedCallback": {
                                                            ref: "PFElement.html#attributeChangedCallback",
                                                            tf: 750
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          g: {
            docs: {},
            a: {
              docs: {},
              i: {
                docs: {},
                n: {
                  docs: {},
                  s: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#_validateAttributeValue": {
                          ref: "PFElement.html#_validateAttributeValue",
                          tf: 10
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          n: {
            docs: {},
            y: {
              docs: {},
              t: {
                docs: {},
                h: {
                  docs: {
                    "PFElement.html#._setCache": {
                      ref: "PFElement.html#._setCache",
                      tf: 5.555555555555555
                    }
                  }
                }
              }
            }
          }
        },
        _: {
          docs: {},
          n: {
            docs: {},
            o: {
              docs: {},
              t: {
                docs: {},
                e: {
                  docs: {},
                  ":": {
                    docs: {},
                    _: {
                      docs: {
                        "PFElement.html#randomId": {
                          ref: "PFElement.html#randomId",
                          tf: 3.125
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            p: {
              docs: {},
              g: {
                docs: {},
                r: {
                  docs: {},
                  a: {
                    docs: {},
                    d: {
                      docs: {},
                      e: {
                        docs: {},
                        o: {
                          docs: {},
                          b: {
                            docs: {},
                            s: {
                              docs: {},
                              e: {
                                docs: {},
                                r: {
                                  docs: {},
                                  v: {
                                    docs: {
                                      "PFElement.html#_upgradeObserver": {
                                        ref: "PFElement.html#_upgradeObserver",
                                        tf: 750
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          c: {
            docs: {},
            o: {
              docs: {},
              n: {
                docs: {},
                t: {
                  docs: {},
                  e: {
                    docs: {},
                    x: {
                      docs: {},
                      t: {
                        docs: {},
                        o: {
                          docs: {},
                          b: {
                            docs: {},
                            s: {
                              docs: {},
                              e: {
                                docs: {},
                                r: {
                                  docs: {},
                                  v: {
                                    docs: {
                                      "PFElement.html#_contextObserver": {
                                        ref: "PFElement.html#_contextObserver",
                                        tf: 750
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                v: {
                  docs: {},
                  e: {
                    docs: {},
                    r: {
                      docs: {},
                      t: {
                        docs: {},
                        p: {
                          docs: {},
                          r: {
                            docs: {},
                            o: {
                              docs: {},
                              p: {
                                docs: {},
                                n: {
                                  docs: {},
                                  a: {
                                    docs: {},
                                    m: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          o: {
                                            docs: {},
                                            a: {
                                              docs: {},
                                              t: {
                                                docs: {},
                                                t: {
                                                  docs: {},
                                                  r: {
                                                    docs: {},
                                                    n: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        m: {
                                                          docs: {
                                                            "PFElement.html#._convertPropNameToAttrName": {
                                                              ref: "PFElement.html#._convertPropNameToAttrName",
                                                              tf: 700
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        a: {
                          docs: {},
                          t: {
                            docs: {},
                            t: {
                              docs: {},
                              r: {
                                docs: {},
                                n: {
                                  docs: {},
                                  a: {
                                    docs: {},
                                    m: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          o: {
                                            docs: {},
                                            p: {
                                              docs: {},
                                              r: {
                                                docs: {},
                                                o: {
                                                  docs: {},
                                                  p: {
                                                    docs: {},
                                                    n: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        m: {
                                                          docs: {
                                                            "PFElement.html#._convertAttrNameToPropName": {
                                                              ref: "PFElement.html#._convertAttrNameToPropName",
                                                              tf: 700
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            a: {
              docs: {},
              s: {
                docs: {},
                t: {
                  docs: {},
                  p: {
                    docs: {},
                    r: {
                      docs: {},
                      o: {
                        docs: {},
                        p: {
                          docs: {},
                          e: {
                            docs: {},
                            r: {
                              docs: {},
                              t: {
                                docs: {},
                                y: {
                                  docs: {},
                                  v: {
                                    docs: {},
                                    a: {
                                      docs: {},
                                      l: {
                                        docs: {},
                                        u: {
                                          docs: {
                                            "PFElement.html#_castPropertyValue": {
                                              ref: "PFElement.html#_castPropertyValue",
                                              tf: 750
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            n: {
              docs: {},
              o: {
                docs: {},
                b: {
                  docs: {},
                  s: {
                    docs: {},
                    e: {
                      docs: {},
                      r: {
                        docs: {},
                        v: {
                          docs: {
                            "PFElement.html#_onObserver": {
                              ref: "PFElement.html#_onObserver",
                              tf: 750
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          i: {
            docs: {},
            n: {
              docs: {},
              l: {
                docs: {},
                i: {
                  docs: {},
                  n: {
                    docs: {},
                    e: {
                      docs: {},
                      s: {
                        docs: {},
                        t: {
                          docs: {},
                          y: {
                            docs: {},
                            l: {
                              docs: {},
                              e: {
                                docs: {},
                                o: {
                                  docs: {},
                                  b: {
                                    docs: {},
                                    s: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        r: {
                                          docs: {},
                                          v: {
                                            docs: {
                                              "PFElement.html#_inlineStyleObserver": {
                                                ref: "PFElement.html#_inlineStyleObserver",
                                                tf: 750
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              i: {
                docs: {},
                t: {
                  docs: {},
                  i: {
                    docs: {},
                    a: {
                      docs: {},
                      l: {
                        docs: {},
                        i: {
                          docs: {},
                          z: {
                            docs: {},
                            e: {
                              docs: {},
                              s: {
                                docs: {},
                                l: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    t: {
                                      docs: {
                                        "PFElement.html#_initializeSlots": {
                                          ref: "PFElement.html#_initializeSlots",
                                          tf: 750
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              p: {
                                docs: {},
                                r: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    p: {
                                      docs: {},
                                      e: {
                                        docs: {},
                                        r: {
                                          docs: {},
                                          t: {
                                            docs: {},
                                            i: {
                                              docs: {
                                                "PFElement.html#_initializeProperties": {
                                                  ref: "PFElement.html#_initializeProperties",
                                                  tf: 750
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              a: {
                                docs: {},
                                t: {
                                  docs: {},
                                  t: {
                                    docs: {},
                                    r: {
                                      docs: {},
                                      i: {
                                        docs: {},
                                        b: {
                                          docs: {},
                                          u: {
                                            docs: {},
                                            t: {
                                              docs: {},
                                              e: {
                                                docs: {},
                                                d: {
                                                  docs: {},
                                                  e: {
                                                    docs: {},
                                                    f: {
                                                      docs: {},
                                                      a: {
                                                        docs: {},
                                                        u: {
                                                          docs: {},
                                                          l: {
                                                            docs: {},
                                                            t: {
                                                              docs: {
                                                                "PFElement.html#_initializeAttributeDefaults": {
                                                                  ref: "PFElement.html#_initializeAttributeDefaults",
                                                                  tf: 750
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          p: {
            docs: {},
            a: {
              docs: {},
              r: {
                docs: {},
                s: {
                  docs: {},
                  e: {
                    docs: {},
                    o: {
                      docs: {},
                      b: {
                        docs: {},
                        s: {
                          docs: {},
                          e: {
                            docs: {},
                            r: {
                              docs: {},
                              v: {
                                docs: {
                                  "PFElement.html#_parseObserver": {
                                    ref: "PFElement.html#_parseObserver",
                                    tf: 750
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            r: {
              docs: {},
              o: {
                docs: {},
                p: {
                  "2": {
                    docs: {},
                    a: {
                      docs: {},
                      t: {
                        docs: {},
                        t: {
                          docs: {},
                          r: {
                            docs: {
                              "PFElement.html#._prop2attr": {
                                ref: "PFElement.html#._prop2attr",
                                tf: 700
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  docs: {}
                }
              }
            },
            o: {
              docs: {},
              p: {
                docs: {},
                u: {
                  docs: {},
                  l: {
                    docs: {},
                    a: {
                      docs: {},
                      t: {
                        docs: {},
                        e: {
                          docs: {},
                          c: {
                            docs: {},
                            a: {
                              docs: {},
                              c: {
                                docs: {},
                                h: {
                                  docs: {
                                    "PFElement.html#._populateCache": {
                                      ref: "PFElement.html#._populateCache",
                                      tf: 700
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          v: {
            docs: {},
            a: {
              docs: {},
              l: {
                docs: {},
                i: {
                  docs: {},
                  d: {
                    docs: {},
                    a: {
                      docs: {},
                      t: {
                        docs: {},
                        e: {
                          docs: {},
                          p: {
                            docs: {},
                            r: {
                              docs: {},
                              o: {
                                docs: {},
                                p: {
                                  docs: {},
                                  e: {
                                    docs: {},
                                    r: {
                                      docs: {},
                                      t: {
                                        docs: {},
                                        i: {
                                          docs: {
                                            "PFElement.html#._validateProperties": {
                                              ref: "PFElement.html#._validateProperties",
                                              tf: 700
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          a: {
                            docs: {},
                            t: {
                              docs: {},
                              t: {
                                docs: {},
                                r: {
                                  docs: {},
                                  i: {
                                    docs: {},
                                    b: {
                                      docs: {},
                                      u: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          e: {
                                            docs: {},
                                            v: {
                                              docs: {},
                                              a: {
                                                docs: {},
                                                l: {
                                                  docs: {},
                                                  u: {
                                                    docs: {
                                                      "PFElement.html#_validateAttributeValue": {
                                                        ref: "PFElement.html#_validateAttributeValue",
                                                        tf: 750
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          a: {
            docs: {},
            s: {
              docs: {},
              s: {
                docs: {},
                i: {
                  docs: {},
                  g: {
                    docs: {},
                    n: {
                      docs: {},
                      v: {
                        docs: {},
                        a: {
                          docs: {},
                          l: {
                            docs: {},
                            u: {
                              docs: {},
                              e: {
                                docs: {},
                                t: {
                                  docs: {},
                                  o: {
                                    docs: {},
                                    a: {
                                      docs: {},
                                      t: {
                                        docs: {},
                                        t: {
                                          docs: {},
                                          r: {
                                            docs: {},
                                            i: {
                                              docs: {},
                                              b: {
                                                docs: {},
                                                u: {
                                                  docs: {},
                                                  t: {
                                                    docs: {
                                                      "PFElement.html#_assignValueToAttribute": {
                                                        ref: "PFElement.html#_assignValueToAttribute",
                                                        tf: 750
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            t: {
              docs: {},
              t: {
                docs: {},
                r: {
                  "2": {
                    docs: {},
                    p: {
                      docs: {},
                      r: {
                        docs: {},
                        o: {
                          docs: {},
                          p: {
                            docs: {
                              "PFElement.html#._attr2prop": {
                                ref: "PFElement.html#._attr2prop",
                                tf: 700
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  docs: {}
                }
              }
            }
          },
          s: {
            docs: {},
            e: {
              docs: {},
              t: {
                docs: {},
                c: {
                  docs: {},
                  a: {
                    docs: {},
                    c: {
                      docs: {},
                      h: {
                        docs: {
                          "PFElement.html#._setCache": {
                            ref: "PFElement.html#._setCache",
                            tf: 700
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          g: {
            docs: {},
            e: {
              docs: {},
              t: {
                docs: {},
                c: {
                  docs: {},
                  a: {
                    docs: {},
                    c: {
                      docs: {},
                      h: {
                        docs: {
                          "PFElement.html#._getCache": {
                            ref: "PFElement.html#._getCache",
                            tf: 700
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        f: {
          docs: {},
          e: {
            docs: {},
            t: {
              docs: {},
              c: {
                docs: {},
                h: {
                  docs: {
                    "PFElement.html#randomId": {
                      ref: "PFElement.html#randomId",
                      tf: 3.125
                    }
                  }
                }
              }
            }
          },
          i: {
            docs: {},
            l: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.debugLog": {
                    ref: "PFElement.html#.debugLog",
                    tf: 2.7777777777777777
                  },
                  "PFElement.html#.trackPerformance": {
                    ref: "PFElement.html#.trackPerformance",
                    tf: 3.3333333333333335
                  }
                }
              }
            },
            r: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#connectedCallback": {
                    ref: "PFElement.html#connectedCallback",
                    tf: 7.142857142857142
                  },
                  "PFElement.html#disconnectedCallback": {
                    ref: "PFElement.html#disconnectedCallback",
                    tf: 5
                  },
                  "PFElement.html#attributeChangedCallback": {
                    ref: "PFElement.html#attributeChangedCallback",
                    tf: 4.545454545454546
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            n: {
              docs: {},
              c: {
                docs: {},
                t: {
                  docs: {},
                  i: {
                    docs: {},
                    o: {
                      docs: {},
                      n: {
                        docs: {
                          "PFElement.html#.debugLog": {
                            ref: "PFElement.html#.debugLog",
                            tf: 110
                          },
                          "PFElement.html#.trackPerformance": {
                            ref: "PFElement.html#.trackPerformance",
                            tf: 110
                          },
                          "PFElement.html#.log": {
                            ref: "PFElement.html#.log",
                            tf: 110
                          },
                          "PFElement.html#log": {
                            ref: "PFElement.html#log",
                            tf: 110
                          },
                          "PFElement.html#.warn": {
                            ref: "PFElement.html#.warn",
                            tf: 110
                          },
                          "PFElement.html#warn": {
                            ref: "PFElement.html#warn",
                            tf: 114.16666666666667
                          },
                          "PFElement.html#.error": {
                            ref: "PFElement.html#.error",
                            tf: 114.16666666666667
                          },
                          "PFElement.html#error": {
                            ref: "PFElement.html#error",
                            tf: 114.16666666666667
                          },
                          "PFElement.html#hasLightDOM": {
                            ref: "PFElement.html#hasLightDOM",
                            tf: 110
                          },
                          "PFElement.html#hasSlot": {
                            ref: "PFElement.html#hasSlot",
                            tf: 110
                          },
                          "PFElement.html#getSlot": {
                            ref: "PFElement.html#getSlot",
                            tf: 110
                          },
                          "PFElement.html#contextUpdate": {
                            ref: "PFElement.html#contextUpdate",
                            tf: 110
                          },
                          "PFElement.html#connectedCallback": {
                            ref: "PFElement.html#connectedCallback",
                            tf: 110
                          },
                          "PFElement.html#disconnectedCallback": {
                            ref: "PFElement.html#disconnectedCallback",
                            tf: 110
                          },
                          "PFElement.html#attributeChangedCallback": {
                            ref: "PFElement.html#attributeChangedCallback",
                            tf: 110
                          },
                          "PFElement.html#render": {
                            ref: "PFElement.html#render",
                            tf: 126.66666666666666
                          },
                          "PFElement.html#emitEvent": {
                            ref: "PFElement.html#emitEvent",
                            tf: 110
                          },
                          "PFElement.html#cascadeProperties": {
                            ref: "PFElement.html#cascadeProperties",
                            tf: 110
                          },
                          "PFElement.html#_upgradeObserver": {
                            ref: "PFElement.html#_upgradeObserver",
                            tf: 110
                          },
                          "PFElement.html#_contextObserver": {
                            ref: "PFElement.html#_contextObserver",
                            tf: 110
                          },
                          "PFElement.html#_onObserver": {
                            ref: "PFElement.html#_onObserver",
                            tf: 110
                          },
                          "PFElement.html#_inlineStyleObserver": {
                            ref: "PFElement.html#_inlineStyleObserver",
                            tf: 110
                          },
                          "PFElement.html#_parseObserver": {
                            ref: "PFElement.html#_parseObserver",
                            tf: 110
                          },
                          "PFElement.html#._validateProperties": {
                            ref: "PFElement.html#._validateProperties",
                            tf: 110
                          },
                          "PFElement.html#_castPropertyValue": {
                            ref: "PFElement.html#_castPropertyValue",
                            tf: 110
                          },
                          "PFElement.html#_assignValueToAttribute": {
                            ref: "PFElement.html#_assignValueToAttribute",
                            tf: 110
                          },
                          "PFElement.html#_initializeSlots": {
                            ref: "PFElement.html#_initializeSlots",
                            tf: 110
                          },
                          "PFElement.html#_initializeProperties": {
                            ref: "PFElement.html#_initializeProperties",
                            tf: 110
                          },
                          "PFElement.html#_initializeAttributeDefaults": {
                            ref: "PFElement.html#_initializeAttributeDefaults",
                            tf: 110
                          },
                          "PFElement.html#_validateAttributeValue": {
                            ref: "PFElement.html#_validateAttributeValue",
                            tf: 110
                          },
                          "PFElement.html#._prop2attr": {
                            ref: "PFElement.html#._prop2attr",
                            tf: 110
                          },
                          "PFElement.html#._attr2prop": {
                            ref: "PFElement.html#._attr2prop",
                            tf: 110
                          },
                          "PFElement.html#._convertPropNameToAttrName": {
                            ref: "PFElement.html#._convertPropNameToAttrName",
                            tf: 110
                          },
                          "PFElement.html#._convertAttrNameToPropName": {
                            ref: "PFElement.html#._convertAttrNameToPropName",
                            tf: 110
                          },
                          "PFElement.html#.create": {
                            ref: "PFElement.html#.create",
                            tf: 110
                          },
                          "PFElement.html#._setCache": {
                            ref: "PFElement.html#._setCache",
                            tf: 110
                          },
                          "PFElement.html#._getCache": {
                            ref: "PFElement.html#._getCache",
                            tf: 110
                          },
                          "PFElement.html#._populateCache": {
                            ref: "PFElement.html#._populateCache",
                            tf: 110
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          o: {
            docs: {},
            r: {
              docs: {},
              m: {
                docs: {},
                a: {
                  docs: {},
                  t: {
                    docs: {
                      "PFElement.html#.warn": {
                        ref: "PFElement.html#.warn",
                        tf: 6.25
                      },
                      "PFElement.html#.error": {
                        ref: "PFElement.html#.error",
                        tf: 4.166666666666666
                      },
                      "PFElement.html#emitEvent": {
                        ref: "PFElement.html#emitEvent",
                        tf: 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          }
        },
        q: {
          docs: {},
          u: {
            docs: {},
            i: {
              docs: {},
              c: {
                docs: {},
                k: {
                  docs: {
                    "PFElement.html#randomId": {
                      ref: "PFElement.html#randomId",
                      tf: 3.125
                    }
                  }
                }
              }
            },
            e: {
              docs: {},
              r: {
                docs: {},
                i: {
                  docs: {
                    "PFElement.html#_initializeSlots": {
                      ref: "PFElement.html#_initializeSlots",
                      tf: 8.333333333333332
                    }
                  }
                }
              }
            }
          }
        },
        n: {
          docs: {},
          a: {
            docs: {},
            m: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#.allProperties": {
                    ref: "PFElement.html#.allProperties",
                    tf: 1.9230769230769231
                  },
                  "PFElement.html#.cascadingProperties": {
                    ref: "PFElement.html#.cascadingProperties",
                    tf: 1.9230769230769231
                  },
                  "PFElement.html#log": {
                    ref: "PFElement.html#log",
                    tf: 7.142857142857142
                  },
                  "PFElement.html#warn": {
                    ref: "PFElement.html#warn",
                    tf: 4.166666666666666
                  },
                  "PFElement.html#error": {
                    ref: "PFElement.html#error",
                    tf: 4.166666666666666
                  },
                  "PFElement.html#getSlot": {
                    ref: "PFElement.html#getSlot",
                    tf: 3.3333333333333335
                  },
                  "PFElement.html#._validateProperties": {
                    ref: "PFElement.html#._validateProperties",
                    tf: 8.333333333333332
                  },
                  "PFElement.html#_assignValueToAttribute": {
                    ref: "PFElement.html#_assignValueToAttribute",
                    tf: 8.333333333333332
                  },
                  "PFElement.html#._prop2attr": {
                    ref: "PFElement.html#._prop2attr",
                    tf: 12.5
                  },
                  "PFElement.html#._attr2prop": {
                    ref: "PFElement.html#._attr2prop",
                    tf: 12.5
                  },
                  "PFElement.html#._convertPropNameToAttrName": {
                    ref: "PFElement.html#._convertPropNameToAttrName",
                    tf: 20
                  },
                  "PFElement.html#._convertAttrNameToPropName": {
                    ref: "PFElement.html#._convertAttrNameToPropName",
                    tf: 20
                  }
                },
                s: {
                  docs: {},
                  p: {
                    docs: {},
                    a: {
                      docs: {},
                      c: {
                        docs: {
                          "PFElement.html#._setCache": {
                            ref: "PFElement.html#._setCache",
                            tf: 11.11111111111111
                          },
                          "PFElement.html#._getCache": {
                            ref: "PFElement.html#._getCache",
                            tf: 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          e: {
            docs: {},
            s: {
              docs: {},
              t: {
                docs: {
                  "PFElement.html#contextUpdate": {
                    ref: "PFElement.html#contextUpdate",
                    tf: 10
                  },
                  "PFElement.html#cascadeProperties": {
                    ref: "PFElement.html#cascadeProperties",
                    tf: 3.8461538461538463
                  }
                }
              }
            },
            w: {
              docs: {
                "PFElement.html#cascadeProperties": {
                  ref: "PFElement.html#cascadeProperties",
                  tf: 3.8461538461538463
                }
              }
            }
          }
        },
        o: {
          docs: {},
          b: {
            docs: {},
            j: {
              docs: {},
              e: {
                docs: {},
                c: {
                  docs: {},
                  t: {
                    docs: {
                      "PFElement.html#.allProperties": {
                        ref: "PFElement.html#.allProperties",
                        tf: 3.8461538461538463
                      },
                      "PFElement.html#.cascadingProperties": {
                        ref: "PFElement.html#.cascadingProperties",
                        tf: 3.8461538461538463
                      },
                      "PFElement.html#_initializeSlots": {
                        ref: "PFElement.html#_initializeSlots",
                        tf: 8.333333333333332
                      },
                      "PFElement.html#._setCache": {
                        ref: "PFElement.html#._setCache",
                        tf: 5.555555555555555
                      },
                      "PFElement.html#._getCache": {
                        ref: "PFElement.html#._getCache",
                        tf: 20
                      }
                    }
                  }
                }
              }
            },
            s: {
              docs: {},
              e: {
                docs: {},
                r: {
                  docs: {},
                  v: {
                    docs: {
                      "PFElement.html#_parseObserver": {
                        ref: "PFElement.html#_parseObserver",
                        tf: 4.545454545454546
                      }
                    }
                  }
                }
              }
            }
          },
          v: {
            docs: {},
            e: {
              docs: {},
              r: {
                docs: {},
                r: {
                  docs: {},
                  i: {
                    docs: {},
                    d: {
                      docs: {
                        "PFElement.html#.allProperties": {
                          ref: "PFElement.html#.allProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#.cascadingProperties": {
                          ref: "PFElement.html#.cascadingProperties",
                          tf: 1.9230769230769231
                        },
                        "PFElement.html#_contextObserver": {
                          ref: "PFElement.html#_contextObserver",
                          tf: 7.142857142857142
                        }
                      }
                    }
                  }
                },
                w: {
                  docs: {},
                  r: {
                    docs: {},
                    i: {
                      docs: {},
                      t: {
                        docs: {
                          "PFElement.html#._setCache": {
                            ref: "PFElement.html#._setCache",
                            tf: 5.555555555555555
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          u: {
            docs: {},
            t: {
              docs: {},
              p: {
                docs: {},
                u: {
                  docs: {},
                  t: {
                    docs: {
                      "PFElement.html#log": {
                        ref: "PFElement.html#log",
                        tf: 7.142857142857142
                      },
                      "PFElement.html#.warn": {
                        ref: "PFElement.html#.warn",
                        tf: 6.25
                      },
                      "PFElement.html#warn": {
                        ref: "PFElement.html#warn",
                        tf: 4.166666666666666
                      },
                      "PFElement.html#.error": {
                        ref: "PFElement.html#.error",
                        tf: 4.166666666666666
                      },
                      "PFElement.html#error": {
                        ref: "PFElement.html#error",
                        tf: 4.166666666666666
                      }
                    }
                  }
                }
              }
            }
          }
        },
        j: {
          docs: {},
          s: {
            docs: {
              "PFElement.html#.debugLog": {
                ref: "PFElement.html#.debugLog",
                tf: 2.7777777777777777
              },
              "PFElement.html#.trackPerformance": {
                ref: "PFElement.html#.trackPerformance",
                tf: 3.3333333333333335
              }
            }
          }
        },
        h: {
          docs: {},
          a: {
            docs: {},
            s: {
              docs: {},
              l: {
                docs: {},
                i: {
                  docs: {},
                  g: {
                    docs: {},
                    h: {
                      docs: {},
                      t: {
                        docs: {},
                        d: {
                          docs: {},
                          o: {
                            docs: {},
                            m: {
                              docs: {
                                "PFElement.html#hasLightDOM": {
                                  ref: "PFElement.html#hasLightDOM",
                                  tf: 700
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              s: {
                docs: {},
                l: {
                  docs: {},
                  o: {
                    docs: {},
                    t: {
                      docs: {
                        "PFElement.html#hasSlot": {
                          ref: "PFElement.html#hasSlot",
                          tf: 750
                        }
                      }
                    }
                  }
                }
              }
            },
            n: {
              docs: {},
              d: {
                docs: {},
                l: {
                  docs: {
                    "PFElement.html#cascadeProperties": {
                      ref: "PFElement.html#cascadeProperties",
                      tf: 7.6923076923076925
                    }
                  }
                }
              }
            }
          },
          e: {
            docs: {},
            r: {
              docs: {},
              e: {
                docs: {
                  "PFElement.html#disconnectedCallback": {
                    ref: "PFElement.html#disconnectedCallback",
                    tf: 5
                  }
                }
              }
            }
          }
        }
      },
      length: 558
    },
    corpusTokens: [
      "_assignvaluetoattribut",
      "_attr2prop",
      "_castpropertyvalu",
      "_contextobserv",
      "_convertattrnametopropnam",
      "_convertpropnametoattrnam",
      "_getcach",
      "_initializeattributedefault",
      "_initializeproperti",
      "_initializeslot",
      "_inlinestyleobserv",
      "_note:_",
      "_onobserv",
      "_parseobserv",
      "_populatecach",
      "_prop2attr",
      "_setcach",
      "_upgradeobserv",
      "_validateattributevalu",
      "_validateproperti",
      "ad",
      "add",
      "against",
      "alert",
      "alia",
      "allproperti",
      "alreadi",
      "anyth",
      "appli",
      "around",
      "array",
      "attribut",
      "attributechangedcallback",
      "automat",
      "base",
      "baselin",
      "be",
      "boolean",
      "cach",
      "callback",
      "cascad",
      "cascadeproperti",
      "cascadingproperti",
      "case",
      "chang",
      "check",
      "class",
      "combin",
      "commun",
      "compil",
      "compon",
      "component'",
      "componet",
      "conflict",
      "connect",
      "connectedcallback",
      "consol",
      "constructor",
      "contain",
      "context",
      "contextupd",
      "contextvari",
      "convert",
      "correct",
      "creat",
      "current",
      "data",
      "debug",
      "debuglog",
      "default",
      "defin",
      "definit",
      "descend",
      "design",
      "develop",
      "disconnect",
      "disconnectedcallback",
      "dispatch",
      "document",
      "dom",
      "down",
      "dure",
      "easier",
      "effici",
      "element",
      "emitev",
      "ensur",
      "error",
      "etc",
      "event",
      "exist",
      "fetch",
      "file",
      "fire",
      "format",
      "function",
      "gener",
      "getslot",
      "given",
      "global",
      "grep",
      "handl",
      "haslightdom",
      "hasslot",
      "here",
      "i.",
      "id",
      "index",
      "indic",
      "inform",
      "initi",
      "inlin",
      "insid",
      "intial",
      "js",
      "light",
      "link",
      "list",
      "list:class",
      "load",
      "local",
      "log",
      "logic",
      "look",
      "lt;static&gt",
      "manag",
      "manual",
      "map",
      "meet",
      "member",
      "merg",
      "method",
      "mutat",
      "name",
      "namespac",
      "nest",
      "new",
      "object",
      "observ",
      "output",
      "overrid",
      "overwrit",
      "package.json",
      "patternfli",
      "perform",
      "pfe",
      "pfecard",
      "pfelement",
      "pfelement#_assignvaluetoattribut",
      "pfelement#_castpropertyvalu",
      "pfelement#_contextobserv",
      "pfelement#_initializeattributedefault",
      "pfelement#_initializeproperti",
      "pfelement#_initializeslot",
      "pfelement#_inlinestyleobserv",
      "pfelement#_onobserv",
      "pfelement#_parseobserv",
      "pfelement#_upgradeobserv",
      "pfelement#_validateattributevalu",
      "pfelement#attributechangedcallback",
      "pfelement#cascadeproperti",
      "pfelement#connectedcallback",
      "pfelement#contextupd",
      "pfelement#contextvari",
      "pfelement#disconnectedcallback",
      "pfelement#emitev",
      "pfelement#error",
      "pfelement#getslot",
      "pfelement#haslightdom",
      "pfelement#hasslot",
      "pfelement#log",
      "pfelement#randomid",
      "pfelement#rend",
      "pfelement#vers",
      "pfelement#warn",
      "pfelement'",
      "pfelement._attr2prop",
      "pfelement._convertattrnametopropnam",
      "pfelement._convertpropnametoattrnam",
      "pfelement._getcach",
      "pfelement._populatecach",
      "pfelement._prop2attr",
      "pfelement._setcach",
      "pfelement._validateproperti",
      "pfelement.allproperti",
      "pfelement.cascadingproperti",
      "pfelement.cr",
      "pfelement.debuglog",
      "pfelement.error",
      "pfelement.log",
      "pfelement.pfetyp",
      "pfelement.properti",
      "pfelement.trackperform",
      "pfelement.vers",
      "pfelement.warn",
      "pfetyp",
      "popul",
      "prefix",
      "print",
      "properti",
      "provid",
      "purpos",
      "push",
      "put",
      "queri",
      "quick",
      "random",
      "randomid",
      "readm",
      "remov",
      "removeeventlisten",
      "render",
      "requir",
      "respond",
      "return",
      "safe",
      "script",
      "serv",
      "set",
      "slot",
      "sourc",
      "specif",
      "standard",
      "statement",
      "static",
      "style",
      "such",
      "tag",
      "theme",
      "this.getslot",
      "togeth",
      "tool",
      "track",
      "trackperform",
      "true",
      "truth",
      "two",
      "type",
      "unassign",
      "up",
      "updat",
      "updates/addit",
      "upgrad",
      "us",
      "valid",
      "valu",
      "variabl",
      "version",
      "warn",
      "watch",
      "way",
      "web",
      "whether",
      "wrapper"
    ],
    pipeline: ["trimmer", "stopWordFilter", "stemmer"]
  },
  store: {
    "index.html": {
      id: "index.html",
      kind: "readme",
      title: "PatternFly Elements",
      longname: "index",
      name: "PatternFly Elements",
      tags: "index",
      summary: "A set of community-created web components based on PatternFly design.",
      description: "",
      body: ""
    },
    "global.html": {
      id: "global.html",
      kind: "global",
      title: "Globals",
      longname: "global",
      name: "Globals",
      tags: "global",
      summary: "All documented globals.",
      description: "",
      body: ""
    },
    "list_class.html": {
      id: "list_class.html",
      kind: "list",
      title: "Classes",
      longname: "list:class",
      name: "Classes",
      tags: "list:class",
      summary: "All documented classes.",
      description: "",
      body: ""
    },
    "PFElement.html": {
      id: "PFElement.html",
      kind: "class",
      title: "PFElement",
      longname: "PFElement",
      name: "PFElement",
      tags: "PFElement",
      summary: "",
      description: "Serves as the baseline for all PatternFly Element components.",
      body: ""
    },
    "PFElement.html#.PfeTypes": {
      id: "PFElement.html#.PfeTypes",
      kind: "member",
      title: "&lt;static&gt; PfeTypes",
      longname: "PFElement.PfeTypes",
      name: "PfeTypes",
      tags: "PFElement.PfeTypes PfeTypes",
      summary: "",
      description:
        "A global definition of component types (a general way of defining the purpose of a component and how it is put together)."
    },
    "PFElement.html#.version": {
      id: "PFElement.html#.version",
      kind: "member",
      title: "&lt;static&gt; version",
      longname: "PFElement.version",
      name: "version",
      tags: "PFElement.version version",
      summary: "",
      description: "The current version of a component; set by the compiler using the package.json data."
    },
    "PFElement.html#version": {
      id: "PFElement.html#version",
      kind: "member",
      title: "version",
      longname: "PFElement#version",
      name: "version",
      tags: "PFElement#version version",
      summary: "",
      description: "A local alias to the static version. For use in the console to validate version being loaded."
    },
    "PFElement.html#.properties": {
      id: "PFElement.html#.properties",
      kind: "member",
      title: "&lt;static&gt; properties",
      longname: "PFElement.properties",
      name: "properties",
      tags: "PFElement.properties properties",
      summary: "",
      description: "Global property definitions: properties managed by the base class that apply to all components."
    },
    "PFElement.html#randomId": {
      id: "PFElement.html#randomId",
      kind: "member",
      title: "randomId",
      longname: "PFElement#randomId",
      name: "randomId",
      tags: "PFElement#randomId randomId",
      summary: "",
      description:
        "A quick way to fetch a random ID value. _Note:_ All values are prefixes with `pfe` automatically to ensure an ID-safe value is returned."
    },
    "PFElement.html#contextVariable": {
      id: "PFElement.html#contextVariable",
      kind: "member",
      title: "contextVariable",
      longname: "PFElement#contextVariable",
      name: "contextVariable",
      tags: "PFElement#contextVariable contextVariable",
      summary: "",
      description: "Get the current value of the --context variable in this component."
    },
    "PFElement.html#.allProperties": {
      id: "PFElement.html#.allProperties",
      kind: "member",
      title: "&lt;static&gt; allProperties",
      longname: "PFElement.allProperties",
      name: "allProperties",
      tags: "PFElement.allProperties allProperties",
      summary: "",
      description:
        "allProperties returns an object containing PFElement's global properties and the descendents' (such as PfeCard, etc) component properties. The two objects are merged together and in the case of a property name conflict, PFElement's properties override the component's properties."
    },
    "PFElement.html#.cascadingProperties": {
      id: "PFElement.html#.cascadingProperties",
      kind: "member",
      title: "&lt;static&gt; cascadingProperties",
      longname: "PFElement.cascadingProperties",
      name: "cascadingProperties",
      tags: "PFElement.cascadingProperties cascadingProperties",
      summary: "",
      description:
        "cascadingProperties returns an object containing PFElement's global properties and the descendents' (such as PfeCard, etc) component properties. The two objects are merged together and in the case of a property name conflict, PFElement's properties override the component's properties."
    },
    "PFElement.html#.debugLog": {
      id: "PFElement.html#.debugLog",
      kind: "function",
      title: "&lt;static&gt; debugLog()",
      longname: "PFElement.debugLog",
      name: "debugLog",
      tags: "PFElement.debugLog debugLog",
      summary: "",
      description:
        "A boolean value that indicates if the logging should be printed to the console; used for debugging. For use in a JS file or script tag; can also be added in the constructor of a component during development."
    },
    "PFElement.html#.trackPerformance": {
      id: "PFElement.html#.trackPerformance",
      kind: "function",
      title: "&lt;static&gt; trackPerformance()",
      longname: "PFElement.trackPerformance",
      name: "trackPerformance",
      tags: "PFElement.trackPerformance trackPerformance",
      summary: "",
      description:
        "A boolean value that indicates if the performance should be tracked. For use in a JS file or script tag; can also be added in the constructor of a component during development."
    },
    "PFElement.html#.log": {
      id: "PFElement.html#.log",
      kind: "function",
      title: "&lt;static&gt; log()",
      longname: "PFElement.log",
      name: "log",
      tags: "PFElement.log log",
      summary: "",
      description: "A logging wrapper which checks the debugLog boolean and prints to the console if true."
    },
    "PFElement.html#log": {
      id: "PFElement.html#log",
      kind: "function",
      title: "log()",
      longname: "PFElement#log",
      name: "log",
      tags: "PFElement#log log",
      summary: "",
      description: "Local logging that outputs the tag name as a prefix automatically"
    },
    "PFElement.html#.warn": {
      id: "PFElement.html#.warn",
      kind: "function",
      title: "&lt;static&gt; warn()",
      longname: "PFElement.warn",
      name: "warn",
      tags: "PFElement.warn warn",
      summary: "",
      description: "A console warning wrapper which formats your output with useful debugging information."
    },
    "PFElement.html#warn": {
      id: "PFElement.html#warn",
      kind: "function",
      title: "warn()",
      longname: "PFElement#warn",
      name: "warn",
      tags: "PFElement#warn warn",
      summary: "",
      description:
        "Local warning wrapper that outputs the tag name as a prefix automatically. For use inside a component's function."
    },
    "PFElement.html#.error": {
      id: "PFElement.html#.error",
      kind: "function",
      title: "&lt;static&gt; error()",
      longname: "PFElement.error",
      name: "error",
      tags: "PFElement.error error",
      summary: "",
      description:
        "A console error wrapper which formats your output with useful debugging information. For use inside a component's function."
    },
    "PFElement.html#error": {
      id: "PFElement.html#error",
      kind: "function",
      title: "error()",
      longname: "PFElement#error",
      name: "error",
      tags: "PFElement#error error",
      summary: "",
      description:
        "Local error wrapper that outputs the tag name as a prefix automatically. For use inside a component's function."
    },
    "PFElement.html#hasLightDOM": {
      id: "PFElement.html#hasLightDOM",
      kind: "function",
      title: "hasLightDOM() → {boolean}",
      longname: "PFElement#hasLightDOM",
      name: "hasLightDOM",
      tags: "PFElement#hasLightDOM hasLightDOM",
      summary: "",
      description: "Returns a boolean statement of whether or not this component contains any light DOM."
    },
    "PFElement.html#hasSlot": {
      id: "PFElement.html#hasSlot",
      kind: "function",
      title: "hasSlot()",
      longname: "PFElement#hasSlot",
      name: "hasSlot",
      tags: "PFElement#hasSlot hasSlot",
      summary: "",
      description: "Returns a boolean statement of whether or not that slot exists in the light DOM."
    },
    "PFElement.html#getSlot": {
      id: "PFElement.html#getSlot",
      kind: "function",
      title: "getSlot()",
      longname: "PFElement#getSlot",
      name: "getSlot",
      tags: "PFElement#getSlot getSlot",
      summary: "",
      description:
        "Returns an array with all the slot with the provided name defined in the light DOM. If no value is provided (i.e., `this.getSlot()`), it returns all unassigned slots."
    },
    "PFElement.html#contextUpdate": {
      id: "PFElement.html#contextUpdate",
      kind: "function",
      title: "contextUpdate()",
      longname: "PFElement#contextUpdate",
      name: "contextUpdate",
      tags: "PFElement#contextUpdate contextUpdate",
      summary: "",
      description: "This alerts nested components to a change in the context"
    },
    "PFElement.html#connectedCallback": {
      id: "PFElement.html#connectedCallback",
      kind: "function",
      title: "connectedCallback()",
      longname: "PFElement#connectedCallback",
      name: "connectedCallback",
      tags: "PFElement#connectedCallback connectedCallback",
      summary: "",
      description: "Standard connected callback; fires when the component is added to the DOM."
    },
    "PFElement.html#disconnectedCallback": {
      id: "PFElement.html#disconnectedCallback",
      kind: "function",
      title: "disconnectedCallback()",
      longname: "PFElement#disconnectedCallback",
      name: "disconnectedCallback",
      tags: "PFElement#disconnectedCallback disconnectedCallback",
      summary: "",
      description:
        "Standard disconnected callback; fires when a componet is removed from the DOM. Add your removeEventListeners here."
    },
    "PFElement.html#attributeChangedCallback": {
      id: "PFElement.html#attributeChangedCallback",
      kind: "function",
      title: "attributeChangedCallback()",
      longname: "PFElement#attributeChangedCallback",
      name: "attributeChangedCallback",
      tags: "PFElement#attributeChangedCallback attributeChangedCallback",
      summary: "",
      description:
        "Attribute changed callback fires when attributes are updated. This combines the global and the component-specific logic."
    },
    "PFElement.html#render": {
      id: "PFElement.html#render",
      kind: "function",
      title: "render()",
      longname: "PFElement#render",
      name: "render",
      tags: "PFElement#render render",
      summary: "",
      description: "Standard render function."
    },
    "PFElement.html#emitEvent": {
      id: "PFElement.html#emitEvent",
      kind: "function",
      title: "emitEvent()",
      longname: "PFElement#emitEvent",
      name: "emitEvent",
      tags: "PFElement#emitEvent emitEvent",
      summary: "",
      description: "A wrapper around an event dispatch to standardize formatting."
    },
    "PFElement.html#cascadeProperties": {
      id: "PFElement.html#cascadeProperties",
      kind: "function",
      title: "cascadeProperties()",
      longname: "PFElement#cascadeProperties",
      name: "cascadeProperties",
      tags: "PFElement#cascadeProperties cascadeProperties",
      summary: "",
      description:
        "Handles the cascading of properties to nested components when new elements are added Attribute updates/additions are handled by the attribute callback"
    },
    "PFElement.html#_upgradeObserver": {
      id: "PFElement.html#_upgradeObserver",
      kind: "function",
      title: "_upgradeObserver()",
      longname: "PFElement#_upgradeObserver",
      name: "_upgradeObserver",
      tags: "PFElement#_upgradeObserver _upgradeObserver",
      summary: "",
      description: "This responds to changes in the pfelement attribute; indicates if the component upgraded"
    },
    "PFElement.html#_contextObserver": {
      id: "PFElement.html#_contextObserver",
      kind: "function",
      title: "_contextObserver()",
      longname: "PFElement#_contextObserver",
      name: "_contextObserver",
      tags: "PFElement#_contextObserver _contextObserver",
      summary: "",
      description: "This responds to changes in the context attribute; manual override tool"
    },
    "PFElement.html#_onObserver": {
      id: "PFElement.html#_onObserver",
      kind: "function",
      title: "_onObserver()",
      longname: "PFElement#_onObserver",
      name: "_onObserver",
      tags: "PFElement#_onObserver _onObserver",
      summary: "",
      description: "This responds to changes in the context; source of truth for components"
    },
    "PFElement.html#_inlineStyleObserver": {
      id: "PFElement.html#_inlineStyleObserver",
      kind: "function",
      title: "_inlineStyleObserver()",
      longname: "PFElement#_inlineStyleObserver",
      name: "_inlineStyleObserver",
      tags: "PFElement#_inlineStyleObserver _inlineStyleObserver",
      summary: "",
      description: "This responds to inline style changes and greps for context or theme updates."
    },
    "PFElement.html#_parseObserver": {
      id: "PFElement.html#_parseObserver",
      kind: "function",
      title: "_parseObserver()",
      longname: "PFElement#_parseObserver",
      name: "_parseObserver",
      tags: "PFElement#_parseObserver _parseObserver",
      summary: "",
      description:
        "This is connected with a mutation observer that watches for updates to the light DOM and pushes down the cascading values"
    },
    "PFElement.html#._validateProperties": {
      id: "PFElement.html#._validateProperties",
      kind: "function",
      title: "&lt;static&gt; _validateProperties()",
      longname: "PFElement._validateProperties",
      name: "_validateProperties",
      tags: "PFElement._validateProperties _validateProperties",
      summary: "",
      description: "Validate that the property meets the requirements for type and naming."
    },
    "PFElement.html#_castPropertyValue": {
      id: "PFElement.html#_castPropertyValue",
      kind: "function",
      title: "_castPropertyValue()",
      longname: "PFElement#_castPropertyValue",
      name: "_castPropertyValue",
      tags: "PFElement#_castPropertyValue _castPropertyValue",
      summary: "",
      description: "Convert provided property value to the correct type as defined in the properties method."
    },
    "PFElement.html#_assignValueToAttribute": {
      id: "PFElement.html#_assignValueToAttribute",
      kind: "function",
      title: "_assignValueToAttribute()",
      longname: "PFElement#_assignValueToAttribute",
      name: "_assignValueToAttribute",
      tags: "PFElement#_assignValueToAttribute _assignValueToAttribute",
      summary: "",
      description: "Map provided value to the attribute name on the component."
    },
    "PFElement.html#_initializeSlots": {
      id: "PFElement.html#_initializeSlots",
      kind: "function",
      title: "_initializeSlots()",
      longname: "PFElement#_initializeSlots",
      name: "_initializeSlots",
      tags: "PFElement#_initializeSlots _initializeSlots",
      summary: "",
      description: "Maps the defined slots into an object that is easier to query"
    },
    "PFElement.html#_initializeProperties": {
      id: "PFElement.html#_initializeProperties",
      kind: "function",
      title: "_initializeProperties()",
      longname: "PFElement#_initializeProperties",
      name: "_initializeProperties",
      tags: "PFElement#_initializeProperties _initializeProperties",
      summary: "",
      description: "Sets up the property definitions based on the properties method."
    },
    "PFElement.html#_initializeAttributeDefaults": {
      id: "PFElement.html#_initializeAttributeDefaults",
      kind: "function",
      title: "_initializeAttributeDefaults()",
      longname: "PFElement#_initializeAttributeDefaults",
      name: "_initializeAttributeDefaults",
      tags: "PFElement#_initializeAttributeDefaults _initializeAttributeDefaults",
      summary: "",
      description: "Intialize the default value for an attribute."
    },
    "PFElement.html#_validateAttributeValue": {
      id: "PFElement.html#_validateAttributeValue",
      kind: "function",
      title: "_validateAttributeValue()",
      longname: "PFElement#_validateAttributeValue",
      name: "_validateAttributeValue",
      tags: "PFElement#_validateAttributeValue _validateAttributeValue",
      summary: "",
      description: "Validate the value against provided values."
    },
    "PFElement.html#._prop2attr": {
      id: "PFElement.html#._prop2attr",
      kind: "function",
      title: "&lt;static&gt; _prop2attr()",
      longname: "PFElement._prop2attr",
      name: "_prop2attr",
      tags: "PFElement._prop2attr _prop2attr",
      summary: "",
      description: "Look up an attribute name linked to a given property name."
    },
    "PFElement.html#._attr2prop": {
      id: "PFElement.html#._attr2prop",
      kind: "function",
      title: "&lt;static&gt; _attr2prop()",
      longname: "PFElement._attr2prop",
      name: "_attr2prop",
      tags: "PFElement._attr2prop _attr2prop",
      summary: "",
      description: "Look up an property name linked to a given attribute name."
    },
    "PFElement.html#._convertPropNameToAttrName": {
      id: "PFElement.html#._convertPropNameToAttrName",
      kind: "function",
      title: "&lt;static&gt; _convertPropNameToAttrName()",
      longname: "PFElement._convertPropNameToAttrName",
      name: "_convertPropNameToAttrName",
      tags: "PFElement._convertPropNameToAttrName _convertPropNameToAttrName",
      summary: "",
      description: "Convert a property name to an attribute name."
    },
    "PFElement.html#._convertAttrNameToPropName": {
      id: "PFElement.html#._convertAttrNameToPropName",
      kind: "function",
      title: "&lt;static&gt; _convertAttrNameToPropName()",
      longname: "PFElement._convertAttrNameToPropName",
      name: "_convertAttrNameToPropName",
      tags: "PFElement._convertAttrNameToPropName _convertAttrNameToPropName",
      summary: "",
      description: "Convert an attribute name to a property name."
    },
    "PFElement.html#.create": {
      id: "PFElement.html#.create",
      kind: "function",
      title: "&lt;static&gt; create()",
      longname: "PFElement.create",
      name: "create",
      tags: "PFElement.create create",
      summary: "",
      description: "Caching the attributes and properties data for efficiency"
    },
    "PFElement.html#._setCache": {
      id: "PFElement.html#._setCache",
      kind: "function",
      title: "&lt;static&gt; _setCache()",
      longname: "PFElement._setCache",
      name: "_setCache",
      tags: "PFElement._setCache _setCache",
      summary: "",
      description: "Cache an object in a given cache namespace. This overwrites anything already in that namespace."
    },
    "PFElement.html#._getCache": {
      id: "PFElement.html#._getCache",
      kind: "function",
      title: "&lt;static&gt; _getCache()",
      longname: "PFElement._getCache",
      name: "_getCache",
      tags: "PFElement._getCache _getCache",
      summary: "",
      description: "Get a cached object by namespace, or get all cached objects."
    },
    "PFElement.html#._populateCache": {
      id: "PFElement.html#._populateCache",
      kind: "function",
      title: "&lt;static&gt; _populateCache()",
      longname: "PFElement._populateCache",
      name: "_populateCache",
      tags: "PFElement._populateCache _populateCache",
      summary: "",
      description: "Populate initial values for properties cache."
    }
  }
};
