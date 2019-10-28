$K.add('service', 'response', {
    init: function(app)
    {
        this.app = app;
    },
    // public
    parse: function(str)
    {
    	if (str === '') return false;

		var obj = (typeof str === 'object') ? str : JSON.parse(str);
		if (obj[0] !== undefined)
		{
			for (var item in obj)
			{
				this._parseItem(obj[item]);
			}
		}
		else
		{
			this._parseItem(obj);
		}

		return obj;
    },
    // private
	_parseItem: function(item)
	{
		if (item.type === 'location')
		{
			top.location.href = item.data;
		}
		else if (item.type === 'message')
		{
			this.message.show(item.data);
		}
		else
		{
    		for (var key in item.data)
    		{
        		var val = item.data[key];
        		var $el = $K.dom(key);

        		if (item.type === 'value')
        		{
        			val = (val === null || val === false) ? 0 : val;
        			val = (val === true) ? 1 : val;

    				$el.val(val);
				}
				else if (item.type === 'html')
                {
                    val = (val === null || val === false) ? '' : val;

    				$el.html(this._stripslashes(val));
				}
        		else if (item.type === 'addClass')
        		{
            		$el.addClass(val);
                }
        		else if (item.type === 'removeClass')
        		{
            		$el.removeClass(val);
                }
        		else if (item.type === 'show')
        		{
            		$el.removeClass('is-hidden');
        		}
        		else if (item.type === 'hide')
        		{
            		$el.addClass('is-hidden');
        		}
        		else if (item.type === 'animate')
        		{
                    this.animate.run($el, val);
        		}
			}
        }

		return item;
	},
    _stripslashes: function(str)
	{
		return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
    }
});