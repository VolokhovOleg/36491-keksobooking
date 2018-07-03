'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var housePhoto = {
    WIDTH: 45,
    HEIGHT: 45
  };
  var AMOUNT_OF_ADS = 8;
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
  var addressInput = document.querySelector('#address');
  var mainTemplate = document.querySelector('#ad-template');
  var map = document.querySelector('.map');
  var cardTemplate = mainTemplate.content.querySelector('.map__card');
  var activeCard = map.querySelector('.map__card');
  var container = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  window.mainPinProperties = {
    'position': {
      'X': mainPin.offsetTop,
      'Y': mainPin.offsetLeft
    },
    'WIDTH': 65,
    'HEIGHT': 65,
    'TAIL': 14
  };
  var mapProperties = {
    'size': {
      'WIDTH': 1200,
      'HEIGHT': 750
    },
    'border': {
      'TOP': 130,
      'RIGHT': 1200,
      'BOTTOM': 630,
      'LEFT': 0
    }
  };
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPin = mainTemplate.content.querySelector('.map__pin');

  var getAd = function (array) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderAd(array));
    map.insertBefore(fragment, container);
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

  var getAdsArray = function (amount) {
    for (var i = 0; i < amount; i++) {
      adsArray[i] = window.createAd(i);
      renderPin(adsArray[i]);
    }
  };

  var resetMainPin = function () {
    mainPin.style.top = Math.round((mapProperties.size.HEIGHT - window.mainPinProperties.HEIGHT) / 2) + 'px';
    mainPin.style.left = Math.round((mapProperties.size.WIDTH - window.mainPinProperties.WIDTH) / 2) + 'px';
  };

  var showAddressValue = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var getMainPinPosition = function (x, y) {
    var mainPinPositionX = Math.round(x + window.mainPinProperties.HEIGHT + window.mainPinProperties.TAIL);
    var mainPinPositionY = Math.round(y + window.mainPinProperties.WIDTH / 2);

    showAddressValue(mainPinPositionX, mainPinPositionY);
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

  var activatePage = function () {
    map.classList.remove('map--faded');
    getAdsArray(AMOUNT_OF_ADS);
    window.activateForm();
    getMainPinPosition(window.mainPinProperties.position.X, window.mainPinProperties.position.Y);
    window.setMatchRoom();
  };

  window.resetPage = function () {
    map.classList.add('map--faded');
    window.mainForm.classList.add('ad-form--disabled');
    removeAdCard();
    window.mainForm.reset();
    window.resetInputs();

    for (var i = 0; i < pinsArray.length; i++) {
      pinsArray[i].remove();
    }

    window.disabledForm();
    getMainPinPosition(window.mainPinProperties.position.X, window.mainPinProperties.position.Y);
    resetMainPin();
    pinsArray = [];
  };

  mainPin.addEventListener('mousedown', function (evt) {
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

      var topPosition = (mainPin.offsetTop - shift.y) + 'px';
      var leftPosition = (mainPin.offsetLeft - shift.x) + 'px';

      var borderTop = mapProperties.border.TOP - window.mainPinProperties.HEIGHT - window.mainPinProperties.TAIL;
      var borderRight = mapProperties.border.RIGHT - window.mainPinProperties.WIDTH;
      var borderBottom = mapProperties.border.BOTTOM - window.mainPinProperties.HEIGHT - window.mainPinProperties.TAIL;
      var borderLeft = mapProperties.border.LEFT;

      if (mainPin.offsetTop - shift.y <= (borderTop)) {
        topPosition = (borderTop) + 'px';
      } else if (mainPin.offsetTop - shift.y >= (borderBottom)) {
        topPosition = (borderBottom) + 'px';
      }

      if (mainPin.offsetLeft - shift.x >= borderRight) {
        leftPosition = borderRight + 'px';
      } else if (mainPin.offsetLeft - shift.x <= borderLeft) {
        leftPosition = borderLeft + 'px';
      }

      mainPin.style.top = topPosition;
      mainPin.style.left = leftPosition;

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

  getMainPinPosition(mainPin.offsetTop, mainPin.offsetLeft);
})();
