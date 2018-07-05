'use strict';

(function () {
  var offerData = {
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

  window.data = {
    AMOUNT_OF_ADS: 8,
    array: {
      ads: [],
      pins: []
    },
    createAd: function (i) {
      var locationX = window.utils.getRandomInteger(houseLocation.X.MIN, houseLocation.X.MAX);
      var locationY = window.utils.getRandomInteger(houseLocation.Y.MIN, houseLocation.Y.MAX);
      var avatarPath = i >= 9 ? (i + 1) : '0' + (i + 1);

      return {
        'author': {
          'avatar': 'img/avatars/user' + avatarPath + '.png',
        },

        'offer': {
          'title': window.utils.getRandomIndex(offerData.TITLES),
          'address': locationX + ', ' + locationY,
          'price': window.utils.getRandomInteger(price.MIN, price.MAX),
          'type': window.utils.getRandomIndex(offerData.TYPES),
          'rooms': window.utils.getRandomInteger(roomsAmount.MIN, roomsAmount.MAX),
          'guests': window.utils.getRandomInteger(guestsAmount.MIN, guestsAmount.MAX),
          'checkin': window.utils.getRandomIndex(offerData.CHECK_TIME),
          'checkout': window.utils.getRandomIndex(offerData.CHECK_TIME),
          'features': window.utils.getRandomLengthOfArray(window.utils.shuffleArr(offerData.FEATURES)),
          'description': '',
          'photos': window.utils.shuffleArr(offerData.PHOTOS)
        },

        'location': {
          'x': locationX,
          'y': locationY
        }
      };
    }
  };
})();
