'use strict'

function reverse(s) {
  function _reverse(v, i, j) {
    let temp;
    for ( ; i < j; i++, j--) {
      temp = v[i];
      v[i] = v[j];
      v[j] = temp;
    }
    return v;
  }

  let v = s.split('');
  return _reverse(v, 0, s.length - 1).join('');
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