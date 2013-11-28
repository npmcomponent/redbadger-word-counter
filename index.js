var events = require('event');
var qwery = require('qwery');

module.exports = WordCounter;

isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

/*
Creates and attaches a word counter to an input field (input or textarea) specified
by the ```inputSelector``` and outputs the word count to an element specified by the
```outputSelector```. Both are CSS selectors.

You can optionally pass a transformation function, that will receive a single integer –
the word count and its return value will be outputed.
*/
function WordCounter(inputSelector, outputSelector, transform) {
  var inputEl = qwery(inputSelector)[0];
  var outputEl = qwery(outputSelector)[0];
  var self = this;

  var callback = function(e) {
    self.update(inputEl, outputEl, transform);
  };

  events.bind(inputEl, 'keyup', callback);
  events.bind(inputEl, 'click', callback);
  events.bind(inputEl, 'focus', callback);
  events.bind(inputEl, 'blur', callback);

  this.update(inputEl, outputEl, transform);
}

WordCounter.prototype.countWords = function(text) {
  if(text.trim().length < 1)
    return 0;

  return text.trim().split(/\s+/).length;
};

WordCounter.prototype.update = function(inputEl, outputEl, transform) {
  var wc = this.countWords(inputEl.value);

  if(isFunction(transform))
    wc = transform(wc);

  outputEl.innerHTML = wc;
}