(function($K)
{
    $K.add('module', 'validate', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;
            this.progress = app.progress;
            this.response = app.response;

            // defaults
            var defaults = {
                errorClass: 'is-error',
                send: true,
                trigger: false,
                shortcut: false,
                progress: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },
        // public
        start: function()
        {
            this._disableDefaultValidation();
    		this._enableShortcut();

    		if (this.params.trigger)
    		{
        		this._startTrigger();
            }
            else
            {
        		this._startSubmit();
            }
    	},
        stop: function()
        {
    		this.enableButtons();
    		this.clear();

    		this.$element.off('.kube.validate');
    		this.$win.off('.kube.validate');

    		if (this.$trigger) this.$trigger.off('.');
        },
    	clear: function()
    	{
    		this.$element.find('.' + this.params.errorClass).each(this._clearError.bind(this));
    	},
    	disableButtons: function()
    	{
    		this.$element.find('button').attr('disabled', true);
    	},
    	enableButtons: function()
    	{
    		this.$element.find('button').removeAttr('disabled');
    	},

        // private
        _build: function(e)
        {
            e.preventDefault();

    		if (this.params.send) this._send();
            else this.app.broadcast('validate.send', this);

            return false;
        },
        _send: function()
        {
    		if (this.params.progress)
    		{
        		this.progress.show();
            }

    		this.disableButtons();
            this._saveCodeMirror();

    		this.app.broadcast('validate.send', this);

    		$K.ajax.post({
    			url: this.$element.attr('action'),
    			data: this.$element.serialize(),
    			success: this._parse.bind(this)
    		});

    		return false;
        },
        _parse: function(data)
        {
    		this.enableButtons();
    		this.clear();

    		if (this.params.progress)
    		{
                this.progress.hide();
    		}

            var json = this.response.parse(data);
            if (!json)
            {
                this.app.broadcast('validate.error', this, json);
            }
    		else if (typeof json.type !== 'undefined' && json.type === 'error')
    		{
    			this._setErrors(json.errors);
    			this.app.broadcast('validate.error', this, json.errors);
    		}
    		else
    		{
    			this.app.broadcast('validate.success', this, json);
    		}
        },
    	_setErrors: function(errors)
    	{
        	for (var name in errors)
        	{
                var text = errors[name];
                var $el = this.$element.find('[name=' + name + ']');
            	if ($el.length !== 0)
                {
        			$el.addClass(this.params.errorClass);
                    this._setFieldEvent($el, name);

        			if (text !== '')
        			{
            			this._showErrorText(name, text);
        			}
    			}
            }
    	},
    	_setFieldEvent: function($el, name)
    	{
        	var eventName = this._getFieldEventName($el);
    		$el.on(eventName + '.kube.validate', function()
    		{
        		this._clearError($el);
    		}.bind(this));
    	},
    	_showErrorText: function(name, text)
    	{
        	var $el = this.$element.find('#' + name + '-validation-error');
        	$el.addClass(this.params.errorClass);
        	$el.html(text);
        	$el.removeClass('is-hidden');
    	},
        _getFieldEventName: function($el)
        {
    		return ($el.get().tagName === 'SELECT' || $el.attr('type') === 'checkbox' || $el.attr('type') === 'radio') ? 'change' : 'keyup';
        },
    	_clearError: function(node)
    	{
        	var $el = $K.dom(node);
            var $errorEl = this.$element.find('#' + $el.attr('name') + '-validation-error');

    		$errorEl.removeClass(this.params.errorClass);
    		$errorEl.html('');
    		$errorEl.addClass('is-hidden');

    		$el.removeClass(this.params.errorClass).off('.kube.validate');
    	},
    	_saveCodeMirror: function()
    	{
            $K.dom('.CodeMirror').each(function(node)
    		{
    			node.CodeMirror.save();
    		});
    	},
    	_disableDefaultValidation: function()
    	{
    		this.$element.attr('novalidate', 'novalidate');
    	},
    	_enableShortcut: function()
    	{
    		if (!this.params.shortcut) return;

        	// ctrl + s or cmd + s
    		this.$win.on('keydown.kube.validate', this._handleShortcut.bind(this));
    	},
    	_handleShortcut: function(e)
    	{
    		if (((e.ctrlKey || e.metaKey) && e.which === 83))
    		{
    			e.preventDefault();
    			return this._send();
    		}

    		return true;
    	},
    	_startTrigger: function()
    	{
        	this.$trigger = $(this.opts.trigger);

    		this.$element.on('submit', function() { return false; });
    		this.$trigger.off('.kube.validate');
    		this.$trigger.on('click.kube.validate', this._build.bind(this));
    	},
    	_startSubmit: function()
    	{
    		this.$element.on('submit.kube.validate', this._build.bind(this));
    	}
    });
})(Kube);