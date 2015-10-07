'use strict';

function min(total, coins) {

  function _min(total, coins, count) {
    if (total == 0) { return count; }

    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < coins.length; i++) {
      if (coins[i] <= total) {
        let sum = _min(total - coins[i], coins, count + 1);
        if (min > sum) min = sum;
      }
    }

    return min;
  }

  return _min(total, coins, 0);
}


// ===============================================================
// tests
// ===============================================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const lodash = require('lodash');
const format = require('util').format;

describe('Minimum number of coins to make change', function () {

  const tests = [
    { amount: 0, coins: [1, 5, 10], expect: 0 },
    { amount: 1, coins: [1, 5, 10], expect: 1 },
    { amount: 4, coins: [1, 5, 10], expect: 4 },
    { amount: 5, coins: [1, 5, 10], expect: 1 },
    { amount: 6, coins: [1, 5, 10], expect: 2 },
    { amount: 10, coins: [1, 5, 10], expect: 1 },
    { amount: 11, coins: [1, 5, 10], expect: 2 },
    { amount: 14, coins: [1, 5, 10], expect: 5 },
    { amount: 15, coins: [1, 5, 10], expect: 2 },
    { amount: 16, coins: [1, 5, 10], expect: 3 },
    { amount: 25, coins: [1, 5, 10], expect: 3 },
    { amount: 60, coins: [1, 10], expect: 6 },
    { amount: 100, coins: [1, 10], expect: 10 },
    { amount: 1, coins: [1, 5, 6, 8], expect: 1 },
    { amount: 2, coins: [1, 5, 6, 8], expect: 2 },
    { amount: 11, coins: [1, 5, 6, 8], expect: 2 },
  ];

  tests.forEach(test => {
    // watch out for recursive tests (O(2^n))
    if (test.amount <= 50) {
      let descr = format('coin denominations: [%s], total amount: %d => %d',
        test.coins, test.amount, test.expect);
      it(descr, function () {
        this.timeout(30 * 1000);
        let actual = min(test.amount, test.coins);
        assert.equal(actual, test.expect);
      });
    }
  });

});


mocha.run();