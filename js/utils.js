'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var MESSAGE_TIME_LIVE = 3000;
  var popupError = document.querySelector('.popup-error');
  var popupErrorMessage = popupError.querySelector('.popup-error__message');
  var lastTimeout;

  window.utils = {
    getPlurals: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    isEscKeycode: function (keyCode) {
      return keyCode === ESC_KEYCODE;
    },
    debounce: function (cb) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    },
    renderError: function (error) {
      popupErrorMessage.textContent = error;
      popupError.hidden = false;
      setTimeout(function () {
        popupError.hidden = true;
      }, MESSAGE_TIME_LIVE);
    }
  };
})();
