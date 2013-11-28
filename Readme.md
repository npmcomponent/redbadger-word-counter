
# word-counter

  Watch a text field and live update word count

## Installation

  Install with [component(1)](http://component.io):

    $ component install redbadger/word-counter

## API

  Word counter gives you a ```Counter``` object. You create an instance with

```js
  var WordCounter = require('word-counter');

  var counter = new WordCounter("#input-el", ".output-el");
```

  First two parmeters are CSS selectors. First one should match an input element (input or textarea),
  the second one can select any DOM element.

  WordCounter watches the input element and whenever the text in it changes, it counts the words and outputs
  the number into the output element.

  If you need a more complex thing, WordCounter accepts a third parameter - a callback that is run with the
  new count and its return value is used as output.

```js
  var WordCounter = require('word-counter');

  var counter = new WordCounter("#input-el", ".output-el", function(count) { return "You have typed " + count + " words!";} );
```

## License

  MIT
