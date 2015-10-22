'use strict';

function findMaxOccurringElement(v) {
  let number;
  let max = 0;

  for (let i = 0; i < v.length - 1; i++) {
    let count = 0;

    for (let j = 0; j < v.length; j++) {

      if (v[j] == v[i]) {
        count++;
        if (count > max) {
          max = count;
          number = v[i];
        }
      }
    }
  }

  return number;
}


// ======================================
// TESTS
// ======================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');

describe('tests', () => {

  const tests = [
    { v: [1, 2, 3, 4, 3, 2, 3, 1], expect: 3 },
    { v: [1, 2, 3, 4, 4, 4, 4, 3, 2, 3, 1], expect: 4 },
    { v: [1, 2, 3, 4, 4], expect: 4 },
    { v: [1, 1, 1, 2, 3, 4, 4], expect: 1 },
  ];

  tests.forEach(test => {
    it ('should pass', () => {
      let expect = test.expect;
      let actual = findMaxOccurringElement(test.v);
      assert.equal(actual, expect);
    });
  });

});


mocha.run();
