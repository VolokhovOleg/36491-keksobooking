'use strict';

(function () {
  var pinSize = {
    WIDTH: 70,
    HEIGHT: 50
  };
  var pinsArray = [];

  var mainTemplate = document.querySelector('#ad-template');
  var container = document.querySelector('.map__filters-container');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPin = mainTemplate.content.querySelector('.map__pin');

  window.renderPin = function (array) {
    if (pinsArray.length < window.getMockAmount.AMOUNT_OF_ADS) {
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
        var fragment = document.createDocumentFragment();
        fragment.appendChild(window.renderAd(array));
        map.insertBefore(fragment, container);
      });

      pinsArray.push(pinElement);

      mapPinsBlock.appendChild(pinElement);
    }
  };
})();
