'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    getPlurals: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    isEscKeycode: function (keyCode) {
      return keyCode === ESC_KEYCODE;
    }
  };
})();
