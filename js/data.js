'use strict';

(function () {
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

  window.createAd = function (i) {
    var locationX = window.getRandomInteger(houseLocation.X.MIN, houseLocation.X.MAX);
    var locationY = window.getRandomInteger(houseLocation.Y.MIN, houseLocation.Y.MAX);
    var avatarPath = i >= 9 ? (i + 1) : '0' + (i + 1);

    return {
      'author': {
        'avatar': 'img/avatars/user' + avatarPath + '.png',
      },

      'offer': {
        'title': window.getRandomIndex(offers.TITLES),
        'address': locationX + ', ' + locationY,
        'price': window.getRandomInteger(price.MIN, price.MAX),
        'type': window.getRandomIndex(offers.TYPES),
        'rooms': window.getRandomInteger(roomsAmount.MIN, roomsAmount.MAX),
        'guests': window.getRandomInteger(guestsAmount.MIN, guestsAmount.MAX),
        'checkin': window.getRandomIndex(offers.CHECK_TIME),
        'checkout': window.getRandomIndex(offers.CHECK_TIME),
        'features': window.getRandomLengthOfArray(window.shuffleArr(offers.FEATURES)),
        'description': '',
        'photos': window.shuffleArr(offers.PHOTOS)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };
})();
