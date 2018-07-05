'use strict';

(function () {
  var pinSize = {
    WIDTH: 70,
    HEIGHT: 50
  };
  var mainTemplate = document.querySelector('#ad-template');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPin = mainTemplate.content.querySelector('.map__pin');

  window.renderPin = function (array) {
    if (window.data.array.pins.length < window.data.AMOUNT_OF_ADS) {
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
        window.createCard.getAd(array);
      });

      window.data.array.pins.push(pinElement);

      mapPinsBlock.appendChild(pinElement);
    }
  };
})();
