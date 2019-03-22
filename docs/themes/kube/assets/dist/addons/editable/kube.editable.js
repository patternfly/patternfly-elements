(function($K)
{
    $K.add('module', 'editable', {
        init: function(app, context)
        {
            this.app = app;

            // defaults
            var defaults = {
                classname: 'editable',
                focus: false
            };

            // context
            this.context = context;
            this.params = context.getParams(defaults);
            this.$element = context.getElement();
        },

        // public
        start: function()
        {
            this.$element.addClass(this.params.classname).attr('contenteditable', true);

            this._setFocus();
            this._setEvents();
    	},
    	stop: function()
    	{
            this.$element.removeClass(this.params.classname).removeAttr('contenteditable');
            this.$element.off('.kube.editable');
    	},
    	// private
    	_setEvents: function()
    	{
            this.$element.on('keydown.kube.editable', this._keydown.bind(this));
            this.$element.on('paste.kube.editable', this._paste.bind(this));
            this.$element.on('blur.kube.editable', this._blur.bind(this));
    	},
    	_setFocus: function()
    	{
            if (this.params.focus) this.$element.focus();
    	},
    	_checkEmpty: function()
    	{
            if (!this.$element.text().replace(" ", "").length)
            {
                this.$element.empty();
            }
    	},
    	_paste: function(e)
    	{
            e.preventDefault();

            var event = (e.originalEvent || e);

            var text = '';
            if (event.clipboardData)
            {
                text = event.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
            }
            else if (window.clipboardData)
            {
                text = window.clipboardData.getData('Text');
                document.selection.createRange().pasteHTML(text);
            }
    	},
    	_blur: function(e)
    	{
            this._checkEmpty();
    	},
    	_keydown: function(e)
    	{
        	// disable enter key
        	if (e.which === 13) e.preventDefault();
    	}
    });
})(Kube);