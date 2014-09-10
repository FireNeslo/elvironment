
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