'use strict';

(function () {
  var housePhoto = {
    WIDTH: 45,
    HEIGHT: 45
  };
  var offerTypesTranslation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  window.activeCard = document.querySelector('.map__card');
  var mainTemplate = document.querySelector('#ad-template');
  var cardTemplate = mainTemplate.content.querySelector('.map__card');
  var cardElements = {
    'feature': function (arr) {
      var tagName = document.createElement('li');
      tagName.classList.add('popup__feature', 'popup__feature--' + arr);
      return tagName;
    },
    'photo': function () {
      var tagName = document.createElement('img');
      tagName.classList.add('popup__photo');
      tagName.width = housePhoto.WIDTH;
      tagName.height = housePhoto.HEIGHT;
      tagName.alt = 'Фотография жилья';
      return tagName;
    }
  };

  window.renderAd = function (card) {
    window.removeAdCard();

    var adElement = cardTemplate.cloneNode(true);
    window.activeCard = adElement;
    var rooms = card.offer.rooms;
    var guests = card.offer.guests;
    var closeAdBtn = adElement.querySelector('.popup__close');

    adElement.querySelector('.popup__avatar').src = card.author.avatar;
    adElement.querySelector('.popup__title').textContent = card.offer.title;
    adElement.querySelector('.popup__text--address').textContent = card.offer.address;
    adElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = offerTypesTranslation[card.offer.type];
    adElement.querySelector('.popup__text--capacity').textContent = rooms + ' ' + window.getPlurals(rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + guests + ' ' + window.getPlurals(guests, ['гостя', 'гостей', 'гостей']);
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    for (var featureIndex = 0; featureIndex < card.offer.features.length; featureIndex++) {
      adElement.querySelector('.popup__features').appendChild(cardElements.feature(card.offer.features[featureIndex]));
    }

    adElement.querySelector('.popup__description').textContent = card.offer.description;

    for (var photoIndex = 0; photoIndex < card.offer.photos.length; photoIndex++) {
      adElement.querySelector('.popup__photos').appendChild(cardElements.photo(card.offer.photos[photoIndex])).src = card.offer.photos[photoIndex];
    }

    closeAdBtn.addEventListener('click', window.removeAdCard);

    document.addEventListener('keydown', window.removeAdCardWithEsc);

    return adElement;
  };
})();
