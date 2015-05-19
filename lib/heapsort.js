/**
 * @license
 * js-sorting <http://github.com/Tyriar/js-sorting>
 * Copyright 2014-2015 Daniel Imms <http://www.growingwiththeweb.com>
 * Released under the MIT license <http://github.com/Tyriar/js-sorting/blob/master/LICENSE>
 */
'use strict';

var defaultCompare = require('./common/default-compare');
var defaultSwap = require('./common/default-swap');

function heapify(array, heapSize, i, compare, swap) {
  var left = i * 2 + 1;
  var right = i * 2 + 2;
  var largest;

  if (left < heapSize &&
      compare(array[left], array[i]) > 0) {
    largest = left;
  } else {
    largest = i;
  }

  if (right < heapSize &&
      compare(array[right], array[largest]) > 0) {
    largest = right;
  }

  if (largest !== i) {
    swap(array, i, largest);
    heapify(array, heapSize, largest, compare, swap);
  }
}

function buildHeap(array, heapSize, compare, swap) {
  for (var i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, heapSize, i, compare, swap);
  }
}

function sort(array, compare, swap) {
  var heapSize = array.length;
  buildHeap(array, heapSize, compare, swap);
  while (heapSize > 1) {
    swap(array, 0, heapSize - 1);
    heapSize--;
    heapify(array, heapSize, 0, compare, swap);
  }
  return array;
}

module.exports = function (array, customCompare, customSwap) {
  var compare = customCompare || defaultCompare;
  var swap = customSwap || defaultSwap;
  return sort(array, compare, swap);
};