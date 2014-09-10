var Element = require('../lib/element');
var Attributes = require('../lib/attributes');
var expect = require('chai').expect;
var element;
var tag = "div";


describe('Element', function(){
  it('should work as a constructor', function() {
    expect(new Element(tag)).to.be.an.instanceof(Element);
    expect(element.tag).to.equal(tag);
    expect(element.attributes).to.be.an.instanceof(Attributes);
    expect(element.elements.length).to.equal(1);
  });
  it('should work as a function', function() {
    expect(Element(tag)).to.be.an.instanceof(Element);
    expect(element.tag).to.equal(tag);
    expect(element.attributes).to.be.an.instanceof(Attributes);
    expect(element.elements.length).to.equal(1);
  });
  beforeEach(function(){
    element = new Element(tag, [new Element(tag)]);
  });
  describe('#attr(key, value)', function(){
    it('should set attribute', function() {
      element.attr('title', 'value');
      expect(element.attributes.title).to.equal('value');
    })
  });
  describe('#text(text)', function(){
    it('should set textContent', function() {
      element.text('content');
      expect(element.textContent).to.equal('content');
    })
  });
  describe('#children(elements, replace)', function(){
    it('should append or replace elements', function() {
      var newElements = [Element('a')];
      element.children(newElements);
      expect(element.elements.length).to.equal(2);
      element.children(newElements, true);
      expect(element.elements).to.equal(newElements);
    })
  });
  describe('#toString()', function(){
    it('should return element as string', function() {
      expect(element.toString()).to.equal('<div><div></div></div>');
    })
  });
});