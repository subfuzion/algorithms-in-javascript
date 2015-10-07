'use strict';

function min(total, coins) {
  let table = new Array(total + 1);
  table[0] = 0;
  for (let i = 1; i <= total; i++) {
    table[i] = Number.MAX_SAFE_INTEGER - 1;
  }

  for (let i = 0; i < coins.length; i++) {
    for (let j = 1; j <= total; j++) {
      if (j >= coins[i]) {
        table[j] = Math.min(table[j], table[j - coins[i]] + 1);
      }
    }
  }

  return table[total];
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
    let descr = format('coin denominations: [%s], total amount: %d => %d',
      test.coins, test.amount, test.expect);
    it(descr, function () {
      let actual = min(test.amount, test.coins);
      assert.equal(actual, test.expect);
    });
  });

});


mocha.run();