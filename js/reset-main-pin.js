'use strict';

(function () {
  window.mainPin = document.querySelector('.map__pin--main');
  window.mainPinProperties = {
    'position': {
      'X': window.mainPin.offsetTop,
      'Y': window.mainPin.offsetLeft
    },
    'WIDTH': 65,
    'HEIGHT': 65,
    'TAIL': 14
  };
  window.mapProperties = {
    'size': {
      'WIDTH': 1200,
      'HEIGHT': 750
    },
    'border': {
      'TOP': 130,
      'RIGHT': 1200,
      'BOTTOM': 630,
      'LEFT': 0
    }
  };

  window.resetMainPin = function () {
    window.mainPin.style.top = Math.round((window.mapProperties.size.HEIGHT - window.mainPinProperties.HEIGHT) / 2) + 'px';
    window.mainPin.style.left = Math.round((window.mapProperties.size.WIDTH - window.mainPinProperties.WIDTH) / 2) + 'px';
  };
})();
