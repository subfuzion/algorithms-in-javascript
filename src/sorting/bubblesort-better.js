'use strict';

function dump(v) {
  console.log(v);
}

// O(n) by eliminating unnecessary passes
// (once we observe there are no swaps in a pass, the
// list is in order and we can skip remaining passes
function bubblesort(v) {
  let keepChecking = true;
  dump(v);

  for (let right = v.length - 1; right > 0 && keepChecking; right--) {
    keepChecking = false;
    
    for (let left = 0; left < right; left++) {
      
      if (v[left] > v[left+1]) {
        // swap to put the two in order
        let t = v[left];
        v[left] = v[left+1];
        v[left+1] = t;

        // until we have an iteration that has no swaps, we're not done
        keepChecking = true;
      }
      dump(v);
    }
  }

  return v;
}

// ===========================================
// TESTS
// ===========================================

require('../testhelpers/sorttest')(bubblesort, 'bubblesort-better');

