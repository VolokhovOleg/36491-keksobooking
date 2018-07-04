'use strict';

(function () {
  window.utils = {
    'getRandomInteger': function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    'getRandomIndex': function (arr) {
      return arr[window.utils.getRandomInteger(0, arr.length - 1)];
    },
    'shuffleArr': function (array) {
      for (var i = 0; i < array.length; i++) {
        var randomIndex = window.utils.getRandomInteger(0, array.length - 1);
        var j = array[randomIndex];

        array[randomIndex] = array[array.length - 1];
        array[array.length - 1] = j;
      }
      return array.slice();
    },
    'getRandomLengthOfArray': function (array) {
      return array.splice(0, window.utils.getRandomInteger(1, array.length));
    },
    'getPlurals': function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
  };
})();
