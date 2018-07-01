'use strict';

(function () {
  window.shuffleArr = function (array) {
    for (var i = 0; i < array.length; i++) {
      var randomIndex = window.getRandomInteger(0, array.length - 1);
      var j = array[randomIndex];

      array[randomIndex] = array[array.length - 1];
      array[array.length - 1] = j;
    }
    return array.slice();
  };
})();
