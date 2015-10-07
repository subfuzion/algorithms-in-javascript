'use strict'

function reverse(s) {
  // map is just doing the same thing split would do --
  // return an array of the individual characters.
  // we can't call s.map() since s isn't an array,
  // so we use the array's map method, invoking it
  // with the string as the this context (since a
  // string has a length property, it is 'array-like' and
  // can be iterated.
  return [].map.call(s, c => c).reverse().join('');
}

// =========================================
// tests
// =========================================

const Mocha = require('mocha');
const mocha = new Mocha;
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const format = require('util').format;
const _ = require('lodash');

describe('tests', () => {

  const tests = [
    { s: '', expect: '' },
    { s: 'hello world', expect: 'dlrow olleh' },
  ];

  tests.forEach(test => {
    let descr = format('reverse "%s" => "%s"', test.s, test.expect);

    it (descr, () => {
      let actual = reverse(test.s);
      assert.equal(actual, test.expect, format('expected: "%s", actual: "%s"',
        test.expect, actual));
    });

  });
});

mocha.run();