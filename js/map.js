'use strict';

var AMOUNT_OF_ADS = 8;
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

var offerTypesTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var map = document.querySelector('.map');
var template = document.querySelector('#ad-template').content.querySelector('.map__card');

var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#ad-template').content.querySelector('.map__pin');

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

var renderPin = function (array) {

  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  var topPosition = 'top:' + (array.location.y - pinSize.HEIGHT / 2) + 'px;';
  var leftPosition = 'left:' + (array.location.x - pinSize.WIDTH) + 'px;';
  pinElement.style = topPosition + leftPosition;
  pinImg.src = array.author.avatar;
  pinImg.alt = array.offer.title;

  mapPinsBlock.appendChild(pinElement);
};

var getGeneratedFeatures = function (adElement, card) {
  for (var i = 0; i < card.length; i++) {
    var featureElement = template.querySelector('.popup__feature--' + card[i]);
    var element = featureElement.cloneNode();
    adElement.querySelector('.popup__features').appendChild(element);
  }
};

var getGeneratedPhotoes = function (adElement, photoesArray) {
  for (var i = 0; i < photoesArray.length; i++) {
    var photoElement = template.querySelector('.popup__photo');
    var element = photoElement.cloneNode();
    element.src = photoesArray[i];
    adElement.querySelector('.popup__photos').appendChild(element);
  }
};

var renderAd = function (card) {
  var adElement = template.cloneNode(true);
  var rooms = card.offer.rooms;
  var guests = card.offer.guests;

  var featuresContent = adElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresContent.length; i++) {
    adElement.querySelector('.popup__features').removeChild(featuresContent[i]);
  }

  var photosContent = adElement.querySelectorAll('.popup__photo');
  for (var j = 0; j < photosContent.length; j++) {
    adElement.querySelector('.popup__photos').removeChild(photosContent[j]);
  }

  adElement.querySelector('.popup__avatar').src = card.author.avatar;
  adElement.querySelector('.popup__title').textContent = card.offer.title;
  adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = offerTypesTranslation[card.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = rooms + ' ' + getPlurals(rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + guests + ' ' + getPlurals(guests, ['гостя', 'гостей', 'гостей']);
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  getGeneratedFeatures(adElement, card.offer.features);
  adElement.querySelector('.popup__description').textContent = card.offer.description;
  getGeneratedPhotoes(adElement, card.offer.photos);

  return adElement;
};

var getAdsArray = function (amount) {
  var fragment = document.createDocumentFragment();
  var adsArray = [];

  for (var i = 0; i < amount; i++) {
    adsArray[i] = createAd(i);
    fragment.appendChild(renderAd(adsArray[0]));
    renderPin(adsArray[i]);
  }

  return fragment;
};

var generateAd = function (amount) {
  var container = document.querySelector('.map__filters-container');
  var fragment = getAdsArray(amount);

  map.insertBefore(fragment, container);
};

generateAd(AMOUNT_OF_ADS);

map.classList.remove('map--faded');
