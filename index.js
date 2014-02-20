var events = require('component-event');
var qwery = require('ded-qwery');
var each = require('component-each');

module.exports = WordCounter;

isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

/*
Creates and attaches a word counter to an input field (input or textarea) specified
by the ```inputSelector``` and outputs the word count to an element specified by the
```outputSelector```. Both are CSS selectors.

When the selectors match multiple elements the wordcount will be summed for all the
inputs.

You can optionally pass a transformation function, that will receive an integer –
the word count and the output element. Its return value will be used as output.
The transformation callback will get called once for each output element.
*/
function WordCounter(inputSelector, outputSelector, transform) {
  var inputEls = qwery(inputSelector);
  var outputEls = qwery(outputSelector);
  var self = this;

  var callback = function(e) {
    self.update(inputEls, outputEls, transform);
  };

  each(inputEls, function(inputEl) {
    events.bind(inputEl, 'keyup', callback);
    events.bind(inputEl, 'click', callback);
    events.bind(inputEl, 'focus', callback);
    events.bind(inputEl, 'blur', callback);
  });

  this.update(inputEls, outputEls, transform);
}

WordCounter.prototype.countWords = function(text) {
  if(text.trim().length < 1)
    return 0;

  return text.trim().split(/\s+/).length;
};

WordCounter.prototype.update = function(inputEls, outputEls, transform) {
  var wc = 0;
  var self = this;

  each(inputEls, function(inputEl) {
    wc += self.countWords(inputEl.value);
  });

  each(outputEls, function(outputEl) {
    if(isFunction(transform))
      wc = transform(wc, outputEl);

    outputEl.innerHTML = wc;
  });
}