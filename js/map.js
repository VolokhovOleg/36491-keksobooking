'use strict';

var ESC_KEYCODE = 27;
var AMOUNT_OF_ADS = 8;
var housePhoto = {
  WIDTH: 45,
  HEIGHT: 45
};
var offers = {
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECK_TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};
var houseLocation = {
  X: {
    MIN: 300,
    MAX: 900
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};
var roomsAmount = {
  MIN: 1,
  MAX: 5
};
var guestsAmount = {
  MIN: 1,
  MAX: 5
};
var price = {
  MIN: 1000,
  MAX: 1000000
};
var pinSize = {
  WIDTH: 70,
  HEIGHT: 50
};
var adsArray = [];
var pinsArray = [];
var offerTypesTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var offerTypesPrice = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};
var mainTemplate = document.querySelector('#ad-template');
var map = document.querySelector('.map');
var mapProperties = {
  'size': {
    'WIDTH': 1200,
    'HEIGHT': 750
  },
  'border': {
    'TOP': 51,
    'RIGHT': 1135,
    'BOTTOM': 551,
    'LEFT': 0
  }
};
var cardTemplate = mainTemplate.content.querySelector('.map__card');
var activeCard = map.querySelector('.map__card');
var container = document.querySelector('.map__filters-container');
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
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = mainTemplate.content.querySelector('.map__pin');

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

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomIndex = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var shuffleArr = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = getRandomInteger(0, array.length - 1);
    var j = array[randomIndex];

    array[randomIndex] = array[array.length - 1];
    array[array.length - 1] = j;
  }
  return array.slice();
};

var getRandomLengthOfArray = function (array) {
  return array.splice(0, getRandomInteger(1, array.length));
};

var getPlurals = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var getAvatarPath = function (path) {
  return 'img/avatars/user' + path + '.png';
};

var createAd = function (i) {

  var locationX = getRandomInteger(houseLocation.X.MIN, houseLocation.X.MAX);
  var locationY = getRandomInteger(houseLocation.Y.MIN, houseLocation.Y.MAX);
  var avatarPath = i >= 9 ? (i + 1) : '0' + (i + 1);

  return {
    'author': {
      'avatar': getAvatarPath(avatarPath)
    },

    'offer': {
      'title': getRandomIndex(offers.TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandomInteger(price.MIN, price.MAX),
      'type': getRandomIndex(offers.TYPES),
      'rooms': getRandomInteger(roomsAmount.MIN, roomsAmount.MAX),
      'guests': getRandomInteger(guestsAmount.MIN, guestsAmount.MAX),
      'checkin': getRandomIndex(offers.CHECK_TIME),
      'checkout': getRandomIndex(offers.CHECK_TIME),
      'features': getRandomLengthOfArray(shuffleArr(offers.FEATURES)),
      'description': '',
      'photos': shuffleArr(offers.PHOTOS)
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
};

var getAd = function (array) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderAd(array));
  map.insertBefore(fragment, container);
};

var renderPin = function (array) {
  if (pinsArray.length < AMOUNT_OF_ADS) {
    var pinElement = mapPin.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    var style = {
      top: 'top:' + (array.location.y - pinSize.HEIGHT / 2) + 'px;',
      left: 'left:' + (array.location.x - pinSize.WIDTH) + 'px;'
    };

    pinElement.style = style.top + style.left;
    pinImg.src = array.author.avatar;
    pinImg.alt = array.offer.title;

    pinElement.addEventListener('click', function () {
      getAd(array);
    });

    pinsArray.push(pinElement);

    mapPinsBlock.appendChild(pinElement);
  }
};

var setMainPin = function () {
  mainPin.style.top = Math.round((mapProperties.size.HEIGHT - mainPinProperties.HEIGHT) / 2) + 'px';
  mainPin.style.left = Math.round((mapProperties.size.WIDTH - mainPinProperties.WIDTH) / 2) + 'px';
};

var getMainPinPosition = function (x, y) {
  var mainPinPositionX = Math.round(x + mainPinProperties.HEIGHT + mainPinProperties.TAIL);
  var mainPinPositionY = Math.round(y + mainPinProperties.WIDTH / 2);

  addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
  return addressInput.value;
};

var getStartMainPinPosition = function () {
  setMainPin();

  var mainPinPositionX = Math.round(mainPinProperties.position.X + mainPinProperties.HEIGHT / 2);
  var mainPinPositionY = Math.round(mainPinProperties.position.Y + mainPinProperties.WIDTH / 2);

  addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
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

var renderAd = function (card) {

  removeAdCard();

  var adElement = cardTemplate.cloneNode(true);
  activeCard = adElement;
  var rooms = card.offer.rooms;
  var guests = card.offer.guests;
  var closeAdBtn = adElement.querySelector('.popup__close');

  adElement.querySelector('.popup__avatar').src = card.author.avatar;
  adElement.querySelector('.popup__title').textContent = card.offer.title;
  adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = offerTypesTranslation[card.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = rooms + ' ' + getPlurals(rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + guests + ' ' + getPlurals(guests, ['гостя', 'гостей', 'гостей']);
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  for (var featureIndex = 0; featureIndex < card.offer.features.length; featureIndex++) {
    adElement.querySelector('.popup__features').appendChild(getFeature(card.offer.features[featureIndex]));
  }

  adElement.querySelector('.popup__description').textContent = card.offer.description;

  for (var photoIndex = 0; photoIndex < card.offer.photos.length; photoIndex++) {
    adElement.querySelector('.popup__photos').appendChild(getPhoto(card.offer.photos[photoIndex])).src = card.offer.photos[photoIndex];
  }

  closeAdBtn.addEventListener('click', removeAdCard);

  document.addEventListener('keydown', removeAdCardWithEsc);

  return adElement;
};

var getAdsArray = function (amount) {
  for (var i = 0; i < amount; i++) {
    adsArray[i] = createAd(i);
    renderPin(adsArray[i]);
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

var removeAdCardWithEsc = function (evt) {
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
  getAdsArray(AMOUNT_OF_ADS);
  activateForm();
  getMainPinPosition();
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
  getStartMainPinPosition();
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

    if (mainPin.offsetTop - shift.y <= mapProperties.border.TOP) {
      mainPin.style.top = mapProperties.border.TOP + 'px';
    } else if (mainPin.offsetTop - shift.y >= mapProperties.border.BOTTOM) {
      mainPin.style.top = mapProperties.border.BOTTOM + 'px';
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    }

    if (mainPin.offsetLeft - shift.x >= mapProperties.border.RIGHT) {
      mainPin.style.left = mapProperties.border.RIGHT + 'px';
    } else if (mainPin.offsetLeft - shift.x <= mapProperties.border.LEFT) {
      mainPin.style.left = mapProperties.border.LEFT + 'px';
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

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

getStartMainPinPosition();

disabledForm();
