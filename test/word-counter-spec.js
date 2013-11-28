var expect = require('chaijs-chai').expect;

var WordCounter = require('../index.js');

describe('WordCounter', function() {
  describe('countWords', function() {
    it("should count a simple sentence", function() {
      var text = "This is a simple test";
      var count = WordCounter.prototype.countWords(text);

      expect(count).to.eq(5);
    })
  })
})