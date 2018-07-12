'use strict';
(function () {
  var mainForm = document.querySelector('.ad-form');
  var fieldsets = mainForm.querySelectorAll('fieldset');
  var inputs = mainForm.querySelectorAll('input');
  var inputStyle = {
    'INVALID': 'border-color: rgba(255, 0, 0, 1);',
    'VALID': 'border: 1px solid rgba(217, 217, 217, 1);'
  };
  var offerTypesPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };
  var titleInput = mainForm.querySelector('#title');
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
  var succesMessage = document.querySelector('.success');

  var removeSuccesMessage = function () {
    succesMessage.classList.add('hidden');
    document.removeEventListener('keydown', onSuccesMessageEscPress);
  };

  var onSuccesMessageEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      succesMessage.classList.add('hidden');
      document.removeEventListener('keydown', onSuccesMessageEscPress);
    }
  };

  var resetForm = function () {
    window.map.resetPage();
    succesMessage.classList.remove('hidden');
    succesMessage.addEventListener('click', removeSuccesMessage);
    document.addEventListener('keydown', onSuccesMessageEscPress);
  };

  var checkValidation = function (input) {
    if (input.validity.tooShort) {
      input.style = inputStyle.INVALID;
    } else if (input.validity.valueMissing) {
      input.style = inputStyle.INVALID;
    } else if (priceInput.validity.rangeOverflow) {
      input.style = inputStyle.INVALID;
    } else if (priceInput.validity.rangeUnderflow) {
      input.style = inputStyle.INVALID;
    } else {
      input.setCustomValidity('');
      input.style = inputStyle.VALID;
    }
  };

  var makeEquivalentTime = function (select, value) {
    select.value = value;
  };

  var makeEquivalentAmount = function (capacityRoom, amountRoomValue) {
    capacityRoom.value = matchRoomAndCapacity[roomAmount.value].includes(amountRoomValue) ? amountRoomValue : matchRoomAndCapacity[amountRoomValue];
  };

  var setMatchRoom = function () {
    for (var i = 0; i < roomCapacity.options.length; i++) {
      roomCapacity.options[i].disabled = (!matchRoomAndCapacity[roomAmount.value].includes(roomCapacity.options[i].value));
    }

    makeEquivalentAmount(roomCapacity, roomAmount.value);
  };

  var resetInputs = function () {
    priceInput.placeholder = defaultPricePlaceholder;

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].style = inputStyle.VALID;
    }
  };

  setMatchRoom();

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
      priceInput.style = inputStyle.INVALID;
    }
  });

  timeinSelect.addEventListener('change', function () {
    makeEquivalentTime(timeoutSelect, timeinSelect.value);
  });

  timeoutSelect.addEventListener('change', function () {
    makeEquivalentTime(timeinSelect, timeoutSelect.value);
  });

  roomAmount.addEventListener('change', setMatchRoom);

  submitBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    var formData = new FormData(mainForm);
    checkValidation(priceInput);
    checkValidation(titleInput);
    if (mainForm.checkValidity()) {
      window.backend.sendForm(window.backend.onError, resetForm, formData);
    }
  });

  resetBtn.addEventListener('click', function () {
    mainForm.reset();
    resetInputs();
    window.map.resetPage();
    mainForm.classList.add('ad-form--disabled');
  });

  window.form = {
    disable: function () {
      mainForm.reset();
      mainForm.classList.add('ad-form--disabled');

      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
    },
    activate: function () {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
      mainForm.classList.remove('ad-form--disabled');
    }
  };
})();
