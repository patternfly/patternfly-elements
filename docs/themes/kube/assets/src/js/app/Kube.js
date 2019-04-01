// Init
var $K = {};
$K.app = false;
$K.init = function(options)
{
    return new KubeApp(options, [].slice.call(arguments, 1));
};

// Globals
$K.version = '7.1.1';
$K.options = {};
$K.modules = {};
$K.services = {};
$K.classes = {};
$K.mixins = {};
$K.lang = {};
$K.dom = function(selector, context) { return new Dom(selector, context); };
$K.ajax = Ajax;
$K.Dom = Dom;
$K.ready = Dom.ready;
$K.env = {
    'module': 'modules',
    'service': 'services',
    'class': 'classes',
    'mixin': 'mixins'
};

// Class
var KubeApp = function(options, args)
{
    return ($K.app = new App(options));
};

// get
$K.getApp = function()
{
    return ($K.app) ? $K.app : $K.init();
};

// api
$K.api = function(name)
{
    var app = $K.getApp();
    var args = [].slice.call(arguments, 1);
    args.unshift(name);
    app.api.apply(app, args);
};

// add
$K.add = function(type, name, obj)
{
    if (typeof $K.env[type] === 'undefined') return;

    // translations
    if (obj.translations)
    {
        $K.lang = $K.extend(true, {}, $K.lang, obj.translations);
    }

    // inherits
    if (type === 'mixin')
    {
        $K[$K.env[type]][name] = obj;
    }
    else
    {
        // prototype
        var F = function() {};
        F.prototype = obj;

        // mixing
        if (obj.mixing)
        {
            for (var i = 0; i < obj.mixing.length; i++)
            {
                $K.inherit(F, $K.mixins[obj.mixing[i]]);
            }
        }

        $K[$K.env[type]][name] = F;
    }
};

// add lang
$K.addLang = function(lang, obj)
{
    if (typeof $K.lang[lang] === 'undefined')
    {
        $K.lang[lang] = {};
    }

    $K.lang[lang] = $K.extend($K.lang[lang], obj);
};

// create
$K.create = function(name)
{
    var arr = name.split('.');
    var args = [].slice.call(arguments, 1);

    var type = 'classes'
    if (typeof $K.env[arr[0]] !== 'undefined')
    {
        type = $K.env[arr[0]];
        name = arr.slice(1).join('.');
    }

    // construct
    var instance = new $K[type][name]();

    // init
    if (instance.init)
    {
        var res = instance.init.apply(instance, args);

        return (res) ? res : instance;
    }

    return instance;
};

// inherit
$K.inherit = function(current, parent)
{
    parent = parent.prototype || parent;

    var F = function () {};
    F.prototype = parent;
    var f = new F();

    for (var prop in current.prototype)
    {
        if (current.prototype.__lookupGetter__(prop)) f.__defineGetter__(prop, current.prototype.__lookupGetter__(prop));
        else f[prop] = current.prototype[prop];
    }

    current.prototype = f;
    current.prototype.super = parent;

    return current;
};

// error
$K.error = function (exception)
{
    throw exception;
};

// extend
$K.extend = function()
{
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    if (Object.prototype.toString.call( arguments[0] ) === '[object Boolean]')
    {
        deep = arguments[0];
        i++;
    }

    var merge = function(obj)
    {
        for (var prop in obj)
        {
            if (Object.prototype.hasOwnProperty.call(obj, prop))
            {
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') extended[prop] = $K.extend(true, extended[prop], obj[prop]);
                else extended[prop] = obj[prop];
            }
        }
    };

    for (; i < length; i++ )
    {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;
};