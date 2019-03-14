$K.add('service', 'options', {
    init: function(app, type, opts)
    {
        this.app = app;
        this.utils = app.utils;

        return (type === 'global') ? this._build(opts) : this._buildElement(opts);
    },
    _build: function(opts)
    {
        return (opts) ? this._extendFromElements(opts) : {};
    },
    _buildElement: function($el)
    {
		return $K.extend(
			{},
			$el.data()
		);
    },
    _extendFromElements: function(options)
    {
        return (options.hasOwnProperty('append')) ? this.utils.extendData(options, options['append']) : options;
    }
});