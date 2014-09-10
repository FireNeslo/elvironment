function tags(func) {'use strict';
	if(func.$inject) return func.$inject;
	return (func.$inject = func.length ? func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',') : []);
}
var Element = require('./lib/element');
var Attributes = require('./lib/attributes');
/**
 * @module nslo-elvironment
 * @param {function} cb - element environment
 **/
function elviroment(cb) {'use strict';
	return cb.apply(Element, tags(cb).map(function(tag) {
		return function el() {
			var element = new Element(tag);
			Array.prototype.forEach.call(arguments, function(val) {
				if(Array.isArray(val)) {
					element.children(val);
				} else if(typeof val === 'string') {
					shortcut(element, val);
				} else if(val instanceof Element) {
					element.children([val]);
				} else if(typeof val === 'object') {
					Attributes.prototype.map.call(val,function(value, key) {
						element.attr(key, value);
					});
				}
			});
			return element;
		};
	}));
}
elviroment.Element = Element;
elviroment.Attributes = Attributes;

function attribute(attr) {'use strict';
	return function(element, val) { return element.attr(attr, val);};
}
function classes(element, val) {'use strict';
	return element.attr('class', val.replace('.',' ')); 
}
var shortcuts = [
	{shortcut:'.',action:classes}, 
	{shortcut:'#',action:attribute('id')}, 
	{shortcut:':',action:attribute('type')},
	{shortcut:'=',action:attribute('value')},
	{shortcut:'@',action:attribute('name')},
	{shortcut:'>',action:attribute('href')}
];
function shortStrings(shortcut) {'use strict';
	return ''+shortcut.shortcut;
}
function shortcut(element, value) {'use strict';
	var short = null, action = null;
	for (var i = 0; i < shortcuts.length; i++) {
		short = shortcuts[i].shortcut;
		action   = shortcuts[i].action;
		if((short instanceof RegExp && short.test(value)) || value.indexOf(short) === 0) {
			if(typeof short === 'string') {
				value = value.replace(short, '');	
			}
			return action(element, value);
		}
	}
	element.text(value);
}
/**
 * Adds a shortcut
 * @param {string|regexp} shortcut - prefix or expression to activate action (prefixes are removed) 
 * @param {function} 			action   - action to invoke on shortcut
 **/
elviroment.shortcut = function(shortcut, action) {'use strict';
	var value = {shortcut:shortcut, action:action};
	var index = shortcuts.map(shortStrings).indexOf(shortcut.toString());
	if(index > -1) shortcuts[index] = value;
	else shortcuts.push(value);
};

module.exports= elviroment;