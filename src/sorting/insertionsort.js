'use strict';

function dump(v) {
  console.log(v);
}

// average, worst, best case: O(n^2)
// despite O(n^2), more efficient than bubble or
// selection sort in practice
//
// keeps left side of array sorted as it iterates through array
//
// every repetition of sort removes an element from input data,
// inserts it into the correct position in already sorted list,
// until no input elements remain.
//
// After k iterations, the first k + 1 elements are sorted
//
// adaptive - if input data is (partially) presorted, insertion
// sort takes O(n+d) where d is number of inversions
//
// stable - maintains relative order in data if keys are same
//
// best used when data is nearly sorted or input size is small
// used as the recursive base case (when problem size is small)
// for higher overhead divide-and-conquer sorting algorithms,
// such as merge and quick sort.
function insertionsort(v) {
  dump(v);

  for (let i = 1; i < v.length; i++) {
    let j = i;
    let x = v[i];

    while (v[j-1] > x && j > 0) {
      v[j] = v[j-1];
      dump(v);
      j--;
    }

    v[j] = x;

    dump(v);
    dump('---------');
  }

  return v;
}

// ===========================================
// TESTS
// ===========================================

require('../testhelpers/sorttest')(insertionsort, 'insertionsort');

