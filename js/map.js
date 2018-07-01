'use strict';

var ESC_KEYCODE = 27;

var housePhoto = {
  WIDTH: 45,
  HEIGHT: 45
};

var adsArray = [];

var offerTypesPrice = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};

var map = document.querySelector('.map');

var activeCard = map.querySelector('.map__card');

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

var getFeature = function (arr) {
  var tagName = document.createElement('li');
  tagName.classList.add('popup__feature', 'popup__feature--' + arr);
  return tagName;
};

var getPhoto = function () {
  var tagName = document.createElement('img');
  tagName.classList.add('popup__photo');
  tagName.width = housePhoto.WIDTH;
  tagName.height = housePhoto.HEIGHT;
  tagName.alt = 'Фотография жилья';
  return tagName;
};

var getAdsArray = function (amount) {
  for (var i = 0; i < amount; i++) {
    adsArray[i] = window.createAd(i);
    window.renderPin(adsArray[i]);
  }
};

var resetInputs = function () {
  priceInput.placeholder = defaultPricePlaceholder;

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style = inputStyles.VALID;
  }
};

var removeAdCard = function () {
  if (activeCard) {
    activeCard.remove();
    document.removeEventListener('keydown', removeAdCardWithEsc);
  }
};

var removeAdCardWithEsc =  {
  if (evt.keyCode === ESC_KEYCODE && activeCard !== null) {
    removeAdCard();
    document.removeEventListener('keydown', removeAdCardWithEsc);
  }
};

var disabledForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
};

var activateForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  mainForm.classList.remove('ad-form--disabled');
};

var activatePage = function () {
  map.classList.remove('map--faded');
  getAdsArray(window.getMockAmount.AMOUNT_OF_ADS);
  activateForm();
  getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
  setMatchRoom();
};

var resetPage = function () {
  map.classList.add('map--faded');
  mainForm.classList.add('ad-form--disabled');
  removeAdCard();
  mainForm.reset();
  resetInputs();

  for (var i = 0; i < pinsArray.length; i++) {
    pinsArray[i].remove();
  }

  disabledForm();
  getMainPinPosition(mainPinProperties.position.X, mainPinProperties.position.Y);
  resetMainPin();
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

var setMatchRoom = function () {
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

roomAmount.addEventListener('change', setMatchRoom);

submitBtn.addEventListener('mouseup', function () {
  checkValidation(priceInput);
  checkValidation(titleInput);
});

resetBtn.addEventListener('click', resetPage);

map.addEventListener('mousedown', function (evt) {
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

disabledForm(mainPinProperties.position.X, mainPinProperties.position.Y);
