var Module = function(app, $el, name, id)
{
    this.app = app;

    // local
    this.eventTypes = ['click', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove',
                       'keydown', 'keyup', 'submit', 'change', 'contextmenu', 'input'];

    // build
    return this.build($el, name, id);
};

Module.prototype = {
    build: function($el, name, id)
    {
        var instance = $el.dataget('kube-instance-' + name);
        if (!instance && typeof $K.modules[name] !== 'undefined')
        {
            var context = new Context(this.app, $el, name, id);
            var $target = context.getTarget();

            instance = $K.create('module.' + name, this.app, context);

            $el.dataset('kube-instance-' + name, instance);
            $el.attr('data-loaded', true);

            // delegate events
            this._delegateModuleEvents(instance, $el, name);

            // delegate commands
            this._delegateModuleCommands(instance, $el, name);

            if ($target.is())
            {
                this._delegateModuleCommands(instance, $target, name);
            }
        }

        return instance;
    },

    _delegateModuleCommands: function(instance, $el, name)
    {
        $el.find('[data-command]').each(function(node)
        {
            var scope = node.getAttribute('data-scope');
            if (!scope || scope === name)
            {
                this._delegateCommand(instance, name, node, node.getAttribute('data-command'));
            }

        }.bind(this));
    },
    _delegateCommand: function(instance, name, node, command)
    {
        var self = this;
        var $node = $K.dom(node);
        $node.on('click.generatedcommand', function(e)
        {
            e.preventDefault();

            var args = $node.data();
            self.app.broadcast(name + '.' + command, instance, $node, args);
        });
    },

    _delegateModuleEvents: function(instance, $el, name)
    {
        $el.find('[data-type]').each(function(node)
        {
            var scope = node.getAttribute('data-scope');
            if (!scope || scope === name)
            {
                this._delegateEvent(instance, name, node, node.getAttribute('data-type'));
            }

        }.bind(this));
    },
    _delegateEvent: function(instance, name, node, type)
    {
        if (typeof instance._eventNodes === 'undefined')
        {
            instance._eventNodes = [];
        }

        var $node = $K.dom(node);
        var callback = function(e, eventType, element, type, args)
        {
            return instance['on' + eventType].call(instance, e, element, type, args);
        };

        instance._eventNodes.push($node);

        for (var i = 0; i < this.eventTypes.length; i++)
        {
            var event = 'on' + this.eventTypes[i];
            if (typeof instance[event] === 'function')
            {
                $node.on(this.eventTypes[i] + '.generatedevent', function(e)
                {
                    var args = $node.data();
                    callback(e, e.type, this, type, args);
                });
            }
        }
    }
};