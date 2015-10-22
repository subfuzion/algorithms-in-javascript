'use strict';

function dump(v) {
  console.log(v);
}

// O(n^2) (event in best case)
// iterates through array, each iteration moves biggest value
// from left toward right (hence "bubbles")
function bubblesort(v) {
  dump(v);


  // after each pass, the biggest value will be shifted to the
  // far right by the inner loop that does swaps.
  // reduce the right limit since no need to inspect it again
  // (all remaining values are smaller)
  for (let right = v.length - 1; right > 0; right--) {

    // starting from the left, move bigger numbers toward the right
    for (let left = 0; left < right; left++) {

      if (v[left] > v[left+1]) {
        let t = v[left];
        v[left] = v[left+1];
        v[left+1] = t;
      }

      dump(v);
    }
  }

  return v;
}

// ===========================================
// TESTS
// ===========================================

require('../testhelpers/sorttest')(bubblesort, 'bubblesort');

