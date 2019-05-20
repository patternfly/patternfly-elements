(function($K)
{
    $K.add('class', 'datepicker.grid', {
        mixing: ['dom'],
        init: function(app, datepicker)
        {
            this.app = app;
            this.lang = app.lang;
            this.datepicker = datepicker;
            this.params = datepicker.params;
            this.namespace = datepicker.namespace;
            this.today = datepicker.today;
            this.selected = datepicker.selected;
            this.current = datepicker.current;
            this.prev = datepicker.prev;
            this.next = datepicker.next;

            // local
            this.daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        },
        build: function()
        {
            this.parse('<div class="datepicker-grid">');

            var daysInCurrentMonth = this._getDaysInCurrentMonth();
    		var daysInPrevMonth = this._getDaysInPrevMonth();
    		var daysInNextMonth = this._getDaysInNextMonth();

    		// start index
    		var d = new Date(this.current.year, this.current.month - 1, 1);
    		var startIndex = (this.params.sundayFirst) ? d.getDay() + 1 : ((!d.getDay()) ? 7 : d.getDay());

    		var daysPrevMonthStart = daysInPrevMonth - startIndex + 2;
    		var startCurrent = 8 - startIndex;

            var y = 1, c = 1, obj;
    		for (var z = 0; z < 6; z++)
    		{
    			var tr = $K.dom('<div class="datepicker-row">');

    			for (var i = 0; i < 7; i++)
    			{
    				if (z === 0)
    				{
    					var dayPrev = daysPrevMonthStart + i;
    					if (dayPrev > daysInPrevMonth)
    					{

    						// current day
    						obj = this._buildGridObj(i, y, this.current, false, false);
    						y++;
    					}
    					else
    					{
    						// prev day
    						obj = this._buildGridObj(i, dayPrev, this.prev, false, true);
    					}
    				}
    				else if (y > daysInCurrentMonth)
    				{
    					// next day
    					obj = this._buildGridObj(i, c, this.next, true, false);
    					c++;

    				}
    				else
    				{
    					// current day
    					obj = this._buildGridObj(i, y, this.current, false, false);
    					y++;
    				}

    				tr.append(this._buildGridDay(obj));
    			}

    			this.append(tr);
    		}
        },

        // private
    	_buildGridObj: function(i, day, date, next, prev)
    	{
            return {
				day: day,
				next: next,
				prev: prev,
				year: date.year,
				month: date.month,
				date: this._getGridDay(date.year, date.month, day),
				selected: this._isSelectedDate(date.year, date.month, day),
				today: this._isTodayDate(date.year, date.month, day),
				weekend: (i > 4),
				disabled: this._isDisabledDate(date.year, date.month, day)
			};
    	},
    	_buildGridDay: function(obj)
    	{
    		var td = $K.dom('<div class="datepicker-cell">');

    		if (obj.next || obj.prev)
    		{
    			td.addClass('is-out');
    		}

    		if (obj.selected) td.addClass('is-selected');
    		if (obj.today) td.addClass('is-today');
    		if (obj.weekend && this.params.weekend) td.addClass('is-weekend');
    		if (obj.disabled) td.addClass('is-disabled');

    		var $item = $K.dom('<a>');

    		$item.html(obj.day);
            $item.attr('href', '#');

            $item.attr('data-disabled', obj.disabled);
            $item.attr('data-date', obj.date);
            $item.attr('data-day', obj.day);
            $item.attr('data-month', obj.month);
            $item.attr('data-year', obj.year);

    		$item.on('click', this.datepicker.setDate.bind(this.datepicker));

    		return td.append($item);

    	},
    	_isSelectedDate: function(year, month, day)
    	{
    		return (this.selected.year === year && this.selected.month === month && this.selected.day === day);
    	},
    	_isTodayDate: function(year, month, day)
    	{
    		return (this.today.year === year && this.today.month === month && this.today.day === day);
    	},
    	_isDisabledDate: function(year, month, day)
    	{
    		var date = new Date(year + '/' + month + '/' + day);

    		if (this.params.startDate)
    		{
    			var dateStart = new Date(this.params.startDate.year + '/' + this.params.startDate.month + '/' + this.params.startDate.day);
    			if (date.getTime() < dateStart.getTime())
    			{
    				return true;
    			}
    		}

    		if (this.params.endDate)
    		{
    			var dateEnd = new Date(this.params.endDate.year + '/' + this.params.endDate.month + '/' + this.params.endDate.day);
    			if (date.getTime() > dateEnd.getTime())
    			{
    				return true;
    			}
    		}

    		return false;
    	},
    	_getGridDay: function(year, month, day)
    	{
    		return year + '-' + month + '-' + day;
    	},
    	_getDaysInCurrentMonth: function()
    	{
    		return this._getDaysInMonth(this.current.year, this.current.month);
    	},
    	_getDaysInPrevMonth: function()
    	{
    		return this._getDaysInMonth(this.prev.year, this.prev.month);
    	},
    	_getDaysInNextMonth: function()
    	{
    		return this._getDaysInMonth(this.next.year, this.next.month);
    	},
    	_getDaysInMonth: function (year, month)
    	{
    		return (((0 === (year%4)) && ((0 !== (year%100)) || (0 === (year%400)))) && (month === 1)) ? 29 : this.daysInMonth[month];
    	}
    });
})(Kube);