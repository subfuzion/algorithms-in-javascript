'use strict';

function isPalindrome(s) {
  function _isPalindrome(s, i, j) {
    if (j - i < 2) return true;
    return s.charAt(i) == s.charAt(j) && _isPalindrome(s, i + 1, j - 1);
  }

  s = s.toLowerCase().replace(/[^a-z]/g, '');
  return _isPalindrome(s, 0, s.length - 1);
}

// ===========================================
// tests
// ===========================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const _ = require('lodash');
const format = require('util').format;

describe('tests', () => {

  let tests = [
    { s: '', expect: true },
    { s: 'a', expect: true },
    { s: 'abcdef', expect: false },
    { s: 'abcdefedcba', expect: true },
    { s: 'A man, a plan, a canal: Panama.', expect: true }
  ];

  tests.forEach(test => {
    let descr = format('"%s" %s a palindrome', test.s, test.expect ? 'is' : 'is NOT');

    it(descr, () => {
      let actual = isPalindrome(test.s);
      assert.equal(actual, test.expect);
    });
  });

});

mocha.run();