'use strict';

(function () {
  var pinSize = {
    WIDTH: 70,
    HEIGHT: 50
  };
  var pinsArray = [];
  var mainTemplate = document.querySelector('#ad-template');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPin = mainTemplate.content.querySelector('.map__pin');

  var removeActivePinClass = function () {
    pinsArray.forEach(function (element) {
      element.classList.remove('map__pin--active');
    });
  };

  window.pins = {
    render: function (array) {
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
        window.card.render(array);
        removeActivePinClass();
        pinElement.classList.add('map__pin--active');
      });

      pinsArray.push(pinElement);

      mapPinsBlock.appendChild(pinElement);
    },
    delete: function () {
      pinsArray.forEach(function (item) {
        item.remove();
      });
      pinsArray = [];
    }
  };
})();
