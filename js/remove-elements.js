'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.removeAdCard = function () {
    if (window.activeCard) {
      window.activeCard.remove();
      document.removeEventListener('keydown', window.removeAdCardWithEsc);
    }
  };

  window.removeAdCardWithEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removeAdCard();
      document.removeEventListener('keydown', window.removeAdCardWithEsc);
    }
  };
})();
