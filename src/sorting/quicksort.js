'use strict';

function quicksort(v) {
  let swap = (i, j) => {
    let t = v[i];
    v[i] = v[j];
    v[j] = t;
  };

  if (v.length <= 1) return v;
  if (v.length == 2) {
    if (v[1] < v[0]) swap(0, 1);
    return v;
  }

  function qs(v, left, right) {
    if (right - left < 1) return;
    if (right - left == 1) {
      if (v[right] < v[left]) swap(right, left);
      return;
    }

    let pivot = v[left];

    let i = left + 1;
    for (let j = left + 1; j <= right; j++) {
      if (v[j] < pivot) {
        swap(j, i);
        i++;
      }
    }

    swap(left, i - 1);
    qs(v, left, i - 1);
    qs(v, i, right);
  };

  let left = 0;
  let right = v.length - 1;
  qs(v, left, right);
  return v;
}

// =======================================================
// tests
// =======================================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, 'quicksort', mocha);

const _ = require('lodash');
const assert = require('assert');
const format = require('util').format;

describe('tests', function() {
  const tests = [
    { v: [], expect: [] },
    { v: [1], expect: [1] },
    { v: [1, 2], expect: [1, 2] },
    { v: [2, 1], expect: [1, 2] },
    { v: [1, 2, 3], expect: [1, 2, 3] },
    { v: [2, 3, 1], expect: [1, 2, 3] },
    { v: [2, 4, 3, 1], expect: [1, 2, 3, 4] },
    { v: [5, 2, 4, 3, 1], expect: [1, 2, 3, 4, 5] },
    { v: [2, 4, 3, 1, 6, 5, 7], expect: [1, 2, 3, 4, 5, 6, 7] },
    { v: [1, 2, 3, 4, 5, 6, 7], expect: [1, 2, 3, 4, 5, 6, 7] },
    { v: [7, 6, 5, 4, 3, 2, 1, 0], expect: [0, 1, 2, 3, 4, 5, 6, 7] },
  ];

  tests.forEach(test => {
    let f = quicksort;
    let descr = format('f([%s]) => [%s]\n'
      + '--------------------------------------------',
      test.v, test.expect);
    let actual;

    it (descr, () => {
      actual = f(test.v);
      assert(_.eq(actual, test.expect), 'FAIL: [%s]', test.v);
    });

  });
});

mocha.run();