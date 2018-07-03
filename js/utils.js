'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getRandomIndex = function (arr) {
    return arr[window.getRandomInteger(0, arr.length - 1)];
  };

  window.shuffleArr = function (array) {
    for (var i = 0; i < array.length; i++) {
      var randomIndex = window.getRandomInteger(0, array.length - 1);
      var j = array[randomIndex];

      array[randomIndex] = array[array.length - 1];
      array[array.length - 1] = j;
    }
    return array.slice();
  };

  window.getRandomLengthOfArray = function (array) {
    return array.splice(0, window.getRandomInteger(1, array.length));
  };

  window.getPlurals = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };
})();
