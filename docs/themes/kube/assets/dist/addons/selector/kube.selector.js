(function($K)
{
    $K.add('module', 'selector', {
        init: function(app, context)
        {
            this.app = app;

            // context
            this.context = context;
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$selector = this._buildSelector();
            this.$selector.on('change.kube.selector', this._toggle.bind(this));
        },
        stop: function()
        {
            this.$selector.off('.kube.selector');
    	},

    	// private
    	_isSelect: function()
    	{
        	return (this.$element.get().tagName === 'SELECT');
    	},
    	_isHashValue: function(value)
    	{
            return (value.search(/^#/) === 0);
    	},
    	_buildSelector: function()
    	{
            return (this._isSelect()) ? this.$element : this.$element.find('input[type="radio"]');
    	},
    	_getValue: function()
    	{
        	return (this._isSelect()) ? this.$selector.val() : this.$selector.filter(':checked').val();
    	},
    	_getBoxes: function()
    	{
        	var $boxes = $K.dom([]);
            var $targets = (this._isSelect()) ? this.$selector.find('option') : this.$selector;

            $targets.each(function(node)
            {
                if (this._isHashValue(node.value))
                {
                    $boxes.add($K.dom(node.value));
                }

            }.bind(this));

            return $boxes;
    	},
    	_toggle: function()
    	{
            var value = this._getValue();
            var $boxes = this._getBoxes();
            var $box = $K.dom(value);

            $boxes.addClass('is-hidden');
            $box.removeClass('is-hidden');

            this.app.broadcast('selector.opened', this, $box);
    	}
    });
})(Kube);