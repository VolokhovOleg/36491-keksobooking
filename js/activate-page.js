'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinProperties = {
    'position': {
      'X': mainPin.offsetTop,
      'Y': mainPin.offsetLeft
    },
    'WIDTH': 65,
    'HEIGHT': 65,
    'TAIL': 14
  };

  mainPin.addEventListener('click', function () {
    map.classList.remove('map--faded');
    window.getAdsArray(window.getMockAmount.AMOUNT_OF_ADS);
    window.activateForm();
    window.getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
    window.setMatchRoom();
  });
})();
