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
var mainPinProperties = {
  'position': {
    'X': mainPin.offsetTop,
    'Y': mainPin.offsetLeft
  },
  'WIDTH': 65,
  'HEIGHT': 65,
  'ACTIVE_PIN_HEIGHT': 114
};
var adsArray = [];
var offerTypesTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var mainTemplate = document.querySelector('#ad-template');
var map = document.querySelector('.map');
var cardTemplate = mainTemplate.content.querySelector('.map__card');
var container = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = mainTemplate.content.querySelector('.map__pin');
var headerFieldsets = document.querySelector('.ad-form-header');
var fieldsets = document.querySelectorAll('.ad-form__element');
var pinDecoratin = document.querySelector('.map__pin--decoration-js');
var mainForm = document.querySelector('.ad-form');
var addressInput = mainForm.querySelector('#address');

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

var getAd = function (i) {
  removePreviusAdCard();
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderAd(adsArray[i]));
  map.insertBefore(fragment, container);
};

var renderPin = function (array, i) {
  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  var style = {
    top: 'top:' + (array[i].location.y - pinSize.HEIGHT / 2) + 'px;',
    left: 'left:' + (array[i].location.x - pinSize.WIDTH) + 'px;'
  };

  pinElement.style = style.top + style.left;
  pinImg.src = array[i].author.avatar;
  pinImg.alt = array[i].offer.title;

  pinElement.addEventListener('click', function () {
    getAd(i);
  });
  mapPinsBlock.appendChild(pinElement);
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
  var adElement = cardTemplate.cloneNode(true);
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

  closeAd(closeAdBtn);

  return adElement;
};

var getAdsArray = function (amount) {
  for (var i = 0; i < amount; i++) {
    adsArray[i] = createAd(i);
    renderPin(adsArray, i);
  }
};

var removePreviusAdCard = function () {
  var allMapCards = map.querySelectorAll('.map__card');

  for (var i = 0; i < allMapCards.length; i++) {
    map.removeChild(allMapCards[i]);
  }
};

var removePreviousPins = function () {
  var allPins = mapPinsBlock.querySelectorAll('.map__pin');

  for (var i = 1; i < allPins.length; i++) {
    mapPinsBlock.removeChild(allPins[i]);
  }
};

var getFormDisabled = function () {
  for (var indexFieldset = 0; indexFieldset < fieldsets.length; indexFieldset++) {
    fieldsets[indexFieldset].disabled = true;
  }
  headerFieldsets.disabled = true;
};

var getFormAvailable = function () {
  for (var indexFieldset = 0; indexFieldset < fieldsets.length; indexFieldset++) {
    fieldsets[indexFieldset].disabled = false;
  }
  headerFieldsets.disabled = false;
  pinDecoratin.style = 'display: none;';
  mainForm.classList.remove('ad-form--disabled');
};

var activatePage = function () {
  removePreviousPins();
  removePreviusAdCard();
  getAdsArray(AMOUNT_OF_ADS);
  getFormAvailable();
  mainPin.style = 'left: 570px; top: 375px; height: ' + mainPinProperties.ACTIVE_PIN_HEIGHT + 'px;';
  getMainPinProperties(mainPinProperties.ACTIVE_PIN_HEIGHT);
};

var closeAd = function (closeAdBtn) {
  closeAdBtn.addEventListener('click', removePreviusAdCard);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      removePreviusAdCard();
    }
  });
};

var getMainPinProperties = function (pinHeight) {

  var mainPinPositionX = Math.round(mainPinProperties.position.X + mainPinProperties.WIDTH / 2);
  var mainPinPositionY = Math.round(mainPinProperties.position.Y + pinHeight / 2);

  addressInput.value = mainPinPositionY + ', ' + mainPinPositionX;
};

mainPin.addEventListener('mouseup', activatePage);

getMainPinProperties(mainPinProperties.HEIGHT);

getFormDisabled();
