'use strict';

function fib(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;

  let a = 0, b = 1;
  let sum;

  for (let i = 2; i <= n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }

  return sum;
}

// ===============================
// tests
// ===============================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const format = require('util').format;

describe('fibonacci tests', () => {

  const tests = [
    { n: 0, expect: 0 },
    { n: 1, expect: 1 },
    { n: 2, expect: 1 },
    { n: 3, expect: 2 },
    { n: 4, expect: 3 },
    { n: 5, expect: 5 },
    { n: 6, expect: 8 },
    { n: 7, expect: 13 },
    { n: 8, expect: 21 }
  ];

  tests.forEach(test => {
    let descr = format('fib(%d) => %d', test.n, test.expect);
    it(descr, () => {
      let actual = fib(test.n);
      let expect = test.expect;
      assert.equal(actual, expect, format('fib(%d) => %d (expected: %d)',
        test.n, actual, expect));
    });
  });

});


mocha.run();