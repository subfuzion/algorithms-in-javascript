'use strict';

function prime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return n > 1;
}

// ===============================
// tests
// ===============================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const format = require('util').format;

describe ('prime tests', () => {

  const tests = [
    { n: 0, expect: false },
    { n: 1, expect: false },
    { n: 2, expect: true },
    { n: 3, expect: true },
    { n: 4, expect: false },
    { n: 5, expect: true },
    { n: 6, expect: false },
    { n: 7, expect: true },
    { n: 8, expect: false },
    { n: 9, expect: false },
    { n: 10, expect: false },
    { n: 11, expect: true },
    { n: 30, expect: false },
    { n: 31, expect: true },
  ];

  tests.forEach(test => {
    let descr = format('prime(%d) => %s', test.n, test.expect);
    it(descr, () => {
      let actual = prime(test.n);
      let expect = test.expect;
      assert.equal(actual, expect, format('prime(%d) => %s (expected: %s)',
        test.n, actual, expect));
    });
  });


});

describe ('prime performance tests - recursive', () => {
  let start = process.hrtime();
  let n = 1000000000000;
  let actual = prime(n);
  let stop = process.hrtime(start);
  let elapsed = format('%ds %dms', stop[0], stop[1] / 1000000);
  let result = format('measured performance of prime(%d) => %s', n, elapsed);
  it (result, () => {});
});

mocha.run();
