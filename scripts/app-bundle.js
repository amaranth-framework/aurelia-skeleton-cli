define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('features/abstract-view',['exports', 'aurelia-api', 'aurelia-event-aggregator', 'aurelia-framework', 'aurelia-router', 'uuid', 'features/utils'], function (exports, _aureliaApi, _aureliaEventAggregator, _aureliaFramework, _aureliaRouter, _uuid, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AbstractView = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var AbstractView = exports.AbstractView = (_dec = (0, _aureliaFramework.inject)(_aureliaApi.Config, AureliaConfiguration, _aureliaEventAggregator.EventAggregator, I18N, _aureliaRouter.Router), _dec(_class = function () {
    function AbstractView(api, config, events, i18n, router) {
      _classCallCheck(this, AbstractView);

      this.defaultSettings = null;
      this.overrideSettingsKey = false;

      this.api = api.getEndpoint('api');
      if (i18n) {
        this.i18n = i18n;
      }
      this.config = config;
      this.events = events;
      this.router = router;

      this.uuid = _uuid.uuid;
    }

    AbstractView.prototype.activate = function activate() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 1) {
        var model = args.shift();

        for (var p in model) {
          this[p] = model[p];
        }
      }

      if (args.length > 1) {
        this.params = args.shift();

        this.routeConfig = args.shift();

        this.navigationInstruction = args.shift();

        this.settings = this.routeConfig ? this.routeConfig.settings : {};
      }

      this.mergeSettings();

      this.events.subscribeOnce('session:ready', function (result) {
        return !_this.initialized ? _this.init() : false;
      });

      if (this.config.get('session.ready') && !this.initialized) {
        this.init();
      }
    };

    AbstractView.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parent = overrideContext.parentOverrideContext.bindingContext;
    };

    AbstractView.prototype.init = function init() {};

    AbstractView.prototype.mergeSettings = function mergeSettings() {
      if (this.defaultSettings) {
        var defaultSettings = (0, _utils.extend)(true, this.modelDefaultSettings || {}, this.defaultSettings || {});
        delete this.modelDefaultSettings;

        this.settings = (0, _utils.extend)(true, {}, defaultSettings, this.overrideSettings, this.settings || {});
      }
    };

    AbstractView.prototype.toString = function toString() {
      return 'view@' + this.uuid;
    };

    _createClass(AbstractView, [{
      key: 'logger',
      get: function get() {
        if (!this._logger) {
          this._logger = _aureliaFramework.LogManager.getLogger((0, _utils.parentClassName)(this) + '/' + (0, _utils.className)(this));
        }
        return this._logger;
      }
    }, {
      key: 'overrideSettings',
      get: function get() {
        if (!this._overrideSettings) {
          this._overrideSettings = this.config.get(this.overrideSettingsKey) || {};
        }

        return this._overrideSettings;
      }
    }, {
      key: 'style',
      get: function get() {
        return (this.settings.style || '') + ' ' + (this.settings.layout || '');
      }
    }]);

    return AbstractView;
  }()) || _class);
});
define('features/utils',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.extend = extend;
    exports.className = className;
    exports.parentClassName = parentClassName;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function extend(deep, target) {
        var NULL = [null, 'null'];

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        args.forEach(function (object) {
            for (var key in object) {
                if (NULL.includes(object[key])) {
                    target[key] = null;
                    continue;
                }

                if (deep && _typeof(object[key]) === 'object' && !Array.isArray(object[key])) {
                    target[key] = extend(deep, target[key] || {}, object[key]);
                } else {
                    target[key] = object[key];
                }
            }
        });
        return target;
    }

    function className(obj) {
        var isConstructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var _className = isConstructor ? obj.name : obj.constructor.name;
        if (typeof _className === 'undefined') {
            _className = (isConstructor ? obj : obj.constructor).toString().match(/ ([^ ]+)\(/)[1];
        }
        return _className;
    }

    function parentClassName(obj) {
        var parentClass = Object.getPrototypeOf(obj.constructor);
        if (typeof parentClass === 'undefined') {
            throw new Error('Could not determine parent class name for ' + className(obj) + '. Does it extend any class?');
        }
        return className(parentClass, true);
    }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.min.css\"></require><require from=\"gentelella/css/custom.min.css\"></require><div class=\"container body\"><div class=\"main_container\"><div class=\"col-md-3 left_col\"></div><div class=\"top_nav\"><div class=\"nav_menu\"></div></div><div class=\"right_col\" role=\"main\"><router-view></router-view></div><footer></footer></div></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map