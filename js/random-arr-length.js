'use strict';

(function () {
  window.getRandomLengthOfArray = function (array) {
    return array.splice(0, window.getRandomInteger(1, array.length));
  };
})();
