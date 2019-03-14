(function($K)
{
    $K.add('module', 'check', {
        init: function(app, context)
        {
            this.app = app;

            // defaults
            var defaults = {
                target: false,
                classname: 'ch'
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
            this.$target = context.getTarget();

        },
        // events
        onclick: function(e, element, type)
        {
            if (type === 'all')
            {
                this._toggleAll();
            }
        },

        // public
        start: function()
        {
            this.$checkall = this.$element.find('[data-type=all]');

            this.$checkboxes = this.$element.find('.' + this.params.classname);
            this.$checkboxes.on('click.kube.check', this._toggle.bind(this));

            this._buildChecked();
        },
        stop: function()
        {
            this.$checkboxes.off('.kube.check');
            this.$target.val('');
    	},

    	// private
    	_buildChecked: function()
    	{
        	if (!this.params.target) return;

            var arr = this.$target.val().split(',');
            this.$checkboxes.each(function(node)
        	{
            	if (arr.indexOf(node.value) !== -1)
            	{
                	node.checked = true;
            	}
            });

            this.$checkall.attr('checked', this._isCheckedAll());
    	},
    	_setTarget: function()
    	{
        	if (!this.params.target) return;

        	var arr = [];
        	this.$checkboxes.each(function(node)
        	{
            	if (node.checked)
            	{
                	arr.push(node.value);
            	}
        	});

        	var value = (arr.length === 0) ? '' : arr.join(',');

            this.$target.val(value);
            this.app.broadcast('check.set', this, this.$target);
    	},
    	_isCheckedAll: function()
    	{
        	var count = 0;
        	var len = this.$checkboxes.length;

        	this.$checkboxes.each(function(node)
        	{
            	if (node.checked)
            	{
                	count++;
            	}
        	});

        	return (len === count);
    	},
    	_toggleAll: function(element)
    	{
            var isChecked = this.$checkall.attr('checked');
            this.$checkboxes.attr('checked', isChecked);
        	this._setTarget();
    	},
    	_toggle: function()
    	{
        	this.$checkall.attr('checked', this._isCheckedAll());
        	this._setTarget();
    	}
    });
})(Kube);