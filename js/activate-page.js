'use strict';

(function () {
  var map = document.querySelector('.map');
  window.mainPin.addEventListener('click', function () {
    map.classList.remove('map--faded');
    window.getAdsArray(window.getMockAmount.AMOUNT_OF_ADS);
    window.activateForm();
    window.getMainPinPosition(window.mainPinProperties.position.X, window.mainPinProperties.position.Y);
    window.setMatchRoom();
  });
})();
