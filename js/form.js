'use strict';
(function () {
  window.mainForm = document.querySelector('.ad-form');
  var fieldsets = window.mainForm.querySelectorAll('fieldset');
  var inputs = window.mainForm.querySelectorAll('input');
  var inputStyles = {
    'INVALID': 'border-color: rgba(255, 0, 0, 1);',
    'VALID': 'border: 1px solid rgba(217, 217, 217, 1);'
  };
  var offerTypesPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };
  var titleInput = window.mainForm.querySelector('#title');
  var priceInput = window.mainForm.querySelector('#price');
  var defaultPricePlaceholder = '1000';
  var houseType = window.mainForm.querySelector('#type');
  var timeinSelect = window.mainForm.querySelector('#timein');
  var timeoutSelect = window.mainForm.querySelector('#timeout');
  var roomAmount = window.mainForm.querySelector('#room_number');
  var roomCapacity = window.mainForm.querySelector('#capacity');
  var matchRoomAndCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var submitBtn = window.mainForm.querySelector('.ad-form__submit');
  var resetBtn = window.mainForm.querySelector('.ad-form__reset');

  window.resetInputs = function () {
    priceInput.placeholder = defaultPricePlaceholder;

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].style = inputStyles.VALID;
    }
  };

  window.disabledForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  window.activateForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    window.mainForm.classList.remove('ad-form--disabled');
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

  resetBtn.addEventListener('click', window.resetPage);

  window.disabledForm(window.mainPinProperties.position.X, window.mainPinProperties.position.Y);

})();
