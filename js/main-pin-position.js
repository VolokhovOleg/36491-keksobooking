'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  window.getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
})();
