'use strict';

(function () {
  var addressInput = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
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
  var mainPinProperties = {
    'position': {
      'X': mainPin.offsetTop,
      'Y': mainPin.offsetLeft
    },
    'WIDTH': 65,
    'HEIGHT': 65,
    'TAIL': 14
  };

  var getAdsArray = function (amount) {
    for (var i = 0; i < amount; i++) {
      window.data.array.ads[i] = window.window.data.createAd(i);
      window.renderPin(window.data.array.ads[i]);
    }
  };

  var resetMainPin = function () {
    mainPin.style.top = Math.round((mapProperties.size.HEIGHT - mainPinProperties.HEIGHT) / 2) + 'px';
    mainPin.style.left = Math.round((mapProperties.size.WIDTH - mainPinProperties.WIDTH) / 2) + 'px';
  };

  var showAddressValue = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var getMainPinPosition = function (x, y) {
    var mainPinPositionX = Math.round(x + mainPinProperties.HEIGHT + mainPinProperties.TAIL);
    var mainPinPositionY = Math.round(y + mainPinProperties.WIDTH / 2);

    showAddressValue(mainPinPositionX, mainPinPositionY);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    getAdsArray(window.data.AMOUNT_OF_ADS);
    window.form.activate();
    getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    activatePage();

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

      getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
  });

  getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);

  window.resetPage = function () {
    map.classList.add('map--faded');
    window.createCard.remove();

    for (var i = 0; i < window.data.array.pins.length; i++) {
      window.data.array.pins[i].remove();
    }

    window.form.disabled();
    getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
    resetMainPin();
    window.data.array.pins = [];
  };
})();
