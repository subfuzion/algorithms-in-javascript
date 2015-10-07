'use strict';

function factorial(n) {
  let fact = new Array(n+1);
  fact[0] = 1;
  fact[1] = 1;

  function _factorial(n) {
    if (n == 0) return 1;
    if (n == 1) return 1;

    if (fact[n-1]) {
      console.log(fact);
      return n * fact[n-1];
    }

    fact[n-1] = _factorial(n-1);
    fact[n] = n * fact[n-1];
    console.log('==>');
    console.log(fact);
    return fact[n];
  }

  return _factorial(n);
}

// ====================================
// tests
// ====================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const format = require('util').format;

describe ('factorial tests', () => {

  const tests = [
    { n: 0, expect: 1 },
    { n: 1, expect: 1 },
    { n: 2, expect: 2 },
    { n: 3, expect: 6 },
    { n: 4, expect: 24 },
    { n: 5, expect: 120 },
    { n: 6, expect: 720 }
  ];

  tests.forEach(test => {
    let descr = format('factorial(%d) => %d', test.n, test.expect);
    it(descr, () => {
      let actual = factorial(test.n);
      let expect = test.expect;
      assert.equal(actual, expect, format('factorial(%d) => %d (expected: %d)',
        test.n, actual, expect));
    });
  });


});

mocha.run();