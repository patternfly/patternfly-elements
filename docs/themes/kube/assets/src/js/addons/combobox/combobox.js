(function($K)
{
    $K.add('module', 'combobox', {
        init: function(app, context)
        {
            this.app = app;
            this.$win = app.$win;

            // defaults
            var defaults = {
                placeholder: ''
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
    	},
    	start: function()
    	{
        	this._buildSource();
        	this._buildCaret();
        	this._buildEvent();
    	},
    	stop: function()
    	{
        	this.$sourceBox.after(this.$element);
        	this.$sourceBox.remove();

        	this.$element.off('.kube.combobox');
        	this.$win.off('.kube.combobox');
    	},

    	// private
    	_buildSource: function()
    	{
        	this.$sourceBox = $K.dom('<div>');
        	this.$sourceBox.addClass('combobox');

        	this.$source = $K.dom('<input>');
        	this.$source.attr('type', 'text');
        	this.$source.attr('placeholder', this.params.placeholder);

            this.$sourceBox.width(this.$element.width());
            this.$sourceBox.append(this.$source);

        	this.$element.after(this.$sourceBox);
        	this.$element.attr('class', '');
        	this.$element.attr('style', '');
        	this.$sourceBox.append(this.$element);

        	this.$win.on('resize.kube.combobox', this._resize.bind(this));
    	},
        _buildCaret: function()
        {
            this.$sourceCaret = $K.dom('<span>');
            this.$sourceCaret.addClass('combobox-caret');

            this.$sourceBox.append(this.$sourceCaret);
        },
        _buildEvent: function()
        {
            this.$element.on('change.kube.combobox', this._select.bind(this));
            this.$source.on('keyup.kube.combobox', this._type.bind(this));
        },
        _resize: function()
        {
            this.$sourceBox.width(this.$element.width());
        },
        _type: function(e)
        {
            var value = this.$source.val();

            this.app.broadcast('combobox.set', this, value);

            if (this.$sourceValue) this.$sourceValue.remove();
            if (value.trim() === '') return;

            this.$sourceValue = $K.dom('<option>');
            this.$sourceValue.attr('value', value);
            this.$sourceValue.attr('selected', true);
            this.$sourceValue.text(value);
            this.$sourceValue.addClass('is-hidden');

            this.$element.append(this.$sourceValue);
        },
        _select: function(e)
        {
            var el = e.target;
            var value = el.options[el.selectedIndex].text;

            if (this.$sourceValue) this.$sourceValue.remove();
            this.$source.val(value);

            this.app.broadcast('combobox.set', this, value);
        }
    });
})(Kube);