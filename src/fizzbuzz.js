'use strict';

function fizzbuzz(n) {
  let results = [];

  for (let i = 1; i <= n; i++) {
    let fizz = i % 3 === 0;
    let buzz = i % 5 === 0;

    let s = fizz
      ? buzz ? 'FizzBuzz' : 'Fizz'
      : buzz ? 'Buzz' : i;

    console.log('%s: %s', _.padLeft(i, 3), s);
    results.push(s);
  }

  return results;
}

// ===============================================
// TESTS
// ===============================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, 'fizzbuzz', mocha);

const assert = require('assert');
const format = require('util').format;
const _ = require('lodash');


describe('fizzbuzz tests', () => {

  const tests = [
    {
      n: 30, expect: [
      1,
      2,
      'Fizz',
      4,
      'Buzz',
      'Fizz',
      7,
      8,
      'Fizz',
      'Buzz',
      11,
      'Fizz',
      13,
      14,
      'FizzBuzz',
      16,
      17,
      'Fizz',
      19,
      'Buzz',
      'Fizz',
      22,
      23,
      'Fizz',
      'Buzz',
      26,
      'Fizz',
      28,
      29,
      'FizzBuzz'
    ]
    }
  ];

  tests.forEach(test => {
    let descr = format('n = %d', test.n);
    it(descr, () => {
      let expect = test.expect;
      let actual = fizzbuzz(test.n);
      assert(_.isEqual(actual, expect));
    });
  });

});

mocha.run();

