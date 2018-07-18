'use strict';

(function () {
  var MAX_ADS_AMOUNT = 5;
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

  var createAds = function (data) {
    window.filters.copyData(data);

    for (var i = 0; i < MAX_ADS_AMOUNT; i++) {
      window.pin.render(data[i]);
    }
  };

  var showAddressValue = function (x, y) {
    addressInput.value = y + ', ' + x;
  };

  var resetMainPin = function () {
    mainPin.style.top = Math.round((mapProperties.size.HEIGHT - mainPinProperties.HEIGHT) / 2) + 'px';
    mainPin.style.left = Math.round((mapProperties.size.WIDTH - mainPinProperties.WIDTH) / 2) + 'px';
  };

  var createMainPinPosition = function (x, y) {
    var mainPinPositionX = Math.round(x + mainPinProperties.HEIGHT + mainPinProperties.TAIL);
    var mainPinPositionY = Math.round(y + mainPinProperties.WIDTH / 2);

    showAddressValue(mainPinPositionX, mainPinPositionY);
  };

  var activatePage = function () {
    window.backend.dataLoad(window.backend.onError, createAds);
    createMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
    map.classList.remove('map--faded');
    window.form.activate();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }

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

      var borderTop = Math.floor(mapProperties.border.TOP - mainPinProperties.HEIGHT - mainPinProperties.TAIL);
      var borderRight = Math.floor(mapProperties.border.RIGHT - mainPinProperties.WIDTH / 2);
      var borderBottom = Math.floor(mapProperties.border.BOTTOM - mainPinProperties.HEIGHT - mainPinProperties.TAIL);
      var borderLeft = Math.floor(mapProperties.border.LEFT - mainPinProperties.WIDTH / 2);
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
      createMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      createMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    createMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
  });

  createMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);

  window.map = {
    resetPage: function () {
      map.classList.add('map--faded');
      window.pin.delete();
      window.card.remove();
      window.form.disable();
      createMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
      resetMainPin();
    },
    createAds: function (data) {

      for (var i = 0; i < Math.min(MAX_ADS_AMOUNT, data.length); i++) {
        window.pin.render(data[i]);
      }
    }
  };
})();
