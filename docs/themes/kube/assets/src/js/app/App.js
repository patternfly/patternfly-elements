var App = function(options)
{
    this.module = {};
    this.services = [];
    this.servicesIndex = 0;

    // start/stop
    this.started = false;
    this.stopped = false;

    this.rootOpts = options;
    this.$win = $K.dom(window);
    this.$doc = $K.dom(document);
    this.$body = $K.dom('body');

    // core services
    this.utils = $K.create('service.utils', this);
    this.opts = $K.create('service.options', this, 'global', options);
    this.lang = $K.create('service.lang', this);

    // build
    this.buildServices();
    this.buildModules();

    // start
    this.start();
};

App.prototype = {
    // start
    start: function()
    {
        this.stopped = false;
        this.broadcast('start');

        // start services & modules
        this.startStopServices('start');
        this.startStopModules('start');

        this.broadcast('started');
        this.started = true;
    },
    stop: function()
    {
        this.started = false;
        this.stopped = true;
        this.broadcast('stop');

        // stop services & modules
        this.startStopServices('stop');
        this.startStopModules('stop');

        this.broadcast('stopped');

        // stop app
        $K.app = false;
    },
    startStopServices: function(type)
    {
        for (var i = 0; i < this.services.length; i++)
        {
            this.callInstanceMethod(this.services[i], type);
        }
    },
    startStopModules: function(type)
    {
        for (var moduleName in this.module)
        {
            for (var key in this.module[moduleName])
            {
                var instance = this.module[moduleName][key];

                this.callInstanceMethod(instance, type);
                this.stopModuleEvents(instance, type);
            }
        }
    },
    stopModuleEvents: function(instance, type)
    {
        if (type === 'stop' && typeof instance._eventNodes !== 'undefined')
        {
            for (var z = 0; z < instance._eventNodes.length; z++)
            {
                instance._eventNodes[z].off('.generatedevent');
            }
        }
    },

    // started & stopped
    isStarted: function()
    {
        return this.started;
    },
    isStopped: function()
    {
        return this.stopped;
    },

    // build
    buildServices: function()
    {
        var core = ['options', 'lang', 'utils'];
        var bindable = ['utils', 'opts', 'lang', '$win', '$doc', '$body'];
        for (var name in $K.services)
        {
            if (core.indexOf(name) === -1)
            {
                this[name] = $K.create('service.' + name, this);
                this[name].serviceName = name;
                this.services.push(name);
                bindable.push(name);
            }
        }

        // binding
        for (var i = 0; i < this.services.length; i++)
        {
            var service = this.services[i];
            for (var z = 0; z < bindable.length; z++)
            {
                var inj = bindable[z];
                if (service !== inj)
                {
                    this[service][inj] = this[inj];
                }
            }
        }
    },
    buildModules: function()
    {
        this.$doc.find('[data-kube]').each(function(node, i)
        {
            var $el = $K.dom(node);
            var name = $el.attr('data-kube');
            var id = ($el.attr('id')) ? $el.attr('id') : name + '-' + i;
            id = ($el.attr('data-name')) ? $el.attr('data-name') : id;
            var instance = new Module(this, $el, name, id);
            instance.moduleName = name;

            this.storeModule(instance, name, id);
            this.servicesIndex++;

        }.bind(this));
    },
    storeModule: function(instance, name, id)
    {
        if (instance)
        {
            if (typeof this.module[name] === 'undefined')
            {
                this.module[name] = {};
            }

            this.module[name][id] = instance;
        }
    },

    // messaging
    broadcast: function(name, module)
    {
        var args = [].slice.call(arguments, 2);
        args.unshift(module);

        this.doBroadcast(name, args);

        if (module && typeof module.context !== 'undefined')
        {
            var elementName = module.context.getName();
            var arr = name.split('.');
            this.doBroadcast(arr[0] + '.' + elementName + '.' + arr[1], args);
        }
    },
    doBroadcast: function(name, args)
    {
        for (var moduleName in this.module)
        {
            for (var key in this.module[moduleName])
            {
                var instance = this.module[moduleName][key];
                this.callEventHandler(instance, name, args);
            }
        }
    },
    callEventHandler: function(instance, name, args)
    {
        name = name.replace('-', '');

        var arr = name.split('.');
        if (arr.length === 1)
        {
            if (typeof instance['on' + name] === 'function')
            {
                instance['on' + name].apply(instance, args);
            }
        }
        else
        {
            arr[0] = 'on' + arr[0];
            var func = this.utils.checkProperty(instance, arr);
            if (typeof func === 'function')
            {
                func.apply(instance, args);
            }
        }
    },

    // api
    api: function(name)
    {
        var args = [].slice.call(arguments, 1);
        var arr = name.split('.');
        var method = (arr.length === 3) ? arr[2] : arr[1];
        var id = (arr.length === 3) ? arr[1] : false;

        this.doApi(arr[0], id, method, args);
    },
    doApi: function(moduleName, id, method, args)
    {
        if (typeof this.module[moduleName] === 'undefined') return;
        for (var key in this.module[moduleName])
        {
            if (id === false || id === key)
            {
                var instance = this.module[moduleName][key];
                this.callInstanceMethod(instance, method, args);
            }
        }
    },
    callInstanceMethod: function(instance, method, args)
    {
        if (typeof instance[method] === 'function')
        {
            return instance[method].apply(instance, args);
        }
    }
};