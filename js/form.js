'use strict';

(function () {
  var DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';
  var DEFAULT_PRICE_PLACEHOLDER = '1000';
  var mainForm = document.querySelector('.ad-form');
  var fieldsets = mainForm.querySelectorAll('fieldset');
  var inputs = mainForm.querySelectorAll('input');
  var InputStyle = {
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
  var pinFileChooser = document.querySelector('.ad-form-header__input');
  var pinPreview = document.querySelector('.ad-form-header__preview img');
  var photosFileChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoesContainer = document.querySelector('.ad-form__photo-container');
  var PreviewImageParameters = {
    HEIGHT: 44,
    WIDTH: 40
  };

  var disableForm = function () {
    fieldsets.forEach(function (element) {
      element.disabled = true;
    });
  };

  var removeSuccesMessage = function () {
    succesMessage.classList.add('hidden');
    document.removeEventListener('keydown', onSuccesMessageEscPress);
  };

  var onSuccesMessageEscPress = function (evt) {
    if (window.utils.isEscKeycode(evt.keyCode)) {
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
    if (!input.validity.valid) {
      input.style = InputStyle.INVALID;
    } else {
      input.setCustomValidity('');
      input.style = InputStyle.VALID;
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
    priceInput.placeholder = DEFAULT_PRICE_PLACEHOLDER;
    inputs.forEach(function (element) {
      element.style = InputStyle.VALID;
    });
  };

  disableForm();

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
      priceInput.style = InputStyle.INVALID;
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
    window.filters.reset();
    mainForm.classList.add('ad-form--disabled');
  });

  var removePhotos = function () {
    var photos = document.querySelectorAll('.ad-form__photo');

    photos.forEach(function (item) {
      item.remove();
    });
  };

  var getImage = function () {
    var tagName = document.createElement('img');
    tagName.width = PreviewImageParameters.WIDTH;
    tagName.height = PreviewImageParameters.HEIGHT;
    return tagName;
  };

  var addImg = function (fileChooser, filePreview, createElement) {

    for (var i = 0; i < fileChooser.files.length; i++) {
      var file = fileChooser.files[i];
      var reader = new FileReader();

      reader.addEventListener('load', function (evt) {
        reader = evt.target;

        if (createElement) {
          var housePhoto = getImage();
          housePhoto.src = reader.result;
          var newPhotoPreview = filePreview.cloneNode();
          photoesContainer.appendChild(newPhotoPreview);
          newPhotoPreview.appendChild(housePhoto);
        } else {
          filePreview.src = reader.result;
        }

      });
      reader.readAsDataURL(file);
    }
  };

  pinFileChooser.addEventListener('change', function () {
    addImg(pinFileChooser, pinPreview);
  });

  photosFileChooser.addEventListener('change', function () {
    removePhotos();
    addImg(photosFileChooser, photoPreview, true);
  });

  window.form = {
    disable: function () {
      mainForm.reset();
      mainForm.classList.add('ad-form--disabled');
      pinPreview.src = DEFAULT_IMAGE_SRC;
      fieldsets.forEach(function (element) {
        element.disabled = true;
      });
      removePhotos();
      photoesContainer.appendChild(photoPreview);
    },
    activate: function () {
      fieldsets.forEach(function (element) {
        element.disabled = false;
      });
      mainForm.classList.remove('ad-form--disabled');
    }
  };
})();
