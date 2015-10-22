'use strict';

function dump(v) {
  console.log(v);
}

// average and worst case: O(n^2), best case: O(n)
function selectionsort(v) {
  dump(v);

  for (let i = 0; i < v.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < v.length; j++) {

      // looking for smallest value in the remaining array
      if (v[j] < v[min]) {
        min = j;
      }
    }

    // swap the current and smallest value
    let t = v[min];
    v[min] = v[i];
    v[i] = t;

    dump(v);
  }

  return v;
}

// ===========================================
// TESTS
// ===========================================

require('../testhelpers/sorttest')(selectionsort, 'selectionsort');

