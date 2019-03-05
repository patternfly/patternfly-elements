(function($K)
{
    $K.add('module', 'tabs', {
        init: function(app, context)
        {
            this.app = app;
            this.$body = app.$body;

            // defaults
            var defaults = {
                equal: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();

            // local
            this.$boxes = $K.dom([]);
            this.$tabActive = false;
            this.$boxActive = false;
        },
        start: function()
        {
            this._buildControls();
            this._buildBoxes();
            this._setEqualBoxes();

            this._open();
        },
        stop: function()
        {
            this.$tabsControls.off('.kube.tabs');
        },
        // api
        getActiveTab: function()
        {
            return this.$tabActive;
        },
        getActiveBox: function()
        {
            return this.$boxActive;
        },
        // private
        _toggle: function(e)
        {
            if (e)
            {
                e.stopPropagation();
                e.preventDefault();
            }

            var $tab = $K.dom(e.target);
            var $box = this._getBox($tab);

            if ($tab.hasClass('is-active')) return;

            this._open($tab);
            this.app.broadcast('tabs.opened', this);
        },
        _buildControls: function()
        {
            this.$tabsControls = this.$element.find('a');
            this.$tabsControls.on('click.kube.tabs', this._toggle.bind(this));
        },
        _buildBoxes: function()
        {
            this.$tabsControls.each(function(node, i)
            {
                var $tab = $K.dom(node);
                var $box = this._getBox($tab);

                this.$boxes.add($box);

                if (i === 0) this.$tabActive = $tab;
                if ($tab.hasClass('is-active')) this.$tabActive = $tab;

            }.bind(this));
        },
        _open: function($tab)
        {
            this.$tabActive = ($tab) ? $tab : this.$tabActive;

            this.$tabsControls.removeClass('is-active');
            this.$tabActive.addClass('is-active');
            this.$boxActive = this._getBox(this.$tabActive);

            this.$boxes.addClass('is-hidden').removeClass('is-open');
            this.$boxActive.removeClass('is-hidden').addClass('is-open');
        },
        _getBox: function($tab)
        {
            return $K.dom($tab.attr('href'));
        },
        _setEqualBoxes: function()
    	{
        	if (!this.params.equal) return;

    		var minHeight = this._getItemMaxHeight() + 'px';

	    	this.$boxes.css('min-height', minHeight);
    	},
    	_getItemMaxHeight: function()
    	{
    		var max = 0;
    		this.$boxes.each(function(node)
    		{
        		var $node = $K.dom(node);
    			var h = $node.height();
    			max = (h > max) ? h : max;
    		});

    		return max;
    	}
    });
})(Kube);