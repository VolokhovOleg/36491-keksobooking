'use strict';

(function () {
  var offerTypesTranslation = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardTemplate = mainTemplate.content.querySelector('.map__card');

  window.renderAd = function (card) {

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
    adElement.querySelector('.popup__text--capacity').textContent = rooms + ' ' + window.getPlurals(rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + guests + ' ' + window.getPlurals(guests, ['гостя', 'гостей', 'гостей']);
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
})();
