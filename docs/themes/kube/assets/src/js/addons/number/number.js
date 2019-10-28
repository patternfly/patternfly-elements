(function($K)
{
    $K.add('module', 'number', {
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
            this.$input = this.$element.find('input[type="number"]');
            this.$btnUp = this.$element.find('.is-up');
            this.$btnDown = this.$element.find('.is-down');

            this._buildStep();
            this._buildMin();
            this._buildMax();

            if (!this._isDisabled())
            {
                this.$btnUp.on('click.kube.number', this._increase.bind(this));
                this.$btnDown.on('click.kube.number', this._decrease.bind(this));
            }
    	},
    	stop: function()
    	{
            this.$btnUp.off('.kube.number');
            this.$btnDown.off('.kube.number');
    	},
    	// private
    	_buildStep: function()
    	{
            var step = this.$input.attr('step');
            this.step = (step) ? parseFloat(step) : 1;
    	},
    	_buildMin: function()
    	{
            var min = this.$input.attr('min');
            this.min = (min) ? parseFloat(min) : false;
    	},
    	_buildMax: function()
    	{
            var max = this.$input.attr('max');
            this.max = (max) ? parseFloat(max) : false;
    	},
    	_isDisabled: function()
    	{
        	return this.$input.attr('disabled');
    	},
    	_getValue: function()
    	{
        	var value = parseFloat(this.$input.val());
        	var min = (this.min === false) ? 0 : this.min;

        	return (isNaN(value)) ? min : value;
    	},
    	_increase: function(e)
    	{
        	if (e)
        	{
            	e.preventDefault();
            	e.stopPropagation();
        	}

            var oldValue = this._getValue();
            var newVal = (this.max !== false && oldValue >= this.max) ? oldValue : oldValue + this.step;

            this.$input.val(newVal);
        },
        _decrease: function(e)
        {
        	if (e)
        	{
            	e.preventDefault();
            	e.stopPropagation();
        	}

            var oldValue = this._getValue();
            var newVal = (this.min !== false && oldValue <= this.min) ? oldValue : oldValue - this.step;

            this.$input.val(newVal);
    	}
    });
})(Kube);