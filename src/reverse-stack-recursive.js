'use strict'

function reverse(v) {
  function _reverse(v) {
    if (v.length == 0) return v;
    let val = v.pop();
    _reverse(v);
    return insertAtBottom(v, val);
  }

  function insertAtBottom(v, val) {
    if (v.length == 0) {
      v.push(val);
      return v;
    }

    let temp = v.pop();
    insertAtBottom(v, val);
    v.push(temp);
    return v;
  }

  return _reverse(v, v.length);
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