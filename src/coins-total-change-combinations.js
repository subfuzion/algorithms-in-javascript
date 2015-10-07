'use strict';

function total(amount, coins) {
  function _total(amount, coins, i) {
    if (amount < 0) return 0;
    if (amount == 0) return 1;
    if (amount > 0 && i >= coins.length) return 0;
    return _total(amount - coins[i], coins, i) + _total(amount, coins, i+1);
  }

  return _total(amount, coins, 0);
}

// ==============================================
// tests
// ==============================================

const _ = require('lodash');
const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

describe('tests', () => {
  const assert = require('assert');
  const format = require('util').format;

  const tests = [
    { amount: 3, coins: [], expect: 0 },
    { amount: 3, coins: [1], expect: 1 },
    { amount: 3, coins: [1, 5, 10], expect: 1 },
    { amount: 7, coins: [1, 5, 10], expect: 2 },
    { amount: 11, coins: [1, 5], expect: 3 },
    { amount: 11, coins: [1, 5, 10], expect: 4 },
  ];

  tests.forEach(test => {
    let problem = _.padRight(format('amount: %d, coins: [%s]', test.amount, test.coins), 35);
    let descr = format('%s => %d combinations', problem, test.expect);

    it(descr, () => {
      let actual = total(test.amount, test.coins);
      assert.equal(actual, test.expect, format('expected: %d => actual: %d', test.expect, actual));
    });

  });

});

mocha.run();

