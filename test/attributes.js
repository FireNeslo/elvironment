var Attributes = require('../lib/attributes');
var expect = require('chai').expect;
var attrs;


describe('Attributes', function(){
  it('should work as a constructor', function() {
    expect(new Attributes()).to.be.an.instanceof(Attributes);
  });
  beforeEach(function(){
    attrs = new Attributes();
    attrs.title = "hello world";
    attrs.class = "whole world";
  });
  describe('#map(cb)', function(){
    it('should map over values and keys', function() {
      expect(attrs.map(function(value, key) {
        if(key === 'title') expect(value).to.equal("hello world");
        if(key === 'class') expect(value).to.equal("whole world");
        return key;
      })).to.eql(['title','class']);
    })
  });
  describe('#toString()', function(){
    it('should return attributes as string', function() {
      expect(attrs.toString()).to.equal(' title="hello world" class="whole world"');
    })
  });
});