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