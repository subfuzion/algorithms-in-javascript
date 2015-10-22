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

// =======================================================
// tests
// =======================================================

require('../testhelpers/sorttest')(quicksort, 'quicksort');

