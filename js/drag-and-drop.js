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
  console.log('yep');
  map.addEventListener('mousedown', function (evt) {
    console.log('yep');
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topPosition = (mainPin.offsetTop - shift.y) + 'px';
      var leftPosition = (mainPin.offsetLeft - shift.x) + 'px';

      var borderTop = mapProperties.border.TOP - mainPinProperties.HEIGHT - mainPinProperties.TAIL;
      var borderRight = mapProperties.border.RIGHT - mainPinProperties.WIDTH;
      var borderBottom = mapProperties.border.BOTTOM - mainPinProperties.HEIGHT - mainPinProperties.TAIL;
      var borderLeft = mapProperties.border.LEFT;

      if (mainPin.offsetTop - shift.y <= (borderTop)) {
        topPosition = (borderTop) + 'px';
      } else if (mainPin.offsetTop - shift.y >= (borderBottom)) {
        topPosition = (borderBottom) + 'px';
      }

      if (mainPin.offsetLeft - shift.x >= borderRight) {
        leftPosition = borderRight + 'px';
      } else if (mainPin.offsetLeft - shift.x <= borderLeft) {
        leftPosition = borderLeft + 'px';
      }

      mainPin.style.top = topPosition;
      mainPin.style.left = leftPosition;

      window.getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
  });
})();
