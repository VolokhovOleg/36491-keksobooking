'use strict';

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

var avatarNumbers = [];

var map = document.querySelector('.map');
var template = document.querySelector('#ad-template').content.querySelector('.map__card');

var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#ad-template').content.querySelector('.map__pin');

var typeTransformate = function (word) {
  var rus = {
    
  }
}
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
var generateAvatar = function () {
  while (avatarNumbers) {
    var randomAvatar = generateRandomInteger(1, 8, true);
    if (avatarNumbers.indexOf(randomAvatar) === -1) {
      avatarNumbers.push(randomAvatar);
      return randomAvatar;
    }
  }
  return randomAvatar;
};
var createAds = function () {
  var locationX = generateRandomInteger(300, 900);
  var locationY = generateRandomInteger(130, 630);

  var ad =
    {
      'author': {
        'avatar': 'img/avatars/user' + generateAvatar() + '.png'
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
var renderPin = function (x, y, avatar, title) {
  var pinElement = mapPin.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var pinImg = pinElement.querySelector('img');
  var pinPosition = 'left:' + (x - 70) + 'px; ' + 'top:' + (y - 25) + 'px;';

  pinElement.setAttribute('style', pinPosition);
  pinImg.setAttribute('src', avatar);
  pinImg.setAttribute('alt', title);
  fragment.appendChild(pinElement);
  mapPinsBlock.appendChild(fragment);
};
var renderAd = function (renderedAd) {
  var adElement = template.cloneNode(true);

  adElement.querySelector('.popup__avatar').setAttribute('src', renderedAd.author.avatar);
  adElement.querySelector('.popup__title').textContent = renderedAd.offer.title;
  adElement.querySelector('.popup__text--address').textContent = renderedAd.offer.address;
  adElement.querySelector('.popup__text--price').textContent = renderedAd.offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = typeTransformate(renderedAd.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = renderedAd.offer.rooms + ' комнаты для ' + renderedAd.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после' + renderedAd.offer.checkin + ', выезд до  ' + renderedAd.offer.checkout;

  return adElement;
};
var generateAd = function (amount) {
  var fragment = document.createDocumentFragment();
  var adsArray = [];

  for (var i = 0; i < amount; i++) {
    adsArray[i] = createAds();
    if (i === 0) {
      fragment.appendChild(renderAd(adsArray[i]));
    }
    renderPin(adsArray[i].location.x, adsArray[i].location.y, adsArray[i].author.avatar, adsArray[i].offer.title);
  }

  map.appendChild(fragment);
};

generateAd(AMOUNT_OF_ADS);

document.querySelector('.map').classList.remove('map--faded');
