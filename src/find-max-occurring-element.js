'use strict';

function quicksort(v) {

  function qs(v, left, right) {
    if (right - left < 1) return;

    let swap = (i, j) => {
      let t = v[i];
      v[i] = v[j];
      v[j] = t;
    };

    let pivot = v[left];
    let i = left + 1;

    for (let j = i; j <= right; j++) {
      if (v[j] < pivot) {
        swap(j, i);
        i++;
      }
    }

    swap(left, i - 1);
    qs(v, left, i - 1);
    qs(v, i, right);
  };

  qs(v, 0, v.length - 1);
  return v;
}

function findMaxOccurringElement(v) {
  quicksort(v);

  let max = v[0];
  let number = v[0];
  let count = 1;
  let j = 1;

  for (let i = 1; i < v.length; i++) {

    if (v[i] == number) {
      j++;
      if (j > count) {
        count = j;
        max = v[i];
      }
    } else {
      j = 1;
      number = v[i];
    }
  }

  return max;
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
