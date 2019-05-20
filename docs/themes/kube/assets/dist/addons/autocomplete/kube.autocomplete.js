(function($K)
{
    $K.add('module', 'autocomplete', {
        init: function(app, context)
        {
            this.app = app;
            this.$doc = app.$doc;
            this.$win = app.$win;
            this.$body = app.$body;
            this.animate = app.animate;

            // defaults
            var defaults = {
        		url: false,
        		min: 2,
        		labelClass: false,
        		target: false,
        		param: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();
        },
        start: function()
        {
            this._build();

    		this.timeout = null;
    		this.$element.on('keyup.kube.autocomplete', this._open.bind(this));
    	},
    	stop: function()
    	{
    		this.$box.remove();

            this.$element.off('.kube.autocomplete');
    		this.$doc.off('.kube.autocomplete');
    		this.$win.off('.kube.autocomplete');
    	},

    	// private
    	_build: function()
    	{
            this.$box = $K.dom('<div />');
            this.$box.addClass('autocomplete');
            this.$box.addClass('is-hidden');

            this.$body.append(this.$box);

            if (this.$target && !this._isInputTarget())
            {
                this.$target.addClass('autocomplete-labels');

                var $closes = this.$target.find('.close');
                $closes.on('click', this._removeLabel.bind(this));
            }
    	},
    	_open: function(e)
    	{
    		if (e) e.preventDefault();

    		clearTimeout(this.timeout);

    		var value = this.$element.val();
    		if (value.length >= this.params.min)
    		{
        		this._resize();
        		this.$win.on('resize.kube.autocomplete', this._resize.bind(this));
        		this.$doc.on('click.kube.autocomplete', this._close.bind(this));

    			this.$box.addClass('is-open');
    			this._listen(e);
    		}
    		else
    		{
    			this._close(e);
    		}
    	},
    	_close: function(e)
    	{
    		if (e) e.preventDefault();

    		this.$box.removeClass('is-open');
    		this.$box.addClass('is-hidden');

    		this.$doc.off('.kube.autocomplete');
    		this.$win.off('.kube.autocomplete');
        },
    	_getPlacement: function(pos, height)
    	{
            return ((this.$doc.height() - (pos.top + height)) < this.$box.height()) ? 'top' : 'bottom';
    	},
    	_resize: function()
    	{
        	this.$box.width(this.$element.width());
    	},
    	_getParamName: function()
    	{
            return (this.params.param) ? this.params.param : this.$element.attr('name');
    	},
    	_getTargetName: function()
    	{
        	var name = this.$target.attr('data-name');

            return (name) ? name : this.$target.attr('id');
    	},
    	_lookup: function()
    	{
    		var data = this._getParamName() + '=' + this.$element.val();

    		$K.ajax.post({
    			url: this.params.url,
    			data: data,
    			success: this._complete.bind(this)
    		});
    	},
    	_complete: function(json)
    	{
			this.$box.html('');

			if (json.length === 0) return this._close();

			for (var i = 0; i < json.length; i++)
			{
				var $item = $K.dom('<a>');
				$item.attr('href', '#');
				$item.attr('rel', json[i].id);

				$item.html(json[i].name);
				$item.on('click', this._set.bind(this));

				this.$box.append($item);
			}

            var pos = this.$element.offset();
			var height = this.$element.height();
			var width = this.$element.width();
    		var placement = this._getPlacement(pos, height);
			var top = (placement === 'top') ? (pos.top - this.$box.height() - height) : (pos.top + height);

			this.$box.css({ width: width + 'px', top: top + 'px', left: pos.left + 'px' });
			this.$box.removeClass('is-hidden');
    	},
    	_listen: function(e)
    	{
    		switch(e.which)
    		{
    			case 40: // down
    				e.preventDefault();
    				this._select('next');
    			break;

    			case 38: // up
    				e.preventDefault();
    				this._select('prev');
    			break;

    			case 13: // enter
    				e.preventDefault();
    				this._set();
    			break;

    			case 27: // esc
    				this._close(e);
    			break;

    			default:
    				this.timeout = setTimeout(this._lookup.bind(this), 300);
    			break;
    		}
    	},
    	_select: function(type)
    	{
    		var $links = this.$box.find('a');
    		var $active = this.$box.find('.is-active');

    		$links.removeClass('is-active');

            var $item = this._selectItem($active, $links, type);
    		$item.addClass('is-active');
    	},
    	_selectItem: function($active, $links, type)
    	{
        	var $item;
        	var isActive = ($active.length !== 0);
        	var size = (type === 'next') ? 0 : ($links.length - 1);

            if (isActive)
            {
                $item = $active[type]();
            }

            if (!isActive || !$item || $item.length === 0)
            {
                $item = $links.eq(size);
            }

            return $item;
    	},
    	_set: function(e)
    	{
    		var $active = this.$box.find('.is-active');

    		if (e)
    		{
    			e.preventDefault();
    			$active = $K.dom(e.target);
    		}

    		var id = $active.attr('rel');
            var value = $active.html();

            if (this.$target.length !== 0)
            {
                if (this._isInputTarget())
                {
                    this.$target.val(value);
                }
                else
                {
                    var $added = this.$target.find('[data-id="' + id + '"]');
                    if ($added.length === 0)
                    {
                        this._addLabel(id, value);
                    }
        		}

        		this.$element.val('');
    		}
    		else
    		{
        	    this.$element.val(value);
    		}

            this.$element.focus();

    		this.app.broadcast('autocomplete.set', this, value);
    		this._close();
    	},
    	_addLabel: function(id, name)
    	{
            var $label = $K.dom('<span>');
            $label.addClass('label');
            $label.attr('data-id', id);
            $label.text(name + ' ');

            if (this.params.labelClass)
            {
                $label.addClass(this.params.labelClass);
            }

            var $close = $K.dom('<span>');
            $close.addClass('close');
            $close.on('click', this._removeLabel.bind(this));

            var $input = $K.dom('<input>');
            $input.attr('type', 'hidden');
            $input.attr('name', this._getTargetName() + '[]');
            $input.val(name);

            $label.append($close);
            $label.append($input);

            this.$target.append($label);
    	},
    	_isInputTarget: function()
    	{
            return (this.$target.get().tagName === 'INPUT');
    	},
    	_removeLabel: function(e)
    	{
        	e.preventDefault();

        	var $el = $K.dom(e.target);
        	var $label = $el.closest('.label');

        	this.animate.run($label, 'fadeOut', function()
        	{
            	$label.remove();
        	}.bind(this))
    	}
    });
})(Kube);