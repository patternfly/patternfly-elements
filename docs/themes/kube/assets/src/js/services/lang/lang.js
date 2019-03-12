$K.add('service', 'lang', {
    init: function(app)
    {
        this.app = app;
        this.opts = app.opts;

        var lang = (this.opts.lang) ? this.opts.lang : 'en';

        // build
        this.vars = this.build(lang);
    },
	build: function(lang)
	{
    	lang = ($K.lang[lang] === undefined) ? 'en' : lang;

        return ($K.lang[lang] !== undefined) ? $K.lang[lang] : [];
	},
    rebuild: function(lang)
    {
        this.opts.lang = lang;
        this.vars = this.build(lang);
    },
    extend: function(obj)
    {
        this.vars = $K.extend(this.vars, obj);
    },
    parse: function(str)
    {
        if (str === undefined)
        {
            return '';
        }

        var matches = str.match(/## (.*?) ##/g);
        if (matches)
        {
            for (var i = 0; i < matches.length; i++)
            {
                var key = matches[i].replace(/^##\s/g, '').replace(/\s##$/g, '');
                str = str.replace(matches[i], this.get(key));
            }
        }

        return str;
    },
	get: function(name)
	{
		return (typeof this.vars[name] !== 'undefined') ? this.vars[name] : '';
	}
});