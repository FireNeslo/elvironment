!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.nsloElvironment=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./lib/attributes":2,"./lib/element":3}],2:[function(require,module,exports){

/**
 * Attributes helper
 * @class 
 **/
function Attributes() {}
/**
 * map over attributes
 * @param {function} cb - mapping callback
 **/
Attributes.prototype.map = function(cb) {'use strict';
    return Object.keys(this).map(function(key) { return cb(this[key], key);}, this);
};
/**
 * make attributes string
 **/
Attributes.prototype.toString = function() {'use strict';
  var attrs = this.map(function(value, key) { return key + '="' + value + '"';}).join(' ');
  return attrs ? ' ' + attrs : '';
};

module.exports = Attributes;
},{}],3:[function(require,module,exports){
/* global document */
var Attributes = require('./attributes');
function camelToDash(string) {'use strict';
  return (string[0] + string.substring(1).replace(/([A-Z])/g,'-$1')).toLowerCase();
}
/**
 * Element container
 * @class 
 * @param {string} name - element tag name
 * @param {Element[]} [children] - child elements
 **/
function Element(name, children) {'use strict';
    if(!this) return new Element(name, children);
    this.tag = camelToDash(name);
    this.elements = children || [];
    this.attributes = new Attributes();
    this.textContent = "";
}
/**
 * Converts element to string
 **/
Element.prototype.toString =
Element.prototype.toHtml   = function() {'use strict';
    return '<'+  this.tag + this.attributes.toString() + '>'+ 
    this.textContent + this.elements.map(function(element) {
        return element.toString();
    }).join('') + '</'+ this.tag + '>';
};
/**
 * Sets attribute
 * @param {string} key     - key to get or set
 * @param {string} [value] - the value to set
 **/
Element.prototype.attr = function(key, value) {'use strict';
    if(arguments.length !== 2) return this.attributes[key];
    this.attributes[key] = value;
    return this;
};
/**
 * Sets text
 * @param {string} [text] - text to set
 **/
Element.prototype.text = function(text) {'use strict';
    if(!arguments.length) return this.textContent;
    this.textContent = text;
    return this;
};
/**
 * Appends or replaces children
 * @param {Element[]} [children] - elements tp append or replace
 * @param {boolean} [replace] - should replace children
 **/
Element.prototype.children = function(children, replace) {'use strict';
    this.elements = replace ? children : this.elements.concat(children||[]); return this;
};
/**
 * Converts Element to dom structure (browser only)
 **/
Element.prototype.toDom = function() {'use strict';
    var element = document.createElement(this.tag);
    element.textContent = this.textContent;
    this.attributes.map(function(value, key) {
        element.setAttribute(key, value);
    });
    this.elements.forEach(function(el) {
        if(el instanceof Element) element.appendChild(el.toDom());
    });
    return element;
};

module.exports = Element;
},{"./attributes":2}]},{},[1])(1)
});
//# sourceMappingURL=nslo-elvironment.js.map