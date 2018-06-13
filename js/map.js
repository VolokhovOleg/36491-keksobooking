'use strict';

var generateRandomInteger = function (min, max, leadNull) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  return leadNull ? '0' + Math.round(random) : Math.round(random);
};
var generateRandomIndex = function (arr) {
  return arr[generateRandomInteger(0, arr.length - 1)];
};
var shuffleArr = function () {
  return Math.random() - 0.5;
};

var AMOUNT_OF_ADS = 8;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK_TIME = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var createAds = function () {
  var locationX = generateRandomInteger(300, 900);
  var locationY = generateRandomInteger(130, 630);

  var ad =
    {
      'author': {
        'avatar': 'img/avatars/user' + generateRandomInteger(1, 8, true) + '.png'
      },

      'offer': {
        'title': generateRandomIndex(OFFER_TITLES),
        'address': locationX + ', ' + locationY,
        'price': generateRandomInteger(1000, 1000000),
        'type': generateRandomIndex(OFFER_TYPES),
        'rooms': generateRandomInteger(1, 5),
        'guests': generateRandomInteger(1, 5),
        'checkin': generateRandomIndex(OFFER_CHECK_TIME),
        'checkout': generateRandomIndex(OFFER_CHECK_TIME),
        'features': OFFER_FEATURES[generateRandomInteger(0, OFFER_FEATURES.length - 1)],
        'description': '',
        'photos': OFFER_PHOTOS.sort(shuffleArr)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };

  return ad;
};

var renderAd = function (renderedAd) {
  var adElement = template.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = renderedAd.title;
  adElement.querySelector('.popup__text--address').textContent = renderedAd.address;
  adElement.querySelector('.popup__text--price').textContent = renderedAd.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = renderedAd.type;
  adElement.querySelector('.popup__text--capacity').textContent = renderedAd.rooms + ' комнаты для ' + renderedAd.guests + ' гостей';
  wizardElement.querySelector('.wizard-eyes').style.fill = renderedWizard.eyesColor;

  return wizardAd;
};

var generateAd = function (amount) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < amount; i++) {
    fragment.appendChild(renderAd(creatAds()));
  }

  similarList.appendChild(fragment);
};

generateAd(AMOUNT_OF_ADS);
document.querySelector('.map').classList.remove('map--faded');
