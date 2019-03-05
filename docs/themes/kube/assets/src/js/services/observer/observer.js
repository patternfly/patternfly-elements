$K.add('service', 'observer', {
    init: function(app)
    {
        this.app = app;
        this.opts = app.opts;

        if (this._isObserve())
        {
            this._build();
        }
    },

    // private
    _isObserve: function()
    {
        return (typeof this.opts.observer !== 'undefined' && window.MutationObserver);
    },
    _build: function()
    {
        var self = this;
		var observer = new MutationObserver(function(mutations)
		{
			mutations.forEach(function(mutation)
			{
				var newNodes = mutation.addedNodes;
			    if (newNodes.length === 0 || (newNodes.length === 1 && newNodes.nodeType === 3))
			    {
				    return;
				}

                self._iterate();
			});
		});

		// pass in the target node, as well as the observer options
		observer.observe(document, {
			 subtree: true,
			 childList: true
		});
    },
    _iterate: function()
    {
        var self = this;
        var $nodes = $K.dom('[data-kube]').not('[data-loaded]');
		$nodes.each(function(node, i)
		{
    		var $el = $K.dom(node);
    		var name = $el.attr('data-kube');
            var id = ($el.attr('id')) ? $el.attr('id') : name + '-' + (self.app.servicesIndex + i);
            var instance = new Module(self.app, $el, name, id);

            self.app.storeModule(instance, name, id)
            self.app.callInstanceMethod(instance, 'start');
        });

        // $R
        if (typeof $R !== 'undefined')
        {
            $R('[data-redactor]');
        }
    }
});