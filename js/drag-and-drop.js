'use strict';
(function () {
  window.mainPin.addEventListener('mousedown', function (evt) {
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

      var topPosition = (window.mainPin.offsetTop - shift.y) + 'px';
      var leftPosition = (window.mainPin.offsetLeft - shift.x) + 'px';

      var borderTop = window.mapProperties.border.TOP - window.mainPinProperties.HEIGHT - window.mainPinProperties.TAIL;
      var borderRight = window.mapProperties.border.RIGHT - window.mainPinProperties.WIDTH;
      var borderBottom = window.mapProperties.border.BOTTOM - window.mainPinProperties.HEIGHT - window.mainPinProperties.TAIL;
      var borderLeft = window.mapProperties.border.LEFT;

      if (window.mainPin.offsetTop - shift.y <= (borderTop)) {
        topPosition = (borderTop) + 'px';
      } else if (window.mainPin.offsetTop - shift.y >= (borderBottom)) {
        topPosition = (borderBottom) + 'px';
      }

      if (window.mainPin.offsetLeft - shift.x >= borderRight) {
        leftPosition = borderRight + 'px';
      } else if (window.mainPin.offsetLeft - shift.x <= borderLeft) {
        leftPosition = borderLeft + 'px';
      }

      window.mainPin.style.top = topPosition;
      window.mainPin.style.left = leftPosition;

      window.getMainPinPosition(window.mainPin.offsetTop, window.mainPin.offsetLeft);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.getMainPinPosition(window.mainPin.offsetTop, window.mainPin.offsetLeft);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.getMainPinPosition(window.mainPin.offsetTop, window.mainPin.offsetLeft);
  });
})();
