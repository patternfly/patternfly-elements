var KubeElement = function(app, $el, moduleName)
{
    this.app = app;
    this.utils = app.utils;
    this.parse($el);
};

KubeElement.prototype = {
    isOpened: function()
    {
        return !this.isClosed();
    },
    isClosed: function()
    {
        return (this.hasClass('is-hidden') || this.css('display') === 'none');
    }
};

$K.inherit(KubeElement, Dom);