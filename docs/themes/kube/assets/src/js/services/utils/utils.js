$K.add('service', 'utils', {
    init: function(app)
    {
        this.app = app;
    },

    // string
    parseOptsString: function(str)
    {
        var properties = str.replace('{', '').replace('}', '').trim().replace(/;$/, '').split(';');
        var obj = {};
        properties.forEach(function(property) {
            var tup = property.split(':');
            obj[tup[0].trim()] = tup[1].trim().replace(/'/g, '');
        });

        return obj;
    },
    ucfirst: function(str)
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // object
    checkProperty: function(obj)
    {
        var args = (arguments[1] && Array.isArray(arguments[1])) ? arguments[1] : [].slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++)
        {
            if (!obj || (typeof obj[args[i]] === 'undefined'))
            {
                return false;
            }

            obj = obj[args[i]];
        }

        return obj;
    },

    // data
    extendData: function(data, elements)
    {
        if (typeof elements === 'object')
        {
            data = $K.extend({}, data, elements);
        }
        else if (typeof elements === 'string')
        {
            var $elms = $K.dom(elements);
            $elms.each(function(node)
            {
                var $node = $K.dom(node);
                if (node.tagName === 'FORM')
                {
                    data = $K.extend({}, data, $node.serialize(true));
                }
                else
                {
                    var name = ($node.attr('name')) ? $node.attr('name') : $node.attr('id');
                    var val = $node.val();
                    data[name] = (this._isNumber(val)) ? parseFloat(val) : this._getBooleanFromStr(val);
                }
            });
        }

        return data;
    },
    _isNumber: function(str)
    {
        return !isNaN(str) && !isNaN(parseFloat(str));
    },
    _getBooleanFromStr: function(str)
    {
        if (str === 'true') return true;
        else if (str === 'false') return false;

        return str;
    }
});