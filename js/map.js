'use strict';

var AMOUNT_OF_ADS = 8;
var OFFERS = {
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
var LOCATION = {
  X: {
    MIN: 300,
    MAX: 900
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};
var ROOMS_AMOUNT = {
  MIN: 1,
  MAX: 5
};
var GUESTS_AMOUNT = {
  MIN: 1,
  MAX: 5
};
var PRICE = {
  MIN: 1000,
  MAX: 1000000
};
var PIN_SIZE = {
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

var translateTypes = function (type) {
  return offerTypesTranslation[type];
};

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
  return array;
};

var getRandomLengthOfArray = function (array) {
  return array.splice(0, getRandomInteger(1, array.length));
};

var getPlurals = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var getAvatarPath = function (i) {
  return 'img/avatars/user0' + (i + 1) + '.png';
};

var createAd = function (i) {

  var locationX = getRandomInteger(LOCATION.X.MIN, LOCATION.X.MAX);
  var locationY = getRandomInteger(LOCATION.Y.MIN, LOCATION.Y.MAX);

  var ad =
    {
      'author': {
        'avatar': getAvatarPath(i)
      },

      'offer': {
        'title': getRandomIndex(OFFERS.TITLES),
        'address': locationX + ', ' + locationY,
        'price': getRandomInteger(PRICE.MIN, PRICE.MAX),
        'type': getRandomIndex(OFFERS.TYPES),
        'rooms': getRandomInteger(ROOMS_AMOUNT.MIN, ROOMS_AMOUNT.MAX),
        'guests': getRandomInteger(GUESTS_AMOUNT.MIN, GUESTS_AMOUNT.MAX),
        'checkin': getRandomIndex(OFFERS.CHECK_TIME),
        'checkout': getRandomIndex(OFFERS.CHECK_TIME),
        'features': getRandomLengthOfArray(OFFERS.FEATURES),
        'description': '',
        'photos': shuffleArr(OFFERS.PHOTOS.slice())
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  return ad;
};

var renderPin = function (array, i) {

  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style = 'left:' + (array[i].location.x - PIN_SIZE.WIDTH) + 'px; ' + 'top:' + (array[i].location.y - PIN_SIZE.HEIGHT / 2) + 'px;';
  pinImg.src = array[i].author.avatar;
  pinImg.alt = array[i].offer.title;

  mapPinsBlock.appendChild(pinElement);
};

var clearDefaultElements = function (wrapOfElement, avaliableElements) {
  for (var i = 0; i < avaliableElements.length; i++) {
    wrapOfElement.removeChild(avaliableElements[i]);
  }
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

  adElement.querySelector('.popup__avatar').src = card.author.avatar;
  adElement.querySelector('.popup__title').textContent = card.offer.title;
  adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  adElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = translateTypes(card.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = rooms + ' ' + getPlurals(rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + guests + ' ' + getPlurals(guests, ['гостя', 'гостей', 'гостей']);
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  clearDefaultElements(adElement.querySelector('.popup__features'), adElement.querySelectorAll('.popup__feature'));
  getGeneratedFeatures(adElement, card.offer.features);

  adElement.querySelector('.popup__description').textContent = card.offer.description;

  clearDefaultElements(adElement.querySelector('.popup__photos'), adElement.querySelectorAll('.popup__photo'));
  getGeneratedPhotoes(adElement, card.offer.photos);

  return adElement;
};

var getAdsArray = function (fragment, amount) {
  var adsArray = [];

  for (var i = 0; i < amount; i++) {
    adsArray[i] = createAd(i);
    fragment.appendChild(renderAd(adsArray[0]));
    renderPin(adsArray, i);
  }
};

var renderAll = function (fragment) {
  var container = document.querySelector('.map__filters-container');
  map.insertBefore(fragment, container);
};

var generateAd = function (amount) {
  var fragment = document.createDocumentFragment();

  getAdsArray(fragment, amount);

  renderAll(fragment);
};

generateAd(AMOUNT_OF_ADS);

document.querySelector('.map').classList.remove('map--faded');
