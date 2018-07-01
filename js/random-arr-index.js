'use strict';

(function () {
  window.getRandomIndex = function (arr) {
    return arr[window.getRandomInteger(0, arr.length - 1)];
  };
})();
