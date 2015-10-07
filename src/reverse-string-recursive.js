'use strict'

function reverse(s) {
  function _reverse(v) {
    if (v.length == 0) return v;

    let val = v.pop();
    _reverse(v);
    return insertAtBottom(v, val);
  }

  function insertAtBottom(v, val) {
    if (v.length == 0) {
      v.push(val);
      return;
    }

    let temp = v.pop();
    insertAtBottom(v, val);
    v.push(temp);
    return v;
  }

  let v = s.split('');
  return _reverse(v).join('');
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