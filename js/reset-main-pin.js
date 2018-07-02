'use strict';

(function () {
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
  var mapProperties = {
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
    mainPin.style.top = Math.round((mapProperties.size.HEIGHT - mainPinProperties.HEIGHT) / 2) + 'px';
    mainPin.style.left = Math.round((mapProperties.size.WIDTH - mainPinProperties.WIDTH) / 2) + 'px';
  };
})();
