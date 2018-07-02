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
  var mainForm = document.querySelector('.ad-form');
  var fieldsets = mainForm.querySelectorAll('fieldset');
  var inputs = mainForm.querySelectorAll('input');
  var inputStyles = {
    'INVALID': 'border-color: rgba(255, 0, 0, 1);',
    'VALID': 'border: 1px solid rgba(217, 217, 217, 1);'
  };
  var titleInput = mainForm.querySelector('#title');
  var addressInput = mainForm.querySelector('#address');
  var priceInput = mainForm.querySelector('#price');
  var defaultPricePlaceholder = '1000';
  var houseType = mainForm.querySelector('#type');
  var timeinSelect = mainForm.querySelector('#timein');
  var timeoutSelect = mainForm.querySelector('#timeout');
  var roomAmount = mainForm.querySelector('#room_number');
  var roomCapacity = mainForm.querySelector('#capacity');
  var matchRoomAndCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var submitBtn = mainForm.querySelector('.ad-form__submit');
  var resetBtn = mainForm.querySelector('.ad-form__reset');
  var offerTypesPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var showAddressValue = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  window.getMainPinPosition = function (x, y) {
    var mainPinPositionX = Math.round(x + mainPinProperties.HEIGHT + mainPinProperties.TAIL);
    var mainPinPositionY = Math.round(y + mainPinProperties.WIDTH / 2);

    showAddressValue(mainPinPositionX, mainPinPositionY);
  };

  var resetInputs = function () {
    priceInput.placeholder = defaultPricePlaceholder;

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].style = inputStyles.VALID;
    }
  };

  window.activateForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    mainForm.classList.remove('ad-form--disabled');
  };

  var disabledForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  var resetPage = function () {
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    window.removeAdCard();
    mainForm.reset();
    resetInputs();

    for (var i = 0; i < window.pinsArray.length; i++) {
      window.pinsArray[i].remove();
    }

    disabledForm();
    window.getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
    window.resetMainPin();
    window.pinsArray = [];
  };

  var checkValidation = function (input) {
    if (input.validity.tooShort) {
      input.style = inputStyles.INVALID;
    } else if (input.validity.valueMissing) {
      input.style = inputStyles.INVALID;
    } else if (priceInput.validity.rangeOverflow) {
      input.style = inputStyles.INVALID;
    } else if (priceInput.validity.rangeUnderflow) {
      input.style = inputStyles.INVALID;
    } else {
      input.setCustomValidity('');
      input.style = inputStyles.VALID;
    }
  };

  var getEquivalentTime = function (select, value) {
    select.value = value;
  };

  var getEquivalentAmount = function (capacityRoom, amountRoomValue) {
    capacityRoom.value = matchRoomAndCapacity[roomAmount.value].includes(amountRoomValue) ? amountRoomValue : matchRoomAndCapacity[amountRoomValue];
  };

  window.setMatchRoom = function () {
    for (var i = 0; i < roomCapacity.options.length; i++) {
      roomCapacity.options[i].disabled = (!matchRoomAndCapacity[roomAmount.value].includes(roomCapacity.options[i].value));
    }

    getEquivalentAmount(roomCapacity, roomAmount.value);
  };

  titleInput.addEventListener('change', function () {
    checkValidation(titleInput);
  });

  priceInput.addEventListener('change', function () {
    checkValidation(priceInput);
  });

  houseType.addEventListener('change', function () {
    priceInput.placeholder = offerTypesPrice[houseType.value];
    priceInput.min = offerTypesPrice[houseType.value];
    if (priceInput.min < priceInput.value || priceInput.max < priceInput.value) {
      priceInput.style = inputStyles.INVALID;
    }
  });

  timeinSelect.addEventListener('change', function () {
    getEquivalentTime(timeoutSelect, timeinSelect.value);
  });

  timeoutSelect.addEventListener('change', function () {
    getEquivalentTime(timeinSelect, timeoutSelect.value);
  });

  roomAmount.addEventListener('change', window.setMatchRoom);

  submitBtn.addEventListener('mouseup', function () {
    checkValidation(priceInput);
    checkValidation(titleInput);
  });

  resetBtn.addEventListener('click', resetPage);

  disabledForm(mainPinProperties.position.X, mainPinProperties.position.Y);

})();
