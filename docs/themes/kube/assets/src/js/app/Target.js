var Target = function(app, selector, moduleName)
{
    this.app = app;
    this.utils = app.utils;
    this.parse(selector);
};

Target.prototype = {
    isOpened: function()
    {
        return !this.isClosed();
    },
    isClosed: function()
    {
        var self = this;
        var count = 0;
        var len = this.length;
        this.each(function(node)
        {
            var $node = $K.dom(node);
            if ($node.hasClass('is-hidden') || $node.css('display') === 'none')
            {
                count++;
            }
        });

        return (count === len);
    }
};

$K.inherit(Target, Dom);