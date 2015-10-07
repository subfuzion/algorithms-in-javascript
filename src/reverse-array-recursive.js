'use strict'

function reverse(v) {
  function _reverse(v, i) {
    if (i < 0) return v;
    let val = v[i];
    _reverse(v, i-1);
    return insertAtBottom(v, val, i);
  }

  function insertAtBottom(v, val, i) {
    if (i == 0) {
      v[i] = val;
      return v;
    }

    let temp = v[i-1];
    insertAtBottom(v, val, i-1);
    v[i] = temp;
    return v;
  }

  return _reverse(v, v.length - 1);
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
    { v: [1, 2, 3], expect: [3, 2, 1] },
    { v: [3, 2, 1], expect: [1, 2, 3] },
    { v: ['a', 'b', 'c', 'd'], expect: ['d', 'c', 'b', 'a'] },
  ];

  tests.forEach(test => {
    let descr = format('reverse [%s] => [%s]', test.v, test.expect);

    it (descr, () => {
      let actual = reverse(test.v);
      assert(_.eq(actual, test.expect), format('expected: [%s], actual: [%s]',
        test.expect, actual));
    });

  });
});

mocha.run();