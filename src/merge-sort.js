// Explanation: http://www.growingwiththeweb.com/2012/11/algorithm-merge-sort.html
// UMD pattern: https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.mergeSort = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.mergeSort = factory();
  }
}(this, function (assert) {
  'use strict';

  var mergeSort = {
    sort: sort
  };

  function sort(array) {
    if (array.length <= 1)
      return array;
    
    var i;
    var middle = Math.floor(array.length / 2);
    var left = new Array(middle);
    var right = new Array(array.length - middle);
    
    for (i = 0; i < left.length; i++) {
      left[i] = array[i];
    }
    for (i = 0; i < right.length; i++) {
      right[i] = array[i + left.length];
    }
    
    return merge(sort(left), sort(right));
  };

  function merge(left, right) {
    var result = new Array(left.length + right.length);
    var leftIndex = 0;
    var rightIndex = 0;
    var resultIndex = 0;
    
    while (leftIndex < left.length || rightIndex < right.length) {
      if (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
          result[resultIndex++] = left[leftIndex++];
        } else {
          result[resultIndex++] = right[rightIndex++];
        }
      } else if (leftIndex < left.length) {
        result[resultIndex++] = left[leftIndex++];
      } else if (rightIndex < right.length) {
        result[resultIndex++] = right[rightIndex++];
      }
    }
    return result;
  }

  return mergeSort;
}));
